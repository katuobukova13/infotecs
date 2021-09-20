"use strict";
import { users } from "./fetchData.js";

export let a = [];
let currentPage = 1;
let rows = 10;

//функция пагинации таблицы
export function paginationI() {
  //создание контейнера пагинации
  let pagination = document.createElement("div");
  pagination.className = "pagination";
  document.querySelector(".table").appendChild(pagination);

  //отрисовка 10 элементов таблицы на странице
  function paginateUsers(users, wrapper, rowsPerPage, page) {
    //обнуляем таблицу для каждой кнопки пагинации
    wrapper.innerHTML = null;

    //для вывода с нулевой(первой) страницы
    page--;

    //начальный и конечный индексы для кнопки пагинации
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;

    //выбор элементов для конкретной кнопки пагинации
    let paginatedUsers = users.slice(start, end);

    //отрисовка каждого элемента на страницу при пагинации
    for (let i = 0; i < paginatedUsers.length; i++) {
      let user = Object.entries(paginatedUsers[i]);

      let userInfo = document.createElement("tr");
      userInfo.innerHTML = `<td>${user[1][1].firstName}</td>
      <td>${user[1][1].lastName}</td>
      <td class="table__about--trim">${user[3][1]}</td>
      <td class="table__eyeColor--color">${user[4][1]}</td>`;

      //вставка цвета для каждого элемента в столбце "Цвет глаз" в css-переменную
      userInfo
        .querySelector(".table__eyeColor--color")
        .style.setProperty("--bg-color", `${user[4][1]}`);

      //по клику на строку отобразить информацию о юзере в форме
      userInfo.addEventListener("click", (event) => {
        displayUserInfo(event.currentTarget);
      });

      wrapper.appendChild(userInfo);
    }
  }

  //отображение кнопок пагинации
  function setupPagination(users, wrapper, rowsPerPage) {
    //количество страниц
    let pageCount = Math.ceil(users.length / rowsPerPage);

    //цикл для создания кнопок
    for (let i = 1; i < pageCount + 1; i++) {
      let btn = paginationButtons(i, users);
      wrapper.appendChild(btn);
    }
  }

  //создание кнопок
  function paginationButtons(page, users) {
    let buttonPagination = document.createElement("button");
    buttonPagination.className = "pagination__button";

    //запись номера страницы в кнопку пагинации
    buttonPagination.innerText = page;

    //если перешли на другую страницу, то ей добавляем класс активности
    if (currentPage === page) {
      buttonPagination.classList.add("pagination__button--active");
    }

    //при клике на кнопку пагинации меняем номер страницы, класс активности и отображение юзеров
    buttonPagination.addEventListener("click", () => {
      currentPage = page;
      paginateUsers(users, document.querySelector("tbody"), rows, currentPage);

      //установка активной кнопки
      let currentButton = document.querySelector(".pagination__button--active");
      currentButton.classList.remove("pagination__button--active");
      buttonPagination.classList.add("pagination__button--active");
    });

    return buttonPagination;
  }

  //вызов функций пагинации
  paginateUsers(users, document.querySelector("tbody"), rows, currentPage);
  setupPagination(users, pagination, rows);

  //переменная выделенной строки
  let selectedTd = null;

  //отобразить информацию в форме
  function displayUserInfo(row) {
    let forma = document.getElementsByTagName("form")[0];

    //если строка уже была выделена,то удалить выделение строки
    if (selectedTd) {
      selectedTd.classList.remove("checked");
    }

    //отметить строку
    selectedTd = row;
    selectedTd.classList.add("checked");

    //отображение значений строки в форме
    forma.querySelector('input[name="firstName"]').value =
      row.childNodes[0].innerText;
    forma.querySelector('input[name="lastName"]').value =
      row.childNodes[2].innerText;
    forma.querySelector('textarea[name="about"]').value =
      row.childNodes[4].innerText;
    forma.querySelector('input[name="eyeColor"]').value =
      row.childNodes[6].innerText;

    //показ формы
    forma.classList.remove("form__form--hidden");
    forma.classList.add("form__form");
  }
}
