import View from './View';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._data.page === 1 && numPages > 1) {
      return 'page 1,others';
    }
    if (this._data.page === numPages && numPages > 1) {
      return 'last page';
    }
    if (this._data.page < numPages) {
      return 'other';
    }
    return 'only 1 page';
  }
}

export default new PaginationView();
