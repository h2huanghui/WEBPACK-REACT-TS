import { string } from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

interface Props {
  name: string;
  age: number;
}

function PrintInfo(props: Props) {
  const { name, age } = props;
  return <div>{`${name} is ${age}`}</div>;
}

export default PrintInfo;
