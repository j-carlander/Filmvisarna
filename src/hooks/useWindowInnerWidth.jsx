/**
 * Hook for getting the inner width of the window. Used to check if
 * on desktop or mobile.
 */

import { useEffect, useState } from "react";

export function useWindowInnerWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}
