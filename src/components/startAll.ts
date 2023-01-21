import { IWinner } from "../models/raceModel";

export class StartAndResetAll { 
    
    static winners: IWinner[] = [{currentId: '3', animationSpeed: 4.385964912280701}]
    
    static startAll (e: MouseEvent) {
        
        StartAndResetAll.winners.length = 0

        const activateAllButtons = document.querySelectorAll(".garage__item_config-startBtn");
        const resetBigButton = document.querySelector('.main__options_item-resetBtn');

        const target = e.target;
        let event = new Event("click");

        if (target instanceof HTMLButtonElement && resetBigButton instanceof HTMLButtonElement) {
            target.disabled = true;
            resetBigButton.disabled = false;
        }

        activateAllButtons.forEach(item => {
             item.dispatchEvent(event);
        })
    }

    static resetAll (e: MouseEvent) {
        const resetAllButtons = document.querySelectorAll(".garage__item_config-resetBtn");
        const activateRaceBigButton = document.querySelector('.main__options_item-raceBtn');
        
        
        const target = e.target;

        let event = new Event("click");

        if (target instanceof HTMLButtonElement && activateRaceBigButton instanceof HTMLButtonElement) {
            target.disabled = true;
            activateRaceBigButton.disabled = false;
        }

        resetAllButtons.forEach(item => {
            item.dispatchEvent(event);
       })

    }

}