
import axios from 'axios';

const BASE_URL = 'http://localhost:3333';

export function getAllCategories() {
  return axios
    .get(`${BASE_URL}/categories/all`)
    .then(response => response.data);
}

export function getProductsByCategory(categoryId) {
  return axios
    .get(`${BASE_URL}/categories/${categoryId}`)
    .then(response => {
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    });
}
