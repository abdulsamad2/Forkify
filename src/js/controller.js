import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
/// importing icons from

import icons from 'url:../img/icons.svg';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

    if (!id) return;
    /// loading spinner
    //
    recipeView.renderSpinner();

    resultView.update(model.getSearchResultspage());

    /////////////// loading recipie //////////////////
    await model.loadRecipe(id);
    //// const renderSpinner

    ///////////rendring recipe ////////////////////////////////////

    recipeView.render(model.state.recipe);
    // Testing
    //updating bookmark view

    bookmarksView.update(model.state.bookmarks);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

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
    resultView.render(model.getSearchResultspage(1));

    // pagination

    paginationView.render(model.state.search);

    // testing
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  resultView.render(model.getSearchResultspage(gotoPage));

  // pagination

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in the state)
  model.updateServings(newServings);

  //update the views as well then
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks

  bookmarksView.render(model.state.bookmarks);
};

controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  // upload the new recipe data
  model.uploadRecipe(newRecipe);
};

const init = function () {
  bookmarksView.addhandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addhandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
