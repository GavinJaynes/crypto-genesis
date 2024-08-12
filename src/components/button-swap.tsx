import { useWeb3Modal } from "@web3modal/wagmi/react";

import { Button } from "@/components/ui/button";

const ButtonSwap = () => {
  const { open } = useWeb3Modal();

  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={() => open({ view: "Swap" as any })} // Type assertion to suppress the error
    >
      Swap
    </Button>
  );
};

export default ButtonSwap;
