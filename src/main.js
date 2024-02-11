import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#load-more');

let searchParams = {
    page: 1,
    per_page: 15,
    q: '',
};

let lightBox = new SimpleLightbox('.gallery a');

const updateUI = (show) => {
    loader.style.display = show ? 'block' : 'none';
    loadMoreBtn.style.display = show ? 'none' : 'block';
};

const getPhotoByName = async () => {
    const API_KEY = '42183789-4564ae77348bbdba9cab87cc0';
    const BASE_URL = 'https://pixabay.com/api/';
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`, { params: searchParams });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createGallery = (images) => {
    if (images.hits.length === 0) {
        iziToast.info({
            message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        updateUI(false);
    } else {
        const links = images.hits.map(image => `
            <a href="${image.largeImageURL}" class="gallery-item">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
            </a>
        `).join('');
        gallery.insertAdjacentHTML('beforeend', links);
        lightBox.refresh();
        updateUI(false);
    }
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    searchParams.q = document.querySelector('#query').value;
    searchParams.page = 1;
    gallery.innerHTML = '';
    updateUI(true);
    try {
        const images = await getPhotoByName();
        createGallery(images);
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `An error occurred: ${error.message}`,
        });
    }
    loadMoreBtn.style.display = 'block';
});

loadMoreBtn.addEventListener('click', async () => {
    searchParams.page += 1;
    updateUI(true);
    try {
        const images = await getPhotoByName();
        createGallery(images);
        if (images.hits.length < 15 || (gallery.querySelectorAll('.gallery-item').length >= images.totalHits)) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `An error occurred: ${error.message}`,
        });
    }
});

// Початкове приховування кнопки завантаження
loadMoreBtn.style.display = 'none';