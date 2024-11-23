const images = [
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
        description: 'Hokkaido Flower',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
      },
    ];

const galleryContainer = document.querySelector('.gallery');

images.forEach((image, index) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery-item');

  galleryItem.innerHTML = `
    <a class="gallery-link" href="${image.original}">
      <img
        class="gallery-image"
        src="${image.preview}"
        data-source="${image.original}"
        alt="${image.description}"
        data-index="${index}"
      />
    </a>
  `;

  galleryContainer.appendChild(galleryItem);
});

galleryContainer.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.nodeName === 'IMG') {
    const currentIndex = parseInt(event.target.dataset.index, 10);
    showLightbox(currentIndex);
  }
});

function showLightbox(startIndex) {
  const instance = basicLightbox.create(`
    <div class="lightbox-content">
      <img class="lightbox-image" src="${images[startIndex].original}" alt="${images[startIndex].description}" />
      <button class="prev">&lt;</button>
      <button class="next">&gt;</button>
    </div>
  `);

  const prevButton = instance.element().querySelector('.prev');
  const nextButton = instance.element().querySelector('.next');
  
  prevButton.addEventListener('click', () => showNextPrevImage(startIndex, 'prev'));
  nextButton.addEventListener('click', () => showNextPrevImage(startIndex, 'next'));

  instance.show();

  function showNextPrevImage(currentIndex, direction) {
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    const imgElement = instance.element().querySelector('.lightbox-image');
    imgElement.src = images[newIndex].original;
    imgElement.alt = images[newIndex].description;
    
    startIndex = newIndex;
  }
}