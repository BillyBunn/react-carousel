import React from "react";
import { createGlobalStyle } from "styled-components";

import CarouselBlock from "./Carousel";
import SliderBlock from "./Slider";

import block from "../content";

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
        Made with hooks, aware of start/end breaks, use any spacing between
        cards
      </p>
      <CarouselBlock title={block.title} tiles={block.tiles} />
      <SliderBlock title={block.title} tiles={block.tiles} />
    </div>
  );
}

export default App;
