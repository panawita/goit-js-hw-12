import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
let userInputGlobal = '';
let perPage = 40;

iziToast.settings({
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

form.addEventListener('submit', event => {
  event.preventDefault();
  const userInput = document.querySelector('.search-input').value.trim();
  if (!userInput) {
    iziToast.show({
      message: 'Please enter what you are searching for!',
    });
  } else {
    userInputGlobal = userInput;
    page = 1;
    loadMore.style.display = 'none';
    gallery.innerHTML = '';
    fetchImages(userInput);
  }
});

loadMore.addEventListener('click', () => {
  page += 1;
  loadMore.style.display = 'none';
  fetchImages(userInputGlobal, page);
});

async function fetchImages(userInput) {
  loader.style.display = 'block';

  const params = new URLSearchParams({
    key: '28729256-3b1de8368afcf00c1bd7e0c48',
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });

  try {
    const response = await axios.get('https://pixabay.com/api/', { params });
    const data = response.data;

    loader.style.display = 'none';

    if (data.hits.length === 0 && page === 1) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search phrase. Please try again',
      });
    } else {
      displayImages(data.hits);

      if (data.hits.length < perPage) {
        loadMore.textContent = 'Sorry, no more results';
        loadMore.setAttribute('disabled', 'disabled');
        loadMore.style.display = 'block';
      } else {
        loadMore.textContent = 'Load more';
        loadMore.removeAttribute('disabled');
        loadMore.style.display = 'block';
      }
    }
  } catch (error) {
    iziToast.show({
      title: 'Error.',
      message: 'Sorry, something went wrong. Please try again.',
    });
    console.error(error);
  } finally {
    loader.style.display = 'none';
  }
}

function displayImages(images) {
  const imageCards = images.map(image => createImageCard(image)).join('');
  gallery.insertAdjacentHTML('beforeend', imageCards);

  const elemHeight = gallery
    .querySelector('.gallery-item img')
    .getBoundingClientRect().height;
  if (elemHeight) {
    const scrollDistance = elemHeight * 2;
    window.scrollBy({
      top: scrollDistance,
      behavior: 'smooth',
    });
  }

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
