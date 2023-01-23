import Pagination from "./pagination";
import CreateCar from "./createCar";
import RaceService from "../services/RaceService";

export class PagesChange {
  static carItemCount: number;

  static nextPageButton = () => {
    const itemPerPage = 7;
    const currentPage = Pagination.currentPage;
    const pagesAtAll = Pagination.pagesAtAll;
    const currentCarCount = CreateCar.currentCount;
    const currentNode = document.querySelector(".garage__wrapper");
    PagesChange.carItemCount = Pagination.currentArray.length;    

    if (currentCarCount < itemPerPage || currentPage === pagesAtAll) {
      return;
    } else {
      if (currentNode) {
        Pagination.currentPage += 1;
        currentNode.innerHTML = "";
        RaceService()
          .getAllCars()
          .then((data) => {
            return Pagination.renderItems(data, Pagination.currentPage);
          })
          .then((data) => currentNode?.append(data));
      }
    }
  };

  static prevPageButton = () => {
    const currentPage = Pagination.currentPage;
    const currentNode = document.querySelector(".garage__wrapper");

    console.log(Pagination.currentArray);
    console.log(currentPage);

    
    
    

    if (currentPage === 1 || currentPage === 0 && Pagination.currentArray.length === 0) {
      return;
    } else {
      Pagination.currentPage -= 1;

      if (currentNode) currentNode.innerHTML = "";
      RaceService()
        .getAllCars()
        .then((data) => {
          return Pagination.renderItems(data, Pagination.currentPage);
        })
        .then((data) => currentNode?.append(data));
    }
  };

  static changeTextContentOfCurrentPage() {
    const currentPage = document.querySelector(".main__garage_page");
    const currentPaginationPage = Pagination.currentPage;

    if (currentPage instanceof HTMLElement && currentPage) {
      currentPage.textContent = `Page ${currentPaginationPage}`;
    }
  }
}
