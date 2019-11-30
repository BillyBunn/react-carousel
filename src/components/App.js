import React from "react";
import { createGlobalStyle } from "styled-components";

import CarouselDeck from "./Carousel";
import SliderDeck from "./Slider";

import deck from "../content";

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: border-box;
}
body {
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap");
  color: #1a1a1a;
  font-family: Montserrat, sans-serif;
  margin: 0;
  box-sizing: border-box;
  h1, h3, p {
    text-align: center;
  }  
}
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <h1>React Carousels</h1>
      <h3>Better than your average carousel…</h3>
      <p>
        Aware of start/end point, behaves as expected on window resize, use any
        margin/padding on cards
      </p>
      <CarouselDeck title={deck.title} cards={deck.cards} />
      <SliderDeck title={deck.title} cards={deck.cards} />
    </div>
  );
}

export default App;
