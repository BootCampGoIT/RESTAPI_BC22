import axios from 'axios';


const baseURL = 'https://bc22-72ac2.firebaseio.com/shop';


const transformData = (response) => {
  // console.log(response.data);
  const keys = Object.keys(response.data);
  // console.log(keys);

  const products = [];
  for (const key of keys) {
    products.push({ productId: key, ...response.data[key] })
  }
  // console.log(products);
  return products
}

export const addProduct = (product) => {
  return axios.post(`${baseURL}/products.json`, product);

  // return fetch(`${baseURL}/products.json`, {
  //   method: "POST",
  //   body: JSON.stringify(product),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).then(response => response.json())
}

export const getProducts = () => {
  return axios.get(`${baseURL}/products.json`)
    .then(response => transformData(response));//


  // return fetch(`${baseURL}/products.json`)
}




