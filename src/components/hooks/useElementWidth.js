import { useState, useRef, useEffect } from "react";

// Put the "elementRef" on an element, and this returns its width
const useElementWidth = () => {
  const elementRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);

  useEffect(() => {
    setElementWidth(outerWidth(elementRef.current));
  }, []);

  return { elementWidth, elementRef };
};

export default useElementWidth;

// http://youmightnotneedjquery.com/#outer_width_with_margin
function outerWidth(el) {
  var width = el.offsetWidth;
  var style = getComputedStyle(el);

  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
