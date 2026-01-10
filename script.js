/* ===============================
   SECTION NAVIGATION (FIXED)
================================ */

function showSection(id, btn) {
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

  // Activate clicked button
  btn.classList.add("active");
}

/* ===============================
   HEALTH DATA LOGIC (UNCHANGED)
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

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const entry = {
      date: dateInput.value,
      weight: weightInput.value,
      steps: stepsInput.value,
      water: waterInput.value
    };

    data.push(entry);
    localStorage.setItem("healthData", JSON.stringify(data));
    updateUI();
    form.reset();
  });
}

function updateUI() {
  updateStats();
  updateTable();
}

function updateStats() {
  avgStepsEl.textContent = avg(data.map(d => d.steps));
  avgWaterEl.textContent = avg(data.map(d => d.water));
  avgWeightEl.textContent = avg(data.map(d => d.weight));
}

function avg(arr) {
  const nums = arr.filter(Boolean).map(Number);
  return nums.length ? Math.round(nums.reduce((a,b)=>a+b)/nums.length) : "–";
}

function updateTable() {
  if (!records) return;
  records.innerHTML = "";
  data.forEach((d, i) => {
    records.innerHTML += `
      <tr>
        <td>${d.date}</td>
        <td>${d.weight || "-"}</td>
        <td>${d.steps || "-"}</td>
        <td>${d.water || "-"}</td>
        <td><button onclick="deleteRecord(${i})">❌</button></td>
      </tr>
    `;
  });
}

function deleteRecord(i) {
  data.splice(i, 1);
  localStorage.setItem("healthData", JSON.stringify(data));
  updateUI();
}

updateUI();
