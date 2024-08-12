import Moralis from "moralis";
import type { Address } from "viem";
import { useQuery } from "@tanstack/react-query";

import { EvmNetWorthResult } from "@moralisweb3/common-evm-utils";

interface WalletBalanceResult {
  isLoading: boolean;
  isFetching: boolean;
  walletBalance: EvmNetWorthResult | null;
}

export const useWalletBalance = ({
  address,
}: {
  address?: Address;
}): WalletBalanceResult => {
  // Call the Moralis API to get the wallet tokens
  // Wrap in Tanstack's useQuery hook
  const {
    isLoading,
    isFetching,
    data: walletBalance,
  } = useQuery({
    queryKey: [`users_wallet_balance_${address}`],
    queryFn: async () =>
      await Moralis.EvmApi.wallets.getWalletNetWorth({
        address: address!,
        chains: ["0x1", "0x38"],
        excludeSpam: true,
        excludeUnverifiedContracts: true,
      }),
    enabled: !!address,
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    isFetching,
    walletBalance: walletBalance?.result || null,
  };
};
