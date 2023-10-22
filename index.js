const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

let maxPage = 42;
let page = 1;
let searchQuery = "";

import createCharacterCard from "./components/card/card.js";

async function fetchDataAndRender(counter) {
  const url = `https://rickandmortyapi.com/api/character?page=${counter}&name=${searchQuery}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      cardContainer.innerHTML = "";

      data.results.forEach((character) => {
        const characterCard = createCharacterCard(character);
        cardContainer.appendChild(characterCard);
      });

      page = counter;

      // Set maxPage based on the number of pages in the API response
      if (data.info && data.info.pages) {
        maxPage = data.info.pages;
      }

      updatePagination();

      document.body.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("No results found in the API response");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function updatePagination() {
  pagination.textContent = `${page} / ${maxPage}`;
}

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    fetchDataAndRender(page + 1);
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    fetchDataAndRender(page - 1);
  }
});

searchBar.addEventListener("input", (event) => {
  searchQuery = event.target.value.toLowerCase();
  fetchDataAndRender(1);
});

fetchDataAndRender(page);
updatePagination();
