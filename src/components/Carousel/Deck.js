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
const Info = styled.div`
  ul {
    display: flex;
    list-style: none;
    justify-content: space-evenly;
    margin: 0px auto;
    max-width: 700px;
    padding: 0;
    li {
      --bd-radius: 8px;
      background: #ebebeb;
      border-radius: var(--bd-radius);
      color: #a1a1a1;
      font-weight: 600;
      padding: 8px 14px;
      text-transform: uppercase;
      &.distance {
        color: #000;
        min-width: 183px;
      }
      &.at-start {
        background: limegreen;
        background-image: linear-gradient(green, lime);
        box-shadow: 0px 1px 4px -2px #333;
        color: #fff;
        position: relative;
        text-shadow: 0px -1px #333;
        &:after {
          background: linear-gradient(
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.2)
          );
          border-radius: var(--bd-radius) var(--bd-radius) 0 0;
          content: "";
          height: 50%;
          left: 2px;
          position: absolute;
          top: 2px;
          width: calc(100% - 4px);
        }
      }
      &.at-end {
        background: limegreen;
        background-image: linear-gradient(tomato, orangered);
        box-shadow: 0px 1px 4px -2px #333;
        color: #fff;
        position: relative;
        text-shadow: 0px -1px #333;
        &:after {
          background: linear-gradient(
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.2)
          );
          border-radius: var(--bd-radius) var(--bd-radius) 0 0;
          content: "";
          height: 50%;
          left: 2px;
          position: absolute;
          top: 2px;
          width: calc(100% - 4px);
        }
      }
    }
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
    atEnd,
    atStart,
    distance
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
      <Info>
        <ul>
          <li className={atStart && "at-start"}>At Start</li>
          <li className="distance">Distance: {distance}px</li>
          <li className={atEnd && "at-end"}>At End</li>
        </ul>
      </Info>
      <h2>{title}</h2>
      <Carousel className="deck">
        <div ref={containerRef} {...slideProps}>
          {tiles.map((tile, i) => (
            <Card data={tile} key={i} />
          ))}
        </div>
        {!atStart && (
          <Button onClick={handlePrev} type="prev">
            prev
          </Button>
        )}
        {!atEnd && (
          <Button onClick={handleNext} type="next">
            next
          </Button>
        )}
      </Carousel>
    </Context.Provider>
  );
};

export default Deck;
