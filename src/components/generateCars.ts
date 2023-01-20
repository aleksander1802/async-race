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
  "Audi",
  "BMW",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Lada (ВАЗ)",
  "Mazda",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Renault",
  "Skoda",
  "Toyota",
  "Volkswagen",
  "Acura",
  "Daihatsu",
  "Datsun",
  "Honda",
  "Infiniti",
  "Isuzu",
  "Lexus",
  "Mazda",
  "Mitsubishi",
  "Nissan",
  "Scion",
  "Subaru",
  "Suzuki",
  "Toyota",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ford",
  "GMC",
  "Hummer",
  "Jeep",
  "Lincoln",
  "Mercury",
  "Oldsmobile",
  "Pontiac",
  "Tesla",
  "Aurus",
  "Lada (ВАЗ)",
  "ГАЗ",
  "Москвич",
  "ТагАЗ",
  "УАЗ",
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Opel",
  "Porsche",
  "Volkswagen",
  "Daewoo",
  "Genesis",
  "Hyundai",
  "Kia",
  "SsangYong",
  "Alfa Romeo",
  "Aston Martin",
  "Bentley",
  "Bugatti",
  "Citroen",
  "DS",
  "Ferrari",
  "Fiat",
  "Jaguar",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Maserati",
  "Maybach",
  "Mini",
  "Peugeot",
  "Ravon",
  "Renault",
  "Rolls-Royce",
  "Rover",
  "Saab",
  "SEAT",
  "Skoda",
  "Smart",
  "Volvo",
  "ZAZ",
  "Brilliance",
  "BYD",
  "Changan",
  "Chery",
  "DongFeng",
  "Exeed",
  "FAW",
  "Foton",
  "GAC",
  "Geely",
  "Great Wall",
  "Haima",
  "Haval",
  "JAC",
  "Lifan",
  "Luxgen",
  "Zotye",
];
