const navButtons = document.querySelectorAll(".nav");
const pages = document.querySelectorAll(".page");
const featureCards = document.querySelectorAll(".feature");

function showPage(id) {
  pages.forEach(p => p.classList.remove("show"));
  navButtons.forEach(b => b.classList.remove("active"));

  document.getElementById(id).classList.add("show");

  navButtons.forEach(b => {
    if (b.dataset.page === id) {
      b.classList.add("active");
    }
  });
}

// Sidebar navigation
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showPage(btn.dataset.page);
  });
});

// Feature cards navigation (THIS WAS MISSING)
featureCards.forEach(card => {
  card.addEventListener("click", () => {
    showPage(card.dataset.target);
  });
});
