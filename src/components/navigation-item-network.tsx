import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Bsc from "@/components/icons/bsc";
import Ethereum from "@/components/icons/ethereum";
import Arbitrum from "@/components/icons/arbitrum";

const NavigationItemNetwork = () => {
  const { open } = useWeb3Modal();
  const { chainId, chain } = useAccount();

  return (
    <button
      type="button"
      className="text-left group"
      onClick={() => open({ view: "Networks" })}
    >
      <h5 className="text-sm font-medium leading-none gap-2 flex items-center">
        <div className="grayscale group-hover:grayscale-0 transition-all duration-300">
          {chainId === 56 && <Bsc />}
          {chainId === 1 && <Ethereum />}
          {chainId === 42161 && <Arbitrum />}
        </div>
        Connected network
      </h5>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
        You are connected to the{" "}
        <span className="underline">{chain?.name}</span> network
      </p>
    </button>
  );
};

export default NavigationItemNetwork;
