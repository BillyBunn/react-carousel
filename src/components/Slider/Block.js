import React from "react";
import styled from "styled-components";
import SliderCard from "./Tile";

const SliderBlock = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
`;
const Block = ({ title, cards }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      <h2>{title}</h2>
      <SliderBlock className="deck">
        {cards.map((tile, i) => (
          <SliderCard data={tile} key={i} />
        ))}
      </SliderBlock>
    </div>
  );
};

export default Block;
