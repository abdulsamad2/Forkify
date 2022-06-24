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
const renderSpinner = function (parentEl) {
  const markup = `

       <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 

      `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    console.log(id);
    if (!id) return;
    /// loading spinner

    renderSpinner(recipeContainer);
    /////////////// loading recipie //////////////////
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //// const renderSpinner

    ///////////rendring recipe ////////////////////////////////////

    recipeView.render(model.state.recipe);
    const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

showRecipe();

// ['haschnage', 'load'].forEach(e => window.addEventListener(e, showRecipe));

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
