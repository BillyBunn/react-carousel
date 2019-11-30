import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// TODO: Account for given gap at end of carousel
// - i.e., end carousel with last element in middle of container)
// TODO: Account for given gap at beginning of carousel (before first item)
// TODO: Add wholeELementsOnPage to values given by hook
// TODO: Throw warning/error if element width is greater than container width
// TODO: Prop-types validation
// TODO: Basic API locked-in
// TODO: Publish on NPM and share!
