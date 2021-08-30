/* eslint-disable no-unused-vars */
import React from "react";
import Home from "../components/Views/Home";
import LogIn from "../components/Views/LogIn";
import FourOhFour from "../components/Views/FourOhFour";
import Signup from "../components/Views/Signup";
import ARMenu from "../components/AR2DOverlay/ARMenu";
import ARScanner from "../components/AR2DOverlay/ARScanner";
import Start from "../components/Views/Start";
import Settings from "../components/Views/Settings";
import Pending from "../components/Views/Pending";

export default function getPage(link) {
  switch (link) {
    case "login":
      return <LogIn />;
    case "signup":
      return <Signup />;
    case "home":
      return <Home />;
    case "scanner":
      return <ARScanner />;
    case "menu":
      return <ARMenu />;
    case "start":
      return <Start />;
    case "settings":
      return <Settings />;
    case "pending":
      return <Pending />;
    default:
      return <FourOhFour />;
  }
}
