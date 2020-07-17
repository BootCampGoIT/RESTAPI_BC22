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

export const getInfo = () => {
  const userInfo = localStorage.getItem('user');
  return JSON.parse(userInfo);
}



// ================================ Products ===================================

export const addProduct = (product) => {

  return axios.post(`${baseURL}/products.json?auth=${getInfo().token}`, product);
}

export const addUserProduct = (productId) => {
  axios.post(`${baseURL}/users/${getInfo().userDbId}/userProducts.json?auth=${getInfo().token}`, {productId})
}

export const getProducts = () => {
  return axios.get(`${baseURL}/products.json`)
    .then(response => transformData(response));//
  // return fetch(`${baseURL}/products.json`)
}

export const deleteProduct = (id) => {
  return axios.delete(`${baseURL}/products/${id}.json?auth=${getInfo().token}`);
}

// ============================ Auth ==================================

export const signUp = (user) => {
  return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, { ...user, returnSecureToken: true })
}

export const signIn = (user) => {
  return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, { ...user, returnSecureToken: true })
}

export const addUserToDB = (data) => {
  return axios.post(`${baseURL}/users.json?auth=${data.idToken}`,
    {
      authId: data.localId,
      contactInfo: {
        name: '',
        email: data.email,
        phone: "",
        avatar: 'data:image/png;base64,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',
      },
      userProducts: [],
      favorites: [],
    })
}

export const getUserDbId = (id) => {
  return axios.get(`${baseURL}/users.json`)
    .then(response => {
      let IDCaps = ''
      const keys = Object.keys(response.data);
      for (const key of keys) {
        if (response.data[key].authId === id) {
          IDCaps = key
        }
      }
      return IDCaps
    })
}



// ===========================================

// return fetch(`${baseURL}/products.json`, {
//   method: "POST",
//   body: JSON.stringify(product),
//   headers: {
//     "Content-Type": "application/json"
//   }
// }).then(response => response.json())

