import { IWinner } from "../models/raceModel";

export class StartAll { 
    
    static winners: IWinner[] = []
    
    static startAll () {
        
        StartAll.winners.length = 0

        const activateAllButtons = document.querySelectorAll(".garage__item_config-startBtn");

        let event = new Event("click");

        activateAllButtons.forEach(item => {
             item.dispatchEvent(event);
        })
    }

}