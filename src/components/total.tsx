import { useAccount } from "wagmi";
import { useWalletBalance } from "@/hooks/useWalletBalance";

const Total = () => {
  const { address } = useAccount();
  const { walletBalance, isLoading } = useWalletBalance({ address });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!walletBalance) {
    return null;
  }

  return (
    <p className="text-slate-300 fixed top-6 right-12">
      ${walletBalance?.totalNetworthUsd} USD
    </p>
  );
};

export default Total;
