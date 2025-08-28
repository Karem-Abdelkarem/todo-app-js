import { inputField, toggleIcon } from "./elements";
import { addTodo, deleteTodo, toggleDarkMode } from "./utils";

export const initTaskListners = () => {
  document.querySelectorAll(".task-list__delete").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      deleteTodo(index);
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
};
