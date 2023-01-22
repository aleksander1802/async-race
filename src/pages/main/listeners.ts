
import { PagesChange } from '../../components/pageChange';
import { generateCars } from "../../components/generateCars";
import CreateCar from "../../components/createCar";
import RaceService from "../../services/RaceService";
import UpdateCar from "../../components/updateCar";
import { updateGarageCount } from "../../pages/main/index";
import { StartAndResetAll } from '../../components/startAll';
import { Winner } from '../../components/winner';
import { WinnerPage } from '../../pages/winners/winnerPage';


export const toGarage = () => {
  const garage = document.querySelector(".header__buttons_garage");

  if (garage) {
    garage.addEventListener("click", () => {
      WinnerPage.hideWinnerPage()
    });
  }
};

export const toWinners = () => {
  const winners = document.querySelector(".header__buttons_winners");
  if (winners) {
    winners.addEventListener("click", () => {
      WinnerPage.hideMainPage()
    });
  }
};

export const Create = () => {
  const create = document.querySelector(".main__options_item-createBtn");
  const newCarNameAndColor = document.querySelector(".main__options_item");

  if (create) {
    create.addEventListener("click", () => {
      CreateCar.createNewCar();
      updateGarageCount();
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
  const CarReNameAndReColor = document.querySelector(".main__options_item-re");

  if (update) {
    update.addEventListener("click", () => {
      UpdateCar.updateNewCar();
    });
  }

  if (CarReNameAndReColor) {
    CarReNameAndReColor.addEventListener("input", (e) => {
      const target = e.target;

      if (target instanceof HTMLInputElement) {
        if (target.classList.contains("main__options_item-rename")) {
          UpdateCar.inputReNameValue = target.value.trim();
        }
        if (target.classList.contains("main__options_item-recolor")) {
          UpdateCar.inputReColorValue = target.value;
        }
      }
    });
  }
};

export const selectCar = (e: MouseEvent) => {
  const currentRenameInput = document.querySelector(
    ".main__options_item-rename"
  ); 
  
  const target = e.target;
  if (target instanceof HTMLElement) {
    if (
      target.parentNode?.parentNode &&
      target.parentNode?.parentNode instanceof HTMLElement
    ) {
      const currentNode = target.parentNode.lastChild;
      const svgNode =
        target.parentNode.parentNode.lastChild?.childNodes[1].childNodes[1];
      const currentIDs = target.parentNode.parentNode.getAttribute("id");
      const currentTextContent = target.parentNode.lastChild?.textContent;
      if (
        currentRenameInput &&
        currentRenameInput instanceof HTMLInputElement
      ) {
        currentRenameInput.value = `${currentTextContent}`;
        UpdateCar.inputReNameValue = `${currentTextContent}`;

        if (currentNode instanceof HTMLElement) {
          UpdateCar.currentNodeChild = currentNode;
        }

        if (svgNode instanceof SVGElement) {
          UpdateCar.currentSVGNodeElement = svgNode;
        }
      }

      if (currentIDs) {
        UpdateCar.currentID = currentIDs;
      }
    }
  }
};


export const Race = () => {
  const race = document.querySelector(".main__options_item-raceBtn");
  if (race) {
    race.addEventListener("click", (e) => {
      if (e instanceof MouseEvent) {
        StartAndResetAll.startAll(e)        
      }
      
    });
  }
};


export const Reset = () => {
  const reset = document.querySelector(".main__options_item-resetBtn");
  if (reset) {
    reset.addEventListener("click", (e) => {
      if (e instanceof MouseEvent) {
        StartAndResetAll.resetAll(e);
        Winner.resetWinnerTextContent()
      }
      
    });
  }
};

export const Generate = () => {
  const generate = document.querySelector(".main__options_item-generateBtn");
  if (generate) {
    generate.addEventListener("click", () => {
      generateCars();
      updateGarageCount();
    });
  }
};

export const removeCar = (e: MouseEvent) => {
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
          .then(() => currentNode.remove())
          .then(() => updateGarageCount())

          RaceService().getAllWinners().then(data => {
              data.map(item => {
                if(item.id === +currentID) {
                  RaceService().deleteWinner(currentID)  
                }
              })
          })
          
      }
    }
  }
};

export const prevPage = () => {
  const prevBtn = document.querySelector(".main__garage_change-prev");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      PagesChange.prevPageButton()
      PagesChange.changeTextContentOfCurrentPage()
    });
  }
};


export const nextPage = () => {
  const nextBtn = document.querySelector(".main__garage_change-next");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      PagesChange.nextPageButton()
      PagesChange.changeTextContentOfCurrentPage()
    });
  }
};

