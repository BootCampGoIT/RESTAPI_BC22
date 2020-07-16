import { getProducts } from "../services";
import { shop } from '../shop';
import { refs } from "../refs";


export const createProductsMarkup = (products) => {
  return `
  <ul class="productsList">
  ${products.reverse().reduce((acc, product) => {
    acc += createProductsItemMarkup(product)
    return acc
  }, '')}
  </ul>
  `
}
export const createProductsItemMarkup = (product) => {
  return `
  <li data-id=${product.productId} class="productsItem">
    <h2 class="productItemName">${product.productName}</h2>
    <img src=${product.productImage} class="productItemImage"/>
    <p class="productItemDescription">${product.productDescription}</p>
    <p class="productItemPrice">${product.productPrice}</p>
    ${(shop.currentPage === 'products')
      ? `<button type="button" data-button="cartbutton">Add to cart</button>`
      : `<div class="profilesOptions">
    <button type="button" data-button="deletebutton">Delete</button>
    <button type="button" data-button="editbutton">Edit</button>
  </div>`
    }


  </li>
  `
}


const productsPage = () => {
  shop.currentPage = 'products';
  getProducts()
    .then(data => shop.productItems = [...data])
    .then(data => refs.content.innerHTML = createProductsMarkup(data))
}

export default productsPage;
