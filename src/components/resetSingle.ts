
import RaceService from "../services/RaceService";




export class ResetSingle {



    static resetCurrentCar(e: MouseEvent) {
        const target = e.target;

        if (target instanceof HTMLButtonElement) {

            target.disabled = true;

            const parentNode = target.parentNode?.parentNode;

            const startButton = target.parentNode?.firstChild;

            if (startButton instanceof HTMLButtonElement) {
                startButton.disabled = false;
              }

              if (parentNode && parentNode instanceof HTMLElement) {
                const currentId = parentNode.getAttribute("id")
                const status = "stopped";
                const currentCar = parentNode.lastChild;
                const firstChild = currentCar?.childNodes[1];


                if (currentId && status) {

                    RaceService()
                    .StartOrStopEngine(currentId, status)
                    .then((data) => {
                        if (data.velocity === 0) {
                            if (firstChild instanceof HTMLElement) {
                                firstChild.style.animation = 'none'
                              }
                        }
                    })
                }
              }
            

        }




    }


}