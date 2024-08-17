import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";

export const Glow = () => {
  const { chainId } = useAccount();

  return (
    <div
      className="pointer-events-none z-10 absolute top-1/2 -translate-y-1/2 inset-x-0 mx-auto translate-x-1/4  transform-gpu blur-3xl lg:transform-gpu border border-red-300"
      aria-hidden="true"
    >
      <div
        className={twMerge(
          chainId === 1 && "from-indigo-200/20 to-indigo-600/80",
          chainId === 56 && "from-amber-200/20 to-amber-400/60",
          chainId === 42161 && "from-blue-100/20 to-blue-500/90",
          "aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr"
        )}
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      />
    </div>
  );
};

export default Glow;
