import RaceService from "../services/RaceService";
import {
  IEngineStartOrStopRequest,
  IEngineToDriveMode,
} from "../models/raceModel";
import { element } from "../services/element";
import { StartAll } from "./startAll";

export class StartSingle {
  static start(e: MouseEvent) {
    const target = e.target;

    if (target instanceof HTMLButtonElement) {
      target.disabled = true;
      const parentNode = target.parentNode?.parentNode;

      const resButton = target.parentNode?.lastChild;
      if (resButton instanceof HTMLButtonElement) {
        resButton.disabled = false;
      }

      if (parentNode && parentNode instanceof HTMLElement) {
        const currentId = parentNode.getAttribute("id");
        const status = "started";
        const currentCar = parentNode.lastChild;
        const firstChild = currentCar?.childNodes[1];
        let animationSpeed: number;

        if (currentId && status) {
          RaceService()
            .StartOrStopEngine(currentId, status)
            .then((data) => {
              animationSpeed = data.distance / data.velocity / 1000;
            })
            .then(() => {
              if (firstChild instanceof HTMLElement) {
                firstChild.style.animation = `${animationSpeed}s linear forwards swipeToRight`;
              }
              return RaceService().EngineDamage(currentId);
            })
            .then((data) => {
              const damageEngineCode = 500;

              const firstChild = currentCar?.childNodes[1];
              if (data === damageEngineCode) {
                if (firstChild instanceof HTMLElement) {
                  firstChild.style.animationPlayState = `paused`;
                }
              }

              return data;
            })
            .then((data) => {
              if (data instanceof Object) {
                if (StartAll.winners.length === 0) {
                  let winner = {
                    currentId: `${currentId}`,
                    animationSpeed: animationSpeed,
                  };
                  StartAll.winners.push(winner);
                  console.log(StartAll.winners);
                  if (StartAll.winners.length >= 1) {
                    return;
                  }
                }
              }
            });
        }
      }
    }
  }
}
