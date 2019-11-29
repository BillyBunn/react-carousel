import React, { useState } from "react";
import styled from "styled-components";

import useWindowSize from "../hooks/useWindowSize";
import useElementWidth from "../hooks/useElementWidth";
import useCarousel from "../hooks/useCarousel";
import Button from "./Button";
import Card from "./Card";

export const Context = React.createContext();

const Carousel = styled.div`
  /* background: papayawhip; */
  display: flex;
  overflow: hidden;
  position: relative;
  &:hover {
    > button {
      background: linear-gradient(
        90deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
      opacity: 1;
    }
  }
  > div {
    display: flex;
    /* padding: 0 55px; */
    transition: transform 300ms ease 100ms;
    z-index: 3;
    width: 100%;
  }
`;
const Deck = ({ title, tiles, activeSlide }) => {
  const windowSize = useWindowSize();
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const { elementWidth, elementRef } = useElementWidth();
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev
  } = useCarousel(elementWidth, tiles.length, windowSize.width);

  const handleSelect = movie => {
    setCurrentSlide(movie);
  };

  const handleClose = () => {
    setCurrentSlide(null);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide
  };

  return (
    <Context.Provider value={contextValue}>
      <h2>{title}</h2>
      <Carousel className="deck">
        <div ref={containerRef} {...slideProps}>
          {tiles.map((tile, i) => (
            <Card data={tile} key={i} />
          ))}
        </div>
        {hasPrev && (
          <Button onClick={handlePrev} type="prev">
            prev
          </Button>
        )}
        {hasNext && (
          <Button onClick={handleNext} type="next">
            next
          </Button>
        )}
      </Carousel>
    </Context.Provider>
  );
};

export default Deck;
