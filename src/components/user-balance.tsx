import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWeb3ModalEvents } from "@web3modal/wagmi/react";
import { TrendingUpIcon, TrendingDownIcon, SkullIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const UserBalance = () => {
  const { toast } = useToast();
  const { close } = useWeb3Modal();
  const { address, chainId } = useAccount();
  const { data: event } = useWeb3ModalEvents();

  const [balance, setBalance] = useState(0);
  const [balanceUp, setBalanceUp] = useState(false);
  const [balanceDown, setBalanceDown] = useState(false);

  const { data, isLoading, isError, refetch, isFetching, isSuccess } =
    useBalance({
      address,
    });

  useEffect(() => {
    // Get new balance after swap
    if (event.event === "SWAP_SUCCESS") {
      close();
      //
      refetch();
      //
      toast({
        title: "Swap successful",
        description: "Your swap was successful",
      });
    }
  }, [close, event.event, refetch, toast]);

  // TODO: id chain changes do nothing
  useEffect(() => {
    if (isSuccess && data) {
      if (balance !== 0 && Number(data.formatted) !== balance) {
        // Increase balance
        if (Number(data.formatted) > balance) {
          setBalanceUp(true);
          setBalanceDown(false);

          toast({
            title: "Balance updated",
            description: "Your balance just went up!",
          });
        }
        // Decrease balance
        if (Number(data.formatted) < balance) {
          setBalanceUp(false);
          setBalanceDown(true);

          toast({
            title: "Balance updated",
            description: "Your balance just went down!",
          });
        }
      }
      // Restore balance animation
      setTimeout(() => {
        setBalanceUp(false);
        setBalanceDown(false);
      }, 900);

      setBalance(Number(data.formatted));
    }
  }, [balance, data, isSuccess, toast]);

  return (
    <div className="mx-auto text-slate-200 relative py-12 px-6">
      {isLoading && (
        <div className="flex gap-6">
          <Skeleton className="h-[60px] w-48 rounded-xl opacity-50" />
          <Skeleton className="h-[60px] w-36 rounded-xl opacity-50" />
        </div>
      )}
      {isError && (
        <div className="text-4xl flex items-center gap-2 text-red-500">
          <SkullIcon size={40} /> Error fetching balance
        </div>
      )}
      {data && (
        <div className="flex gap-4">
          <span
            className={cn(
              isFetching && "blur scale-125",
              "text-6xl font-bold bg-gradient-to-br from-neutral-50 to-neutral-400 bg-clip-text text-transparent transition-all scale-100"
            )}
          >
            {formatNumber(Number(data.formatted))}
          </span>
          <span
            className={cn(
              "font-bold text-6xl",
              chainId === 1 && "text-indigo-400",
              chainId === 56 && "text-amber-400"
            )}
          >
            {data.symbol}
          </span>
          {balanceUp && (
            <TrendingUpIcon
              size={20}
              className="text-green-400 absolute top-0 -right-10 animate-ping"
            />
          )}
          {balanceDown && (
            <TrendingDownIcon
              size={20}
              className="text-red-400 absolute bottom-2 -right-10 animate-ping"
            />
          )}
        </div>
      )}
      <p className="text-xs text-destructive max-w-xs leading-5 mt-6">
        We are having trouble retrieving all the tokens in your wallet. But you
        can still swap and buy tokens as well as view your activity.
      </p>
    </div>
  );
};

export default UserBalance;
