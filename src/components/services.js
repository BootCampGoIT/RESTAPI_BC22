import axios from 'axios';


const baseURL = 'https://bc22-72ac2.firebaseio.com/shop';
const API_KEY = "AIzaSyC020tHCDWwsBfzqZnps38Nv7FVAtlJuYo";

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

const getToken = () => {
  const userInfo = localStorage.getItem('user');
  const parsedUserInfo = JSON.parse(userInfo);
  return parsedUserInfo.token;
}

// ================================ Products ===================================

export const addProduct = (product) => {
  return axios.post(`${baseURL}/products.json?auth=${getToken()}`, product);
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

export const deleteProduct = (id) => {
  return axios.delete(`${baseURL}/products/${id}.json?auth=${getToken()}`);
}

// ============================ Auth ==================================

export const signUp = (user) => {
  return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, { ...user, returnSecureToken: true })
}

export const signIn = (user) => {
  return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, { ...user, returnSecureToken: true })
}



