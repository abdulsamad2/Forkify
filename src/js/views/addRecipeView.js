import View from './View';
import icons from 'url:../../img/icons.svg';
import { bind } from 'core-js/core/function';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe.window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.queryCommandValue('.nav__btn--add-recipe');
  _btnClose = document.queryCommandValue('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow, bind(this));
  }
}

export default new AddRecipeView();
