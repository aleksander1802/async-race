import Page from '../../services/template';
import { element } from '../../services/element';
import RaceService from '../../services/RaceService';
import Pagination from '../../components/pagination';
import { WinnerPage } from '../winners/winnerPage';

const raceService = RaceService();

const limitPerPageCars = 7;
const limitPerPageWinners = 10;

export const updateGarageCount = async () => {
  const garageCount = document.querySelector('.main__garage_title') as HTMLElement | null;
  const winnersCount = document.querySelector('.main__winner_title') as HTMLElement | null;

  try {
    const [carsData, winnersData] = await Promise.all([
      raceService.getAllCars(),
      raceService.getAllWinners(),
    ]);

    updateGarageCountDisplay(garageCount, carsData.length);
    updateWinnersCountDisplay(winnersCount, winnersData.length);
    updatePagination(carsData, winnersData);
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateGarageCountDisplay = (element: HTMLElement | null, count: number) => {
  if (element instanceof HTMLElement) {
    element.textContent = `Garage: ${count}`;
  }
};

const updateWinnersCountDisplay = (element: HTMLElement | null, count: number) => {
  if (element instanceof HTMLElement) {
    element.textContent = `Winners: ${count}`;
  }
};

const updatePagination = (carsData: any[], winnersData: any[]) => {
  const pagesAtAllCars = Math.ceil(carsData.length / limitPerPageCars);
  const pagesAtAllWinners = Math.ceil(winnersData.length / limitPerPageWinners);

  Pagination.pagesAtAll = pagesAtAllCars;
  WinnerPage.pagesAtAll = pagesAtAllWinners;
  WinnerPage.currentArray = winnersData;
};

class MainPage extends Page {
  constructor(id: string) {
    super(id);
  }

  protected createHeader() {
    const header = element('header', { class: 'header' });
    header.innerHTML = `
    <h1 class="header__title">Async Race</h1>    
    <div class="header__buttons"> 
    <button class="cybr-btn header__buttons_garage">Garage<span aria-hidden>_</span>
      <span aria-hidden class="cybr-btn__glitch">Garage_</span>
      <span aria-hidden class="cybr-btn__tag">R25</span>
      </button>   
      <button class="cybr-btn header__buttons_winners">
      Winners<span aria-hidden>_</span>
      <span aria-hidden class="cybr-btn__glitch">Winners_</span>
      <span aria-hidden class="cybr-btn__tag">R25</span>
      </button> 
    </div>
    `;

    return header;
  }

  protected createMain() {
    const main = element('main', { class: 'main' });
    const winnerPage = WinnerPage.createWinnerPage();

    main.append(this.createOptions());
    main.append(this.createGarage());
    main.append(this.pageChange());
    main.append(winnerPage);

    return main;
  }

  protected createOptions() {
    const options = element('div', { class: 'main__options' });

    options.innerHTML = `
    <div class="main__options_item">
      <input class="main__options_item-name" placeholder="Create car name" type="text" >
      <input class="main__options_item-newcolor" value="#ff0000" type="color" >
      <button class="button main__options_item-createBtn">Create</button>
    </div>
    <div class="main__options_item main__options_item-re">
      <input class="main__options_item-rename" placeholder="Rename car" type="text" >
      <input class="main__options_item-recolor" value="#5900ff" type="color" >
      <button class="button main__options_item-updateBtn">Update</button>
    </div>
    <div class="main__options_item main__options_item-change">      
      <button class="button main__options_item-raceBtn">Race</button>
      <button class="button main__options_item-resetBtn" disabled>Reset</button>
      <button class="button main__options_item-generateBtn">Generate cars</button>
    </div>    
    `;

    return options;
  }

  protected createGarage() {
    const garage = element('div', { class: 'main__garage' });

    const garageWrapper = element('div', { class: 'garage__wrapper' });
    const { currentPage } = Pagination;
    const count = 0;
    garage.innerHTML = `
    <h2 class="main__garage_title">Garage ${count}</h2>
    <div class="main__garage_title-winner"></div>
    <div class="main__garage_page">Page 1</div>    
    `;
    garage.append(garageWrapper);

    RaceService()
      .getAllCars()
      .then((data) => Pagination.renderItems(data, currentPage))
      .then((data) => garageWrapper.append(data))
      .then(() => updateGarageCount());

    return garage;
  }

  protected pageChange() {
    const change = element('div', { class: 'main__garage_change' });

    change.innerHTML = `
      <button class="cybr-btn main__garage_change-prev">Prev<span aria-hidden>_</span>
      <span aria-hidden class="cybr-btn__glitch">Prev_</span>
      <span aria-hidden class="cybr-btn__tag">R25</span>
      </button>   
      <button class="cybr-btn main__garage_change-next">
      Next<span aria-hidden>_</span>
      <span aria-hidden class="cybr-btn__glitch">Next_</span>
      <span aria-hidden class="cybr-btn__tag">R25</span>
      </button> 
    `;
    return change;
  }

  protected createFooter() {
    const footer = element('footer', { class: 'footer' });

    footer.innerHTML = `
    <div class="footer__wrapper">
    <a class="footer__wrapper_link" href="https://github.com/aleksander1802">
    <img class="footer__wrapper_github" 
       id="github" src="./assets/images/github.svg">    
    </a>

    <div class="footer__wrapper_year">
        Designed by Alexander Rudenko <br> ©RSSchool 2023
    </div>

    <a class="footer__wrapper_link" href="https://rs.school/js/">
    <img class="footer__wrapper_rs footer__wrapper_link"
         src="./assets/images/rs_school.svg" 
         alt="rs school course link">
    </a>
    </div>
    `;

    return footer;
  }

  render() {
    this.container.append(this.createHeader());
    this.container.append(this.createMain());
    this.container.append(this.createFooter());

    return this.container;
  }
}

export default MainPage;
