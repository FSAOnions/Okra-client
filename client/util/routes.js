/* eslint-disable no-unused-vars */
import React from "react";
import Home from "../components/Views/Home";
import LogIn from "../components/Views/Auth/LogIn";
import FourOhFour from "../components/Views/FourOhFour";
import Signup from "../components/Views/Auth/Signup";
import ARMenu from "../components/AR2DOverlay/ARMenu";
import ARScanner from "../components/AR2DOverlay/ARScanner";
import Start from "../components/Views/Loaders/Start";
import Pending from "../components/Views/Loaders/Pending";
import ThankYou from "../components/Views/Loaders/ThankYou";
import Bill from "../components/Views/Bill";
import Settings from "../components/Views/Settings";
import Payment from "../components/Views/Payment";

import History from "../components/Views/History";

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
    case "bill":
      return <Bill />;
    case "pending":
      return <Pending />;
    case "thankyou":
      return <ThankYou />;
    case "payment":
      return <Payment />;
    case "history":
      return <History />;
    case "settings":
      return <Settings />;
    default:
      return <FourOhFour />;
  }
}
