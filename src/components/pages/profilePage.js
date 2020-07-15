import { refs } from "../refs";
import { shop } from "../shop"
import productsForm from "../productsForm";
import { addProduct } from "../services";

const product = {
  productName: '',
  productImage: '',
  productDescription: '',
  productPrice: 0
};
// =========================== Base64 ========================

function toDataURL(element) {
  return new Promise(resolve => {
    const reader = new FileReader();
    console.dir(reader)
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

const profile = () => {
  refs.content.innerHTML = productsForm();


  const getInfo = (e) => {
    product[e.target.name] = e.target.value;

  }
  const addNewProduct = (e) => {
    e.preventDefault();

    // shop.productItems = [...shop.productItems, product]
    addProduct(product)
      .then(response => console.log(response.data.name))
  }

  const productForm = document.querySelector('.productForm');
  productForm.addEventListener('input', getInfo);
  productForm.image.addEventListener('input', createbase);
  productForm.addEventListener('submit', addNewProduct);

}

export default profile;
