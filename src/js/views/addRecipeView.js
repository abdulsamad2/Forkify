import View from './View';
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    return '';
  }
}

export default new AddRecipeView();
