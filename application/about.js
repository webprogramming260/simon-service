function displayPicture() {
  const random = Math.floor(Math.random() * 1000);
  fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#picture');

      const width = containerEl.offsetWidth;
      const height = containerEl.offsetHeight;

      const imgUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
      const imgEl = document.createElement('img');
      imgEl.setAttribute('src', imgUrl);
      containerEl.appendChild(imgEl);
    });
}

function displayQuote(data) {
  fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#quote');

      const quoteEl = document.createElement('p');
      quoteEl.classList.add('quote');
      const authorEl = document.createElement('p');
      authorEl.classList.add('author');

      quoteEl.textContent = data.content;
      authorEl.textContent = data.author;

      containerEl.appendChild(quoteEl);
      containerEl.appendChild(authorEl);
    });
}

displayPicture();
displayQuote();
