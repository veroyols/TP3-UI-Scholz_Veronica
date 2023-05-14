import Mercaderia from "../components/section/Mercaderia.js";
import MercaderiaDetail from "../components/section/MercaderiaDetail.js";
import { getMercaderias, getMercaderia } from "../services/mercaderias.js"

//CARRITO
var selectedProduct = [];

const render = async () => {
  let main = document.getElementById("main");
  let mercaderias = await getMercaderias();

  for (let i = 0; i < mercaderias.length; i++) {
    main.innerHTML += Mercaderia(mercaderias[i]);
  }
  onListItemClick(document.querySelectorAll('.mercaderia__view'))
  onListItemClick(document.querySelectorAll('.mercaderia__add'))
}
window.onload = render;

//
const onListItemClick = (elements) => {
  elements.forEach(element => {
    if (element.classList.contains('mercaderia__view')) {
      element.addEventListener('click', () => onClickViewButton(element.id))
    } else if (element.classList.contains('mercaderia__add')) {
      element.addEventListener('click', () => onClickAddButton(element.id))
    }
  });
}

//DETALLE DEL PRODUCTO
const onClickViewButton = async (id) => {
  let mercaderia = await getMercaderia(id);
  let detail = document.getElementById("detailProduct");
  main.innerHTML = "";
  detail.innerHTML = MercaderiaDetail(mercaderia);

  alert(`View element with id ${id}`)
}
//AGREGAR PRODUCTO
const onClickAddButton = (id) => {
  if (selectedProduct.includes(id)) {
    console.log(`Delete element with id ${id}`)
    selectedProduct = selectedProduct.filter(e => e != id)
  } else {
    console.log(`Add element with id ${id}`)
    selectedProduct.push(id);
  }
  console.log(selectedProduct)
  //contador en nav
  let counter = document.getElementById("counter");
  counter.textContent = `(${selectedProduct.length})`;
}