"use strict";
import { users } from "./fetchData.js";

export function paginationI() {
  let pagination = document.createElement("div");
  pagination.className = "pagination";
  document.querySelector(".table--container").appendChild(pagination);

  let currentPage = 1;
  let rows = 10;

  console.log(users);

  function paginateUsers(users, wrapper, rowsPerPage, page) {
    wrapper.innerHTML = null;
    page--;

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;

    let paginatedUsers = users.slice(start, end);

    for (let i = 0; i < paginatedUsers.length; i++) {
      let user = Object.entries(paginatedUsers[i]);

      let userInfo = document.createElement("tr");
      userInfo.innerHTML = `<td>${user[1][1].firstName}</td>
      <td>${user[1][1].lastName}</td>
      <td class="table__about-trim">${user[3][1]}</td>
      <td class="table__eyeColor-color">${user[4][1]}</td>`;

      userInfo
        .querySelector(".table__eyeColor-color")
        .style.setProperty("--bg-color", `${user[4][1]}`);

      userInfo.addEventListener("click", (event) => {
        displayUserInfo(event.currentTarget);
      });

      wrapper.appendChild(userInfo);
    }
  }

  function setupPagination(users, wrapper, rowsPerPage) {
    wrapper.innerHTML = "";

    let pageCount = Math.ceil(users.length / rowsPerPage);

    for (let i = 1; i < pageCount + 1; i++) {
      let btn = paginationButtons(i, users);
      wrapper.appendChild(btn);
    }
  }

  function paginationButtons(page, users) {
    let buttonPagination = document.createElement("button");
    buttonPagination.className = "button-pagination";
    buttonPagination.innerText = page;

    if (currentPage === page) {
      buttonPagination.classList.add("active");
    }

    buttonPagination.addEventListener("click", () => {
      currentPage = page;
      paginateUsers(users, document.querySelector("tbody"), rows, currentPage);

      let currentButton = document.querySelector(".active");
      currentButton.classList.remove("active");

      buttonPagination.classList.add("active");
    });
    return buttonPagination;
  }

  paginateUsers(users, document.querySelector("tbody"), rows, currentPage);
  setupPagination(users, pagination, rows);

  let selectedTd = null;

  function displayUserInfo(row) {
    let forma = document.getElementsByTagName("form")[0];

    if (selectedTd) {
      selectedTd.classList.remove("checked");
      forma.classList.toggle("form--hidden");
    }

    selectedTd = row;
    selectedTd.classList.add("checked");

    forma.querySelector('input[name="firstName"]').value =
      row.childNodes[0].innerText;
    forma.querySelector('input[name="lastName"]').value =
      row.childNodes[2].innerText;
    forma.querySelector('textarea[name="about"]').value =
      row.childNodes[4].innerText;
    forma.querySelector('input[name="eyeColor"]').value =
      row.childNodes[6].innerText;
    forma.classList.remove("form--hidden");
    forma.classList.add("form");
  }
}
