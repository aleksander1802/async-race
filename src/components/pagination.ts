import { IGarage, ICar, ICurrentArray } from "../models/raceModel";
import CreateCar from "./createCar";
import {
  createAllGarageItem,
  createGarageItem,
  garageItemConfigBtns,
  garageItemConfig,
} from "./garage";

class Pagination {
  static currentPage = 1;
  static itemsPerPage = 7;
  static pagesAtAll: number;
  static cars: IGarage;
  static currentArray: ICurrentArray;


  static renderItems(arrData: IGarage, currentPage?: number) {
    this.cars = arrData;

    if (currentPage) {
      this.currentPage = currentPage;
    }

    let item = Pagination.curArray(arrData)

    CreateCar.currentCount = item.length;
    
    Pagination.currentArray = item;

    const items = createAllGarageItem(Pagination.currentArray);

    return items;
  }

  static curArray = (arrData: IGarage ) => {

    const pagesCount = Math.ceil(arrData.length / this.itemsPerPage);

    if (pagesCount < this.currentPage) {
      this.currentPage = pagesCount;
    } 

    const start = this.itemsPerPage * (this.currentPage - 1);
    const end = start + this.itemsPerPage;
    const paginatedData = arrData.slice(start, end); 

    return paginatedData

  }
}

export default Pagination;
