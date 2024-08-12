import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "@/components/ui/button";

// Rest of the code
const ButtonActivity = () => {
  const { open } = useWeb3Modal();

  return (
    <Button
      size="sm"
      type="button"
      // @ts-ignore
      onClick={() => open({ view: "Transactions" })}
    >
      Activity
    </Button>
  );
};

export default ButtonActivity;
