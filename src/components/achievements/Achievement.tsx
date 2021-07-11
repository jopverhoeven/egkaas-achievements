import React from "react";
import { BrowserRouter as Router, Switch, useParams } from "react-router-dom";

export default function Achievement(props: any) {
  // @ts-ignore
  let { id } = useParams();

  console.log(id);

  // get types from firestore

  return <div>{id}</div>;
}
