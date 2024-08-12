import { useState, useEffect, useRef, RefObject } from "react";

export const useScrollDirection = (containerRef: RefObject<HTMLElement>) => {
  const [scrollDirection, setScrollDirection] = useState("neutral");
  const prevScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const currentScrollTop = container.scrollTop;
      if (currentScrollTop > prevScrollTop.current) {
        setScrollDirection("down");
      } else if (currentScrollTop < prevScrollTop.current) {
        setScrollDirection("up");
      } else {
        setScrollDirection("neutral");
      }
      prevScrollTop.current = currentScrollTop;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]);

  return scrollDirection;
};
