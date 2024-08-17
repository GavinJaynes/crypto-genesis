import { toast } from "sonner";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useRef } from "react";

import type { Address } from "viem";
import type { EvmChain } from "@moralisweb3/common-evm-utils";

import { useWalletTokens } from "@/hooks/useWalletTokens";

import type { EvmErc20TokenBalanceWithPrice } from "@moralisweb3/common-evm-utils";

export const useNotifications = ({
  address,
  chain,
}: {
  address?: Address;
  chain: EvmChain;
}) => {
  const { open } = useWeb3Modal();
  const previousTokensRef = useRef<EvmErc20TokenBalanceWithPrice[]>([]);

  const { walletTokens, isLoading, isError } = useWalletTokens({
    address,
    chain,
  });

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        toast.error("Error fetching wallet tokens", {
          action: {
            label: "Refresh",
            onClick: () => window.location.reload(),
          },
        });
        return;
      }

      if (walletTokens && walletTokens.length > 0) {
        const nativeToken = walletTokens.find((token) => token.nativeToken);

        // Native token notifications
        if (nativeToken) {
          if (parseFloat(nativeToken.balanceFormatted) === 0) {
            toast(`What is ${nativeToken.symbol}?`, {
              description: `${nativeToken.symbol} is the native token of ${chain?.name}. It's used for transaction fees and other operations.`,
              id: "info-native-token",
              duration: 15000,
            });

            toast("Welcome to the world of crypto!", {
              description: `To get started, you might want to buy some ${nativeToken.symbol}.`,
              action: {
                label: `Buy ${nativeToken.symbol}`,
                onClick: () => open({ view: "OnRampProviders" }),
              },
              id: "buy-native-token",
              duration: 20000,
            });
          } else if (parseFloat(nativeToken.balanceFormatted) < 0.01) {
            toast.warning("Low gas balance", {
              description: `Your ${nativeToken.symbol} balance is low. You may not be able to perform transactions.`,
              action: {
                label: "Top up",
                onClick: () => open({ view: "OnRampProviders" }),
              },
              duration: 10000,
            });
          }
        }

        // Price change notifications
        walletTokens.forEach((token) => {
          if (Math.abs(Number(token.usdPrice24hrPercentChange)) > 10) {
            const direction =
              Number(token.usdPrice24hrPercentChange) > 0 ? "up" : "down";
            toast.info(`${token.symbol} price change`, {
              description: `${
                token.symbol
              } has moved ${direction} by ${Math.abs(
                Number(token.usdPrice24hrPercentChange)
              ).toFixed(2)}% in the last 24 hours.`,
              duration: 8000,
            });
          }
        });

        // New tokens received
        const newTokens = walletTokens.filter(
          (token) =>
            !previousTokensRef.current.some(
              (prevToken) => prevToken.tokenAddress === token.tokenAddress
            ) && parseFloat(token.balanceFormatted) > 0
        );

        newTokens.forEach((token) => {
          toast.success(`New ${token.symbol} tokens received!`, {
            description: `You've received ${token.balanceFormatted} ${
              token.symbol
            } (${(token.usdValue || 0).toFixed(2)} USD).`,
            action: {
              label: "View Details",
              onClick: () => {
                /* Implement a function to show token details */
              },
            },
            duration: 10000,
          });
        });

        // Possible spam token warning
        const possibleSpamTokens = walletTokens.filter(
          (token) => token.possibleSpam
        );
        if (possibleSpamTokens.length > 0) {
          toast.warning("Possible spam tokens detected", {
            description: `${possibleSpamTokens.length} token(s) in your wallet might be spam. Be cautious when interacting with them.`,
            action: {
              label: "Learn More",
              onClick: () => {
                /* Implement a function to show info about spam tokens */
              },
            },
            duration: 15000,
          });
        }

        // Update previous tokens for next comparison
        previousTokensRef.current = walletTokens;
      }
    }
  }, [isLoading, isError, walletTokens, chain, open]);

  return null;
};
