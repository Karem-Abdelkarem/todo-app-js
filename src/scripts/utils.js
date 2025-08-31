import { appElement, countElement, inputField, ulElement } from "./elements";
import { initTaskListners } from "./eventListners";

export const toggleDarkMode = () => {
  appElement.classList.toggle("dark");
  const isDark = appElement.classList.contains("dark");
  saveTodoInDB("darkTheme", isDark);
};

const fetchFromDB = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const saveTodoInDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteTodo = (index) => {
  const question = confirm("Are you sure you want to delete this task?");
  if (!question) return;

  const tasks = fetchFromDB("tasks") || [];
  tasks.splice(index, 1);
  saveTodoInDB("tasks", tasks);
  renderTodos(tasks);
};

export const toggleTodo = (index) => {
  const tasks = fetchFromDB("tasks") || [];
  tasks[index].isCompleted = !tasks[index].isCompleted;

  saveTodoInDB("tasks", tasks);
  renderTodos(tasks);
};

export const addTodo = () => {
  const inputValue = inputField.value.trim();

  if (!inputValue) {
    alert("Please Enter a task");
    return;
  }

  const newTodo = {
    text: inputValue,
    isCompleted: false,
    id: Date.now(),
  };

  const tasks = fetchFromDB("tasks") || [];
  tasks.unshift(newTodo);

  saveTodoInDB("tasks", tasks);
  renderTodos(tasks);
  inputField.value = "";
  inputField.focus();
};

const renderTodos = (tasks) => {
  if (tasks.length === 0) {
    ulElement.innerHTML = `
        <li class="text-center text-gray-600 font-medium text-sm my-2">
          <img class="h-44 grayscale-100 opacity-50 mx-auto pt-2" src="/assets/icon-empty.svg"
            alt="empty state">
          <p>Add your first task above!</p>
        </li>
    `;
    return;
  }

  let tasksList = "";

  tasks.forEach((task) => {
    const index = tasks.findIndex((t) => t.id === task.id);

    tasksList += `
    <li draggable="true" class="task-list flex items-center gap-4 py-3 px-5 border-b border-gray-300 group dark:border-purple-800 cursor-grab">
          <div
            class="task-list__checkbox ${
              task.isCompleted
                ? "bg-linear-to-br from-linear-from to-linear-to"
                : ""
            } flex items-center rounded-full border-2 border-gray-300 p-1 cursor-pointer group-hover:border-linear-to transition-all dark:border-purple-800" role="button" tabindex="0" data-index="${index}">
            <svg class="checkbox-img stroke-white dark:stroke-navy-900 fill-none stroke-2 w-[10px] h-[10px]"
              xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path d="M1 4.304L3.696 7l6-6" />
            </svg>
          </div>
          <p class="${
            task.isCompleted
              ? "line-through text-gray-300 dark:text-purple-600"
              : ""
          } text-sm flex-1 dark:text-purple-300 dark:hover:text-purple-100">${
      task.text
    }</p>
          <img class="task-list__delete w-4 h-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            src="./assets/icon-cross.svg" alt="delete icon" data-index="${index}">
        </li>
  `;
    ulElement.innerHTML = tasksList;
  });
  initTaskListners();
  getCounts();
};

const getCounts = () => {
  const tasks = fetchFromDB("tasks");
  const activeCount = tasks.filter((task) => !task.isCompleted).length;

  countElement.textContent = `${activeCount} items left`;
};

export const clearButton = () => {
  const tasks = fetchFromDB("tasks");
  const activeTodo = tasks.filter((task) => !task.isCompleted);
  saveTodoInDB("tasks", activeTodo);
  renderTodos(tasks);
};

export const filterTodos = (e) => {
  const tasks = fetchFromDB("tasks");
  const currentFilter = e.target.dataset.value;
  if (currentFilter === "Active") {
    const activeTodo = tasks.filter((task) => !task.isCompleted);
    renderTodos(activeTodo);
  } else if (currentFilter === "Completed") {
    const completedTodo = tasks.filter((task) => task.isCompleted);
    renderTodos(completedTodo);
  } else if (currentFilter === "All") {
    renderTodos(tasks);
  }
};

export const handleReorder = (fromIndex, toIndex) => {
  fromIndex = Number(fromIndex);
  toIndex = Number(toIndex);

  const tasks = fetchFromDB("tasks") || [];
  const draggedTask = tasks[fromIndex];

  tasks.splice(fromIndex, 1);
  tasks.splice(toIndex, 0, draggedTask);

  saveTodoInDB("tasks", tasks);
  renderTodos(tasks);
};

export const initApp = () => {
  fetchFromDB("darkTheme") && toggleDarkMode();
  const tasks = fetchFromDB("tasks");
  renderTodos(tasks);
};
