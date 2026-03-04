export interface Question {
  question: { uz: string; ru: string; en: string };
  options: { uz: string[]; ru: string[]; en: string[] };
  correct: number;
}

export const WEATHER_QUESTIONS: Question[] = [
  {
    question: {
      uz: "Qaysi asbob havo bosimini o'lchash uchun ishlatiladi?",
      ru: "Какой прибор используется для измерения атмосферного давления?",
      en: "Which instrument is used to measure atmospheric pressure?"
    },
    options: {
      uz: ["Termometr", "Barometr", "Gigrometr", "Anemometr"],
      ru: ["Термометр", "Барометр", "Гигрометр", "Анемометр"],
      en: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Bulutlarning qaysi turi odatda momaqaldiroq bilan bog'liq?",
      ru: "Какой тип облаков обычно связан с грозой?",
      en: "Which type of cloud is usually associated with a thunderstorm?"
    },
    options: {
      uz: ["Sirus", "Stratus", "Kumulonimbus", "Altostratus"],
      ru: ["Перистые", "Слоистые", "Кучево-дождевые", "Высокослоистые"],
      en: ["Cirrus", "Stratus", "Cumulonimbus", "Altostratus"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Havo harorati 0°C dan past bo'lganda yog'adigan yog'in turi nima?",
      ru: "Какой вид осадков выпадает, когда температура воздуха ниже 0°C?",
      en: "What type of precipitation falls when the air temperature is below 0°C?"
    },
    options: {
      uz: ["Yomg'ir", "Do'l", "Qor", "Shudring"],
      ru: ["Дождь", "Град", "Снег", "Роса"],
      en: ["Rain", "Hail", "Snow", "Dew"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Shamol tezligini o'lchaydigan asbob nima deb ataladi?",
      ru: "Как называется прибор, измеряющий скорость ветра?",
      en: "What is the instrument that measures wind speed called?"
    },
    options: {
      uz: ["Anemometr", "Barometr", "Gigrometr", "Termometr"],
      ru: ["Анемометр", "Барометр", "Гигрометр", "Термометр"],
      en: ["Anemometer", "Barometer", "Hygrometer", "Thermometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Atmosferadagi namlik miqdori nima deb ataladi?",
      ru: "Как называется количество влаги в атмосфере?",
      en: "What is the amount of moisture in the atmosphere called?"
    },
    options: {
      uz: ["Bosim", "Zichlik", "Namlik", "Harorat"],
      ru: ["Давление", "Плотность", "Влажность", "Температура"],
      en: ["Pressure", "Density", "Humidity", "Temperature"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi gaz Yer atmosferasining taxminan 78% ini tashkil qiladi?",
      ru: "Какой газ составляет около 78% атмосферы Земли?",
      en: "Which gas makes up approximately 78% of Earth's atmosphere?"
    },
    options: {
      uz: ["Kislorod", "Karbonat angidrid", "Argon", "Azot"],
      ru: ["Кислород", "Углекислый газ", "Аргон", "Азот"],
      en: ["Oxygen", "Carbon Dioxide", "Argon", "Nitrogen"]
    },
    correct: 3
  },
  {
    question: {
      uz: "Tuman aslida nima?",
      ru: "Что такое туман на самом деле?",
      en: "What is fog actually?"
    },
    options: {
      uz: ["Past balandlikdagi bulut", "Muz kristallari", "Tutun", "Chang"],
      ru: ["Облако на малой высоте", "Кристаллы льда", "Дым", "Пыль"],
      en: ["Low-altitude cloud", "Ice crystals", "Smoke", "Dust"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Grom (momaqaldiroq ovozi) nima sababdan paydo bo'ladi?",
      ru: "Почему возникает гром (звук грома)?",
      en: "Why does thunder (the sound of thunder) occur?"
    },
    options: {
      uz: ["Bulutlar to'qnashuvi", "Yashin havoni tez qizdirishi", "Yomg'ir tomchilari", "Shamol"],
      ru: ["Столкновение облаков", "Молния быстро нагревает воздух", "Капли дождя", "Ветер"],
      en: ["Clouds colliding", "Lightning heating air rapidly", "Raindrops", "Wind"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Selsiy shkalasi bo'yicha suv necha darajada qaynaydi?",
      ru: "При какой температуре закипает вода по шкале Цельсия?",
      en: "At what temperature does water boil on the Celsius scale?"
    },
    options: {
      uz: ["50°C", "100°C", "200°C", "0°C"],
      ru: ["50°C", "100°C", "200°C", "0°C"],
      en: ["50°C", "100°C", "200°C", "0°C"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi faslda kunlar eng qisqa bo'ladi?",
      ru: "В какое время года дни самые короткие?",
      en: "In which season are the days the shortest?"
    },
    options: {
      uz: ["Bahor", "Yoz", "Kuz", "Qish"],
      ru: ["Весна", "Лето", "Осень", "Зима"],
      en: ["Spring", "Summer", "Autumn", "Winter"]
    },
    correct: 3
  },
  {
    question: {
      uz: "Kamalakda nechta rang bor?",
      ru: "Сколько цветов в радуге?",
      en: "How many colors in a rainbow?"
    },
    options: {
      uz: ["5", "6", "7", "8"],
      ru: ["5", "6", "7", "8"],
      en: ["5", "6", "7", "8"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Yashindan himoyalanish uchun nima qilish kerak?",
      ru: "Что делать для защиты от молнии?",
      en: "What to do for lightning protection?"
    },
    options: {
      uz: ["Daraxt tagiga turish", "Ochiq maydondan qochish", "Telefon ishlatish", "Suvda cho'milish"],
      ru: ["Стоять под деревом", "Избегать открытых мест", "Использовать телефон", "Купаться в воде"],
      en: ["Stand under a tree", "Avoid open areas", "Use a phone", "Swim in water"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Quyosh chiqishi qaysi tomondan bo'ladi?",
      ru: "С какой стороны восходит солнце?",
      en: "From which side does the sun rise?"
    },
    options: {
      uz: ["G'arb", "Sharq", "Shimol", "Janub"],
      ru: ["Запад", "Восток", "Север", "Юг"],
      en: ["West", "East", "North", "South"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qor nima?",
      ru: "Что такое снег?",
      en: "What is snow?"
    },
    options: {
      uz: ["Muzlagan yomg'ir", "Muz kristallari", "Bug'", "Tuman"],
      ru: ["Замерзший дождь", "Кристаллы льда", "Пар", "Туман"],
      en: ["Frozen rain", "Ice crystals", "Steam", "Fog"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi rang issiqlikni o'ziga ko'p tortadi?",
      ru: "Какой цвет поглощает больше всего тепла?",
      en: "Which color absorbs the most heat?"
    },
    options: {
      uz: ["Oq", "Qora", "Sariq", "Yashil"],
      ru: ["Белый", "Черный", "Желтый", "Зеленый"],
      en: ["White", "Black", "Yellow", "Green"]
    },
    correct: 1
  }
];
