import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { truncatedAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Bsc from "@/components/icons/bsc";
import Ethereum from "@/components/icons/ethereum";

const ButtonAccount = () => {
  const { isConnected, address, chainId } = useAccount();
  const { open } = useWeb3Modal();

  if (!isConnected && !address) {
    return null;
  }

  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="ghost"
        onClick={() => open({ view: "Networks" })}
        className="px-2"
      >
        {chainId === 56 && <Bsc />}
        {chainId === 1 && <Ethereum />}
        <span className="sr-only">Change network</span>
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={() => open({ view: "Account" })}
        className="text-slate-200 px-2"
      >
        {truncatedAddress(address!)}
      </Button>
    </div>
  );
};

export default ButtonAccount;
