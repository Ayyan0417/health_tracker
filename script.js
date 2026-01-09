const form = document.getElementById("healthForm");
const records = document.getElementById("records");

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

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const entry = {
    date: date.value,
    weight: weight.value,
    steps: steps.value,
    water: water.value
  };

  data.push(entry);
  localStorage.setItem("healthData", JSON.stringify(data));
  showData();
  form.reset();
});

showData();
