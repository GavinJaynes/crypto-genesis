import Moralis from "moralis";
import type { Address } from "viem";
import { useQuery } from "@tanstack/react-query";

import {
  EvmChain,
  GetWalletTokenBalancesPriceOperationResponse,
} from "@moralisweb3/common-evm-utils";

interface WalletTokensResult {
  isLoading: boolean;
  isFetching: boolean;
  walletTokens: GetWalletTokenBalancesPriceOperationResponse["result"];
}

export const useWalletTokens = ({
  chain,
  address,
}: {
  chain?: EvmChain;
  address?: Address;
}): WalletTokensResult => {
  // Call the Moralis API to get the wallet tokens
  // Wrap in Tanstack's useQuery hook
  const {
    isLoading,
    isFetching,
    data: walletTokens,
  } = useQuery({
    queryKey: [`users_wallet_tokens_${address}_${chain}`],
    queryFn: async () =>
      await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        chain,
        address: address!,
        excludeSpam: true,
        excludeUnverifiedContracts: true,
      }),
    refetchOnWindowFocus: false,
    enabled: !!address && !!chain,
  });

  return { walletTokens: walletTokens?.result || [], isLoading, isFetching };
};
