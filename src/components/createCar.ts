import RaceService from '../services/RaceService';
import { iCreateNewCar } from '../models/raceModel';
import { createGarageItem } from './garage';

class CreateCar {
  static inputNameValue = '';
  static inputColorValue = '#2ecc71';
  static currentCount: number = 0;

  static createNewCar = async () => {
    const garageItems = document.querySelector('.garage__items');
    const itemPerPage = 7;

    const nameInputBtn = document.querySelector('.main__options_item-createBtn');
    const currentNameInputValue = document.querySelector('.main__options_item-name');

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

    try {
      const data = await RaceService().createNewCar(json);

      const garageItem = await createGarageItem(data);

      if (CreateCar.currentCount === itemPerPage) {
        const firstChild = garageItems?.firstChild;
        if (firstChild) {
          garageItems?.removeChild(firstChild);
        }
      }

      if (garageItem) {
        garageItems?.append(garageItem);
        CreateCar.currentCount += 1;
      }

      if (currentNameInputValue instanceof HTMLInputElement) {
        currentNameInputValue.value = '';
        CreateCar.inputNameValue = '';
      }
    } catch (error) {
      console.error('Error creating new car:', error);
    }
  };
}

export default CreateCar;
