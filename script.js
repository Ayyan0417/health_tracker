/* ===============================
   PAGE NAVIGATION & INTERACTIONS
================================ */

function showSection(id) {
  // Hide all pages
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // Remove active state from nav
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  // Show selected page
  document.getElementById(id).classList.add("active");

  // Set active nav item
  event.currentTarget.classList.add("active");
}

/* ===============================
   BUTTON FEEDBACK (MICRO-ANIMATION)
================================ */

document.addEventListener("click", e => {
  if (e.target.classList.contains("primary-btn")) {
    e.target.style.transform = "scale(0.96)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 120);
  }
});

/* ===============================
   HEALTH DATA LOGIC
================================ */

const form = document.getElementById("healthForm");
const records = document.getElementById("records");

const dateInput = document.getElementById("date");
const weightInput = document.getElementById("weight");
const stepsInput = document.getElementById("steps");
const waterInput = document.getElementById("water");

const avgStepsEl = document.getElementById("avgSteps");
const avgWaterEl = document.getElementById("avgWater");
const avgWeightEl = document.getElementById("avgWeight");

let data = JSON.parse(localStorage.getItem("healthData")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || { steps: 0, water: 0 };

let weightChart, stepsChart, waterChart;

/* ===============================
   FORM SUBMIT
================================ */

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const entry = {
      date: dateInput.value,
      weight: Number(weightInput.value),
      steps: Number(stepsInput.value),
      water: Number(waterInput.value)
    };

    data.push(entry);
    saveAndRefresh();
    form.reset();
  });
}

/* ===============================
   SAVE & REFRESH
================================ */

function saveAndRefresh() {
  localStorage.setItem("healthData", JSON.stringify(data));
  localStorage.setItem("goals", JSON.stringify(goals));
  updateUI();
}

/* ===============================
   UPDATE UI
================================ */

function updateUI() {
  updateStats();
  updateTable();
  updateCharts();
  generateInsights();
}

/* ===============================
   STATS
================================ */

function updateStats() {
  const avg = arr =>
    arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : "–";

  avgStepsEl.textContent = avg(data.map(d => d.steps).filter(Boolean));
  avgWaterEl.textContent = avg(data.map(d => d.water).filter(Boolean));
  avgWeightEl.textContent = avg(data.map(d => d.weight).filter(Boolean));
}

/* ===============================
   TABLE
================================ */

function updateTable() {
  if (!records) return;

  records.innerHTML = "";
  data.forEach((item, index) => {
    records.innerHTML += `
      <tr>
        <td>${item.date}</td>
        <td>${item.weight || "-"}</td>
        <td>${item.steps || "-"}</td>
        <td>${item.water || "-"}</td>
        <td>
          <button onclick="deleteRecord(${index})">❌</button>
        </td>
      </tr>
    `;
  });
}

function deleteRecord(index) {
  data.splice(index, 1);
  saveAndRefresh();
}

/* ===============================
   CHARTS
================================ */

function updateCharts() {
  const dates = data.map(d => d.date);

  if (weightChart) weightChart.destroy();
  if (stepsChart) stepsChart.destroy();
  if (waterChart) waterChart.destroy();

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 800 }
  };

  weightChart = new Chart(
    document.getElementById("weightChart"),
    {
      type: "line",
      data: {
        labels: dates,
        datasets: [{ data: data.map(d => d.weight), borderColor: "#3B82F6" }]
      },
      options: chartOptions
    }
  );

  stepsChart = new Chart(
    document.getElementById("stepsChart"),
    {
      type: "line",
      data: {
        labels: dates,
        datasets: [{ data: data.map(d => d.steps), borderColor: "#8B5CF6" }]
      },
      options: chartOptions
    }
  );

  waterChart = new Chart(
    document.getElementById("waterChart"),
    {
      type: "line",
      data: {
        labels: dates,
        datasets: [{ data: data.map(d => d.water), borderColor: "#14B8A6" }]
      },
      options: chartOptions
    }
  );
}

/* ===============================
   INSIGHTS
================================ */

function generateInsights() {
  if (!data.length) return;

  const last = data[data.length - 1];
  let msg = "You're doing great!";

  if (goals.steps && last.steps < goals.steps) {
    msg = "🚶 Try to walk a bit more to reach your step goal.";
  }

  if (goals.water && last.water < goals.water) {
    msg = "💧 Remember to stay hydrated today.";
  }

  document.getElementById("insightText").textContent = msg;
}

/* ===============================
   GOALS
================================ */

function saveGoals() {
  goals.steps = Number(document.getElementById("stepsGoal").value);
  goals.water = Number(document.getElementById("waterGoal").value);
  saveAndRefresh();
}

/* ===============================
   EXPORT CSV
================================ */

function exportCSV() {
  let csv = "Date,Weight,Ste
