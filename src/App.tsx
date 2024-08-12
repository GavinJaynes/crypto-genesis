import { useRef } from "react";
import { useAccount } from "wagmi";
import { EvmChain } from "@moralisweb3/common-evm-utils";

// import Total from "@/components/total";
import Glow from "@/components/ui/glow";
import HeroTitle from "@/components/hero-title";
import ButtonBuy from "@/components/button-buy";
import ButtonSwap from "@/components/button-swap";
import WalletToken from "@/components/wallet-token";
import ConnectButton from "@/components/button-connect";
import AccountButton from "@/components/button-account";
import ButtonActivity from "@/components/button-activity";

import { useWalletTokens } from "@/hooks/useWalletTokens";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import UserBalance from "./components/user-balance";

// TODO: move this
const getEvmChain = (chainId: number) => {
  switch (chainId) {
    case 1:
      return EvmChain.ETHEREUM;
    case 56:
      return EvmChain.BSC;
    default:
      return EvmChain.BSC;
  }
};

function App() {
  const ref = useRef(null);
  const scrollDirection = useScrollDirection(ref);
  const { isConnected, address, chainId } = useAccount();
  const { walletTokens, isLoading, isFetching, isError } = useWalletTokens({
    address,
    chain: getEvmChain(chainId || 56),
  });

  return (
    <div className="min-h-svh bg-zinc-950 flex items-center justify-center relative overflow-hidden isolate">
      {isConnected ? (
        <div
          ref={ref}
          className="flex flex-col gap-2 relative snap-y snap-mandatory overflow-y-auto overflow-x-hidden max-h-screen"
        >
          <>
            {/* <Total /> */}

            <UserBalance />

            {!isError &&
              walletTokens?.map((token, index) => (
                <WalletToken
                  key={index}
                  token={token}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  scrollDirection={scrollDirection}
                />
              ))}

            <div className="fixed top-[40%] max-w-xl mx-auto w-full inset-x-6 flex justify-center">
              <AccountButton />
            </div>

            <div className="flex gap-3 justify-center mt-2 fixed top-[58%] max-w-md mx-auto w-full right-6 sm:inset-x-0">
              <ButtonBuy />
              <ButtonSwap />
              <ButtonActivity />
            </div>
          </>
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-6 sm:px-12">
          <HeroTitle />
          <ConnectButton />
        </div>
      )}

      <div className="fixed left-0 top-[23%]">
        <Glow />
      </div>
    </div>
  );
}

export default App;
