import { IWinner } from '../models/raceModel';
import RaceService from '../services/RaceService';

export class Winner {
	static async winnerTextContent(obj: IWinner) {
		const mainGarageTitleWinner = document.querySelector(
			'.main__garage_title-winner',
		);

		if (mainGarageTitleWinner) {
			try {
				const data = await RaceService().getCar(obj.currentId);
				if (data) {
					mainGarageTitleWinner.textContent = `Winner: ${
						data.name
					} Time: ${obj.animationSpeed.toFixed(5)} seconds`;
				}
				setTimeout(() => {
					mainGarageTitleWinner.textContent = '';
				}, 5000);
			} catch (error) {
				console.error(error);
			}
		}
	}

	static resetWinnerTextContent() {
		const mainGarageTitleWinner = document.querySelector(
			'.main__garage_title-winner',
		);
		if (mainGarageTitleWinner) {
			mainGarageTitleWinner.textContent = '';
		}
	}
}
