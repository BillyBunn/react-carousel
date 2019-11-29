import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "./Deck";

const CarouselItem = styled.a`
  background: #fff;
  border: 1px solid black;
  border-radius: 6px;
  color: #404040;
  display: flex;
  flex: 0 0 330px;
  flex-flow: column nowrap;
  /* max-width: 330px; */
  text-decoration: none;
  transition: transform 300ms ease 100ms;
  & + * {
    /* margin-left: 20px; */
  }
  > .image-container {
    background: #e0e0e0;
    border-radius: 6px 6px 0 0;
    height: 186px;
    margin: 0;
    img {
      /* object-fit: cover; */
      object-fit: contain;
      /* object-fit: cover; */
      height: 100%;
      width: 100%;
    }
  }
  > .card-text {
    display: flex;
    flex-flow: column nowrap;
    height: calc(298px - 186px); /* totalheight - imgheight */
    justify-content: space-between;
    padding: 16px;
    > .card-heading {
      > .card-title {
        width: calc(330px - (16px * 2)); /* width - padding x 2 */
        white-space: nowrap;
        overflow: hidden;

        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        /* margin: 0 16px; */
        margin: 0;
        text-overflow: ellipsis;
      }
      > .card-subtitle {
        /* margin: 4px 0 16px 0; */
        font-size: 16px;
        font-weight: 300;
        line-height: 20px;
        margin: 0;
      }
    }
    > .card-subtext {
      color: #757575;
      font-size: 14px;
      font-weight: 300;
      line-height: 16px;
      margin: 0;
    }
  }
`;
const Card = ({ data: { title, subtitle, baseImageUrl: mediaUrl, time } }) => {
  const { onSelectSlide, currentSlide, elementRef } = useContext(Context);
  return (
    <CarouselItem className="item" href="#" ref={elementRef}>
      <div className="image-container">
        <img src={mediaUrl} alt={title} />
      </div>
      <div className="card-text">
        <div className="card-heading">
          <h2 className="card-title">{title}</h2>
          {subtitle && <h3 className="card-subtitle">{subtitle}</h3>}
        </div>
        <p className="card-subtext">{time}</p>
      </div>
    </CarouselItem>
  );
};

export default Card;
