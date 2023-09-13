import { element } from '../../services/element';
import { IWinner, IWinnersData, IUpdateWinner } from '../../models/raceModel';
import RaceService from '../../services/RaceService';
import { sortByTime, sortByWins } from '../main/listeners';
import { winnerSvg } from './svg';

export class WinnerPage {
	static numberWinner = 0;

	static currentPage = 1;

	static pagesAtAll: number;

	static sortWins = 'asc';

	static sortTime = 'asc';

	static currentArray: IWinnersData[];

	static hideWinnerPage() {
		const winnerPage = document.querySelector('.main__winner');
		const mainPage = document.querySelector('.main');
		const buttons = document.querySelectorAll('.winner__button');
		const buttonWinner = document.querySelectorAll(
			'.buttonChangeTransition',
		);
		const mainPageButtonChange = document.querySelectorAll(
			'.mainPageButtonChange',
		);

		mainPageButtonChange.forEach((item) => {
			if (item instanceof HTMLButtonElement) {
				item.style.transition = 'all .6s linear 0s';
			}
		});

		if (
			winnerPage instanceof HTMLElement &&
			mainPage instanceof HTMLElement
		) {
			mainPage.style.visibility = 'visible';
			winnerPage.style.visibility = 'hidden';

			buttonWinner.forEach((item) => {
				if (item instanceof HTMLButtonElement) {
					item.style.transition = 'all .0s linear 0s';
				}
			});

			buttons.forEach((item) => {
				if (item instanceof HTMLButtonElement) {
					item.style.transition = 'all .0s linear 0s';
				}
			});
		}
	}

	static hideMainPage() {
		const winnerPage = document.querySelector('.main__winner');
		const mainPage = document.querySelector('.main');
		const buttons = document.querySelectorAll('.winner__button');
		const buttonWinner = document.querySelectorAll(
			'.buttonChangeTransition',
		);
		const mainPageButtonChange = document.querySelectorAll(
			'.mainPageButtonChange',
		);

		mainPageButtonChange.forEach((item) => {
			if (item instanceof HTMLButtonElement) {
				item.style.transition = 'all .0s linear 0s';
			}
		});

		if (
			mainPage instanceof HTMLElement &&
			winnerPage instanceof HTMLElement
		) {
			winnerPage.style.visibility = 'visible';
			mainPage.style.visibility = 'hidden';

			buttonWinner.forEach((item) => {
				if (item instanceof HTMLButtonElement) {
					item.style.transition = 'all .6s linear 0s';
				}
			});

			buttons.forEach((item) => {
				if (item instanceof HTMLButtonElement) {
					item.style.transition = 'all .6s linear 0s';
				}
			});
		}
	}

	static createWinnerPage() {
		const winner = element('div', { class: 'main__winner' });
		const winnersBtnItems = element('div', { class: 'winner__items' });

		const winsBtn = element('button', {
			class: 'button winner__button winner__items_wins',
		});
		winsBtn.textContent = 'Wins';
		const timeBtn = element('button', {
			class: 'button winner__button winner__items_time',
		});
		timeBtn.textContent = 'Best time (seconds)';

		winsBtn.addEventListener('click', () => {
			sortByWins();
		});
		timeBtn.addEventListener('click', () => {
			sortByTime();
		});

		if (winner instanceof HTMLElement) {
			winner.style.visibility = 'hidden';
		}

		const winnerWrapper = element('div', {
			class: 'winner__items_wrapper',
		});
		const count = 1;

		winner.innerHTML = `
        <h2 class="main__winner_title">Winners: ${count}</h2>        
        <div class="main__winner_page">Page 1</div>         
        `;

		winnersBtnItems.innerHTML = `
    <button class="button winner__button winner__items_number">Number</button>
        <button class="button winner__button winner__items_car">Car</button>
        <button class="button winner__button winner__items_name">Name</button>
    `;
		winnersBtnItems.append(winsBtn);
		winnersBtnItems.append(timeBtn);
		winner.append(winnersBtnItems);

		winner.append(winnerWrapper);

		RaceService()
			.getAllWinners(WinnerPage.currentPage, 10)
			.then((data) => WinnerPage.createAllWinnersItem(data))
			.then((data) => winnerWrapper.append(data))
			.then(() => winner.append(WinnerPage.pageWinnerChange()));
		return winner;
	}

	static pageWinnerChange() {
		const change = element('div', { class: 'main__winner_change' });
		const prev = element('button', {
			class: 'button buttonChangeTransition main__winner_change-prev',
		});
		prev.textContent = 'Previous';

		const next = element('button', {
			class: 'button buttonChangeTransition main__winner_change-next',
		});
		next.textContent = 'Next';

		prev.addEventListener('click', () => {
			WinnerPage.prevWinnerPage();
		});

		next.addEventListener('click', () => {
			WinnerPage.nextWinnerPage();
		});

		change.append(prev);
		change.append(next);

		return change;
	}

	static nextWinnerPage() {
		const { currentPage } = WinnerPage;
		const { pagesAtAll } = WinnerPage;
		const winnerPageCount = document.querySelector('.main__winner_page');
		const currentNode = document.querySelector('.winner__items_wrapper');

		if (currentPage === pagesAtAll) {
		} else {
			WinnerPage.currentPage += 1;
			WinnerPage.numberWinner = 0;

			if (winnerPageCount) {
				winnerPageCount.textContent = `Page ${WinnerPage.currentPage}`;
			}
			RaceService()
				.getAllWinners(WinnerPage.currentPage)
				.then((data) => {
					WinnerPage.currentArray = data;

					if (currentNode) {
						currentNode.innerHTML = '';
						const newList = WinnerPage.createAllWinnersItem(data);
						currentNode.append(newList);
					}
				});
		}
	}

	static prevWinnerPage() {
		const currentNode = document.querySelector('.winner__items_wrapper');
		const winnerPageCount = document.querySelector('.main__winner_page');
		if (WinnerPage.currentPage === 1) {
		} else {
			WinnerPage.currentPage -= 1;
			WinnerPage.numberWinner = 0;

			if (winnerPageCount) {
				winnerPageCount.textContent = `Page ${WinnerPage.currentPage}`;
			}
			RaceService()
				.getAllWinners(WinnerPage.currentPage)
				.then((data) => {
					WinnerPage.currentArray = data;

					if (currentNode) {
						currentNode.innerHTML = '';
						const newList = WinnerPage.createAllWinnersItem(data);
						currentNode.append(newList);
					}
				});
		}
	}

	static createAllWinnersItem = (array: IWinnersData[]) => {
		const items = element('ul', { class: 'winner__wrapper' });

		const render = array.map((item) => {
			const renderItem = WinnerPage.createWinnerItem(item);
			return renderItem;
		});

		items.append(...render);

		return items;
	};

	static createWinnerItem(obj: IWinnersData) {
		const item = element('li', {
			class: 'winner__wrapper_item',
			id: `${obj.id}`,
		});
		const SVG = WinnerPage.winnerSVG(obj);
		const stringID = `${obj.id}`;
		const { time } = obj;

		const pageNumber =
			WinnerPage.currentPage === 1
				? (WinnerPage.numberWinner += 1)
				: WinnerPage.currentPage === 2
				? 10 + (WinnerPage.numberWinner += 1)
				: (WinnerPage.currentPage - 1) * 10 +
				  (WinnerPage.numberWinner += 1);

		RaceService()
			.getCar(stringID)
			.then((data) => {
				if (data) {
					item.innerHTML = `
              <div class="winner__wrapper_item-id">${pageNumber}</div> 
          `;
					item.append(SVG);

					const winnerName = element('div', {
						class: 'winner__wrapper_item-name',
					});
					winnerName.textContent = data.name;
					const winnerWins = element('div', {
						class: 'winner__wrapper_item-wins',
					});
					winnerWins.textContent = `${obj.wins}`;
					const winnerTime = element('div', {
						class: 'winner__wrapper_item-time',
					});
					winnerTime.textContent = `${time}`;
					item.append(winnerName);
					item.append(winnerWins);
					item.append(winnerTime);
				}
			});

		return item;
	}

	static createWinner(obj: IWinner) {
		const currentWinnerID = `${obj.currentId}`;

		RaceService()
			.getWinner(currentWinnerID)
			.then((data) => {
				if (data === 'error') {
					const newWinner: IWinnersData = {
						id: +obj.currentId,
						wins: 1,
						time: obj.animationSpeed,
					};

					const json = JSON.stringify(newWinner);

					RaceService()
						.createNewWinner(json)
						.then((data) => {
							const listItem = WinnerPage.createWinnerItem(data);

							if (
								(WinnerPage.currentPage ===
									WinnerPage.pagesAtAll &&
									WinnerPage.currentArray.length < 10) ||
								WinnerPage.pagesAtAll === 0
							) {
								const currentNode =
									document.querySelector('.winner__wrapper');
								if (currentNode) {
									currentNode.append(listItem);
								}
							}
						})
						.then(() => {
							WinnerPage.updateWinnerCount();
							RaceService()
								.getAllWinners(WinnerPage.currentPage)
								.then((data) => {
									WinnerPage.currentArray = data;
								});
						});
				} else {
					WinnerPage.numberWinner = 0;
					if (data instanceof Object) {
						const currentTime = obj.animationSpeed;
						const dataTime = data.time;
						const newTime = Math.min(currentTime, dataTime);
						const currentId = data.id;

						const wrapper =
							document.querySelector('.winner__wrapper');

						const newWinner: IUpdateWinner = {
							wins: (data.wins += 1),
							time: newTime,
						};

						const json = JSON.stringify(newWinner);
						RaceService()
							.updateWinner(json, currentId)
							.then(() => {
								RaceService()
									.getAllWinners(WinnerPage.currentPage)
									.then((data) => {
										WinnerPage.currentArray = data;
										const newListItem =
											WinnerPage.createAllWinnersItem(
												data,
											);
										if (
											wrapper &&
											wrapper instanceof HTMLElement
										) {
											wrapper.innerHTML = '';
											wrapper.append(newListItem);
										}
									});
							});
					}
				}
			});
	}

	static updateWinnerCount() {
		const winnersCount = document.querySelector('.main__winner_title');
		RaceService()
			.getAllWinners()
			.then((data) => {
				if (winnersCount instanceof HTMLElement) {
					winnersCount.textContent = `Winners: ${data.length}`;
					const limitPerPage = 10;
					const pagesAtAll = Math.ceil(data.length / limitPerPage);
					WinnerPage.pagesAtAll = pagesAtAll;
				}
			});
	}

	static winnerSVG(item: IWinnersData) {
		const winnerItemConfig = element('div', {
			class: 'winner__wrapper_item-svg',
		});
		const stringID = `${item.id}`;

		RaceService()
			.getCar(stringID)
			.then((data) => {
				if (data)
					winnerItemConfig.innerHTML = ` 
            ${winnerSvg(data)}  
                   
          `;
			});

		return winnerItemConfig;
	}
}
