import RaceService from '../services/RaceService';

export class ResetSingle {
	static async resetCurrentCar(e: MouseEvent) {
		const { target } = e;

		if (target instanceof HTMLButtonElement) {
			target.disabled = true;

			const parentNode = target.parentNode?.parentNode;

			const startButton = target.parentNode?.firstChild;

			if (startButton instanceof HTMLButtonElement) {
				startButton.disabled = false;
			}

			if (parentNode && parentNode instanceof HTMLElement) {
				const currentId = parentNode.getAttribute('id');
				const status = 'stopped';
				const currentCar = parentNode.lastChild;
				const firstChild = currentCar?.childNodes[1];

				if (currentId && status) {
					try {
						const raceService = RaceService(); // Вызываем RaceService
						if (
							typeof raceService.StartOrStopEngine === 'function'
						) {
							const data = await raceService.StartOrStopEngine(
								currentId,
								status,
							);

							if (data?.velocity === 0) {
								if (firstChild instanceof HTMLElement) {
									firstChild.style.animation = 'none';
								}
							} else {
								console.error('Data is undefined');
							}
						} else {
							console.error(
								'StartOrStopEngine is not a function',
							);
						}
					} catch (error) {
						console.error('Error:', error);
					}
				}
			}
		}
	}
}
