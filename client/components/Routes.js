/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { selectLink } from "../redux/reducers/userPage";
import route from "../util/routes";

export default function Routes() {
  return route(useSelector(selectLink));
}
