import { useState, useRef, useEffect, useReducer } from "react";

const useCarousel = (elementWidth, totalElements, windowSize) => {
  const initialState = {
    atEnd: false,
    atStart: true,
    containerWidth: 0,
    distance: 0,
    elementsInViewport: 0,
    gapFromEnd: 0,
    gapFromStart: 0,
    maxDistance: 0,
    minDistance: 0,
    overflowLeft: 0,
    overflowRight: 0
  };

  function reducer(state, action) {
    switch (action.type) {
      case "GO_FORWARD": {
        let {
          atEnd,
          containerWidth,
          distance,
          gapFromEnd,
          maxDistance,
          overflowLeft,
          overflowRight
        } = state;

        // can't go further if already at end
        if (atEnd) return state;

        // prev distance + width of carousel
        const distanceCalc =
          distance +
          containerWidth +
          overflowRight -
          (elementWidth + elementWidth / 2);

        // are we at the end now?
        atEnd = distanceCalc >= maxDistance;

        // travel forward as far as we can
        distance = atEnd ? maxDistance : distanceCalc;

        // how much of the rightmost card is cut off screen?
        overflowRight = atEnd
          ? 0
          : elementWidth - ((containerWidth - elementWidth / 2) % elementWidth);

        // how much of the leftmost card is cut off screen?
        overflowLeft = atEnd
          ? elementWidth - ((containerWidth - gapFromEnd) % elementWidth)
          : elementWidth / 2;

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
          atStart,
          containerWidth,
          distance,
          gapFromStart,
          minDistance,
          overflowLeft,
          overflowRight
        } = state;

        // can't go back if already at start
        if (atStart) return state;

        // prev distance - width of carousel
        const distanceCalc =
          distance -
          containerWidth +
          overflowLeft -
          (elementWidth + elementWidth / 2);

        // are we back at the start now?
        atStart = distanceCalc <= minDistance;

        // travel back as far as we can
        distance = atStart ? minDistance : distanceCalc;

        // how much of the leftmost card is cut off screen?
        overflowLeft = atStart
          ? 0
          : elementWidth - ((containerWidth - elementWidth / 2) % elementWidth);

        // how much of the rightmost card is cut off screen?
        overflowRight = atStart
          ? elementWidth - ((containerWidth - gapFromStart) % elementWidth)
          : elementWidth / 2;

        return {
          ...state,
          atEnd: false,
          atStart,
          distance,
          overflowLeft,
          overflowRight
        };
      }
      case "SET_CONTAINER_WIDTH":
        return { ...state, containerWidth: action.payload };
      case "SET_ELEMENTS_IN_VIEWPORT":
        return { ...state, elementsInViewport: action.payload };
      case "SET_MAX_DISTANCE": {
        let { elementWidth, totalElements } = action.payload;
        let { gapFromEnd } = state;
        let maxDistance =
          elementWidth * totalElements - (containerWidth - gapFromEnd);
        return { ...state, maxDistance };
      }
      default:
        throw new Error();
    }
  }

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [elementsInViewport, setElementsInViewport] = useState(0);
  const [viewedElements, setViewedElements] = useState(0);

  const [overflowRight, setOverflowRight] = useState(0);
  const [overflowLeft, setOverflowLeft] = useState(0);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth;
    setContainerWidth(containerWidth);
    setElementsInViewport(Math.floor(containerWidth / elementWidth));
  }, [windowSize, elementWidth]);

  useEffect(() => {
    if (overflowLeft) {
      setOverflowRight(
        elementWidth - (containerWidth % elementWidth) + overflowLeft
      );
    } else {
      setOverflowRight(elementWidth - (containerWidth % elementWidth));
    }
  }, [elementWidth, containerWidth]);

  const handlePrev = () => {
    const gapFromStart = 0;
    const minDistance = 0;
    const distanceCalc =
      distance -
      containerWidth +
      overflowLeft -
      (elementWidth + elementWidth / 2);

    const atStart = distanceCalc <= minDistance;
    const newDistance = atStart ? minDistance : distanceCalc;
    setDistance(newDistance);
    setOverflowLeft(
      atStart
        ? 0
        : elementWidth - ((containerWidth - elementWidth / 2) % elementWidth)
    );
    setOverflowRight(
      atStart
        ? elementWidth - ((containerWidth - gapFromStart) % elementWidth)
        : elementWidth / 2
    );
  };

  const handleNext = () => {
    const gapFromEnd = 40; // in px
    const maxDistance =
      elementWidth * totalElements - (containerWidth - gapFromEnd);
    const distanceCalc =
      distance +
      containerWidth +
      overflowRight -
      (elementWidth + elementWidth / 2);

    const atEnd = distanceCalc >= maxDistance;
    const newDistance = atEnd ? maxDistance : distanceCalc;
    setDistance(newDistance);
    setOverflowRight(
      atEnd
        ? 0
        : elementWidth - ((containerWidth - elementWidth / 2) % elementWidth)
    );
    setOverflowLeft(
      atEnd
        ? elementWidth - ((containerWidth - gapFromEnd) % elementWidth)
        : elementWidth / 2
    );
  };

  const slideProps = {
    style: { transform: `translate3d(-${distance}px, 0, 0)` }
  };

  const hasPrev = !!overflowLeft;
  const hasNext = !!overflowRight;

  // console.log("containerWidth", containerWidth);
  // console.log("distance", distance);
  // console.log("elementsInViewport", elementsInViewport);
  // console.log("viewedElements", viewedElements);
  console.log("RIGHT", overflowRight);
  console.log("LEFT", overflowLeft);
  console.log("elementWidth", elementWidth);
  // console.log(containerWidth % elementWidth, elementWidth / 2);

  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
};

export default useCarousel;
