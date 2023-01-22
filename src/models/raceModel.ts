export type IGarage = [
  {
    name: string;
    color: string;
    id: number;
  }
];

export type ICurrentArray = {
  name: string;
  color: string;
  id: number;
}[];

export type ICar = {
  name: string;
  color: string;
  id: number;
};

export interface IEngineStartOrStop {
  velocity: number;
  distance: number;
}
export interface IEngineStartOrStopRequest {
  id: number;
  status: string;
}

export interface IEngineToDriveMode {
  success: boolean;
}

export interface iCreateNewCar {
  name: string;
  color: string;
}

export type IWinner = {
  currentId: string;
  animationSpeed: number;
};

export interface IWinnersData {
  id: number;
  wins: number;
  time: number;
}

export interface IUpdateWinner {
  wins: number;
  time: number;
}
