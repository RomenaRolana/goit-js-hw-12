import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42183789-4564ae77348bbdba9cab87cc0';

async function fetchImages(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { fetchImages };