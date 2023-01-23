import CreateCar from "./createCar";
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const generateCars = () => {
  const min = 1;
  const max = 102;

  const magicNumberOne = 1;
  const magicNumberHalfOne = 0.5;

  for (let i = 0; i < 100; i++) {
    let rand = Math.floor(
      min - magicNumberHalfOne + Math.random() * (max - min + magicNumberOne)
    );
    let color = getRandomColor();
    CreateCar.inputNameValue = carTitles[rand];
    CreateCar.inputColorValue = color;
    CreateCar.createNewCar();
  }
};

const carTitles: string[] = [
  "Audi (ВАЗ)",
  "Audi TT",
  "BMW M3",
  "Ford Mustang",
  "Honda Infiniti",
  "Hyundai Cyvic",
  "Kia Feratto",
  "Kia Netto",
  "Kia Brutto",
  "Lada (ВАЗ)",
  "Mazda Shmazda",
  "Mercedes-Benz",
  "Mitsubishi Gallardo",
  "Nissan Almera",
  "Renault Nissan",
  "Renault Kia",
  "Skoda Octavia",
  "Skoda 2105",
  "Toyota Camry",
  "Toyota Opa Gam Gnam Style",
  "Volkswagen 2105",
  "Acura Vesta",
  "Daihatsu Dzaibazu",
  "Datsun Hornet",
  "Honda Acura",
  "Infiniti Navsegda",
  "Isuzu Kobeni",
  "Lexus Makima",
  "Mazda Cowboy",
  "Mitsubishi Pachito",
  "Nissan Andatra",
  "Scion Fermata",
  "Subaru Rio",
  "Suzuki Shenmue",
  "Toyota Qashqai",
  "Buick H9",
  "Cadillac Passat",
  "Chevrolet Ren",
  "Chrysler 3000",
  "Dodge Gallardo",
  "Ford Diablo",
  "GMC ГАЗ",
  "GMC Hummer",
  "GMC Sedan",
  "Hummer H3",
  "Jeep Beep",
  "Jeep Hummer",
  "Lincoln Pontiac",
  "Mercury Pontiac",
  "Mercury Lincoln",
  "Pontiac Oldsmobile",
  "Oldsmobile Aurus",
  "Pontiac Shmesla",
  "Pontiac Tesla",
  "Aurus Atmosphere",
  "Tesla Shmesla",
  "Tesla Kresla",
  "Lada (ВАЗ)",
  "ГАЗ Gallardo",
  "Москвич Diablo",
  "ТагАЗ Stracci",
  "УАЗ Promenad",
  "Audi Sedan",
  "BMW Falcion",
  "Mercedes-Benz",
  "Opel Oleg",
  "Porsche Viktor",
  "Volkswagen Zachem",
  "Daewoo Nishoo",
  "Genesis Niva",
  "Hyundai Karben",
  "Kia DD",
  "SsangYong Hworang",
  "Alfa Romeo",
  "Aston Martin",
  "Bentley Yoshimitsu",
  "Bugatti Veyron",
  "Citroen Haltura",
  "DS GHT",
  "Ferrari Zapivali",
  "Fiat Koryto",
  "Jaguar Ustal",
  "Lamborghini Chego",
  "Lancia Nag",
  "Land Rover",
  "Maserati Curt",
  "Maybach Kobeyn",
  "Mini Kuper",
  "Peugeot Dove",
  "Ravon Crow",
  "Renault Mastif",
  "Rolls-Royce",
  "Rover Sobaken",
  "Saab Amsrt",
  "SEAT Mobile",
  "Skoda Kuda Ti",
  "Smart No Ne Tvoi",
  "Volvo Spasibo",
  "ZAZ Press F",
  "Brilliance VI",
  "BYD BAD",
  "Changan Chong",
  "Chery Harp",
  "DongFeng Chung",
  "Exeed LTC",
  "FAW 4G",
  "Foton Napol",
  "GAC DA",
  "Geely Netugeely",
  "Great Wall",
  "Haima Danziro",
  "Haval Wolkswagen",
  "JAC Black",
  "Lifan Trusel",
  "Luxgen Koptel",
  "Zotye Woyota",
];
