import { getProducts } from "../services";
import { shop } from '../shop';
import { refs } from "../refs";


const createProductsMarkup = (products) => {
  return `
  <ul class="productsList">
  ${products.reduce((acc, product) => {
    acc += createProductsItemMarkup(product)
    return acc
  }, '')}
  </ul>
  `
}
const createProductsItemMarkup = (product) => {
  return `
  <li id=${product.productId} class="productsItem">
  <h2 class="productItemName">${product.productName}</h2>
  <img src=${product.productImage} class="productItemImage"/>
  <p class="productItemDescription">${product.productDescription}</p>
  <p class="productItemPrice">${product.productPrice}</p>
  <button type="button">Add to cart</button>
  </li>
  `
}


const products = () => {
  getProducts()
    .then(data => shop.productItems = [...data])
    .then(data => refs.content.innerHTML = createProductsMarkup(data))
}

export default products;
