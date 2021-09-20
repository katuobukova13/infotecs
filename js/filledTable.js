"use strict";

//сортировка столбцов таблицы
function sortTable(column, table, asc = true) {
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  const sortDirection = asc ? 1 : -1;

  //сортирует значения ячеек столбца
  const sortRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? sortDirection : -sortDirection;
  });

  //удаление ячеек предыдущей разметки
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  //вставка отсортированных ячеек столбца
  tBody.append(...sortRows);

  //установка значка сортировки на столбец
  table
    .querySelectorAll("th")
    .forEach((th) =>
      th.classList.remove("table__title--asc", "table__title--desc")
    );
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("table__title--asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("table__title--desc", !asc);
}

//создание контейнера-дива для формы
function createContainerForForm() {
  let containerForm = document.createElement("div");
  containerForm.classList.add("form");
  document.querySelector(".container").appendChild(containerForm);
}

//создание скрытой формы для ее отображения по первому клику на одну из строк таблицы
function displayForm() {
  let changeForm = document.createElement("form");
  changeForm.classList.add("form__form--hidden");

  changeForm.innerHTML = `<div class="form__field">
  <label> Имя: <input type="text" name="firstName" value=""></label>
  </div>
  <div class="form__field">
  <label> Фамилия: <input type="text" name="lastName" value="" > </label>
  </div>
  <div class="form__field">
  <label> Описание: <textarea name="about" value=""> </textarea></label>
  </div>
  <div class="form__field">
  <label> Цвет глаз: <input type="text" name="eyeColor" value=""> </label>
  </div>
  <div class="form__field">
  <button class="form__button"> Изменить </button>
</div>
`;

  //скрыть форму до клика по строке таблицы
  let containerForm = document.querySelector(".form");
  containerForm.appendChild(changeForm);

  let btn = document.querySelector(".form__button");

  //по клику на кнопку формы(изменить) меняется информация в таблице
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    editInfo();
  });
}

//запись информации выбранного столбца таблице, которое было изменено в форме
function editInfo() {
  const user = document.querySelector(".checked");
  let changeInfoForm = document.getElementsByTagName("form")[0];

  //отражаем измененные ячейки строки из формы
  user.querySelector(`td:nth-child(1)`).innerText =
    changeInfoForm.querySelector('input[name="firstName"]').value;
  user.querySelector(`td:nth-child(2)`).innerText =
    changeInfoForm.querySelector('input[name="lastName"]').value;
  user.querySelector(`td:nth-child(3)`).innerText =
    changeInfoForm.querySelector('textarea[name="about"]').value;
  user.querySelector(`td:nth-child(4)`).innerText =
    changeInfoForm.querySelector('input[name="eyeColor"]').value;
}

//создание и заполнение таблицы
export function filledTable() {
  let tableContainer = document.querySelector(".table");

  //создание таблицы
  let table = document.createElement("table");
  table.className = "table__table";
  tableContainer.appendChild(table);

  //создание полей заголовков таблицы
  let tableHeader = document.createElement("thead");
  tableHeader.innerHTML = `<tr class="table__titles">
  <th class="table__title">Имя</th>
  <th class="table__title">Фамилия</th>
  <th class="table__title">Описание</th>
  <th class="table__title">Цвет глаз</th>
  </tr>`;
  table.appendChild(tableHeader);

  //создание тела таблицы
  let tableBody = document.createElement("tbody");
  tableBody.className = "table__titles";
  table.appendChild(tableBody);

  //вешаем на клик по заголовкам таблицы событие сортировки колонки
  document.querySelectorAll("thead th").forEach((th) =>
    th.addEventListener("click", (event) => {
      //выбор элемента таблицы
      const tElement = th.parentElement.parentElement.parentElement;

      //индекс колонки
      const headerIndex = Array.prototype.indexOf.call(
        th.parentElement.children,
        th
      );

      //содержит ли колонка класс table__title--asc(направление сортировки)
      const currentIsASC = th.classList.contains("table__title--asc");

      //вызов сортировки
      sortTable(headerIndex, tElement, !currentIsASC);
    })
  );

  //создание пустого дива для формы
  createContainerForForm();

  //отображение формы
  displayForm();
}
