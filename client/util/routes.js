/* eslint-disable no-unused-vars */
import React from "react";
import Home from "../components/Views/Home";
import LogIn from "../components/Views/LogIn";
import FourOhFour from "../components/Views/FourOhFour";

import ARMenu from "../components/AR2DOverlay/ARMenu";
import ARScanner from "../components/AR2DOverlay/ARScanner";

export default function getPage(link) {
  switch (link) {
    case "login":
      return <LogIn />;
    case "home":
      return <Home />;
    case "scanner":
      return <ARScanner />;
    case "menu":
      return <ARMenu />;
    default:
      return <FourOhFour />;
  }
}
