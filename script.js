/* NAVIGATION */
const navButtons = document.querySelectorAll(".nav[data-page]");
const pages = document.querySelectorAll(".page");
const featureCards = document.querySelectorAll(".feature");

function showPage(id) {
  pages.forEach(p => p.classList.remove("show"));
  navButtons.forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("show");
  navButtons.forEach(b => b.dataset.page === id && b.classList.add("active"));
}

navButtons.forEach(btn =>
  btn.addEventListener("click", () => showPage(btn.dataset.page))
);

featureCards.forEach(card =>
  card.addEventListener("click", () => showPage(card.dataset.target))
);

/* DARK MODE */
const themeToggle = document.getElementById("themeToggle");
if (localStorage.theme === "dark") document.body.classList.add("dark");

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark") ? "dark" : "light";
};

/* DATA */
let data = JSON.parse(localStorage.getItem("healthData")) || [];
let goal = localStorage.getItem("goal") || null;
let view = "daily";

const ctx = document.getElementById("stepsChart");
let chart;

/* FORM */
healthForm.onsubmit = e => {
  e.preventDefault();
  data.push({
    date: date.value,
    steps: +steps.value,
    weight: +weight.value
  });
  localStorage.setItem("healthData", JSON.stringify(data));
  updateUI();
  healthForm.reset();
};

/* VIEW TOGGLE */
document.querySelectorAll(".view").forEach(btn =>
  btn.onclick = () => {
    document.querySelectorAll(".view").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    view = btn.dataset.view;
    updateUI();
  }
);

/* UI UPDATE */
function updateUI() {
  records.innerHTML = "";
  data.forEach(d =>
    records.innerHTML += `<tr><td>${d.date}</td><td>${d.steps}</td><td>${d.weight}</td></tr>`
  );

  avgSteps.textContent = average(data.map(d => d.steps));
  avgWeight.textContent = average(data.map(d => d.weight));

  insightText.textContent =
    goal && avgSteps.textContent < goal
      ? "You're below your step goal. Try moving more 🚶"
      : "Great job! You're meeting your goals 🎉";

  drawChart();
}

/* CHART */
function drawChart() {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        data: data.map(d => d.steps),
        borderColor: "#3b82f6"
      }]
    }
  });
}

/* GOALS */
saveGoal.onclick = () => {
  goal = goalSteps.value;
  localStorage.setItem("goal", goal);
  goalText.textContent = `Daily goal: ${goal} steps`;
};

if (goal) goalText.textContent = `Daily goal: ${goal} steps`;

/* RESET */
clearData.onclick = () => {
  if (confirm("Delete all health data?")) {
    data = [];
    localStorage.clear();
    updateUI();
  }
};

function average(arr) {
  return arr.length ? Math.round(arr.reduce((a,b)=>a+b)/arr.length) : "–";
}

updateUI();
