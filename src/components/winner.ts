import { IWinner, ICar } from "../models/raceModel";
import RaceService from "../services/RaceService";

export class Winner {
  static winnerTextContent(obj: IWinner) {
    const mainGarageTitleWinner = document.querySelector(
      ".main__garage_title-winner"
    );

    if (mainGarageTitleWinner) {
      RaceService()
        .getCar(obj.currentId)
        .then((data) => {
          mainGarageTitleWinner.textContent = `Winner: ${
            data.name
          } Time: ${obj.animationSpeed.toFixed(2)} seconds`;
          setTimeout(() => {
            mainGarageTitleWinner.textContent = "";
          }, 5000);
        });
    }
  }

  static resetWinnerTextContent() {
    const mainGarageTitleWinner = document.querySelector(
      ".main__garage_title-winner"
    );
    if (mainGarageTitleWinner) {
      mainGarageTitleWinner.textContent = ``;
    }
  }
}
