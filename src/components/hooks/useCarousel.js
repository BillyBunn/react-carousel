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
    overflowLeft: 0,
    overflowRight: 0
  };

  function reducer(state, action) {
    switch (action.type) {
      case "GO_FORWARD":
        return {
          ...state,
          atEnd,
          atStart,
          distance,
          overflowLeft,
          overflowRight
        };
      case "GO_BACK":
        return {
          ...state,
          atEnd,
          atStart,
          distance,
          overflowLeft,
          overflowRight
        };
      case "SET_CONTAINER_WIDTH":
        return { ...state, containerWidth: action.payload };
      case "SET_ELEMENTS_IN_VIEWPORT":
        return { ...state, elementsInViewport: action.payload };
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
