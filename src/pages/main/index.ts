import Page from "../../services/template";
import { element } from "../../services/element";
import { createAllGarageItem } from "../../components/garage";
import RaceService from "../../services/RaceService";
import Pagination from "../../components/pagination";
import { WinnerPage } from "../../pages/winners/winnerPage";

export const updateGarageCount = () => {
  let garageCount = document.querySelector(".main__garage_title");
  let winnersCount = document.querySelector(".main__winner_title");

  RaceService()
    .getAllCars()
    .then((data) => {
      if (garageCount instanceof HTMLElement) {
        garageCount.textContent = `Garage: ${data.length}`;
        let limitPerPage = 7;
        let pagesAtAll = Math.ceil(data.length / limitPerPage);
        Pagination.pagesAtAll = pagesAtAll;
      }

      RaceService()
        .getAllWinners()
        .then((data) => {
          if (winnersCount instanceof HTMLElement) {
            winnersCount.textContent = `Winners: ${data.length}`;
            let limitPerPage = 10;
            let pagesAtAll = Math.ceil(data.length / limitPerPage);
            WinnerPage.pagesAtAll = pagesAtAll;
            WinnerPage.currentArray = data;
          }
        });
    });
};
class MainPage extends Page {
  constructor(id: string) {
    super(id);
  }

  protected createHeader() {
    const header = element("header", { class: "header" });
    header.innerHTML = `
    <h1 class="header__title">Async Race</h1>    
    <div class="header__buttons">    
    <button class="button header__buttons_garage">Garage</button>
    <button class="button header__buttons_winners">Winners</button>
    </div>
    `;

    return header;
  }

  protected createMain() {
    const main = element("main", { class: "main" });
    const winnerPage = WinnerPage.createWinnerPage();

    main.append(this.createOptions());
    main.append(this.createGarage());
    main.append(this.pageChange());
    main.append(winnerPage);

    return main;
  }

  protected createOptions() {
    const options = element("div", { class: "main__options" });

    options.innerHTML = `
    <div class="main__options_item">
      <input class="main__options_item-name" placeholder="Create car name" type="text" >
      <input class="main__options_item-newcolor" value="#2ecc71" type="color" >
      <button class="button main__options_item-createBtn">Create</button>
    </div>
    <div class="main__options_item main__options_item-re">
      <input class="main__options_item-rename" placeholder="Rename car" type="text" >
      <input class="main__options_item-recolor" type="color" >
      <button class="button main__options_item-updateBtn">Update</button>
    </div>
    <div class="main__options_item main__options_item-change">      
      <button class="button main__options_item-raceBtn">Race</button>
      <button class="button main__options_item-resetBtn" disabled>Reset</button>
      <button class="button main__options_item-generateBtn">Generate cars (100)</button>
    </div>    
    `;

    return options;
  }

  protected createGarage() {
    const garage = element("div", { class: "main__garage" });

    const garageWrapper = element("div", { class: "garage__wrapper" });
    let currentPage = Pagination.currentPage;
    let count = 0;
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
    const change = element("div", { class: "main__garage_change" });

    change.innerHTML = `
      <button class="button main__garage_change-prev">Previous</button>
      <button class="button main__garage_change-next">Next</button>   
    `;
    return change;
  }

  protected createFooter() {
    const footer = element("footer", { class: "footer" });

    footer.innerHTML = `
    <div class="footer__wrapper">
    <a class="footer__wrapper_link" href="https://github.com/aleksander1802">
    <img class="footer__wrapper_github" 
       id="github" src="assets/images/github.svg">    
    </a>

    <div class="footer__wrapper_year">
        Designed by Alexander Rudenko <br> ©RSSchool 2023
    </div>

    <a class="footer__wrapper_link" href="https://rs.school/js/">
    <img class="footer__wrapper_rs footer__wrapper_link"
         src="assets/images/rs_school.svg" 
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
