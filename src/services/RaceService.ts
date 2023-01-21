import { useHttp } from "./http.hook";
import {
  IGarage,
  iCreateNewCar,
  ICar,
  IEngineStartOrStop,
  IEngineToDriveMode,
} from "../models/raceModel";

const RaceService = () => {
  const { request } = useHttp();

  const _apiBase = "http://127.0.0.1:3000/";
  const _garage = "garage";
  const _engine = "engine";

  let page = 1;
  const _limit = 7;

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

  return {
    getAllCars,
    deleteCar,
    createNewCar,
    ReUpdateCar,
    StartOrStopEngine,
    EngineDamage,
    getCar
  };
};

export default RaceService;
