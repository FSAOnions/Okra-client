/* eslint-disable no-unused-vars */
import React from "react";
import FourOhFour from "../FourOhFour";
import Home from "../Home";
import Menu from "../ARMenu";

export default function getPage(link) {
  switch (link) {
    case "home":
      return <Home />;
    case "menu":
      return <Menu />;
    default:
      return <FourOhFour />;
  }
}
