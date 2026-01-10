const buttons = document.querySelectorAll(".nav");
const pages = document.querySelectorAll(".page");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    pages.forEach(p => p.classList.remove("show"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.page).classList.add("show");
  });
});
