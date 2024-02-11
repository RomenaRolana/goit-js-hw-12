function createGalleryItem(image) {
    return `
      <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
      </a>
      <div class="img-content">
          <div><h3>Likes</h3><p>${image.likes}</p></div>
          <div><h3>Views</h3><p>${image.views}</p></div>
          <div><h3>Comments</h3><p>${image.comments}</p></div>
          <div><h3>Downloads</h3><p>${image.downloads}</p></div>
      </div>
    `;
  }
  
  function clearGallery(galleryElement) {
    galleryElement.innerHTML = '';
  }
  
  function showLoadMoreButton(buttonElement) {
    buttonElement.style.display = 'block';
  }
  
  function hideLoadMoreButton(buttonElement) {
    buttonElement.style.display = 'none';
  }
  
  export { createGalleryItem, clearGallery, showLoadMoreButton, hideLoadMoreButton };