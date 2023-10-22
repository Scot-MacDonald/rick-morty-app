const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
const inputvalue = searchBar.querySelector(".search-bar__input").value;

console.log("aquii", inputvalue);
//States
const maxPage = 42;
let page = 1;
let searchQuery = "";

import createCharacterCard from "./components/card/card.js";

async function fetchDataAndRender(counter, searchQuery = "") {
  const url = `https://rickandmortyapi.com/api/character/?name=${searchQuery}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      const cardContainer = document.querySelector(".card-container");
      cardContainer.innerHTML = "";

      data.results.forEach((character) => {
        const characterCard = createCharacterCard(character);
        cardContainer.appendChild(characterCard);
      });

      page = counter;
      updatePagination();

      setTimeout(() => {
        scrollToTop();
      }, 100);
      searchBar.querySelector(".search-bar__input").value = "";
    } else {
      console.error("No results found in the API response");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// let counter = 1;
// nextButton.addEventListener("click", () => {
//   ++counter;
//   fetchDataAndRender(counter);
// });

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
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

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBar.querySelector(".search-bar__input").value;
  console.log(searchQuery);
  if (searchQuery.trim() !== "") {
    page = 1;
    fetchDataAndRender(page, searchQuery);
  } else {
    console.log("Please enter a character name for the search.");
  }
});

fetchDataAndRender(page);
updatePagination();
