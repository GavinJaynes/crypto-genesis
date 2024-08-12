import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "@/components/ui/button";
const ButtonBuy = () => {
  const { open } = useWeb3Modal();

  return (
    <Button
      size="sm"
      type="button"
      onClick={() => open({ view: "OnRampProviders" })}
    >
      Buy
    </Button>
  );
};

export default ButtonBuy;
