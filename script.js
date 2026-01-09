const form = document.getElementById("healthForm");
const records = document.getElementById("records");

const dateInput = document.getElementById("date");
const weightInput = document.getElementById("weight");
const stepsInput = document.getElementById("steps");
const waterInput = document.getElementById("water");

let data = JSON.parse(localStorage.getItem("healthData")) || [];

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
        <td><button onclick="deleteRecord(${index})">❌</button></td>
      </tr>
    `;
  });

  drawCharts();
}

function deleteRecord(index) {
  data.splice(index, 1);
  localStorage.setItem("healthData", JSON.stringify(data));
  showData();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const entry = {
    date: dateInput.value,
    weight: Number(weightInput.value),
    steps: Number(stepsInput.value),
    water: Number(waterInput.value)
  };

  data.push(entry);
  localStorage.setItem("healthData", JSON.stringify(data));
  showData();
  form.reset();
});

function drawCharts() {
  const dates = data.map(d => d.date);
  const weights = data.map(d => d.weight);
  const steps = data.map(d => d.steps);
  const water = data.map(d => d.water);

  if (weightChart) weightChart.destroy();
  if (stepsChart) stepsChart.destroy();
  if (waterChart) waterChart.destroy();

  weightChart = new Chart(document.getElementById("weightChart"), {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: "Weight (kg)",
        data: weights,
        borderColor: "blue",
        fill: false
      }]
    }
  });

  stepsChart = new Chart(document.getElementById("stepsChart"), {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: "Steps",
        data: steps,
        borderColor: "green",
        fill: false
      }]
    }
  });

  waterChart = new Chart(document.getElementById("waterChart"), {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: "Water (liters)",
        data: water,
        borderColor: "purple",
        fill: false
      }]
    }
  });
}

showData();
