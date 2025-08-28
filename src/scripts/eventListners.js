import { addTodo, toggleDarkMode } from "../main";
import { inputField, toggleIcon } from "./elements";

// export const initEventControllers = () => {
toggleIcon.forEach((icon) => {
  icon.addEventListener("click", toggleDarkMode);
});
// };
inputField.addEventListener("keydown", (e) => {
  e.key === "Enter" && addTodo();
});
