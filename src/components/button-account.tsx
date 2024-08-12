import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { truncatedAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Bsc from "@/components/icons/bsc";
import Ethereum from "@/components/icons/ethereum";
import Arbitrum from "@/components/icons/arbitrum";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ButtonAccount = () => {
  const { isConnected, address, chainId } = useAccount();
  const { open } = useWeb3Modal();

  if (!isConnected && !address) {
    return null;
  }

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              onClick={() => open({ view: "Networks" })}
              className="px-2"
            >
              {chainId === 56 && <Bsc />}
              {chainId === 1 && <Ethereum />}
              {chainId === 42161 && <Arbitrum />}
              <span className="sr-only">Change network</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change Networks</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="text-slate-200 px-2"
              onClick={() => open({ view: "Profile" as any })}
            >
              {truncatedAddress(address!)}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View your account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ButtonAccount;
