import { clearBtn, inputField, toggleIcon } from "./elements";
import {
  addTodo,
  clearButton,
  deleteTodo,
  toggleDarkMode,
  toggleTodo,
} from "./utils";

export const initTaskListners = () => {
  document.querySelectorAll(".task-list__delete").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      deleteTodo(index);
    });
  });

  document.querySelectorAll(".task-list__checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      toggleTodo(index);
    });
  });
};

export const initEventControllers = () => {
  toggleIcon.forEach((icon) => {
    icon.addEventListener("click", toggleDarkMode);
  });

  inputField.addEventListener("keydown", (e) => {
    e.key === "Enter" && addTodo();
  });

  clearBtn.addEventListener("click", () => clearButton());
};
