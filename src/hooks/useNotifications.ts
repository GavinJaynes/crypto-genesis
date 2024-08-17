import { toast } from "sonner";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";

import type { Address } from "viem";
import type { EvmChain } from "@moralisweb3/common-evm-utils";

import { useWalletTokens } from "@/hooks/useWalletTokens";

export const useNotifications = ({
  address,
  chain,
}: {
  address?: Address;
  chain: EvmChain;
}) => {
  const { open } = useWeb3Modal();

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
              id: "gas-warning",
              duration: 10000,
            });
          }
        }

        // Price change notifications
        walletTokens.forEach((token) => {
          if (Math.abs(Number(token.usdPrice24hrPercentChange)) > 5) {
            const direction =
              Number(token.usdPrice24hrPercentChange) > 0 ? "up" : "down";
            toast.info(`${token.symbol} price change`, {
              description: `${
                token.symbol
              } has moved ${direction} by ${Math.abs(
                Number(token.usdPrice24hrPercentChange)
              ).toFixed(2)}% in the last 24 hours.`,
              id: `price-change-${token.symbol}`,
              duration: 8000,
            });
          }
        });
      }
    }
  }, [isLoading, isError, walletTokens, chain, open]);

  return null;
};
