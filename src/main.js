import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'; // Імпорт CSS для iziToast

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; // Імпорт CSS для SimpleLightbox

import { fetchImages } from './js/pixabay-api.js';
import { createGalleryItem, clearGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more'); // Переконайтеся, що додали цю кнопку в HTML
const loader = document.querySelector('.loader');

let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchQuery = e.target.query.value.trim();
  currentPage = 1;
  clearGallery(gallery);
  await searchAndDisplayImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await searchAndDisplayImages();
});

async function searchAndDisplayImages() {
  try {
    loader.style.display = 'block';
    hideLoadMoreButton(loadMoreBtn);
    const data = await fetchImages(searchQuery, currentPage);
    const imagesMarkup = data.hits.map(createGalleryItem).join('');
    gallery.insertAdjacentHTML('beforeend', imagesMarkup);
    if (data.hits.length > 0) {
      showLoadMoreButton(loadMoreBtn);
    } else {
      hideLoadMoreButton(loadMoreBtn);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    loader.style.display = 'none';
  }
}