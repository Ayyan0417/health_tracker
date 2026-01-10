const navButtons = document.querySelectorAll(".nav");
const pages = document.querySelectorAll(".page");
const featureCards = document.querySelectorAll(".feature");

function showPage(id) {
  pages.forEach(p => p.classList.remove("show"));
  navButtons.forEach(b => b.classList.remove("active"));

  document.getElementById(id).classList.add("show");

  navButtons.forEach(b => {
    if (b.dataset.page === id) b.classList.add("active");
  });
}

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showPage(btn.dataset.page);
  });
});

featureCards.forEach(card => {
  card.addEventListener("click", () => {
    showPage(card.dataset.target);
  });
});

/* REAL TRACKING */
let data = JSON.parse(localStorage.getItem("healthData")) || [];
let goal = localStorage.getItem("goal") || null;

const form = document.getElementById("healthForm");
const records = document.getElementById("records");
const avgSteps = document.getElementById("avgSteps");
const avgWeight = document.getElementById("avgWeight");

const ctx = document.getElementById("stepsChart");
let chart;

form.addEventListener("submit", e => {
  e.preventDefault();

  const entry = {
    date: date.value,
    steps: Number(steps.value),
    weight: Number(weight.value)
  };

  data.push(entry);
  localStorage.setItem("healthData", JSON.stringify(data));
  updateUI();
  form.reset();
});

function updateUI() {
  records.innerHTML = "";
  data.forEach(d => {
    records.innerHTML += `
      <tr>
        <td>${d.date}</td>
        <td>${d.steps}</td>
        <td>${d.weight}</td>
      </tr>`;
  });

  avgSteps.textContent = avg(data.map(d => d.steps));
  avgWeight.textContent = avg(data.map(d => d.weight));

  drawChart();
}

function avg(arr) {
  return arr.length ? Math.round(arr.reduce((a,b)=>a+b)/arr.length) : "–";
}

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
    },
    options: { responsive: true }
  });
}

document.getElementById("saveGoal").onclick = () => {
  goal = goalSteps.value;
  localStorage.setItem("goal", goal);
  goalText.textContent = `Daily step goal: ${goal}`;
};

if (goal) goalText.textContent = `Daily step goal: ${goal}`;

updateUI();
