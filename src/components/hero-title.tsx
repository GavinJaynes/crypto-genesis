import { FlipWords } from "@/components/ui/flip-words";
import GlowCircle from "./ui/glow-circle";

const HeroTitle = () => {
  const words = ["better", "sleek", "beautiful", "modern"];

  return (
    <div className="flex justify-center items-center">
      <GlowCircle />
      <div className="sm:text-6xl text-5xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        apps with{" "}
        <a
          href="https://docs.walletconnect.com/appkit/overview"
          className="underline"
        >
          AppKit
        </a>
      </div>
    </div>
  );
};

export default HeroTitle;
