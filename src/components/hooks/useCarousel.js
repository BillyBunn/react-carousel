import { useRef, useEffect, useReducer } from "react";
import { element } from "prop-types";
const initialState = {
  atEnd: false,
  atStart: true,
  containerWidth: 0,
  distance: 0,
  elementWidth: 0,
  gapFromEnd: 0,
  gapFromStart: 0,
  maxDistance: 0,
  minDistance: 0,
  overflowLeft: 0,
  overflowRight: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD": {
      let { containerWidth, elementWidth, totalElements } = action.payload;
      let overflowRight = elementWidth - (containerWidth % elementWidth);
      let maxDistance =
        elementWidth * totalElements - (containerWidth - state.gapFromEnd);
      return {
        ...state,
        containerWidth,
        elementWidth,
        totalElements,
        overflowRight,
        maxDistance
      };
    }
    case "GO_FORWARD": {
      let {
        atEnd,
        atStart,
        containerWidth,
        distance,
        elementWidth,
        maxDistance,
        overflowLeft,
        overflowRight
      } = state;

      // can't go further if already at end
      if (atEnd) return state;

      const wholeElementsOnScreen = Math.floor(containerWidth / elementWidth);

      const distanceCalc = atStart
        ? containerWidth -
          (elementWidth - overflowRight) -
          (elementWidth - overflowRight) / 2
        : distance + wholeElementsOnScreen * elementWidth;

      // are we at the end now?
      atEnd = distanceCalc >= maxDistance;

      // travel forward as far as we can
      distance = atEnd ? maxDistance : distanceCalc;

      // how much of the rightmost card is cut off screen?
      overflowRight = atEnd
        ? 0
        : elementWidth - (containerWidth % elementWidth) / 2;

      overflowLeft = atEnd
        ? elementWidth - (containerWidth % elementWidth)
        : elementWidth - (containerWidth % elementWidth) / 2;

      return {
        ...state,
        atEnd,
        atStart: false,
        distance,
        overflowLeft,
        overflowRight
      };
    }

    case "GO_BACK": {
      let {
        atEnd,
        atStart,
        containerWidth,
        distance,
        elementWidth,
        minDistance,
        overflowLeft,
        overflowRight
      } = state;

      // can't go back if already at start
      if (atStart) return state;

      const wholeElementsOnScreen = Math.floor(containerWidth / elementWidth);

      const distanceCalc = atEnd
        ? distance -
          (containerWidth -
            (elementWidth - overflowLeft) -
            (elementWidth - overflowLeft) / 2)
        : distance - wholeElementsOnScreen * elementWidth;

      // are we back at the start now?
      atStart = distanceCalc <= minDistance;

      // travel back as far as we can
      distance = atStart ? minDistance : distanceCalc;

      overflowLeft = atStart
        ? 0
        : elementWidth - (containerWidth % elementWidth) / 2;

      overflowRight = atStart
        ? elementWidth - (containerWidth % elementWidth)
        : elementWidth - (containerWidth % elementWidth) / 2;

      return {
        ...state,
        atEnd: false,
        atStart,
        distance,
        overflowLeft,
        overflowRight
      };
    }
    case "WINDOW_RESIZE": {
      let {
        containerWidth: prevContainerWidth,
        elementWidth,
        overflowLeft,
        overflowRight,
        distance,
        atStart,
        atEnd,
        gapFromEnd,
        totalElements
      } = state;
      // change container width
      let containerWidth = action.payload;

      let maxDistance =
        elementWidth * totalElements - (containerWidth - gapFromEnd);

      if (atStart) {
        overflowRight = elementWidth - (containerWidth % elementWidth);
      } else if (atEnd) {
        distance = distance + (prevContainerWidth - containerWidth);
        overflowLeft =
          elementWidth - ((containerWidth - gapFromEnd) % elementWidth);
      } else {
        let distanceCalc = distance + (prevContainerWidth - containerWidth) / 2;

        // are we at the end now?
        atEnd = distanceCalc >= maxDistance;

        // travel forward as far as we can
        distance = atEnd ? maxDistance : distanceCalc;

        overflowRight = atEnd
          ? 0
          : elementWidth - (containerWidth % elementWidth) / 2;

        overflowLeft = atEnd
          ? elementWidth - (containerWidth % elementWidth)
          : elementWidth - (containerWidth % elementWidth) / 2;
      }
      return {
        ...state,
        containerWidth,
        overflowRight,
        overflowLeft,
        distance,
        maxDistance
      };
    }
    default:
      throw new Error();
  }
}

const useCarousel = (elementWidth, totalElements, windowSize) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const containerRef = useRef(null);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth;
    dispatch({
      type: "LOAD",
      payload: { containerWidth, elementWidth, totalElements }
    });
  }, [elementWidth, totalElements]);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth;
    dispatch({ type: "WINDOW_RESIZE", payload: containerWidth });
  }, [windowSize]);

  const slideProps = {
    style: { transform: `translate3d(-${state.distance}px, 0, 0)` }
  };

  const handlePrev = () => dispatch({ type: "GO_BACK" });
  const handleNext = () => dispatch({ type: "GO_FORWARD" });

  const hasPrev = !state.atStart;
  const hasNext = !state.atEnd;

  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
};

export default useCarousel;
