import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', event => {
  event.preventDefault();
  const userInput = document.querySelector('.search-input').value.trim();
  if (!userInput) {
    iziToast.show({
      message: 'Please enter what you are searching for!',
      backgroundColor: '#EF4040',
      titleColor: '#fff',
      messageColor: '#fff',
      progressBarColor: '#B51B1B',
      position: 'topRight',
      onOpening: function () {
        document.querySelector('.iziToast').style.fontFamily =
          'Montserrat, sans-serif';
      },
    });
  } else {
    fetchImages(userInput);
  }
});

function fetchImages(userInput) {
  gallery.innerHTML = '';
  loader.style.display = 'block';

  const params = new URLSearchParams({
    key: '28729256-3b1de8368afcf00c1bd7e0c48',
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  fetch(`https://pixabay.com/api/?${params}`)
    .then(response => response.json())
    .then(data => {
      loader.style.display = 'none';
      if (data.hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search phrase. Please try again',
          backgroundColor: '#EF4040',
          titleColor: '#fff',
          messageColor: '#fff',
          progressBarColor: '#B51B1B',
          position: 'topRight',
          onOpening: function () {
            document.querySelector('.iziToast').style.fontFamily =
              'Montserrat, sans-serif';
          },
        });
      } else {
        displayImages(data.hits);
      }
    })
    .catch(error => {
      iziToast.show({
        title: 'Error.',
        message: 'Sorry, something went wrong. Please try again.',
        backgroundColor: '#EF4040',
        titleColor: '#fff',
        messageColor: '#fff',
        progressBarColor: '#B51B1B',
        position: 'topRight',
        onOpening: function () {
          document.querySelector('.iziToast').style.fontFamily =
            'Montserrat, sans-serif';
        },
      });
      console.error(error);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

function displayImages(images) {
  const imageCards = images.map(image => createImageCard(image)).join('');
  gallery.innerHTML = imageCards;

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

function createImageCard(image) {
  return `
      <div class="gallery-item">
        <div class="gallery-image"><a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a></div>
        <div class="image-info">
          <span><p>Likes:</p> ${image.likes}</span>
          <span><p>Views:</p> ${image.views}</span>
          <span><p>Comments:</p> ${image.comments}</span>
          <span><p>Downloads:</p> ${image.downloads}</span>
        </div>
      </div>
    `;
}
