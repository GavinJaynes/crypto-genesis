import { BadgeDollarSignIcon } from "lucide-react";

import { useAccount } from "wagmi";
import { useWalletTokens } from "@/hooks/useWalletTokens";

import { getEvmChain, formatNumber } from "@/lib/utils";

const NavigationItemNetTotal = () => {
  const { address, chainId, chain } = useAccount();
  const { totalNetWorth } = useWalletTokens({
    address,
    chain: getEvmChain(chainId || 56),
  });

  return (
    <div>
      <h5 className="text-sm font-medium leading-none gap-2 flex text-white">
        <BadgeDollarSignIcon size={14} /> ${formatNumber(totalNetWorth)} USD
      </h5>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
        Your net total on {chain?.name} network
      </p>
    </div>
  );
};

export default NavigationItemNetTotal;
