import { useState, useRef, useEffect } from "react";

// Put the "elementRef" on an element, and this returns its width
const useElementWidth = () => {
  const elementRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);

  useEffect(() => {
    setElementWidth(elementRef.current.offsetWidth);
  }, [elementRef.current]);

  return { elementWidth, elementRef };
};

export default useElementWidth;
