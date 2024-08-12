import { useWeb3Modal } from "@web3modal/wagmi/react";
import { FancyButton } from "@/components/ui/fancy-button";

const ConnectButton = () => {
  const { open } = useWeb3Modal();

  return (
    <FancyButton
      type="button"
      onClick={() => open()}
      className="self-end -mr-12"
    >
      Connect your wallet to get started
    </FancyButton>
  );
};

export default ConnectButton;
