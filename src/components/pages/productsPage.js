import { getProducts } from "../services";
import { shop } from '../shop';
import { refs } from "../refs";

const filters = {
  priceFilter: ''
}


export const createProductsMarkup = (products) => {
  return `
  <ul class="categoriesList">
    <li class="categoriesListItem" data-category="food">Food</li>
    <li class="categoriesListItem" data-category="tools">Tools</li>
    <li class="categoriesListItem" data-category="toys">Toys</li>
    <li class="categoriesListItem" data-category="weapon">Weapon</li>
    <li class="categoriesListItem">
    <ul class="filterList">
        <li class="priceFilter">
            <input type="range" class="priceFilterRange"/>
        </li>
      </ul>
  </li>
  </ul>



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
    <p class="productItemDescription"><b>Description: </b>${product.productDescription}</p>
    <p class="productItemPrice"><b>Price: </b>${product.productPrice}</p>
    ${(shop.currentPage === 'products')
      ? `<button type="button" data-button="cartbutton" class="button cartbutton">Add to cart</button>`
      : `<div class="profilesOptions">
    <button type="button" data-button="deletebutton" class="button">Delete</button>
    <button type="button" data-button="editbutton" class="button">Edit</button>
  </div>`
    }
  </li>
  `
}

const productsPage = () => {
  shop.currentPage = 'products';
  getProducts()
    .then(data => shop.productItems = [...data])
    .then(data => {
      refs.content.innerHTML = createProductsMarkup(data);
      const categoriesList = document.querySelector('.categoriesList');
      const priceFilterRange = document.querySelector('.priceFilterRange');

      const setActivePage = (target) => {
        const activePage = categoriesList.querySelector('.activePage');
        activePage && activePage.classList.remove('activePage');
        target.classList.add('activePage');
      }

      const getCategory = (e) => {
        if (e.target.dataset.category) {
          setActivePage(e.target);
          const productsList = document.querySelector('.productsList');
          const categoryItems = shop.productItems.filter(product => product.category === e.target.dataset.category);
          const categoryMarkup = categoryItems.reduce((acc, product) => {
            acc += createProductsItemMarkup(product)
            return acc
          }, '')
          productsList.innerHTML = categoryMarkup;
          return categoryItems
        } else return
      }

      // const getPriceFilterRange = (e) => {
      //   filters.priceFilter = e.target.value;
      //   switch (shop.currentCategory) {
      //     case "food":

      //       break;

      //     default:
      //       const productsList = document.querySelector('.productsList');
      //       const categoryItems = shop.productItems.filter(product => product.productPrice > filters.priceFilter * 5);
      //       const categoryMarkup = categoryItems.reduce((acc, product) => {
      //         acc += createProductsItemMarkup(product)
      //         return acc
      //       }, '')
      //       productsList.innerHTML = categoryMarkup;
      //       break;
      //   }
      // }


      // priceFilterRange.addEventListener('input', getPriceFilterRange)
      categoriesList.addEventListener('click', getCategory)
    })

}

export default productsPage;
