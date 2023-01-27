import RaceService from '../services/RaceService';
import { IGarage, iCreateNewCar } from '../models/raceModel';
import { createGarageItem } from './garage';
import Pagination from './pagination';
import { PagesChange } from './pageChange';

class CreateCar {
  static inputNameValue = '';

  static inputColorValue = '#2ecc71';

  static currentCount: number;

  static createNewCar = () => {
    const garageItems = document.querySelector('.garage__items');
    const itemPerPage = 7;

    const nameInputBtn = document.querySelector(
      '.main__options_item-createBtn',
    );
    const currentNameInputValue = document.querySelector(
      '.main__options_item-name',
    );

    if (CreateCar.inputNameValue.length === 0) {
      nameInputBtn?.classList.add('mistake');
      return;
    }
    nameInputBtn?.classList.remove('mistake');

    const newCar: iCreateNewCar = {
      name: CreateCar.inputNameValue,
      color: CreateCar.inputColorValue,
    };

    const json = JSON.stringify(newCar);

    if (CreateCar.currentCount === itemPerPage) {
      RaceService()
        .createNewCar(json)
        .then((data) => createGarageItem(data));
    } else {
      CreateCar.currentCount += 1;
      RaceService()
        .createNewCar(json)
        .then((data) => createGarageItem(data))
        .then((data) => garageItems?.append(data));
    }

    if (currentNameInputValue instanceof HTMLInputElement) {
      currentNameInputValue.value = '';
      CreateCar.inputNameValue = '';
    }
  };
}

export default CreateCar;
