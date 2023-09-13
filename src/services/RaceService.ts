import { useHttp } from './http.hook';

import {
	IGarage,
	ICar,
	IEngineStartOrStop,
	IEngineToDriveMode,
	IWinnersData,
} from '../models/raceModel';

const RaceService = () => {
	const { request } = useHttp();

	const _apiBase =
		process.env.API_URL || `https://async-race-api2.vercel.app/`;
	const _garage = 'garage';
	const _engine = 'engine';
	const _winners = 'winners';

	const getAllCars: () => Promise<IGarage> = async () => {
		const res = (await request(`${_apiBase}${_garage}`)) as IGarage;
		return res;
	};

	const createNewCar = async (obj: string) => {
		const res = (await request(
			`${_apiBase}${_garage}`,
			'POST',
			obj,
		)) as ICar;

		return res;
	};

	const ReUpdateCar = async (obj: string, id: string) => {
		const res = (await request(
			`${_apiBase}${_garage}/${id}`,
			'PATCH',
			obj,
		)) as ICar;

		return res;
	};

	const deleteCar = async (id: string) => {
		try {
			await request(`${_apiBase}${_garage}/${id}`, 'DELETE');
		} catch (error) {
			console.error(`Coгld not delete, error:${error}`);
		}
	};

	const getCar = async (id: string) => {
		try {
			const res = (await request(
				`${_apiBase}${_garage}/${id}`,
				'GET',
			)) as ICar;
			return res;
		} catch (error) {
			console.error(`Could not get current car, error:${error}`);
		}
	};

	const StartOrStopEngine = async (id: string, status: string) => {
		try {
			const res = (await request(
				`${_apiBase}${_engine}?id=${id}&status=${status}`,
				'PATCH',
			)) as IEngineStartOrStop;
			return res;
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(`Error in StartOrStopEngine: ${error.message}`);
			}
		}
	};

	const EngineDamage = async (id: string) => {
		try {
			const res = (await request(
				`${_apiBase}${_engine}?id=${id}&status=drive`,
				'PATCH',
			)) as IEngineToDriveMode | number;
			return res;
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(`Error in StartOrStopEngine: ${error.message}`);
			}
		}
	};

	const getAllWinners: (
		page?: number,
		limit?: number,
	) => Promise<IWinnersData[]> = async (page?: number, limit?: number) => {
		if (limit) {
			const res = (await request(
				`${_apiBase}${_winners}?_limit=${limit}`,
			)) as IWinnersData[];
			return res;
		}
		if (page) {
			const res = (await request(
				`${_apiBase}${_winners}?_page=${page}`,
			)) as IWinnersData[];
			return res;
		}
		if (page && limit) {
			const res = (await request(
				`${_apiBase}${_winners}?_page=${page}&_limit=${limit}`,
			)) as IWinnersData[];
			return res;
		}
		const res = (await request(`${_apiBase}${_winners}`)) as IWinnersData[];
		return res;
	};

	const getWinner = async (id: string) => {
		try {
			const res = (await request(
				`${_apiBase}${_winners}/${id}`,
			)) as IWinnersData;

			return res;
		} catch (error) {
			const er = 'error';
			if (error instanceof Error) {
				console.error(`Такого победителя нет: ${error.message}`);
			}
			return er;
		}
	};

	const createNewWinner = async (obj: string) => {
		const res = (await request(
			`${_apiBase}${_winners}`,
			'POST',
			obj,
		)) as IWinnersData;
		return res;
	};

	const updateWinner = async (obj: string, id: number) => {
		const res = (await request(
			`${_apiBase}${_winners}/${id}`,
			'PUT',
			obj,
		)) as IWinnersData;

		return res;
	};

	const deleteWinner = async (id: string) => {
		await request(`${_apiBase}${_winners}/${id}`, 'DELETE');
	};

	return {
		getAllCars,
		deleteCar,
		createNewCar,
		ReUpdateCar,
		StartOrStopEngine,
		EngineDamage,
		getCar,
		getAllWinners,
		getWinner,
		createNewWinner,
		updateWinner,
		deleteWinner,
	};
};

export default RaceService;
