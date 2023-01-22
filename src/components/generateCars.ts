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
  "Honda",
  "Hyundai",
  "Kia",
  "Lada (ВАЗ)",
  "Mazda",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Renault",
  "Skoda Octavia",
  "Skoda ",
  "Toyota Camry",
  "Toyota Opa Gam Gnam Style",
  "Volkswagen 2105",
  "Acura Vesta",
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
  "Toyota Qashqai",
  "Buick H9",
  "Cadillac Passat",
  "Chevrolet",
  "Chrysler",
  "Dodge Gallardo",
  "Ford Diablo",
  "GMC",
  "Hummer",
  "Jeep",
  "Lincoln",
  "Mercury",
  "Oldsmobile",
  "Pontiac",
  "Aurus",
  "Tesla Shmesla",
  "Tesla Kresla",
  "Lada (ВАЗ)",
  "ГАЗ",
  "Москвич",
  "ТагАЗ",
  "УАЗ",
  "Audi Sedan",
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
