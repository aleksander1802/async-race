
import { iCreateNewCar, SvgIconConstituentValues } from './../models/raceModel';
import ReUpdateCar from './../services/RaceService'
import RaceService from "../services/RaceService";
// import { Config } from "../../pages/main/listeners";




class UpdateCar {
  static inputReNameValue: string = "";
  static inputReColorValue: string = "#000000";
  static currentID: string = ""; 
  static currentNodeChild: HTMLElement | null;
  static currentSVGNodeElement: SVGElement | null;
  
   
   

  static updateNewCar = () => {

    const nameInputBtn = document.querySelector(
      ".main__options_item-updateBtn"
    );
    const currentNameInputValue = document.querySelector(
      ".main__options_item-rename"
    );    

    if (UpdateCar.inputReNameValue.length === 0 || UpdateCar.currentID.length === 0) {
      nameInputBtn?.classList.add("mistake");
      return;
    } else {
      nameInputBtn?.classList.remove("mistake");
    }

    if (UpdateCar.currentNodeChild) {
      UpdateCar.currentNodeChild.textContent = UpdateCar.inputReNameValue
    }

    if (UpdateCar.currentSVGNodeElement instanceof SVGElement) {
     UpdateCar.currentSVGNodeElement.setAttribute('fill', UpdateCar.inputReColorValue)      
    }

     

    const newCar: iCreateNewCar = {
      name: UpdateCar.inputReNameValue,
      color: UpdateCar.inputReColorValue,
    };

    const json = JSON.stringify(newCar);

     RaceService()
       .ReUpdateCar(json, this.currentID) 
    
    if (currentNameInputValue instanceof HTMLInputElement) {
      currentNameInputValue.value = "";
    }    
    
    
    UpdateCar.inputReNameValue = "";
    UpdateCar.currentID = "";
    UpdateCar.currentNodeChild = null
  };
}

export default UpdateCar;
