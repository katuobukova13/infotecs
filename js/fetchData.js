"use strict";
import { filledTable } from "./filledTable.js";
import { paginationI } from "./paginatePages.js";

//передача ответа с сервера в другие файлы
export let users = [];

//запрос данных с JSON и создание общего контейнера и контейнера таблицы
export async function fetchData() {
  //создание общего контейнера
  let container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  //создание контейнера таблицы
  let tableContainer = document.createElement("div");
  tableContainer.className = "table";
  container.appendChild(tableContainer);

  //запрос на сервер, в случае успеха - заполнение таблицы и разбивка на пагинацию
  try {
    let answer = await fetch("../info.json").then((res) => res.json());
    users = answer;
    filledTable();
    paginationI();
  } catch (err) {
    console.log(err);
  }
}
