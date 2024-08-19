import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";

import { getEvmChain } from "@/lib/utils";

import Glow from "@/components/ui/glow";
import WalletToken from "@/components/wallet-token";
import SectionHero from "@/components/section-hero";
import SectionShowcase from "@/components/section-showcase";
import NavigationWallet from "@/components/navigation-wallet";
import NavigationAccount from "@/components/navigation-account";
import { ScrollDownChevron } from "@/components/ui/scroll-down-chevron";

// This is a fallback for when Moralis rate limit is hit
import UserBalance from "@/components/user-balance";

import { useModalEvents } from "@/hooks/useModalEvents";
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

  useEffect(() => {
    // remove the hash from the url
    window.history.pushState(null, "", window.location.pathname);
  }, []);

  // Init modal events
  useModalEvents({ address, chain: getEvmChain(chainId || 56) });
  // Init notifications events
  useNotifications({ address, chain: getEvmChain(chainId || 56) });

  return (
    <>
      {isConnected ? (
        <div
          id="app_widow"
          className="min-h-svh bg-zinc-950 flex items-center justify-center relative overflow-hidden isolate"
        >
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

              <div className="fixed top-6 left-6 sm:top-[calc(50svh-8rem)] sm:max-w-xl sm:mx-auto sm:w-full max-w-xs sm:inset-x-6 sm:flex ">
                <NavigationAccount />
              </div>
            </>
          </div>
          {walletTokens.length > 1 && <ScrollDownChevron />}
          <Glow />
        </div>
      ) : (
        <div id="welcome_window">
          <SectionHero />
          <SectionShowcase />
        </div>
      )}
    </>
  );
}

export default App;
