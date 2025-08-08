const form = document.getElementById("dataForm");
const tableBody = document.querySelector("#dataTable tbody");
const inputs = form.querySelectorAll("input");

let nomorUrut = 1;
let rowBeingEdited = null;

inputs.forEach((input, index) => {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      const nextInput = inputs[index + 1];          

      if (nextInput) {
        nextInput.focus();
      } else {
        const allFilled = Array.from(inputs).every(i => i.value.trim() !== "");
        if (allFilled) {
          form.requestSubmit();
        } else {
          const firstEmpty = Array.from(inputs).find(i => i.value.trim() === "");
          if (firstEmpty) firstEmpty.focus();
        }
      }
    }
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const usia = document.getElementById("usia").value;
  const berat = document.getElementById("berat").value;
  const tinggi = document.getElementById("tinggi").value;

  if (rowBeingEdited) {
    rowBeingEdited.children[1].textContent = nama;
    rowBeingEdited.children[2].textContent = usia;
    rowBeingEdited.children[3].textContent = berat;
    rowBeingEdited.children[4].textContent = tinggi;
    rowBeingEdited = null;
  } else {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nomorUrut}</td>
      <td>${nama}</td>
      <td>${usia}</td>
      <td>${berat}</td>
      <td>${tinggi}</td>
      <td>
        <button class="edit-button" onclick="editData(this)">Edit</button>
        <button class="delete-button" onclick="hapusBaris(this)">Batalkan</button>
      </td>
    `;
    tableBody.appendChild(row);
    nomorUrut++;
  }

  form.reset();
  inputs[0].focus();
});

function hapusBaris(button) {
  const row = button.parentElement.parentElement;
  tableBody.removeChild(row);

  const rows = tableBody.querySelectorAll("tr");
  nomorUrut = 1;
  rows.forEach((tr) => {
    tr.children[0].textContent = nomorUrut++;
  });

  if (rowBeingEdited === row) {
    rowBeingEdited = null;
    form.reset();
  }
}

function editData(button) {
  const row = button.parentElement.parentElement;
  document.getElementById("nama").value = row.children[1].textContent;
  document.getElementById("usia").value = row.children[2].textContent;
  document.getElementById("berat").value = row.children[3].textContent;
  document.getElementById("tinggi").value = row.children[4].textContent;

  rowBeingEdited = row;
}