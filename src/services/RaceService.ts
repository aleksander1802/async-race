import { useHttp } from "./http.hook";
import { WinnerPage } from "../pages/winners/winnerPage";
import {
  IGarage,  
  ICar,
  IEngineStartOrStop,
  IEngineToDriveMode,
  IWinnersData,
  IUpdateWinner
} from "../models/raceModel";

const RaceService = () => {
  const { request } = useHttp();

  const _apiBase = "http://127.0.0.1:3000/";
  const _garage = "garage";
  const _engine = "engine";
  const _winners = 'winners'
  const _page = WinnerPage.currentPage;  

  const getAllCars: () => Promise<IGarage> = async () => {
    const res = await request(`${_apiBase}${_garage}`);
    return res;
  };

  const createNewCar = async (obj: string) => {
    const res: ICar = await request(`${_apiBase}${_garage}`, "POST", obj);

    return res;
  };

  const ReUpdateCar = async (obj: string, id: string) => {
    const res: ICar = await request(
      `${_apiBase}${_garage}/${id}`,
      "PATCH",
      obj
    );

    return res;
  };

  const deleteCar = async (id: string) => {
    try {
      const res: void = await request(`${_apiBase}${_garage}/${id}`, "DELETE");
      
    } catch (error) {
      throw new Error(`Coold not delete, error:${error}`);
    }
  };

  const getCar = async (id: string) => {    
    
    try {
      const res: ICar = await request(`${_apiBase}${_garage}/${id}`, "GET");
      return res
    } catch (error) {
      throw new Error(`Coold not get current car, error:${error}`);
    }
  };

  const StartOrStopEngine = async (id: string, status: string) => {
    const res: IEngineStartOrStop = await request(
      `${_apiBase}${_engine}?id=${id}&status=${status}`,
      "PATCH"
    );
    return res;
  };

  const EngineDamage = async (id: string) => {
    try {
      const res: IEngineToDriveMode | number = await request(
        `${_apiBase}${_engine}?id=${id}&status=drive`,
        "PATCH"
      );
      return res
    } catch (error ) {
      if (error instanceof Error) {
        console.log(`Слишком быстро останавливаешь двигатель, лови ошибку и описание: ${error.message}`);        
      }
    }    
  };

  const getAllWinners: (page?: number, limit?:number) => Promise<IWinnersData[]> = async (page?: number, limit?:number) => {

    if (limit) {
      const res: IWinnersData[] = await request(`${_apiBase}${_winners}?_limit=${limit}`);     
      return res;
    } else if (page) {
      const res: IWinnersData[] = await request(`${_apiBase}${_winners}?_page=${page}`);     
      return res;
    } else if (page && limit) {
      const res: IWinnersData[] = await request(`${_apiBase}${_winners}?_page=${page}&_limit=${limit}`);     
      return res;
    } else {
      const res: IWinnersData[] = await request(`${_apiBase}${_winners}`);     
      return res;
    }  
    
  };

  const getWinner = async (id: string) => {

    try {
      const res: IWinnersData = await request(`${_apiBase}${_winners}/${id}`); 
    
      return res;
    } catch (error) {
      let er = 'error'
      if (error instanceof Error) {
        console.log(`Такого победителя нет: ${error.message}`);        
      }
      return er
    }    
  };

  const createNewWinner = async (obj: string) => {
    const res: IWinnersData = await request(`${_apiBase}${_winners}`, "POST", obj);
    return res;
  };

  const updateWinner = async (obj: string, id: number) => {
    const res: IWinnersData = await request(`${_apiBase}${_winners}/${id}`, "PUT", obj);

    return res;
  };

  const deleteWinner = async (id: string) => {

    await request(`${_apiBase}${_winners}/${id}`, "DELETE");
    
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
    deleteWinner
  };
};

export default RaceService;
