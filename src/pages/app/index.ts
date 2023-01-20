import Page from "../../services/template";
import MainPage from "../../pages/main";
import { Create, toGarage, toWinners, Update, Race, Reset, Generate, prevPage, nextPage } from "../../pages/main/listeners";
class App {
    private  container: HTMLElement = document.body;
    private  defaultPageID = 'current-page'

    private renderPage(idPage: string) { 
        
        const currentPageHTML = document.querySelector(`#${this.defaultPageID}`);
        
        if (currentPageHTML) {
            currentPageHTML.remove();
        }

        let page: Page | null = new MainPage(idPage);
         

        if (page) {            
            const PageHTML = page.render();
            PageHTML.id = this.defaultPageID             
            this.container.append(PageHTML)
        }
    }

    private launchListeners() {
        toGarage();
        toWinners();
        Create();
        Update();
        Race();
        Reset();
        Generate();  
        prevPage();
        nextPage()  
    }

    private enableRouteChangeReload() {
        window.addEventListener('DOMContentLoaded', this.launchListeners)
    }        
        
    private hashChangeHandle() { 
        this.renderPage(this.defaultPageID)
        this.enableRouteChangeReload() 
    }   

    run() { 
        this.hashChangeHandle();        
    }
    
}

export default App;