import RaceService from "../services/RaceService";
import { IGarage, iCreateNewCar } from "../models/raceModel";
import { updateGarage } from "../pages/main/updateGarage";
import { createGarageItem } from "./garage";
import { Config } from "../pages/main/listeners";

class CreateCar {
  static inputNameValue: string = "";
  static inputColorValue: string = "#2ecc71";

  static createNewCar = () => {
    const nameInputBtn = document.querySelector(
      ".main__options_item-createBtn"
    );
    const currentNameInputValue = document.querySelector(
      ".main__options_item-name"
    );

    const garageItems = document.querySelector(".garage__items");

    if (CreateCar.inputNameValue.length === 0) {
      nameInputBtn?.classList.add("mistake");
      return;
    } else {
      nameInputBtn?.classList.remove("mistake");
    }

    const newCar: iCreateNewCar = {
      name: CreateCar.inputNameValue,
      color: CreateCar.inputColorValue,
    };

    const json = JSON.stringify(newCar);

    RaceService()
      .createNewCar(json)
      .then((data) => createGarageItem(data))
      .then((data) => garageItems?.append(data))
      .then(() => Config());

    if (currentNameInputValue instanceof HTMLInputElement) {
      currentNameInputValue.value = "";
    }
    CreateCar.inputNameValue = "";
  };
}

export default CreateCar;
