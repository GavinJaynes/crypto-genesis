import { useState, useEffect, useRef } from "react";

export const CubeAnimation = () => {
  const [isActive, setIsActive] = useState(6);
  const numberOfSquares = 36;
  const relayAnimationTimer = useRef<number | null>(null);

  useEffect(() => {
    const getRandomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateRandomNumber = () => {
      const randomNumber = getRandomNumber(1, numberOfSquares);
      setIsActive(randomNumber);
    };

    relayAnimationTimer.current = window.setInterval(
      generateRandomNumber,
      4000
    );

    return () => {
      if (relayAnimationTimer.current !== null) {
        clearInterval(relayAnimationTimer.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 overflow-hidden absolute max-w-screen-xl mx-auto inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(30rem_30rem_at_center,#27272a,transparent)]">
      {[...Array(numberOfSquares)].map((_, index) => (
        <div
          key={index + 1}
          className={`bg-gradient-to-tr from-cyan-100 to-cyan-300 p-px duration-1000 transition-opacity ${
            isActive === index + 1 ? "opacity-70" : "opacity-10"
          }`}
        >
          <div className="bg-zinc-800/80 w-full h-full"></div>
        </div>
      ))}
    </div>
  );
};
