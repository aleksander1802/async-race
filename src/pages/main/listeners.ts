import CreateCar from "../../components/createCar";
import RaceService from "../../services/RaceService";

export const toGarage = () => {
  const garage = document.querySelector(".header__buttons_garage");

  if (garage) {
    garage.addEventListener("click", () => {
      console.log("click");
    });
  }
};

export const toWinners = () => {
  const winners = document.querySelector(".header__buttons_winners");
  if (winners) {
    winners.addEventListener("click", () => {
      console.log("click");
    });
  }
};

export const Create = () => {
  const create = document.querySelector(".main__options_item-createBtn");
  const newCarNameAndColor = document.querySelector(".main__options_item");

  if (create) {
    create.addEventListener("click", () => {
      CreateCar.createNewCar();
    });
  }

  if (newCarNameAndColor) {
    newCarNameAndColor.addEventListener("input", (e) => {
      const target = e.target;

      if (target instanceof HTMLInputElement) {
        if (target.classList.contains("main__options_item-name")) {
          CreateCar.inputNameValue = target.value.trim();
        }
        if (target.classList.contains("main__options_item-newcolor")) {
          CreateCar.inputColorValue = target.value;
        }
      }
    });
  }
};

export const Update = () => {
  const update = document.querySelector(".main__options_item-updateBtn");
  if (update) {
    update.addEventListener("click", () => {
      console.log("click");
    });
  }
};

export const Race = () => {
  const race = document.querySelector(".main__options_item-raceBtn");
  if (race) {
    race.addEventListener("click", () => {
      console.log("click");
    });
  }
};
export const Reset = () => {
  const reset = document.querySelector(".main__options_item-resetBtn");
  if (reset) {
    reset.addEventListener("click", () => {
      console.log("click");
    });
  }
};

export const Generate = () => {
  const generate = document.querySelector(".main__options_item-generateBtn");
  if (generate) {
    generate.addEventListener("click", () => {
      console.log("click");
    });
  }
};

export const Config = (e: MouseEvent) => {
  const target = e.target;
  if (target instanceof HTMLElement) {
    if (
      target.parentNode?.parentNode &&
      target.parentNode?.parentNode instanceof HTMLElement
    ) {
      const currentNode = target.parentNode.parentNode;
      const currentID = target.parentNode?.parentNode.getAttribute("id");

      if (currentID) {
        RaceService()
          .deleteCar(currentID)
          .then(() => currentNode.remove());
      }
    }
  }
};
