import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { motion, useInView } from "framer-motion";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { EvmErc20TokenBalanceWithPrice } from "@moralisweb3/common-evm-utils";

import { cn, formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type WalletTokenProps = {
  token: EvmErc20TokenBalanceWithPrice;
  isLoading: boolean;
  isFetching: boolean;
  scrollDirection: string;
};

const WalletToken = ({
  token,
  isLoading,
  isFetching,
  scrollDirection = "down",
}: WalletTokenProps) => {
  const { chainId } = useAccount();
  const section = useRef<HTMLDivElement>(null);
  const isInView = useInView(section, { amount: 0.5 });

  useEffect(() => {
    if (section.current) {
      if (isInView) {
        window.history.replaceState(null, "", `#${section.current?.id}`);
      }
    }
  }, [section, chainId, isInView]);

  return (
    <section
      ref={section}
      id={token.symbol.toLowerCase()}
      className="mx-auto text-slate-200 relative h-svh shrink-0 w-svw flex flex-col justify-center sm:items-center snap-center overflow-hidden"
    >
      {isLoading && (
        <div className="flex gap-6">
          <Skeleton className="h-[60px] w-48 rounded-xl opacity-50" />
          <Skeleton className="h-[60px] w-36 rounded-xl opacity-50" />
        </div>
      )}

      {token && (
        <div className="flex flex-col gap-4 sm:pr-8 sm:pl-4 px-8 sm:max-w-xl w-full">
          <div className="flex sm:gap-4 gap-2 flex-wrap">
            <motion.span
              className={cn(
                isFetching && "blur scale-125",
                "sm:text-6xl text-5xl font-bold bg-gradient-to-br from-neutral-50 to-neutral-400 bg-clip-text text-transparent transition-all scale-100"
              )}
              initial={{
                opacity: 0,
                filter: "blur(5px)",
                translateY: scrollDirection === "down" ? -50 : 50,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileInView={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
            >
              {formatNumber(Number(token.balanceFormatted))}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
                filter: "blur(5px)",
                translateY: scrollDirection === "down" ? -50 : 50,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileInView={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
              className={cn(
                "font-bold sm:text-6xl text-5xl",
                chainId === 1 && "text-indigo-400",
                chainId === 56 && "text-amber-400"
              )}
            >
              {token.symbol}
            </motion.span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 sm:items-center">
            <motion.span
              className={cn(
                isFetching && "blur scale-125",
                "sm:text-4xl text-2xl font-bold bg-gradient-to-br from-neutral-50 to-neutral-400 bg-clip-text text-transparent transition-all scale-100"
              )}
              initial={{
                opacity: 0,
                filter: "blur(5px)",
                translateY: scrollDirection === "down" ? -50 : 50,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileInView={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
            >
              ${formatNumber(Number(token.usdValue))} USD
            </motion.span>

            <motion.div
              className="flex gap-2 items-center"
              initial={{
                opacity: 0,
                translateX: -50,
              }}
              transition={{ duration: 0.25, delay: 0.5, ease: "easeOut" }}
              whileInView={{ opacity: 1, translateX: 0 }}
            >
              <div className="flex items-center gap-1">
                {Number(token.usdPrice24hrPercentChange) > 0 && (
                  <TrendingUpIcon className="h-10 w-10 text-green-500" />
                )}
                {Number(token.usdPrice24hrPercentChange) < 0 && (
                  <TrendingDownIcon className="h-10 w-10 text-red-500" />
                )}
              </div>

              <p className="text-sm">
                {formatNumber(Number(token.usdPrice24hrPercentChange))}% 24 hrs
              </p>
            </motion.div>
          </div>

          <motion.div
            className="flex gap-4 items-center"
            initial={{
              opacity: 0,
              translateY: scrollDirection === "down" ? -50 : 50,
            }}
            transition={{
              delay: 0.25,
              damping: 10,
              stiffness: 100,
              type: "spring",
            }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <p className="text-xs text-gray-400">
              {token.portfolioPercentage.toFixed(2)}% of total portfolio
            </p>
            <div className="h-6 w-px bg-gradient-to-t from-gray-400/0 via-gray-600 to-gray-400/0" />
            <p className="text-xs text-gray-400">
              One {token.symbol} = ${formatNumber(Number(token.usdPrice))} USD
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default WalletToken;
