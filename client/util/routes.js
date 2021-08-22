import React from "react";
import FourOhFour from "../components/FourOhFour";
import Home from "../components/Home";
import LogIn from "../components/LogIn";
import Menu from "../components/ARMenu";
import ARScanner from "../components/ARScanner";

export default function getPage(link) {
  switch (link) {
    case "home":
      return <Home />;
    case "menu":
      return <Menu />;
    case "login":
      return <LogIn />;
    case "scanner":
      return <ARScanner />;
    default:
      return <FourOhFour />;
  }
}
