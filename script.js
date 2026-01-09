function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.body.className = savedTheme;

const form = document.getElementById("healthForm");
const records = document.getElementById("records");

const dateInput = document.getElementById("date");
const weightInput = document.getElementById("weight");
const stepsInput = document.getElementById("steps");
const waterInput = document.getElementById("water");

const avgWeightEl = document.getElementById("avgWeight");
const avgStepsEl = document.getElementById("avgSteps");
const avgWaterEl = document.getElementById("avgWater");

let data = JSON.parse(localStorage.getItem("healthData")) || [];
let editIndex = null;

let goals = JSON.parse(localStorage.getItem("goals")) || {
  steps: 0,
  water: 0
};

let weightChart, stepsChart, waterChart;

function showData() {
  records.innerHTML = "";

  data.forEach((item, index) => {
    records.innerHTML += `
      <tr>
        <td>${item.date}</td>
        <td>${item.weight || "-"}</td>
        <td>${item.steps || "-"}</td>
        <td>${item.water || "-"}</td>
        <td>
          <button onclick="editRecord(${index})">✏️</button>
          <button onclick="deleteRecord(${index})">❌</button>
        </td>
      </tr>
    `;
  });

  updateStats();
  drawCharts();
}

function editRecord(index) {
  const item = data[index];
  dateInput.value = item.date;
  weightInput.value = item.weight;
  stepsInput.value = item.steps;
  waterInput.value = item.water;
  editIndex = index;
}

function deleteRecord(index) {
  data.splice(index, 1);
  saveAndRefresh();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const entry = {
    date: dateInput.value,
    weight: Number(weightInput.value),
    steps: Number(stepsInput.value),
    water: Number(waterInput.value)
  };

  if (editIndex !== null) {
    data[editIndex] = entry;
    editIndex = null;
  } else {
    data.push(entry);
  }

  saveAndRefresh();
  form.reset();
});

function saveAndRefresh() {
  localStorage.setItem("healthData", JSON.stringify(data));
  showData();
}

function updateStats() {
  const avg = (arr) => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : "–";

  avgWeightEl.textContent = avg(data.map(d=>d.weight).filter(Boolean));
  avgStepsEl.textContent = avg(data.map(d=>d.steps).filter(Boolean));
  avgWaterEl.textContent = avg(data.map(d=>d.water).filter(Boolean));
}

function drawCharts() {
  const dates = data.map(d=>d.date);

  if (weightChart) weightChart.destroy();
  if (stepsChart) stepsChart.destroy();
  if (waterChart) waterChart.destroy();

  weightChart = new Chart(weightChart?.ctx || document.getElementById("weightChart"), {
    type:"line",
    data:{ labels:dates, datasets:[{label:"Weight", data:data.map(d=>d.weight)}] }
  });

  stepsChart = new Chart(stepsChart?.ctx || document.getElementById("stepsChart"), {
    type:"line",
    data:{ labels:dates, datasets:[{label:"Steps", data:data.map(d=>d.steps)}] }
  });

  waterChart = new Chart(waterChart?.ctx || document.getElementById("waterChart"), {
    type:"line",
    data:{ labels:dates, datasets:[{label:"Water", data:data.map(d=>d.water)}] }
  });
}

function saveGoals() {
  goals.steps = Number(document.getElementById("stepsGoal").value);
  goals.water = Number(document.getElementById("waterGoal").value);
  localStorage.setItem("goals", JSON.stringify(goals));
  updateGoalsUI();
}

function updateGoalsUI() {
  document.getElementById("stepsGoalText").textContent = goals.steps;
  document.getElementById("waterGoalText").textContent = goals.water;
}

showData();
generateInsights();
updateGoalsUI();

function exportCSV() {
  let csv = "Date,Weight,Steps,Water\n";
  data.forEach(d => {
    csv += `${d.date},${d.weight},${d.steps},${d.water}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "health-data.csv";
  a.click();
}
function generateInsights() {
  if (data.length === 0) return;

  const last = data[data.length - 1];
  let message = "";

  if (goals.steps && last.steps < goals.steps) {
    message += "🚶 Try to walk more to reach your step goal. ";
  }

  if (goals.water && last.water < goals.water) {
    message += "💧 You should drink more water today. ";
  }

  if (!message) {
    message = "✅ Great job! You're meeting your health goals.";
  }

  document.getElementById("insightText").textContent = message;
}
function enableReminder() {
  if (!("Notification" in window)) {
    alert("Notifications not supported");
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      alert("Reminder enabled! (Browser must stay open)");
    }
  });
}
