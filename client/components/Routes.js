import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUserPage, setPage } from "../redux/reducers/userPage";
import getPage from "../util/routes"
import Home from "./Home";

export default function Routes() {
  const dispatch = useDispatch();
  const { link } = useSelector(selectUserPage);
  console.log("LIBNK", link)
  return (
   getPage(link)
  );
}

