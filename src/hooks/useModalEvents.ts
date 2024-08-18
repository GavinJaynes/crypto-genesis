import { toast } from "sonner";
import { useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWeb3ModalEvents } from "@web3modal/wagmi/react";

import { useWalletTokens } from "@/hooks/useWalletTokens";

import type { Address } from "viem";
import type { EvmChain } from "@moralisweb3/common-evm-utils";

export const useModalEvents = ({
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
    if (event.event === "MODAL_OPEN") {
      toast.dismiss();
    }

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
        id: "swap-success",
        duration: 10000,
      });
    }
  }, [close, event.event, open, refetch]);
};
