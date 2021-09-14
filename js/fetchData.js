"use strict";
import { filledTable } from "./filledTable.js";

export async function fetchData() {
  try {
    let answer = await fetch("../info.json").then((res) => res.json());
    filledTable(answer);
  } catch (err) {
    console.log(err);
  }
}
