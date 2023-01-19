import { IGarage, ICar } from "../models/raceModel";
import { element } from "../services/element";
import { removeCar, selectCar } from "../pages/main/listeners";

export const createAllGarageItem = (array: IGarage) => {
  const items = element("ul", { class: "garage__items" });

  const render = array.map((item) => {
    const renderItem = createGarageItem(item);
    return renderItem;
  });

  items.append(...render);

  return items;
};

function garageItemConfig(item: ICar) {
  const garageItemConfig = element("div", { class: "garage__item_config" });
  garageItemConfig.innerHTML = `
          <div class="garage__item_config-img" id=${item.id}>
          <svg
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="130"
          height="50"
          viewBox="-0.52 -0.464 511 330"
          id="svg2"
          fill=${item.color}
          xml:space="preserve"><defs
            id="defs4" /><path
            d="M 236.54427,9.8485 C 220.2445,9.8485 204.45277,15.405415 191.41289,25.550223 L 97.337229,97.995127 L -135.0706,131.12201 C -150.90459,133.65817 -161.13586,149.44963 -156.32358,165.14237 L -132.57022,244.60846 L -86.188678,244.60846 C -90.823109,289.62242 -60.00389,319.2235 -20.679452,319.2235 C 18.644986,319.2235 49.844083,285.73585 44.829779,244.60846 L 425.19586,244.60846 C 419.65783,289.49008 452.23789,319.2235 490.70508,319.2235 C 529.17227,319.2235 561.22444,285.70267 556.21433,244.60846 L 651.04018,244.60846 C 659.88863,244.60846 667.48002,236.98237 667.48,227.63005 L 667.48,137.76012 C 667.48,129.20037 661.30023,122.08284 653.22799,120.97335 L 491.76774,97.995127 L 427.82125,32.635149 C 413.84999,18.051989 394.74442,10.165524 374.56372,9.8485 L 236.54427,9.8485 z M 304.42883,37.42226 L 378.62679,37.42226 C 389.64854,37.42226 399.73373,43.261111 405.94316,52.613356 L 424.25825,80.825395 C 428.78955,88.722668 423.85522,96.409133 415.38198,97.803717 L 304.42883,97.803717 L 304.42883,37.42226 z M 224.60508,37.549916 L 283.42586,37.549916 L 283.42586,97.803717 L 132.59212,97.803717 L 200.10167,45.97523 C 207.08728,40.585799 215.91189,37.549914 224.60508,37.549916 z"
            id="path12" /></svg>
          </div>        
        `;
  return garageItemConfig;
}

const garageItemConfigBtns = () => {
  const item = element("div", { class: "garage__item_config-btns" });
  const itemStartBtn = element("button", {
    class: "button garage__item_config-startBtn",
  });
  itemStartBtn.textContent = `A`;
  const itemResetBtn = element("button", {
    class: "button garage__item_config-resetBtn",
  });
  itemResetBtn.textContent = `B`;

  item.append(itemStartBtn);
  item.append(itemResetBtn);

  return item;
};

export function createGarageItem(item: ICar) {
  const garageItem = garageItemConfig(item);
  const garageBtns = garageItemConfigBtns();
  const elem = element("li", { class: "garage__item", id: `${item.id}` });

  const garageItemWrapper = element("div", { class: "garage__item_wrapper" });

  const selectBtn = element("button", {
    class: "button button garage__item_wrapper-selectBtn",
  });
  selectBtn.textContent = `Select`;
  selectBtn.addEventListener('click', (e) => {
    selectCar(e)
    
  })


  const removeBtn = element("button", {
    class: "button button garage__item_wrapper-removeBtn",
  });
  removeBtn.textContent = "Remove";

  removeBtn.addEventListener("click", (e) => {
    removeCar(e);
  });

  const itemWrapperName = element("div", {
    class: "garage__item_wrapper-name",
  });
  itemWrapperName.textContent = `${item.name}`;

  garageItemWrapper.append(selectBtn);
  garageItemWrapper.append(removeBtn);
  garageItemWrapper.append(itemWrapperName);
  elem.append(garageItemWrapper);
  elem.append(garageBtns);
  elem.append(garageItem);

  return elem;
}
