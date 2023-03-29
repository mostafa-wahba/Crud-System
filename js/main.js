let pName = document.getElementById("name");
let pPrice = document.getElementById("price");
let pDec = document.getElementById("description");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let pContainer = [];
let updatedProduct="0";
if (localStorage.getItem("product") != null) {
  pContainer = JSON.parse(localStorage.getItem("product"));
  displayData();
}
function adding() {
  if (pName.value !== "" && pPrice.value !== "" && pDec.value !== "") {
    let pObj = {
      name: pName.value,
      price: pPrice.value,
      description: pDec.value,
    };
    pContainer.push(pObj);
    localStorage.setItem("product", JSON.stringify(pContainer));
    displayData();
    clearForm();
  }
}

function displayData() {
  let element = ``;
  for (let index = 0; index < pContainer.length; index++) {
    console.log(pContainer[index].name)
    console.log(pContainer[index].price)
    console.log(pContainer[index].description)
    element += `<tr>
        <td>${index + 1}</td>
        <td>${pContainer[index].name}</td>
        <td>${pContainer[index].price}</td>
        <td>${pContainer[index].description}</td>
        <td><button onclick="setUpdate(${index})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteData(${index})" class="btn btn-danger">Delete</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = element;
}
function deleteData(i) {
  pContainer.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(pContainer));
  displayData();
}
function clearForm() {
  pName.value = "";
  pPrice.value = "";
  pDec.value = "";
}
function setUpdate(i) {
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  pName.value = pContainer[i].name;
  pPrice.value = pContainer[i].price;
  pDec.value = pContainer[i].description;
  updatedProduct=i;
}
function update() {
  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
  pContainer[updatedProduct] = {
    name: pName.value,
    price: pPrice.value,
    description: pDec.value,
  };
  pContainer.splice(updatedProduct,1,pContainer[updatedProduct])
  localStorage.setItem("product", JSON.stringify(pContainer));
  displayData();
  clearForm();
}