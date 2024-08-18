import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const ScrollDownChevron = () => {
  const [showChevron, setShowChevron] = useState(true);

  // Fade out component after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowChevron(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        !showChevron && "opacity-0",
        "absolute w-full bottom-0 py-4 inset-x-0 mx-auto flex justify-center transition-opacity duration-1000"
      )}
    >
      <p className="text-xs text-gray-500">Scroll down to see more tokens</p>
    </div>
  );
};
