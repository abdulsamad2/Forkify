import View from './View';
import icons from 'url:../../img/icons.svg';
// import { from } from 'core-js/core/array';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHanlderShowWindow();
    this.addHanlderHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidde');
  }

  addHanlderShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHanlderHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();



const a = +;