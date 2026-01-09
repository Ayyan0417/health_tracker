const form = document.getElementById("healthForm");
const records = document.getElementById("records");

const dateInput = document.getElementById("date");
const weightInput = document.getElementById("weight");
const stepsInput = document.getElementById("steps");
const waterInput = document.getElementById("water");

let data = JSON.parse(localStorage.getItem("healthData")) || [];

function showData() {
  records.innerHTML = "";
  data.forEach(item => {
    records.innerHTML += `
      <tr>
        <td>${item.date}</td>
        <td>${item.weight || "-"}</td>
        <td>${item.steps || "-"}</td>
        <td>${item.water || "-"}</td>
      </tr>
    `;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const entry = {
    date: dateInput.value,
    weight: weightInput.value,
    steps: stepsInput.value,
    water: waterInput.value
  };

  data.push(entry);
  localStorage.setItem("healthData", JSON.stringify(data));
  showData();
  form.reset();
});

showData();
