"use strict";

//сортировка столбцов таблицы
function sortTable(column, table, asc = true) {
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  const sortDirection = asc ? 1 : -1;

  const sortRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? sortDirection : -sortDirection;
  });
  console.log(sortRows);

  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  tBody.append(...sortRows);

  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-asc", "th-desc"));
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-desc", !asc);
}

//создание контейнера-дива для формы
function createContainerForForm() {
  let containerForm = document.createElement("div");
  containerForm.classList.add("form--container");
  document.querySelector(".container").appendChild(containerForm);
}

//создание скрытой формы для ее отображения по первому клику на одну из строк таблицы
function displayForm() {
  let changeForm = document.createElement("form");
  changeForm.innerHTML = `<div class="field">
  <label> Имя: <input type="text" name="firstName" value=""></label>
  </div>
  <div class="field">
  <label> Фамилия: <input type="text" name="lastName" value="" > </label>
  </div>
  <div class="field">
  <label> Описание: <textarea name="about" value=""> </textarea></label>
  </div>
  <div class="field">
  <label> Цвет глаз: <input type="text" name="eyeColor" value=""> </label>
  </div>
  <div class="field">
  <button class="button"> Изменить </button>
</div>
`;
  let containerForm = document.querySelector(".form--container");
  containerForm.appendChild(changeForm);
  changeForm.classList.add("form--hidden");

  let b = document.getElementsByTagName("button")[0];

  b.addEventListener("click", (event) => {
    event.preventDefault();
    editInfo();
  });
}

//запись информации выбранного столбца таблице, которое было изменено в форме
function editInfo() {
  const user = document.querySelector(".checked");
  let changeInfoForm = document.getElementsByTagName("form")[0];

  user.querySelector(`td:nth-child(1)`).innerText =
    changeInfoForm.querySelector('input[name="firstName"]').value;
  user.querySelector(`td:nth-child(2)`).innerText =
    changeInfoForm.querySelector('input[name="lastName"]').value;
  user.querySelector(`td:nth-child(3)`).innerText =
    changeInfoForm.querySelector('textarea[name="about"]').value;
  user.querySelector(`td:nth-child(4)`).innerText =
    changeInfoForm.querySelector('input[name="eyeColor"]').value;
}

export function filledTable() {
  let tableContainer = document.querySelector(".table--container");

  //создание таблицы
  let table = document.createElement("table");
  table.className = "table";
  tableContainer.appendChild(table);

  //создание полей заголовков таблицы
  let tableHeader = document.createElement("thead");
  tableHeader.innerHTML = `<tr class="table__titles">
  <th class="table__firstName">Имя</th>
  <th class="table__lastName">Фамилия</th>
  <th class="table__about">Описание</th>
  <th class="table__eyeColor">Цвет глаз</th>
  </tr>`;
  table.appendChild(tableHeader);

  //создание чекбоксов для колонок по их названиям
  for (let i = 0; i < document.querySelectorAll("thead th").length; i++) {
    let tableShowColumns = document.createElement("div");
    tableShowColumns.className = "table__showcolumn";
    tableShowColumns.innerHTML = `<label>${
      document.querySelectorAll("thead th")[i].innerText
    }<input type="checkbox" id=${i} name="${
      document.querySelectorAll("thead th")[i].innerText
    }"checked></label>`;

    tableContainer.insertBefore(tableShowColumns, table);
  }

  //создание тела таблицы
  let tableBody = document.createElement("tbody");
  tableBody.innerHTML = `<tbody class="table__titles">
  </tbody>`;
  table.appendChild(tableBody);

  //вешаем на клик по заголовкам таблицы событие сортировки колонки
  document.querySelectorAll("thead th").forEach((th) =>
    th.addEventListener("click", (event) => {
      const tElement = th.parentElement.parentElement.parentElement;
      const headerIndex = Array.prototype.indexOf.call(
        th.parentElement.children,
        th
      );
      const currentIsASC = th.classList.contains("th-asc");

      sortTable(headerIndex, tElement, !currentIsASC);
    })
  );

  //создание пустого дива для формы
  createContainerForForm();

  //отображение формы
  displayForm();
}
