import { useRef } from "react";
import { useAccount } from "wagmi";

import { getEvmChain } from "@/lib/utils";

import Glow from "@/components/ui/glow";

import WalletToken from "@/components/wallet-token";
import SectionHero from "@/components/section-hero";
import SectionShowcase from "@/components/section-showcase";
import NavigationWallet from "@/components/navigation-wallet";
import NavigationAccount from "@/components/navigation-account";

// Better name this
import UserBalance from "@/components/user-balance";

import { useSwapEvents } from "@/hooks/useSwapEvents";
import { useWalletTokens } from "@/hooks/useWalletTokens";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useNotifications } from "@/hooks/useNotifications";

function App() {
  const ref = useRef(null);
  const scrollDirection = useScrollDirection(ref);

  const { isConnected, address, chainId } = useAccount();

  const { walletTokens, isLoading, isFetching, isError } = useWalletTokens({
    address,
    chain: getEvmChain(chainId || 56),
  });

  // Init swap events
  useSwapEvents({ address, chain: getEvmChain(chainId || 56) });
  // Init notifications events
  useNotifications({ address, chain: getEvmChain(chainId || 56) });

  console.log(walletTokens);

  return (
    <>
      {isConnected ? (
        <div className="min-h-svh bg-zinc-950 flex items-center justify-center relative overflow-hidden isolate">
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

              <div className="fixed top-6 left-6 sm:top-[38%] sm:max-w-xl sm:mx-auto sm:w-full sm:inset-x-6 sm:flex ">
                <NavigationAccount />
              </div>
            </>
          </div>
          <Glow />
        </div>
      ) : (
        <div className="overflow-y-auto overflow-x-hidden max-h-screen">
          <SectionHero />
          <SectionShowcase />
        </div>
      )}
    </>
  );
}

export default App;
