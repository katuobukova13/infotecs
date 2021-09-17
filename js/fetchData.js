"use strict";
import { filledTable } from "./filledTable.js";
import { paginationI } from "./paginatePages.js";

export let users = [];

export async function fetchData() {
  let container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  let tableContainer = document.createElement("div");
  tableContainer.className = "table--container";
  container.appendChild(tableContainer);

  let tableShowColumn = document.createElement("div");
  tableShowColumn.className = "table--show";
  tableContainer.appendChild(tableShowColumn);

  try {
    let answer = await fetch("../info.json").then((res) => res.json());
    users = answer;
    filledTable();
    paginationI();
    //displayColumn();
  } catch (err) {
    console.log(err);
  }
}
