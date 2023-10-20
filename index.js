// const cardContainer = document.querySelector('[data-js="card-container"]');
// const searchBarContainer = document.querySelector(
//   '[data-js="search-bar-container"]'
// );
// const searchBar = document.querySelector('[data-js="search-bar"]');
// const navigation = document.querySelector('[data-js="navigation"]');
// const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
// const pagination = document.querySelector('[data-js="pagination"]');

// // States
// const maxPage = 1;
// const page = 1;
// const searchQuery = "";

import createCharacterCard from "./components/card/card.js";

async function fetchDataAndRender(counter) {
  const url = `https://rickandmortyapi.com/api/character?page=${counter}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      const cardContainer = document.querySelector(".card-container");

      data.results.forEach((character) => {
        const characterCard = createCharacterCard(character);
        cardContainer.appendChild(characterCard);
      });
    } else {
      console.error("No results found in the API response");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

let counter = 1;
nextButton.addEventListener("click", () => {
  ++counter;
  fetchDataAndRender(counter);
});

fetchDataAndRender(counter);
