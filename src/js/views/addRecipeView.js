import View from './View';
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe.window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.queryCommandValue('.nav__btn--add-recipe');
  _btnClose = document.queryCommandValue('.btn--close-modal');

  _generateMarkup() {}
}

export default new AddRecipeView();
