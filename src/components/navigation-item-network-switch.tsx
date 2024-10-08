import { useSwitchChain } from "wagmi";
import { ArrowLeftRightIcon } from "lucide-react";

import Bsc from "@/components/icons/bsc";
import Ethereum from "@/components/icons/ethereum";
import Arbitrum from "@/components/icons/arbitrum";

import { ButtonModal } from "@/components/button-modal";

const NavigationItemNetworkSwitch = () => {
  const { chains, switchChain } = useSwitchChain();

  return (
    <div className="flex flex-col gap-2">
      <ButtonModal
        screen="Networks"
        variant="link"
        className="flex flex-col text-left w-fit p-0 m-0 h-fit"
      >
        <h5 className="text-sm font-medium leading-none gap-2 flex items-center">
          <ArrowLeftRightIcon size={14} /> Switch networks
        </h5>
      </ButtonModal>

      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ">
        Change to another supported network
      </p>

      <div className="flex gap-4 mt-1">
        {chains.map((chain) => (
          <button
            key={chain.id}
            className="grayscale hover:grayscale-0 transition-all duration-300"
            onClick={() => switchChain({ chainId: chain.id })}
          >
            {chain.id === 56 && <Bsc />}
            {chain.id === 1 && <Ethereum />}
            {chain.id === 42161 && <Arbitrum />}
            <span className="sr-only">Change network to {chain.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationItemNetworkSwitch;
