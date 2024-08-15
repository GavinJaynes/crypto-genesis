import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EvmErc20TokenBalanceWithPrice } from "@moralisweb3/common-evm-utils";

const NavigationWallet = ({
  isLoading,
  walletTokens,
}: {
  isLoading: boolean;
  walletTokens: EvmErc20TokenBalanceWithPrice[];
}) => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleUrlChange = () => {
      setHash(window.location.hash);
    };

    // Listen for popstate event (triggered by back/forward buttons and pushState/replaceState)
    window.addEventListener("popstate", handleUrlChange);

    // Create a custom event for pushState and replaceState
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (
      data: any,
      unused: string,
      url?: string | URL | null | undefined
    ) {
      originalPushState.call(this, data, unused, url);
      window.dispatchEvent(new Event("locationchange"));
    };

    window.history.replaceState = function (
      data: any,
      unused: string,
      url?: string | URL | null | undefined
    ) {
      originalReplaceState.call(this, data, unused, url);
      window.dispatchEvent(new Event("locationchange"));
    };

    // Listen for our custom locationchange event
    window.addEventListener("locationchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("locationchange", handleUrlChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  if (isLoading || !walletTokens || walletTokens.length < 2) {
    return null;
  }

  return (
    <nav className="fixed right-3 sm:right-48 top-24 h-screen w-12">
      <ul className="flex flex-col gap-6 sm:justify-center py-10 items-center h-full">
        {walletTokens.map((token, index) => (
          <li key={index} className="text-xs relative">
            {hash === `#${token.symbol.toLowerCase()}` && (
              <div className="w-6 h-6 bg-white/70 blur rounded-full absolute inset-0 m-auto animate-in zoom-in duration-1000"></div>
            )}
            <a className="relative" href={`#${token.symbol.toLowerCase()}`}>
              <span className="sr-only">{token.symbol}</span>
              <img
                src={token.logo}
                width={50}
                height={50}
                alt={token.symbol}
                className={cn(
                  "rounded-full w-6 h-auto",
                  "opacity-50" && hash !== `#${token.symbol.toLowerCase()}`
                )}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationWallet;
