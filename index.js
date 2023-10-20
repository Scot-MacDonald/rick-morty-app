const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

const url = "https://rickandmortyapi.com/api/character";

async function fetchDataAndRender() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // createAndRenderCards(data.results);

    console.log(data);
  } catch (error) {
    console.error("An Error occurred");
  }
}
// // let body = document.querySelector("body");
// // function createAndRenderCards(results) {
// //   results.forEach((person) => {
// //     const card = Card(person);
// //     body.append(card);
// //   });
// }

fetchDataAndRender();
