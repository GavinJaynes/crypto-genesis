import { useEffect, useState } from "react";
import { cn, formatNumber } from "@/lib/utils";
import { EvmErc20TokenBalanceWithPrice } from "@moralisweb3/common-evm-utils";

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

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

  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  if (isLoading || !walletTokens || walletTokens.length < 2) {
    return null;
  }

  return (
    <nav className="fixed right-1 sm:right-12 top-1/2 -translate-y-1/2 h-screen w-12">
      <ul className="flex flex-col gap-6 justify-center py-10 items-center h-full">
        {walletTokens.map((token, index) => (
          <li
            key={index}
            className="text-xs relative"
            onMouseEnter={() => setHoveredIndex(token.symbol.toLowerCase())}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="popLayout">
              {hoveredIndex === token.symbol.toLowerCase() && (
                <motion.div
                  initial={{ opacity: 0, y: 20, x: 0, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 40,
                    x: -120,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, x: -100, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                >
                  <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold text-white relative z-30 text-base">
                    {token.name}
                  </div>
                  <div className="text-white text-xs">
                    {formatNumber(Number(token.balanceFormatted))}{" "}
                    {token.symbol}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {hash === `#${token.symbol.toLowerCase()}` && (
              <div className="sm:w-6 sm:h-6 w-5 h-5 bg-white/70 blur rounded-full absolute inset-0 m-auto animate-in zoom-in duration-1000"></div>
            )}
            <a className="relative" href={`#${token.symbol.toLowerCase()}`}>
              <span className="sr-only">{token.symbol}</span>
              <img
                width={50}
                height={50}
                src={token.logo}
                alt={token.symbol}
                onMouseMove={handleMouseMove}
                className={cn(
                  "rounded-full sm:w-6 h-auto w-5",
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
