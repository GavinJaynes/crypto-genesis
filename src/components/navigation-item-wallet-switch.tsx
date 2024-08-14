import type { Address } from "viem";
import { ArrowLeftRight } from "lucide-react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const NavigationItemWalletSwitch = ({ address }: { address: Address }) => {
  const { open } = useWeb3Modal();
  console.log("address", address);

  return (
    <button
      type="button"
      className="text-left"
      onClick={() => open({ view: "SwitchAddress" as any })}
    >
      <h5 className="text-sm font-medium leading-none gap-2 flex">
        <ArrowLeftRight size={14} /> Switch Connected wallet
      </h5>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
        Connect to a different wallet address to Wallet Pal
      </p>
    </button>
  );
};

export default NavigationItemWalletSwitch;
