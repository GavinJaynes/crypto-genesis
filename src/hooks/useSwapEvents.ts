import { toast } from "sonner";
import { useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWeb3ModalEvents } from "@web3modal/wagmi/react";

import type { Address } from "viem";
import type { EvmChain } from "@moralisweb3/common-evm-utils";

import { useWalletTokens } from "@/hooks/useWalletTokens";

export const useSwapEvents = ({
  address,
  chain,
}: {
  address?: Address;
  chain: EvmChain;
}) => {
  const { close, open } = useWeb3Modal();
  const { data: event } = useWeb3ModalEvents();

  const { refetch } = useWalletTokens({
    address,
    chain,
  });

  useEffect(() => {
    // Get new balance after swap
    if (event.event === "SWAP_SUCCESS") {
      // Close the modal
      close();
      // Refetch the balance
      refetch();
      // Display success toast
      toast.success("Swap successful", {
        action: {
          label: "View transaction",
          onClick: () => open({ view: "Transactions" as any }),
        },
      });
    }
  }, [close, event.event, open, refetch]);
};
