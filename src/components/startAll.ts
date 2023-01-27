import { nextPage } from '../pages/main/listeners';
import { IWinner } from '../models/raceModel';

export class StartAndResetAll {
  static winners: IWinner[] = [
    { currentId: '3', animationSpeed: 4.385964912280701 },
  ];

  static startAll(e: MouseEvent) {
    StartAndResetAll.winners.length = 0;

    const activateAllButtons = document.querySelectorAll(
      '.garage__item_config-startBtn',
    );
    const resetBigButton = document.querySelector(
      '.main__options_item-resetBtn',
    );
    const nextPageButton = document.querySelector('.main__garage_change-next');
    const prevPageButton = document.querySelector('.main__garage_change-prev');
    if (
      nextPageButton instanceof HTMLButtonElement
      && prevPageButton instanceof HTMLButtonElement
    ) {
      nextPageButton.disabled = true;
      prevPageButton.disabled = true;
      nextPageButton.setAttribute(
        'title',
        'Преждем чем переключить страницу, пожалуйста, нажмите кнопку Reset',
      );
      prevPageButton.setAttribute(
        'title',
        'Преждем чем переключить страницу, пожалуйста, нажмите кнопку Reset',
      );
    }

    const { target } = e;
    const event = new Event('click');

    if (
      target instanceof HTMLButtonElement
      && resetBigButton instanceof HTMLButtonElement
    ) {
      target.disabled = true;
      resetBigButton.disabled = false;
    }

    activateAllButtons.forEach((item) => {
      item.dispatchEvent(event);
    });
  }

  static resetAll(e: MouseEvent) {
    const resetAllButtons = document.querySelectorAll(
      '.garage__item_config-resetBtn',
    );
    const activateRaceBigButton = document.querySelector(
      '.main__options_item-raceBtn',
    );
    const nextPageButton = document.querySelector('.main__garage_change-next');
    const prevPageButton = document.querySelector('.main__garage_change-prev');
    if (
      nextPageButton instanceof HTMLButtonElement
      && prevPageButton instanceof HTMLButtonElement
    ) {
      nextPageButton.disabled = false;
      prevPageButton.disabled = false;
      nextPageButton.setAttribute('title', '');
      prevPageButton.setAttribute('title', '');
    }

    const { target } = e;

    const event = new Event('click');

    if (
      target instanceof HTMLButtonElement
      && activateRaceBigButton instanceof HTMLButtonElement
    ) {
      target.disabled = true;
      activateRaceBigButton.disabled = false;
    }

    resetAllButtons.forEach((item) => {
      item.dispatchEvent(event);
    });
  }
}
