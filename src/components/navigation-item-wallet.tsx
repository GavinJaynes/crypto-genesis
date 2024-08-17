import { WalletIcon } from "lucide-react";
import { truncatedAddress } from "@/lib/utils";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import type { Address } from "viem";

const NavigationItemWallet = ({ address }: { address: Address }) => {
  const { open } = useWeb3Modal();

  return (
    <button
      type="button"
      className="text-left"
      onClick={() => open({ view: "Account" })}
    >
      <h5 className="text-sm font-medium leading-none gap-2 flex">
        <WalletIcon size={14} /> Connected wallet
      </h5>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
        Your connected wallet address is{" "}
        <span className="underline">{truncatedAddress(address!)}</span>
      </p>
    </button>
  );
};

export default NavigationItemWallet;
