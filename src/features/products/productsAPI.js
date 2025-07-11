
import axios from 'axios';

const BASE_URL = 'http://localhost:3333';


export function getAllProducts() {
  return axios
    .get(`${BASE_URL}/products/all`)
    .then(response => response.data);
}
export function getProductById(productId) {
  return axios
    .get(`${BASE_URL}/products/${productId}`)
    .then(response => response.data);
}

export function getDiscountedProducts() {
  return getAllProducts().then(products =>
    products.filter(
      prod => prod.discont_price != null && prod.discont_price < prod.price
    )
  );
}
