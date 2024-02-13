// Імпорт необхідних бібліотек
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримання елементів DOM
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#load-more');

// Параметри пошуку
let searchParams = {
    page: 1,
    per_page: 15,
    q: '',
};

// Ініціалізація SimpleLightbox
let lightBox = new SimpleLightbox('.gallery a');

// Функція для оновлення UI
const updateUI = (isLoading) => {
    loader.style.display = isLoading ? 'block' : 'none';
    loadMoreBtn.style.display = !isLoading ? 'block' : 'none';
};

// Асинхронна функція для отримання фотографій за назвою
const getPhotoByName = async () => {
    const API_KEY = '42183789-4564ae77348bbdba9cab87cc0';
    const BASE_URL = 'https://pixabay.com/api/';
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`, { params: searchParams });
        return response.data;
    } catch (error) {
        iziToast.error({
            title: 'Помилка',
            message: `Сталася помилка: ${error.message}`,
        });
        updateUI(false); // Переконуємося, що завантажувач приховується при помилці
        throw error; // Повторно кидаємо помилку, якщо потрібно
    }
};

// Функція для створення галереї
const createGallery = (images) => {
    if (images.hits.length === 0) {
        iziToast.info({
            message: 'На жаль, за вашим запитом зображення не знайдені. Спробуйте змінити запит!',
        });
    } else {
        const links = images.hits.map(image => `
            <a href="${image.largeImageURL}" class="gallery-item">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
            </a>
        `).join('');
        gallery.insertAdjacentHTML('beforeend', links);
        lightBox.refresh();
    }
    updateUI(false);
};

// Обробка події 'submit' для форми
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    searchParams.q = document.querySelector('#query').value.trim();
    searchParams.page = 1;
    gallery.innerHTML = '';
    updateUI(true);
    try {
        const images = await getPhotoByName();
        createGallery(images);
        loadMoreBtn.style.display = images.hits.length < searchParams.per_page ? 'none' : 'block';
    } catch (error) {
        // Обробка помилок здійснена в getPhotoByName
    }
});

// Обробка події кліку на кнопку 'Завантажити більше'
loadMoreBtn.addEventListener('click', async () => {
    searchParams.page += 1;
    updateUI(true);
    try {
        const images = await getPhotoByName();
        createGallery(images);
        if (images.hits.length < searchParams.per_page || (gallery.querySelectorAll('.gallery-item').length >= images.totalHits)) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({
                message: "Ви досягли кінця списку результатів.",
            });
        }
    } catch (error) {
        // Обробка помилок здійснена в getPhotoByName
    }
});

// Початкове приховування кнопки 'Завантажити більше' та завантажувача
loadMoreBtn.style.display = 'none';
loader.style.display = 'none'; // Переконуємося, що завантажувач спочатку прихований