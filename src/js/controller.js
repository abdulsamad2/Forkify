import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

/// importing icons from

import icons from 'url:../img/icons.svg';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

if (model.hot) {
  model.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    console.log(id);
    if (!id) return;
    /// loading spinner

    recipeView.renderSpinner();
    /////////////// loading recipie //////////////////
    await model.loadRecipe(id);
    //// const renderSpinner

    ///////////rendring recipe ////////////////////////////////////

    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

controlRecipes();

// ['haschnage', 'load'].forEach(e => window.addEventListener(e, controlRecipes));

const controlSearchResults = async function () {
  try {
    // get search query
    resultView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    // load search
    await model.loadSearchResults(query);
    /// render results

    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultspage(6));

    // pagination

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
