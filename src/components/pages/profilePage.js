import { refs } from "../refs";
import { shop } from "../shop"
import productsForm from "../productsForm";
import { addProduct, deleteProduct, addUserProduct } from "../services";
import { createProductsMarkup, createProductsItemMarkup } from '../pages/productsPage';

// const initialValues = {
//   productName: '',
//   productImage: '',
//   productDescription: '',
//   productPrice: 0
// }

const product = {
  productName: '',
  productImage: '',
  productDescription: '',
  productPrice: 0,
  category: 'food',
};
// =========================== Base64 ========================

function toDataURL(element) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(element.files[0]);
  });
}

const createbase = () => {
  const fileForm = document.querySelector('.productForm');
  const element = fileForm.image;
  toDataURL(element).then(data => {
    product.productImage = data; //'gfdfgd4237gjh43h3g5h43cgfh34gf34hm34yfgfsd'
  });
}

// =========================== Base64 end========================

const profilePage = () => {
  shop.currentPage = 'profile';
  refs.content.innerHTML = productsForm();


  const getInfo = (e) => {
    product[e.target.name] = e.target.value;

  }

  const addNewProduct = (e) => {
    e.preventDefault();
    product.author = JSON.parse(localStorage.getItem('user')).id;
    addProduct(product)
      .then((response) => {
        shop.productItems = [{ productId: response.data.name, ...product }, ...shop.productItems]
        const list = document.querySelector('.productsList');
        list.insertAdjacentHTML("afterbegin", createProductsItemMarkup({ productId: response.data.name, ...product }))
        addUserProduct(response.data.name)
      })
      .finally(() => {
        product.productName = '';
        product.productImage = '';
        product.productDescription = '';
        product.productPrice = 0;
        document.forms.productForm.reset();
      })
  }

  const deleteProductItem = (e) => {
    if (e.target.dataset.button === 'deletebutton') {
      const id = e.target.closest('[data-id]').dataset.id;
      deleteProduct(id).then(() => {
        console.log(id)
        shop.productItems = shop.productItems.filter(product => product.productId !== id);
        console.log(shop)
        const list = document.querySelector('.productsList');
        list.innerHTML = createProductsMarkup(shop.productItems.reverse())
      });
    }

  }

  refs.content.insertAdjacentHTML("beforeend", createProductsMarkup(shop.getUserProducts()));

  const list = document.querySelector('.productsList');
  list.addEventListener('click', deleteProductItem)

  // const productForm = document.querySelector('.productForm');
  const productForm = document.forms.productForm;
  productForm.addEventListener('input', getInfo);
  productForm.image.addEventListener('input', createbase);
  productForm.addEventListener('submit', addNewProduct);


}

export default profilePage;
