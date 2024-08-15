import { useRef } from "react";
import { useAccount } from "wagmi";

import Glow from "@/components/ui/glow";
import HeroTitle from "@/components/hero-title";
import WalletToken from "@/components/wallet-token";
import ConnectButton from "@/components/button-connect";
import NavigationWallet from "@/components/navigation-wallet";
import NavigationAccount from "@/components/navigation-account";

// Better name this
import UserBalance from "@/components/user-balance";

import { useWalletTokens } from "@/hooks/useWalletTokens";
import { useScrollDirection } from "@/hooks/useScrollDirection";

import { getEvmChain } from "@/lib/utils";

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
            {isError && <UserBalance />}

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

            {!isError && walletTokens && (
              <NavigationWallet
                isLoading={isLoading}
                walletTokens={walletTokens}
              />
            )}

            <div className="fixed top-6 left-6 sm:top-[38%] sm:max-w-xl sm:mx-auto sm:w-full sm:inset-x-6 sm:flex sm:justify-center">
              <NavigationAccount />
            </div>
          </>
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-6 sm:px-12">
          <HeroTitle />
          <ConnectButton />
        </div>
      )}

      <Glow />
    </div>
  );
}

export default App;
