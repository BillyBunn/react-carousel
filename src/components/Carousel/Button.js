import React from "react";
import styled from "styled-components";
const StyledButton = styled.button`
  ${({ type }) =>
    type === "next"
      ? `
        right: 0;
        transform: rotateZ(180deg);
       `
      : `
        left: 0;
        // transform: rotateZ(180deg);
        `}
  background: transparent;
  border: none;
  bottom: 0;
  cursor: pointer;
  opacity: 0;
  outline: none;
  position: absolute;
  top: 0;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
  z-index: 4;

  > img {
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    height: 60px;
    width: 60px;
  }
`;

const CarouselButton = ({ onClick, type, children }) => (
  <StyledButton type={type} className={type} onClick={onClick}>
    <img src="/images/arrow_14x24.svg" alt={`${type} arrow symbol`} />
  </StyledButton>
);

export default CarouselButton;
