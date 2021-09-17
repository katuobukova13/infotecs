"use strict";

export function displayColumn(th, tb) {
  const listOfColumn = document.querySelectorAll("input[type=checkbox]");
  console.log(th, tb);

  listOfColumn.forEach((element) =>
    element.addEventListener("click", () => {
      if (element.hasAttribute("checked")) {
        element.removeAttribute("checked");

        th[element.id].classList.add("hide-column");
        for (let i = 0; i < tb.length; i++) {
          tb[i].cells[element.id].classList.add("hide-column");
        }
      } else {
        element.setAttribute("checked", "checked");
        th[element.id].classList.remove("hide-column");
        for (let i = 0; i < tb.length; i++) {
          tb[i].cells[element.id].classList.remove("hide-column");
        }
      }
    })
  );
}
