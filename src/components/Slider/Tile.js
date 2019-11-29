import React from "react";
import styled from "styled-components";

const SliderTile = styled.a`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  color: #404040;
  display: flex;
  flex: 0 0 330px;
  flex-flow: column nowrap;
  /* max-width: 330px; */
  text-decoration: none;
  transition: transform 300ms ease 100ms;
  & + * {
    margin-left: 20px;
  }
  > div.image-container {
    background: #e0e0e0;
    border-radius: 6px 6px 0 0;
    height: 186px;
    margin: 0;
    img {
      width: 100%;
    }
  }
  > div.card-text {
    display: flex;
    flex-flow: column nowrap;
    height: calc(298px - 186px); /* totalheight - imgheight */
    justify-content: space-between;
    padding: 16px;
    > div.card-heading {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      > h2 {
        //    width: calc(330px - (16px * 2)); /* width - padding x 2 */
        //    white-space: nowrap;
        //    overflow: hidden;

        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        /* margin: 0 16px; */
        margin: 0;
        text-overflow: ellipsis;
      }
      > h3 {
        /* margin: 4px 0 16px 0; */
        margin: 0;
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 300;
        line-height: 20px;
      }
    }
    > p {
      color: #757575;
      font-size: 14px;
      font-weight: 300;
      line-height: 16px;
      margin: 0;
    }
  }
`;
const Tile = ({ data: { title, subtitle, image, time } }) => {
  return (
    <SliderTile className="item" href="#">
      <div className="image-container">
        {/* <img src={image} alt={title} /> */}
      </div>
      <div className="card-text">
        <div className="card-heading">
          <h2>{subtitle ? `${title} with ${subtitle}` : title}</h2>
          {/* {subtitle && <h3>{subtitle}</h3>} */}
        </div>
        <p>{time}</p>
      </div>
    </SliderTile>
  );
};

export default Tile;
