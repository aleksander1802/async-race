
import { useHttp } from "./http.hook";
import {IGarage, iCreateNewCar, ICar} from '../models/raceModel';

const RaceService = () => {

   const {request} = useHttp();

   const _apiBase = 'http://127.0.0.1:3000/'
   const _garage = 'garage';

   const _page = 1;
   const _limit = 10;

    const getAllCars: () => Promise<IGarage> = async () => {
        const res = await request(`${_apiBase}${_garage}?_page=${_page}`);        
        return res
    }    

    const deleteCar = async (id: string) => {
        await request(`${_apiBase}${_garage}/${id}`, 'DELETE');
    }  

    const createNewCar = async (obj: string) => {
        const res: ICar = await request(`${_apiBase}${_garage}`, 'POST', obj);        
        
        return res
    }  

    return {getAllCars, deleteCar, createNewCar}

}

export default RaceService;