/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { selectUserPage } from "../redux/reducers/userPage";
import route from "../util/routes";

export default function Routes() {
  const { link } = useSelector(selectUserPage);
  return route(link);
}
