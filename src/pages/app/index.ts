import Page from "../../services/template";
import MainPage from "../../pages/main";

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
        
        
    private hashChangeHandle() { 
        this.renderPage(this.defaultPageID)
    }   

    run() {
        // App.container.append(this.footer.render());        
         
        this.hashChangeHandle();         
    }
    
}

export default App;