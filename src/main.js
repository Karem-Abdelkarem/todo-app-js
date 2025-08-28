const toggleIcon = document.querySelectorAll(".toggle-icon");
const htmlElement = document.querySelector("#root");
console.log(htmlElement);

toggleIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");
    console.log("clicked");
  });
});

/*
    TODO
    [ ]addTasks
    [ ]toggleTasks
    [ ]deleteTasks
    [ ]sortingTasks
    [ ]deleteCompletedTasks
    [x]toggleDarkMode
    [ ]dragAndDropTasks
    [ ]updateUI
    [ ]initApp
    [ ]renderTodos
    [ ]filterTodos
    [ ]reorderTodos
*/
