import {
  addTaskBtn,
  clearBtn,
  filterBtns,
  inputField,
  toggleIcon,
} from "./elements";
import {
  addTodo,
  clearButton,
  deleteTodo,
  filterTodos,
  handleReorder,
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

  document.querySelectorAll(".task-list__checkbox").forEach((checkbox) => {
    checkbox.addEventListener("keydown", (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      e.key === "Enter" && toggleTodo(index);
    });
  });

  let draggedIndex = null;
  let droppedOnTaskIndex = null;

  document.querySelectorAll(".task-list").forEach((el, index) => {
    el.dataset.index = index;

    el.addEventListener("dragstart", (e) => {
      draggedIndex = e.target.dataset.index;
      e.target.classList.add("opacity-50");
    });
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    el.addEventListener("drop", (e) => {
      droppedOnTaskIndex = e.currentTarget.dataset.index;
      e.target.classList.remove("opacity-50");

      handleReorder(draggedIndex, droppedOnTaskIndex);
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
  addTaskBtn.addEventListener("click", () => addTodo());

  clearBtn.addEventListener("click", () => clearButton());

  filterBtns.forEach((button) => {
    button.addEventListener("click", () => {
      filterBtns.forEach((btn) => btn.classList.remove("text-blue-500"));
      button.classList.add("text-blue-500");
    });
  });

  filterBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      filterTodos(e);
    });
  });
};
