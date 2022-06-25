import * as model from './model.js';
import recipeView from './views/recipeView.js';

/// importing icons from

import icons from 'url:../img/icons.svg';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

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
    alert(err);
  }
};

controlRecipes();

// ['haschnage', 'load'].forEach(e => window.addEventListener(e, controlRecipes));

window.addEventListener('hashchange', controlRecipes);
window.addEventListener('load', controlRecipes);
