import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "@/components/ui/button";

// Rest of the code
const ButtonActivity = () => {
  const { open } = useWeb3Modal();

  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={() => open({ view: "Transactions" as any })} // Type assertion to suppress the error
    >
      Activity
    </Button>
  );
};

export default ButtonActivity;
