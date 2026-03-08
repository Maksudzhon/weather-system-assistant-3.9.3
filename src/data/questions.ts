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
  },
  {
    question: {
      uz: "Atmosferaning qaysi qatlamida biz yashaymiz?",
      ru: "В каком слое атмосферы мы живем?",
      en: "In which layer of the atmosphere do we live?"
    },
    options: {
      uz: ["Stratosfera", "Mezosfera", "Troposfera", "Termosfera"],
      ru: ["Стратосфера", "Мезосфера", "Тропосфера", "Термосфера"],
      en: ["Stratosphere", "Mesosphere", "Troposphere", "Thermosphere"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Ozon qatlami atmosferaning qaysi qismida joylashgan?",
      ru: "В какой части атмосферы находится озоновый слой?",
      en: "In which part of the atmosphere is the ozone layer located?"
    },
    options: {
      uz: ["Troposfera", "Stratosfera", "Ekzosfera", "Ionosfera"],
      ru: ["Тропосфера", "Стратосфера", "Экзосфера", "Ионосфера"],
      en: ["Troposphere", "Stratosphere", "Exosphere", "Ionosphere"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Dengiz sathidagi o'rtacha havo bosimi qancha?",
      ru: "Каково среднее атмосферное давление на уровне моря?",
      en: "What is the average atmospheric pressure at sea level?"
    },
    options: {
      uz: ["1013.25 gPa", "900 gPa", "1100 gPa", "1000 gPa"],
      ru: ["1013.25 гПа", "900 гПа", "1100 гПа", "1000 гПа"],
      en: ["1013.25 hPa", "900 hPa", "1100 hPa", "1000 hPa"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Havo harorati ko'tarilganda havo bosimi bilan nima sodir bo'ladi?",
      ru: "Что происходит с атмосферным давлением при повышении температуры воздуха?",
      en: "What happens to atmospheric pressure when air temperature rises?"
    },
    options: {
      uz: ["Ko'tariladi", "Tushadi", "O'zgarmaydi", "Yo'qoladi"],
      ru: ["Повышается", "Понижается", "Не меняется", "Исчезает"],
      en: ["Rises", "Falls", "Stays the same", "Disappears"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi asbob namlikni o'lchash uchun ishlatiladi?",
      ru: "Какой прибор используется для измерения влажности?",
      en: "Which instrument is used to measure humidity?"
    },
    options: {
      uz: ["Barometr", "Gigrometr", "Anemometr", "Termometr"],
      ru: ["Барометр", "Гигрометр", "Анемометр", "Термометр"],
      en: ["Barometer", "Hygrometer", "Anemometer", "Thermometer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Yashin va momaqaldiroq bir vaqtda sodir bo'ladimi?",
      ru: "Происходят ли молния и гром одновременно?",
      en: "Do lightning and thunder occur at the same time?"
    },
    options: {
      uz: ["Ha", "Yo'q", "Faqat yozda", "Faqat qishda"],
      ru: ["Да", "Нет", "Только летом", "Только зимой"],
      en: ["Yes", "No", "Only in summer", "Only in winter"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Nima uchun biz yashinni momaqaldiroqdan oldin ko'ramiz?",
      ru: "Почему мы видим молнию раньше, чем слышим гром?",
      en: "Why do we see lightning before we hear thunder?"
    },
    options: {
      uz: ["Yashin tezroq", "Yorug'lik tovushdan tezroq", "Tovush yorug'likdan tezroq", "Yashin balandroq"],
      ru: ["Молния быстрее", "Свет быстрее звука", "Звук быстрее света", "Молния выше"],
      en: ["Lightning is faster", "Light is faster than sound", "Sound is faster than light", "Lightning is higher"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar 'ot dumi' ga o'xshaydi?",
      ru: "Какие облака похожи на 'лошадиные хвосты'?",
      en: "Which clouds look like 'mare's tails'?"
    },
    options: {
      uz: ["Kumulus", "Stratus", "Sirus", "Nimbus"],
      ru: ["Кучевые", "Слоистые", "Перистые", "Дождевые"],
      en: ["Cumulus", "Stratus", "Cirrus", "Nimbus"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Tornado nima?",
      ru: "Что такое торнадо?",
      en: "What is a tornado?"
    },
    options: {
      uz: ["Kuchli yomg'ir", "Aylanuvchi havo ustuni", "Muz bo'roni", "Issiq shamol"],
      ru: ["Сильный дождь", "Вращающийся столб воздуха", "Ледяной шторм", "Теплый ветер"],
      en: ["Heavy rain", "Rotating column of air", "Ice storm", "Warm wind"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Dovulning markazi nima deb ataladi?",
      ru: "Как называется центр урагана?",
      en: "What is the center of a hurricane called?"
    },
    options: {
      uz: ["Yurak", "Ko'z", "Miya", "Quloq"],
      ru: ["Сердце", "Глаз", "Мозг", "Ухо"],
      en: ["Heart", "Eye", "Brain", "Ear"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi okeanda tayfunlar ko'p uchraydi?",
      ru: "В каком океане чаще всего встречаются тайфуны?",
      en: "In which ocean are typhoons most common?"
    },
    options: {
      uz: ["Atlantika", "Hind", "Tinch", "Shimoliy muz"],
      ru: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"],
      en: ["Atlantic", "Indian", "Pacific", "Arctic"]
    },
    correct: 2
  },
  {
    question: {
      uz: "El-Ninyo nima?",
      ru: "Что такое Эль-Ниньо?",
      en: "What is El Niño?"
    },
    options: {
      uz: ["Okean oqimining isishi", "Muzlik erishi", "Vulkan otilishi", "Yulduz turkumi"],
      ru: ["Потепление океанского течения", "Таяние ледников", "Извержение вулкана", "Созвездие"],
      en: ["Warming of ocean current", "Glacier melting", "Volcanic eruption", "Constellation"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Qaysi asbob shamol yo'nalishini ko'rsatadi?",
      ru: "Какой прибор показывает направление ветра?",
      en: "Which instrument shows wind direction?"
    },
    options: {
      uz: ["Anemometr", "Flyuger", "Barometr", "Termometr"],
      ru: ["Анемометр", "Флюгер", "Барометр", "Термометр"],
      en: ["Anemometer", "Wind vane", "Barometer", "Thermometer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Shudring nuqtasi nima?",
      ru: "Что такое точка росы?",
      en: "What is the dew point?"
    },
    options: {
      uz: ["Suv qaynash harorati", "Havo to'yingan harorat", "Muzlash harorati", "Eng issiq harorat"],
      ru: ["Температура кипения воды", "Температура насыщения воздуха", "Температура замерзания", "Самая жаркая температура"],
      en: ["Water boiling temperature", "Temperature at which air is saturated", "Freezing temperature", "Hottest temperature"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar yomg'ir olib keladi?",
      ru: "Какие облака приносят дождь?",
      en: "Which clouds bring rain?"
    },
    options: {
      uz: ["Sirus", "Kumulus", "Nimbus", "Altostratus"],
      ru: ["Перистые", "Кучевые", "Дождевые", "Высокослоистые"],
      en: ["Cirrus", "Cumulus", "Nimbus", "Altostratus"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Atmosferadagi eng ko'p tarqalgan ikkinchi gaz qaysi?",
      ru: "Какой второй по распространенности газ в атмосфере?",
      en: "What is the second most abundant gas in the atmosphere?"
    },
    options: {
      uz: ["Azot", "Kislorod", "Argon", "Vodorod"],
      ru: ["Азот", "Кислород", "Аргон", "Водород"],
      en: ["Nitrogen", "Oxygen", "Argon", "Hydrogen"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Iqlim va ob-havo o'rtasidagi farq nima?",
      ru: "В чем разница между климатом и погодой?",
      en: "What is the difference between climate and weather?"
    },
    options: {
      uz: ["Farqi yo'q", "Iqlim - uzoq muddatli", "Ob-havo - uzoq muddatli", "Iqlim faqat yozda bo'ladi"],
      ru: ["Разницы нет", "Климат - долгосрочный", "Погода - долгосрочная", "Климат бывает только летом"],
      en: ["No difference", "Climate is long-term", "Weather is long-term", "Climate only happens in summer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Quyosh radiatsiyasining qancha qismi Yer tomonidan yutiladi?",
      ru: "Какая часть солнечной радиации поглощается Землей?",
      en: "How much of the solar radiation is absorbed by the Earth?"
    },
    options: {
      uz: ["Taxminan 50%", "Taxminan 10%", "Taxminan 90%", "Taxminan 100%"],
      ru: ["Около 50%", "Около 10%", "Около 90%", "Около 100%"],
      en: ["About 50%", "About 10%", "About 90%", "About 100%"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Issiqxona effekti nima?",
      ru: "Что такое парниковый эффект?",
      en: "What is the greenhouse effect?"
    },
    options: {
      uz: ["Yerning sovishi", "Atmosferaning isishi", "Yomg'ir yog'ishi", "Shamol to'xtashi"],
      ru: ["Охлаждение Земли", "Нагрев атмосферы", "Выпадение дождя", "Прекращение ветра"],
      en: ["Cooling of Earth", "Warming of the atmosphere", "Falling rain", "Stopping wind"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi gaz issiqxona effektiga eng ko'p hissa qo'shadi?",
      ru: "Какой газ вносит наибольший вклад в парниковый эффект?",
      en: "Which gas contributes most to the greenhouse effect?"
    },
    options: {
      uz: ["Kislorod", "Azot", "Karbonat angidrid", "Argon"],
      ru: ["Кислород", "Азот", "Углекислый газ", "Аргон"],
      en: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Musson shamollari nima?",
      ru: "Что такое муссонные ветры?",
      en: "What are monsoon winds?"
    },
    options: {
      uz: ["Doimiy shamollar", "Mavsumiy shamollar", "Tungi shamollar", "Kunduzgi shamollar"],
      ru: ["Постоянные ветры", "Сезонные ветры", "Ночные ветры", "Дневные ветры"],
      en: ["Constant winds", "Seasonal winds", "Night winds", "Day winds"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qutb yog'dusi nima deb ataladi?",
      ru: "Как называется полярное сияние?",
      en: "What is the polar aurora called?"
    },
    options: {
      uz: ["Aurora Borealis", "Lumina", "Halo", "Miraj"],
      ru: ["Aurora Borealis", "Люмина", "Гало", "Мираж"],
      en: ["Aurora Borealis", "Lumina", "Halo", "Mirage"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Eng sovuq harorat qayerda qayd etilgan?",
      ru: "Где была зафиксирована самая низкая температура?",
      en: "Where was the lowest temperature recorded?"
    },
    options: {
      uz: ["Arktika", "Antarktida", "Sibir", "Alyaska"],
      ru: ["Арктика", "Антарктида", "Сибирь", "Аляска"],
      en: ["Arctic", "Antarctica", "Siberia", "Alaska"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Suv bug'ining suyuqlikka aylanishi nima deb ataladi?",
      ru: "Как называется превращение водяного пара в жидкость?",
      en: "What is the conversion of water vapor to liquid called?"
    },
    options: {
      uz: ["Bug'lanish", "Kondensatsiya", "Muzlash", "Erish"],
      ru: ["Испарение", "Конденсация", "Замерзание", "Таяние"],
      en: ["Evaporation", "Condensation", "Freezing", "Melting"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar eng balandda joylashgan?",
      ru: "Какие облака находятся выше всего?",
      en: "Which clouds are located the highest?"
    },
    options: {
      uz: ["Kumulus", "Stratus", "Sirus", "Nimbostratus"],
      ru: ["Кучевые", "Слоистые", "Перистые", "Слоисто-дождевые"],
      en: ["Cumulus", "Stratus", "Cirrus", "Nimbostratus"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Jet stream (reaktiv oqim) nima?",
      ru: "Что такое струйное течение?",
      en: "What is a jet stream?"
    },
    options: {
      uz: ["Okean oqimi", "Yuqori balandlikdagi kuchli shamol", "Yomg'ir turi", "Vulkanik gaz"],
      ru: ["Океанское течение", "Сильный ветер на большой высоте", "Тип дождя", "Вулканический газ"],
      en: ["Ocean current", "Strong wind at high altitude", "Type of rain", "Volcanic gas"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi asbob yog'ingarchilik miqdorini o'lchaydi?",
      ru: "Какой прибор измеряет количество осадков?",
      en: "Which instrument measures the amount of precipitation?"
    },
    options: {
      uz: ["Barometr", "Anemometr", "Pluviometr", "Gigrometr"],
      ru: ["Барометр", "Анемометр", "Плювиометр", "Гигрометр"],
      en: ["Barometer", "Anemometer", "Pluviometer", "Hygrometer"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Siklon nima?",
      ru: "Что такое циклон?",
      en: "What is a cyclone?"
    },
    options: {
      uz: ["Past bosimli havo tizimi", "Yuqori bosimli havo tizimi", "Muzlik", "Qum bo'roni"],
      ru: ["Система низкого давления", "Система высокого давления", "Ледник", "Песчаная буря"],
      en: ["Low pressure air system", "High pressure air system", "Glacier", "Sandstorm"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Antisiklon nima?",
      ru: "Что такое антициклон?",
      en: "What is an anticyclone?"
    },
    options: {
      uz: ["Past bosimli havo tizimi", "Yuqori bosimli havo tizimi", "Yomg'ir", "Tuman"],
      ru: ["Система низкого давления", "Система высокого давления", "Дождь", "Туман"],
      en: ["Low pressure air system", "High pressure air system", "Rain", "Fog"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi faslda o'simliklar uyg'onadi?",
      ru: "В какое время года просыпаются растения?",
      en: "In which season do plants wake up?"
    },
    options: {
      uz: ["Kuz", "Qish", "Bahor", "Yoz"],
      ru: ["Осень", "Зима", "Весна", "Лето"],
      en: ["Autumn", "Winter", "Spring", "Summer"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng issiq sayyora qaysi?",
      ru: "Какая планета самая жаркая?",
      en: "Which planet is the hottest?"
    },
    options: {
      uz: ["Merkuriy", "Venera", "Mars", "Yupiter"],
      ru: ["Меркурий", "Венера", "Марс", "Юпитер"],
      en: ["Mercury", "Venus", "Mars", "Jupiter"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Quyosh nuri Yerga necha daqiqada yetib keladi?",
      ru: "За сколько минут солнечный свет доходит до Земли?",
      en: "In how many minutes does sunlight reach the Earth?"
    },
    options: {
      uz: ["1 daqiqa", "8 daqiqa", "30 daqiqa", "1 soat"],
      ru: ["1 минута", "8 минут", "30 минут", "1 час"],
      en: ["1 minute", "8 minutes", "30 minutes", "1 hour"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar 'paxta' ga o'xshaydi?",
      ru: "Какие облака похожи на 'вату'?",
      en: "Which clouds look like 'cotton'?"
    },
    options: {
      uz: ["Kumulus", "Stratus", "Sirus", "Nimbus"],
      ru: ["Кучевые", "Слоистые", "Перистые", "Дождевые"],
      en: ["Cumulus", "Stratus", "Cirrus", "Nimbus"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Muzlash harorati Farengeyt shkalasi bo'yicha necha daraja?",
      ru: "Какова температура замерзания по шкале Фаренгейта?",
      en: "What is the freezing temperature on the Fahrenheit scale?"
    },
    options: {
      uz: ["0°F", "32°F", "100°F", "212°F"],
      ru: ["0°F", "32°F", "100°F", "212°F"],
      en: ["0°F", "32°F", "100°F", "212°F"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaynash harorati Farengeyt shkalasi bo'yicha necha daraja?",
      ru: "Какова температура кипения по шкале Фаренгейта?",
      en: "What is the boiling temperature on the Fahrenheit scale?"
    },
    options: {
      uz: ["100°F", "180°F", "212°F", "300°F"],
      ru: ["100°F", "180°F", "212°F", "300°F"],
      en: ["100°F", "180°F", "212°F", "300°F"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi asbob havo haroratini o'lchaydi?",
      ru: "Какой прибор измеряет температуру воздуха?",
      en: "Which instrument measures air temperature?"
    },
    options: {
      uz: ["Barometr", "Termometr", "Gigrometr", "Anemometr"],
      ru: ["Барометр", "Термометр", "Гигрометр", "Анемометр"],
      en: ["Barometer", "Thermometer", "Hygrometer", "Anemometer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Yomg'ir tomchisi qanday shaklda bo'ladi?",
      ru: "Какую форму имеет капля дождя?",
      en: "What shape is a raindrop?"
    },
    options: {
      uz: ["Mukammal shar", "Sferik (pastki qismi tekisroq)", "Uchburchak", "Kvadrat"],
      ru: ["Идеальный шар", "Сферическая (снизу более плоская)", "Треугольник", "Квадрат"],
      en: ["Perfect sphere", "Spherical (flatter at the bottom)", "Triangle", "Square"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi davlatda eng ko'p tornado sodir bo'ladi?",
      ru: "В какой стране происходит больше всего торнадо?",
      en: "In which country do the most tornadoes occur?"
    },
    options: {
      uz: ["Rossiya", "Xitoy", "AQSH", "Avstraliya"],
      ru: ["Россия", "Китай", "США", "Австралия"],
      en: ["Russia", "China", "USA", "Australia"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qum bo'roni nima deb ataladi?",
      ru: "Как называется песчаная буря?",
      en: "What is a sandstorm called?"
    },
    options: {
      uz: ["Xabub", "Tayfun", "Siklon", "Musson"],
      ru: ["Хабуб", "Тайфун", "Циклон", "Муссон"],
      en: ["Haboob", "Typhoon", "Cyclone", "Monsoon"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Atmosferadagi suv bug'ining suyuqlikka aylanmasdan to'g'ridan-to'g'ri muzga aylanishi nima deb ataladi?",
      ru: "Как называется превращение водяного пара в лед, минуя жидкую фазу?",
      en: "What is the conversion of water vapor directly into ice called?"
    },
    options: {
      uz: ["Sublimatsiya", "Depozitsiya", "Erish", "Bug'lanish"],
      ru: ["Сублимация", "Депозиция", "Таяние", "Испарение"],
      en: ["Sublimation", "Deposition", "Melting", "Evaporation"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi asbob quyosh radiatsiyasini o'lchaydi?",
      ru: "Какой прибор измеряет солнечную радиацию?",
      en: "Which instrument measures solar radiation?"
    },
    options: {
      uz: ["Piranometr", "Barometr", "Anemometr", "Gigrometr"],
      ru: ["Пиранометр", "Барометр", "Анемометр", "Гигрометр"],
      en: ["Pyranometer", "Barometer", "Anemometer", "Hygrometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Eng kuchli shamollar qayerda kuzatiladi?",
      ru: "Где наблюдаются самые сильные ветры?",
      en: "Where are the strongest winds observed?"
    },
    options: {
      uz: ["Tornado markazida", "Dovul chetida", "Tog' cho'qqisida", "Okean o'rtasida"],
      ru: ["В центре торнадо", "На краю урагана", "На вершине горы", "Посреди океана"],
      en: ["In the center of a tornado", "At the edge of a hurricane", "On a mountain top", "In the middle of the ocean"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Qaysi bulutlar 'tuman' ga o'xshaydi, lekin yerga tegmaydi?",
      ru: "Какие облака похожи на 'туман', но не касаются земли?",
      en: "Which clouds look like 'fog' but don't touch the ground?"
    },
    options: {
      uz: ["Stratus", "Kumulus", "Sirus", "Nimbus"],
      ru: ["Слоистые", "Кучевые", "Перистые", "Дождевые"],
      en: ["Stratus", "Cumulus", "Cirrus", "Nimbus"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Atmosferaning eng tashqi qatlami nima?",
      ru: "Как называется самый внешний слой атмосферы?",
      en: "What is the outermost layer of the atmosphere called?"
    },
    options: {
      uz: ["Stratosfera", "Termosfera", "Ekzosfera", "Mezosfera"],
      ru: ["Стратосфера", "Термосфера", "Экзосфера", "Мезосфера"],
      en: ["Stratosphere", "Thermosphere", "Exosphere", "Mesosphere"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Havo massasi nima?",
      ru: "Что такое воздушная масса?",
      en: "What is an air mass?"
    },
    options: {
      uz: ["Kichik shamol", "Katta hajmdagi bir xil havo", "Bulut bo'lagi", "Yomg'ir buluti"],
      ru: ["Маленький ветер", "Большой объем однородного воздуха", "Кусок облака", "Дождевое облако"],
      en: ["Small wind", "Large volume of uniform air", "Piece of cloud", "Rain cloud"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi asbob bulutlar balandligini o'lchaydi?",
      ru: "Какой прибор измеряет высоту облаков?",
      en: "Which instrument measures the height of clouds?"
    },
    options: {
      uz: ["Selometr", "Barometr", "Anemometr", "Termometr"],
      ru: ["Целометр", "Барометр", "Анемометр", "Термометр"],
      en: ["Ceilometer", "Barometer", "Anemometer", "Thermometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Quyosh tutilishi nima?",
      ru: "Что такое солнечное затмение?",
      en: "What is a solar eclipse?"
    },
    options: {
      uz: ["Oy Quyoshni to'sib qo'yishi", "Yer Quyoshni to'sib qo'yishi", "Quyosh o'chishi", "Bulut Quyoshni to'sishi"],
      ru: ["Луна закрывает Солнце", "Земля закрывает Солнце", "Солнце гаснет", "Облако закрывает Солнце"],
      en: ["Moon blocking the Sun", "Earth blocking the Sun", "Sun going out", "Cloud blocking the Sun"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Oy tutilishi nima?",
      ru: "Что такое лунное затмение?",
      en: "What is a lunar eclipse?"
    },
    options: {
      uz: ["Yer Quyosh va Oy orasiga kirishi", "Quyosh Oy va Yer orasiga kirishi", "Oy yo'qolishi", "Bulut Oyni to'sishi"],
      ru: ["Земля проходит между Солнцем и Луной", "Солнце проходит между Луной и Землей", "Луна исчезает", "Облако закрывает Луну"],
      en: ["Earth passing between Sun and Moon", "Sun passing between Moon and Earth", "Moon disappearing", "Cloud blocking the Moon"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Eng katta sayyora qaysi?",
      ru: "Какая планета самая большая?",
      en: "Which planet is the largest?"
    },
    options: {
      uz: ["Saturn", "Yupiter", "Neptun", "Uran"],
      ru: ["Сатурн", "Юпитер", "Нептун", "Уран"],
      en: ["Saturn", "Jupiter", "Neptune", "Uranus"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi sayyorada 'Katta qizil dog'' bor?",
      ru: "На какой планете есть 'Большое красное пятно'?",
      en: "Which planet has the 'Great Red Spot'?"
    },
    options: {
      uz: ["Mars", "Yupiter", "Saturn", "Venera"],
      ru: ["Марс", "Юпитер", "Сатурн", "Венера"],
      en: ["Mars", "Jupiter", "Saturn", "Venus"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Quyosh tizimidagi eng baland tog' qaysi sayyorada?",
      ru: "На какой планете находится самая высокая гора в Солнечной системе?",
      en: "On which planet is the highest mountain in the Solar System?"
    },
    options: {
      uz: ["Yer", "Mars", "Venera", "Merkuriy"],
      ru: ["Земля", "Марс", "Венера", "Меркурий"],
      en: ["Earth", "Mars", "Venus", "Mercury"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Marsning nechta yo'ldoshi bor?",
      ru: "Сколько спутников у Марса?",
      en: "How many moons does Mars have?"
    },
    options: {
      uz: ["1", "2", "3", "0"],
      ru: ["1", "2", "3", "0"],
      en: ["1", "2", "3", "0"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Quyoshga eng yaqin sayyora qaysi?",
      ru: "Какая планета ближе всего к Солнцу?",
      en: "Which planet is closest to the Sun?"
    },
    options: {
      uz: ["Venera", "Merkuriy", "Yer", "Mars"],
      ru: ["Венера", "Меркурий", "Земля", "Марс"],
      en: ["Venus", "Mercury", "Earth", "Mars"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi sayyora 'Moviy sayyora' deb ataladi?",
      ru: "Какую планету называют 'Голубой планетой'?",
      en: "Which planet is called the 'Blue Planet'?"
    },
    options: {
      uz: ["Uran", "Neptun", "Yer", "Saturn"],
      ru: ["Уран", "Нептун", "Земля", "Сатурн"],
      en: ["Uranus", "Neptune", "Earth", "Saturn"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Quyosh tizimidagi eng kichik sayyora qaysi?",
      ru: "Какая планета самая маленькая в Солнечной системе?",
      en: "Which is the smallest planet in the Solar System?"
    },
    options: {
      uz: ["Mars", "Merkuriy", "Pluton", "Venera"],
      ru: ["Марс", "Меркурий", "Плутон", "Венера"],
      en: ["Mars", "Mercury", "Pluto", "Venus"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi sayyoraning halqalari eng ko'zga ko'ringan?",
      ru: "У какой планеты самые заметные кольца?",
      en: "Which planet has the most prominent rings?"
    },
    options: {
      uz: ["Yupiter", "Saturn", "Uran", "Neptun"],
      ru: ["Юпитер", "Сатурн", "Уран", "Нептун"],
      en: ["Jupiter", "Saturn", "Uranus", "Neptune"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Quyosh tizimida nechta sayyora bor?",
      ru: "Сколько планет в Солнечной системе?",
      en: "How many planets are in the Solar System?"
    },
    options: {
      uz: ["7", "8", "9", "10"],
      ru: ["7", "8", "9", "10"],
      en: ["7", "8", "9", "10"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi sayyora 'Qizil sayyora' deb ataladi?",
      ru: "Какую планету называют 'Красной планетой'?",
      en: "Which planet is called the 'Red Planet'?"
    },
    options: {
      uz: ["Venera", "Mars", "Yupiter", "Saturn"],
      ru: ["Венера", "Марс", "Юпитер", "Сатурн"],
      en: ["Venus", "Mars", "Jupiter", "Saturn"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Yerning yagona tabiiy yo'ldoshi nima?",
      ru: "Как называется единственный естественный спутник Земли?",
      en: "What is Earth's only natural satellite called?"
    },
    options: {
      uz: ["Quyosh", "Oy", "Mars", "Venera"],
      ru: ["Солнце", "Луна", "Марс", "Венера"],
      en: ["Sun", "Moon", "Mars", "Venus"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi gaz atmosferada eng ko'p?",
      ru: "Какого газа больше всего в атмосфере?",
      en: "Which gas is most abundant in the atmosphere?"
    },
    options: {
      uz: ["Kislorod", "Azot", "Karbonat angidrid", "Argon"],
      ru: ["Кислород", "Азот", "Углекислый газ", "Аргон"],
      en: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Suv necha darajada qaynaydi (Selsiy bo'yicha)?",
      ru: "При какой температуре кипит вода (по Цельсию)?",
      en: "At what temperature does water boil (Celsius)?"
    },
    options: {
      uz: ["50°C", "100°C", "150°C", "200°C"],
      ru: ["50°C", "100°C", "150°C", "200°C"],
      en: ["50°C", "100°C", "150°C", "200°C"]
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
      en: "How many colors are in a rainbow?"
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
      uz: "Qaysi asbob shamol tezligini o'lchaydi?",
      ru: "Какой прибор измеряет скорость ветра?",
      en: "Which instrument measures wind speed?"
    },
    options: {
      uz: ["Termometr", "Barometr", "Anemometr", "Gigrometr"],
      ru: ["Термометр", "Барометр", "Анемометр", "Гигрометр"],
      en: ["Thermometer", "Barometer", "Anemometer", "Hygrometer"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Quyosh qaysi tomondan chiqadi?",
      ru: "С какой стороны встает солнце?",
      en: "From which side does the sun rise?"
    },
    options: {
      uz: ["G'arb", "Shimol", "Sharq", "Janub"],
      ru: ["Запад", "Север", "Восток", "Юг"],
      en: ["West", "North", "East", "South"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi bulutlar momaqaldiroq olib keladi?",
      ru: "Какие облака приносят грозу?",
      en: "Which clouds bring a thunderstorm?"
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
      uz: "Tuman nima?",
      ru: "Что такое туман?",
      en: "What is fog?"
    },
    options: {
      uz: ["Tutun", "Yerga yaqin bulut", "Chang", "Yomg'ir"],
      ru: ["Дым", "Облако у земли", "Пыль", "Дождь"],
      en: ["Smoke", "Cloud near the ground", "Dust", "Rain"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi qit'a eng sovuq?",
      ru: "Какой континент самый холодный?",
      en: "Which continent is the coldest?"
    },
    options: {
      uz: ["Osiyo", "Afrika", "Antarktida", "Avstraliya"],
      ru: ["Азия", "Африка", "Антарктида", "Австралия"],
      en: ["Asia", "Africa", "Antarctica", "Australia"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Dovulning kuchi qaysi shkala bo'yicha o'lchanadi?",
      ru: "По какой шкале измеряется сила урагана?",
      en: "On what scale is the strength of a hurricane measured?"
    },
    options: {
      uz: ["Rixter", "Saffir-Simpson", "Selsiy", "Kelvin"],
      ru: ["Рихтера", "Саффира-Симпсона", "Цельсия", "Кельвина"],
      en: ["Richter", "Saffir-Simpson", "Celsius", "Kelvin"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi gaz ozon qatlamini yemirishi mumkin?",
      ru: "Какой газ может разрушать озоновый слой?",
      en: "Which gas can destroy the ozone layer?"
    },
    options: {
      uz: ["Kislorod", "Azot", "Xlorftorkarbonlar (CFC)", "Vodorod"],
      ru: ["Кислород", "Азот", "Хлорфторуглероды (CFC)", "Водород"],
      en: ["Oxygen", "Nitrogen", "Chlorofluorocarbons (CFC)", "Hydrogen"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng katta okean qaysi?",
      ru: "Какой океан самый большой?",
      en: "Which is the largest ocean?"
    },
    options: {
      uz: ["Atlantika", "Hind", "Tinch", "Shimoliy muz"],
      ru: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"],
      en: ["Atlantic", "Indian", "Pacific", "Arctic"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Yer o'z o'qi atrofida necha soatda bir marta aylanadi?",
      ru: "За сколько часов Земля совершает один оборот вокруг своей оси?",
      en: "In how many hours does the Earth complete one rotation around its axis?"
    },
    options: {
      uz: ["12 soat", "24 soat", "48 soat", "365 soat"],
      ru: ["12 часов", "24 часа", "48 часов", "365 часов"],
      en: ["12 hours", "24 hours", "48 hours", "365 hours"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi sayyora Quyoshga eng yaqin?",
      ru: "Какая планета ближе всего к Солнцу?",
      en: "Which planet is closest to the Sun?"
    },
    options: {
      uz: ["Venera", "Mars", "Merkuriy", "Yer"],
      ru: ["Венера", "Марс", "Меркурий", "Земля"],
      en: ["Venus", "Mars", "Mercury", "Earth"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Atmosferadagi eng baland qatlam qaysi?",
      ru: "Какой слой атмосферы самый высокий?",
      en: "Which layer of the atmosphere is the highest?"
    },
    options: {
      uz: ["Troposfera", "Stratosfera", "Ekzosfera", "Mezosfera"],
      ru: ["Тропосфера", "Стратосфера", "Экзосфера", "Мезосфера"],
      en: ["Troposphere", "Stratosphere", "Exosphere", "Mesosphere"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Shamol nima sababdan paydo bo'ladi?",
      ru: "Из-за чего возникает ветер?",
      en: "What causes wind to occur?"
    },
    options: {
      uz: ["Yomg'ir tufayli", "Bosimlar farqi tufayli", "Oy harakati tufayli", "Bulutlar tufayli"],
      ru: ["Из-за дождя", "Из-за разницы давлений", "Из-за движения Луны", "Из-за облаков"],
      en: ["Due to rain", "Due to pressure differences", "Due to Moon movement", "Due to clouds"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi asbob havo bosimini o'lchaydi?",
      ru: "Какой прибор измеряет атмосферное давление?",
      en: "Which instrument measures atmospheric pressure?"
    },
    options: {
      uz: ["Termometr", "Barometr", "Anemometr", "Gigrometr"],
      ru: ["Термометр", "Барометр", "Анемометр", "Гигрометр"],
      en: ["Thermometer", "Barometer", "Anemometer", "Hygrometer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Muz necha darajada eriydi (Selsiy bo'yicha)?",
      ru: "При какой температуре тает лед (по Цельсию)?",
      en: "At what temperature does ice melt (Celsius)?"
    },
    options: {
      uz: ["-10°C", "0°C", "10°C", "100°C"],
      ru: ["-10°C", "0°C", "10°C", "100°C"],
      en: ["-10°C", "0°C", "10°C", "100°C"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi gaz o'simliklar uchun nafas olishda kerak?",
      ru: "Какой газ нужен растениям для дыхания?",
      en: "Which gas do plants need for respiration?"
    },
    options: {
      uz: ["Kislorod", "Karbonat angidrid", "Azot", "Vodorod"],
      ru: ["Кислород", "Углекислый газ", "Азот", "Водород"],
      en: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qutb yulduzi qaysi tomonni ko'rsatadi?",
      ru: "Какую сторону показывает Полярная звезда?",
      en: "Which direction does the North Star point to?"
    },
    options: {
      uz: ["Janub", "Sharq", "Shimol", "G'arb"],
      ru: ["Юг", "Восток", "Север", "Запад"],
      en: ["South", "East", "North", "West"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Yerning markazi nima deb ataladi?",
      ru: "Как называется центр Земли?",
      en: "What is the center of the Earth called?"
    },
    options: {
      uz: ["Qobiq", "Mantiya", "Yadro", "Atmosfera"],
      ru: ["Кора", "Мантия", "Ядро", "Атмосфера"],
      en: ["Crust", "Mantle", "Core", "Atmosphere"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi sayyora 'Qizil sayyora' deb ataladi?",
      ru: "Какую планету называют 'Красной планетой'?",
      en: "Which planet is called the 'Red Planet'?"
    },
    options: {
      uz: ["Venera", "Mars", "Yupiter", "Saturn"],
      ru: ["Венера", "Марс", "Юпитер", "Сатурн"],
      en: ["Venus", "Mars", "Jupiter", "Saturn"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Eng baland tog' cho'qqisi qaysi?",
      ru: "Какая самая высокая горная вершина?",
      en: "Which is the highest mountain peak?"
    },
    options: {
      uz: ["K2", "Kanchanjunga", "Everest (Jomolungma)", "Lhotse"],
      ru: ["К2", "Канченджанга", "Эверест (Джомолунгма)", "Лхоцзе"],
      en: ["K2", "Kangchenjunga", "Everest (Chomolungma)", "Lhotse"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi daryo dunyodagi eng uzun daryo?",
      ru: "Какая река самая длинная в мире?",
      en: "Which river is the longest in the world?"
    },
    options: {
      uz: ["Amazonka", "Nil", "Yangtszi", "Missisipi"],
      ru: ["Амазонка", "Нил", "Янцзы", "Миссисипи"],
      en: ["Amazon", "Nile", "Yangtze", "Mississippi"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi davlat eng ko'p aholiga ega?",
      ru: "В какой стране самое большое население?",
      en: "Which country has the largest population?"
    },
    options: {
      uz: ["AQSH", "Rossiya", "Hindiston", "Xitoy"],
      ru: ["США", "Россия", "Индия", "Китай"],
      en: ["USA", "Russia", "India", "China"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng katta cho'l qaysi?",
      ru: "Какая пустыня самая большая?",
      en: "Which is the largest desert?"
    },
    options: {
      uz: ["Gobi", "Saxara", "Qizilqum", "Kalahari"],
      ru: ["Гоби", "Сахара", "Кызылкум", "Калахари"],
      en: ["Gobi", "Sahara", "Kyzylkum", "Kalahari"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi davlat 'Kunchiqar mamlakat' deb ataladi?",
      ru: "Какую страну называют 'Страной восходящего солнца'?",
      en: "Which country is called the 'Land of the Rising Sun'?"
    },
    options: {
      uz: ["Xitoy", "Janubiy Koreya", "Yaponiya", "Vyetnam"],
      ru: ["Китай", "Южная Корея", "Япония", "Вьетнам"],
      en: ["China", "South Korea", "Japan", "Vietnam"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng kichik qit'a qaysi?",
      ru: "Какой континент самый маленький?",
      en: "Which is the smallest continent?"
    },
    options: {
      uz: ["Yevropa", "Janubiy Amerika", "Avstraliya", "Antarktida"],
      ru: ["Европа", "Южная Америка", "Австралия", "Антарктида"],
      en: ["Europe", "South America", "Australia", "Antarctica"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi okean eng chuqur?",
      ru: "Какой океан самый глубокий?",
      en: "Which ocean is the deepest?"
    },
    options: {
      uz: ["Atlantika", "Hind", "Tinch", "Shimoliy muz"],
      ru: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"],
      en: ["Atlantic", "Indian", "Pacific", "Arctic"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Yer yuzining necha foizi suv bilan qoplangan?",
      ru: "Какой процент земной поверхности покрыт водой?",
      en: "What percentage of the Earth's surface is covered by water?"
    },
    options: {
      uz: ["50%", "60%", "71%", "80%"],
      ru: ["50%", "60%", "71%", "80%"],
      en: ["50%", "60%", "71%", "80%"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi gaz yong'inni o'chirishda ishlatiladi?",
      ru: "Какой газ используется для тушения пожара?",
      en: "Which gas is used to extinguish fires?"
    },
    options: {
      uz: ["Kislorod", "Vodorod", "Karbonat angidrid", "Azot"],
      ru: ["Кислород", "Водород", "Углекислый газ", "Азот"],
      en: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng qattiq tabiiy modda qaysi?",
      ru: "Какое самое твердое природное вещество?",
      en: "Which is the hardest natural substance?"
    },
    options: {
      uz: ["Oltin", "Temir", "Olmos", "Kumush"],
      ru: ["Золото", "Железо", "Алмаз", "Серебро"],
      en: ["Gold", "Iron", "Diamond", "Silver"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi metall xona haroratida suyuq holatda bo'ladi?",
      ru: "Какой металл находится в жидком состоянии при комнатной температуре?",
      en: "Which metal is in a liquid state at room temperature?"
    },
    options: {
      uz: ["Mis", "Simob", "Qo'rg'oshin", "Alyuminiy"],
      ru: ["Медь", "Ртуть", "Свинец", "Алюминий"],
      en: ["Copper", "Mercury", "Lead", "Aluminum"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Eng yengil gaz qaysi?",
      ru: "Какой газ самый легкий?",
      en: "Which is the lightest gas?"
    },
    options: {
      uz: ["Kislorod", "Azot", "Vodorod", "Geliy"],
      ru: ["Кислород", "Азот", "Водород", "Гелий"],
      en: ["Oxygen", "Nitrogen", "Hydrogen", "Helium"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Quyosh tizimidagi eng katta yo'ldosh qaysi?",
      ru: "Какой самый большой спутник в Солнечной системе?",
      en: "Which is the largest satellite in the Solar System?"
    },
    options: {
      uz: ["Oy", "Titan", "Ganimed", "Kallisto"],
      ru: ["Луна", "Титан", "Ганимед", "Каллисто"],
      en: ["Moon", "Titan", "Ganymede", "Callisto"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi sayyora 'Ertalabki yulduz' deb ataladi?",
      ru: "Какую планету называют 'Утренней звездой'?",
      en: "Which planet is called the 'Morning Star'?"
    },
    options: {
      uz: ["Merkuriy", "Venera", "Mars", "Saturn"],
      ru: ["Меркурий", "Венера", "Марс", "Сатурн"],
      en: ["Mercury", "Venus", "Mars", "Saturn"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Yerning eng yaqin yulduzi qaysi?",
      ru: "Какая ближайшая звезда к Земле?",
      en: "Which is the closest star to Earth?"
    },
    options: {
      uz: ["Sirius", "Proksima Sentavr", "Quyosh", "Betelgeyze"],
      ru: ["Сириус", "Проксима Центавра", "Солнце", "Бетельгейзе"],
      en: ["Sirius", "Proxima Centauri", "Sun", "Betelgeuse"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi davlatda eng ko'p vaqt mintaqalari bor?",
      ru: "В какой стране больше всего часовых поясов?",
      en: "In which country are there the most time zones?"
    },
    options: {
      uz: ["Rossiya", "AQSH", "Fransiya", "Xitoy"],
      ru: ["Россия", "США", "Франция", "Китай"],
      en: ["Russia", "USA", "France", "China"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng kichik davlat qaysi?",
      ru: "Какое самое маленькое государство?",
      en: "Which is the smallest country?"
    },
    options: {
      uz: ["Monako", "San-Marino", "Vatikan", "Malta"],
      ru: ["Монако", "Сан-Марино", "Ватикан", "Мальта"],
      en: ["Monaco", "San Marino", "Vatican City", "Malta"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi davlatda piramidalar eng ko'p?",
      ru: "В какой стране больше всего пирамид?",
      en: "In which country are there the most pyramids?"
    },
    options: {
      uz: ["Misr", "Meksika", "Sudan", "Peru"],
      ru: ["Египет", "Мексика", "Судан", "Перу"],
      en: ["Egypt", "Mexico", "Sudan", "Peru"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng katta orol qaysi?",
      ru: "Какой остров самый большой?",
      en: "Which is the largest island?"
    },
    options: {
      uz: ["Madagaskar", "Grenlandiya", "Yangi Gvineya", "Borneo"],
      ru: ["Мадагаскар", "Гренландия", "Новая Гвинея", "Борнео"],
      en: ["Madagascar", "Greenland", "New Guinea", "Borneo"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi davlatda eng ko'p orollar bor?",
      ru: "В какой стране больше всего островов?",
      en: "In which country are there the most islands?"
    },
    options: {
      uz: ["Indoneziya", "Filippin", "Shvetsiya", "Norvegiya"],
      ru: ["Индонезия", "Филиппины", "Швеция", "Норвегия"],
      en: ["Indonesia", "Philippines", "Sweden", "Norway"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng baland sharshara qaysi?",
      ru: "Какой самый высокий водопад?",
      en: "Which is the highest waterfall?"
    },
    options: {
      uz: ["Niagara", "Viktoriya", "Anxel", "Iguasu"],
      ru: ["Ниагара", "Виктория", "Анхель", "Игуасу"],
      en: ["Niagara", "Victoria", "Angel Falls", "Iguazu"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi davlatda eng ko'p ko'llar bor?",
      ru: "В какой стране больше всего озер?",
      en: "In which country are there the most lakes?"
    },
    options: {
      uz: ["Rossiya", "AQSH", "Kanada", "Finlyandiya"],
      ru: ["Россия", "США", "Канада", "Финляндия"],
      en: ["Russia", "USA", "Canada", "Finland"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng sho'r dengiz qaysi?",
      ru: "Какое море самое соленое?",
      en: "Which is the saltiest sea?"
    },
    options: {
      uz: ["O'lik dengizi", "Qizil dengiz", "O'rta dengiz", "Kaspiy dengizi"],
      ru: ["Мертвое море", "Красное море", "Средиземное море", "Каспийское море"],
      en: ["Dead Sea", "Red Sea", "Mediterranean Sea", "Caspian Sea"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Qaysi davlatda eng ko'p vulkanlar bor?",
      ru: "В какой стране больше всего вулканов?",
      en: "In which country are there the most volcanoes?"
    },
    options: {
      uz: ["Yaponiya", "Islandiya", "Indoneziya", "AQSH"],
      ru: ["Япония", "Исландия", "Индонезия", "США"],
      en: ["Japan", "Iceland", "Indonesia", "USA"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Eng katta ko'l qaysi?",
      ru: "Какое озеро самое большое?",
      en: "Which is the largest lake?"
    },
    options: {
      uz: ["Baykal", "Kaspiy dengizi", "Viktoriya", "Yuqori ko'l"],
      ru: ["Байкал", "Каспийское море", "Виктория", "Верхнее"],
      en: ["Baikal", "Caspian Sea", "Victoria", "Superior"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi davlatda eng ko'p tillar bor?",
      ru: "В какой стране больше всего языков?",
      en: "In which country are there the most languages?"
    },
    options: {
      uz: ["Hindiston", "Xitoy", "Papua-Yangi Gvineya", "Nigeriya"],
      ru: ["Индия", "Китай", "Папуа-Новая Гвинея", "Нигерия"],
      en: ["India", "China", "Papua New Guinea", "Nigeria"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Atmosferaning qaysi qatlamida biz yashaymiz?",
      ru: "В каком слое атмосферы мы живем?",
      en: "In which layer of the atmosphere do we live?"
    },
    options: {
      uz: ["Stratosfera", "Mezosfera", "Troposfera", "Termosfera"],
      ru: ["Стратосфера", "Мезосфера", "Тропосфера", "Термосфера"],
      en: ["Stratosphere", "Mesosphere", "Troposphere", "Thermosphere"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Dunyodagi eng nam joy qayer?",
      ru: "Какое самое влажное место в мире?",
      en: "Where is the wettest place in the world?"
    },
    options: {
      uz: ["Cherrapunji", "Mausinram", "Amazonka", "Kongo"],
      ru: ["Черрапунджи", "Маусинрам", "Амазонка", "Конго"],
      en: ["Cherrapunji", "Mawsynram", "Amazon", "Congo"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Shamol yo'nalishini ko'rsatuvchi asbob nima?",
      ru: "Какой прибор показывает направление ветра?",
      en: "What instrument shows the direction of the wind?"
    },
    options: {
      uz: ["Flyuger", "Anemometr", "Barometr", "Gigrometr"],
      ru: ["Флюгер", "Анемометр", "Барометр", "Гигрометр"],
      en: ["Weather vane", "Anemometer", "Barometer", "Hygrometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Qaysi bulutlar 'ot dumi' deb ataladi?",
      ru: "Какие облака называют 'лошадиными хвостами'?",
      en: "Which clouds are called 'mare's tails'?"
    },
    options: {
      uz: ["Kumulus", "Stratus", "Sirus", "Nimbus"],
      ru: ["Кучевые", "Слоистые", "Перистые", "Дождевые"],
      en: ["Cumulus", "Stratus", "Cirrus", "Nimbus"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Yashin va momaqaldiroq orasidagi vaqt nimani bildiradi?",
      ru: "Что означает время между молнией и громом?",
      en: "What does the time between lightning and thunder indicate?"
    },
    options: {
      uz: ["Yashin kuchi", "Bo'ron masofasi", "Havo namligi", "Bulut balandligi"],
      ru: ["Сила молнии", "Расстояние до шторма", "Влажность воздуха", "Высота облаков"],
      en: ["Lightning strength", "Distance to storm", "Air humidity", "Cloud height"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Dunyodagi eng sovuq joy qayer?",
      ru: "Какое самое холодное место в мире?",
      en: "Where is the coldest place in the world?"
    },
    options: {
      uz: ["Sibir", "Grenlandiya", "Antarktida", "Alyaska"],
      ru: ["Сибирь", "Гренландия", "Антарктида", "Аляска"],
      en: ["Siberia", "Greenland", "Antarctica", "Alaska"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Tornado kuchi qaysi shkala bo'yicha o'lchanadi?",
      ru: "По какой шкале измеряется сила торнадо?",
      en: "By which scale is the strength of a tornado measured?"
    },
    options: {
      uz: ["Rixter", "Fudjita", "Saffir-Simpson", "Bofort"],
      ru: ["Рихтера", "Фуджиты", "Саффира-Симпсона", "Бофорта"],
      en: ["Richter", "Fujita", "Saffir-Simpson", "Beaufort"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Gidrologik sikl nima?",
      ru: "Что такое гидрологический цикл?",
      en: "What is the hydrological cycle?"
    },
    options: {
      uz: ["Havo aylanishi", "Suv aylanishi", "Muz erishi", "Yomg'ir yog'ishi"],
      ru: ["Круговорот воздуха", "Круговорот воды", "Таяние льда", "Выпадение дождя"],
      en: ["Air cycle", "Water cycle", "Ice melting", "Rainfall"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi hodisa 'El-Ninyo' deb ataladi?",
      ru: "Какое явление называется 'Эль-Ниньо'?",
      en: "What phenomenon is called 'El Niño'?"
    },
    options: {
      uz: ["Okean isishi", "Okean sovushi", "Kuchli shamol", "Qurg'oqchilik"],
      ru: ["Потепление океана", "Похолодание океана", "Сильный ветер", "Засуха"],
      en: ["Ocean warming", "Ocean cooling", "Strong wind", "Drought"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Atmosfera bosimi pasayganda ob-havo qanday bo'ladi?",
      ru: "Какая погода бывает при падении атмосферного давления?",
      en: "What is the weather like when atmospheric pressure drops?"
    },
    options: {
      uz: ["Ochiq", "Yomonlashadi", "O'zgarmaydi", "Issiq bo'ladi"],
      ru: ["Ясная", "Ухудшается", "Не меняется", "Будет жарко"],
      en: ["Clear", "Worsens", "Doesn't change", "Will be hot"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Eng katta do'l donasi qancha og'irlikda bo'lishi mumkin?",
      ru: "Сколько может весить самая большая градина?",
      en: "How much can the largest hailstone weigh?"
    },
    options: {
      uz: ["100g", "500g", "1kg dan ortiq", "10kg"],
      ru: ["100г", "500г", "Более 1кг", "10кг"],
      en: ["100g", "500g", "More than 1kg", "10kg"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi rangdagi osmon bo'ron yaqinlashayotganini bildiradi?",
      ru: "Небо какого цвета означает приближение шторма?",
      en: "What color of the sky indicates an approaching storm?"
    },
    options: {
      uz: ["Moviy", "Yashil/To'q ko'k", "Sariq", "Oq"],
      ru: ["Голубой", "Зеленый/Темно-синий", "Желтый", "Белый"],
      en: ["Blue", "Green/Dark Blue", "Yellow", "White"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Izobaralar xaritada nimani bog'laydi?",
      ru: "Что соединяют изобары на карте?",
      en: "What do isobars connect on a map?"
    },
    options: {
      uz: ["Haroratni", "Bosimni", "Namlikni", "Shamolni"],
      ru: ["Температуру", "Давление", "Влажность", "Ветер"],
      en: ["Temperature", "Pressure", "Humidity", "Wind"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Shimoliy yarim sharda siklonlar qaysi yo'nalishda aylanadi?",
      ru: "В каком направлении вращаются циклоны в Северном полушарии?",
      en: "In which direction do cyclones rotate in the Northern Hemisphere?"
    },
    options: {
      uz: ["Soat mili bo'yicha", "Soat miliga teskari", "Shimolga", "Janubga"],
      ru: ["По часовой стрелке", "Против часовой стрелки", "На север", "На юг"],
      en: ["Clockwise", "Counter-clockwise", "North", "South"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Dengiz shabada (briz) qachon esadi?",
      ru: "Когда дует морской бриз?",
      en: "When does a sea breeze blow?"
    },
    options: {
      uz: ["Kechasi", "Kunduzi", "Faqat qishda", "Faqat yozda"],
      ru: ["Ночью", "Днем", "Только зимой", "Только летом"],
      en: ["At night", "During the day", "Only in winter", "Only in summer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar eng balandda joylashgan?",
      ru: "Какие облака находятся выше всего?",
      en: "Which clouds are located highest?"
    },
    options: {
      uz: ["Kumulus", "Stratus", "Sirus", "Altostratus"],
      ru: ["Кучевые", "Слоистые", "Перистые", "Высокослоистые"],
      en: ["Cumulus", "Stratus", "Cirrus", "Altostratus"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Havo namligini o'lchaydigan asbob nima?",
      ru: "Какой прибор измеряет влажность воздуха?",
      en: "What instrument measures air humidity?"
    },
    options: {
      uz: ["Gigrometr", "Barometr", "Anemometr", "Termometr"],
      ru: ["Гигрометр", "Барометр", "Анемометр", "Термометр"],
      en: ["Hygrometer", "Barometer", "Anemometer", "Thermometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Quyosh nuri atmosferada sochilganda osmon qanday rangda ko'rinadi?",
      ru: "Какого цвета кажется небо, когда солнечный свет рассеивается в атмосфере?",
      en: "What color does the sky appear when sunlight scatters in the atmosphere?"
    },
    options: {
      uz: ["Qora", "Moviy", "Qizil", "Yashil"],
      ru: ["Черный", "Голубой", "Красный", "Зеленый"],
      en: ["Black", "Blue", "Red", "Green"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Muzlash nuqtasi Farengeyt shkalasi bo'yicha necha daraja?",
      ru: "Какова точка замерзания по шкале Фаренгейта?",
      en: "What is the freezing point on the Fahrenheit scale?"
    },
    options: {
      uz: ["0°F", "32°F", "100°F", "212°F"],
      ru: ["0°F", "32°F", "100°F", "212°F"],
      en: ["0°F", "32°F", "100°F", "212°F"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Atmosferadagi ozon qatlami bizni nimadan himoya qiladi?",
      ru: "От чего нас защищает озоновый слой в атмосфере?",
      en: "What does the ozone layer in the atmosphere protect us from?"
    },
    options: {
      uz: ["Meteoritlardan", "Ultrabinafsha nurlardan", "Sovuqdan", "Shamol"],
      ru: ["От метеоритов", "От ультрафиолетовых лучей", "От холода", "От ветра"],
      en: ["From meteorites", "From ultraviolet rays", "From cold", "From wind"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar yomg'ir olib keladi?",
      ru: "Какие облака приносят дождь?",
      en: "Which clouds bring rain?"
    },
    options: {
      uz: ["Sirus", "Nimbus", "Kumulus", "Stratus"],
      ru: ["Перистые", "Дождевые", "Кучевые", "Слоистые"],
      en: ["Cirrus", "Nimbus", "Cumulus", "Stratus"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Shudring nuqtasi nima?",
      ru: "Что такое точка росы?",
      en: "What is the dew point?"
    },
    options: {
      uz: ["Suv qaynash harorati", "Suv bug'i kondensatsiyalanish harorati", "Muz erish harorati", "Eng yuqori harorat"],
      ru: ["Температура кипения воды", "Температура конденсации водяного пара", "Температура таяния льда", "Самая высокая температура"],
      en: ["Water boiling temperature", "Water vapor condensation temperature", "Ice melting temperature", "Highest temperature"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Dunyodagi eng kuchli shamollar qayerda kuzatiladi?",
      ru: "Где наблюдаются самые сильные ветры в мире?",
      en: "Where are the strongest winds in the world observed?"
    },
    options: {
      uz: ["Sahroi Kabir", "Antarktida", "Tinch okeani", "Everest"],
      ru: ["Сахара", "Антарктида", "Тихий океан", "Эверест"],
      en: ["Sahara", "Antarctica", "Pacific Ocean", "Everest"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Musson shamollari nima?",
      ru: "Что такое муссонные ветры?",
      en: "What are monsoon winds?"
    },
    options: {
      uz: ["Doimiy shamollar", "Mavsumiy shamollar", "Mahalliy shamollar", "Tungi shamollar"],
      ru: ["Постоянные ветры", "Сезонные ветры", "Местные ветры", "Ночные ветры"],
      en: ["Constant winds", "Seasonal winds", "Local winds", "Night winds"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi asbob yog'in miqdorini o'lchaydi?",
      ru: "Какой прибор измеряет количество осадков?",
      en: "Which instrument measures the amount of precipitation?"
    },
    options: {
      uz: ["Gigrometr", "Pluviometr", "Anemometr", "Barometr"],
      ru: ["Гигрометр", "Плювиометр", "Анемометр", "Барометр"],
      en: ["Hygrometer", "Pluviometer", "Anemometer", "Barometer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Atmosferaning eng issiq qatlami qaysi?",
      ru: "Какой самый горячий слой атмосферы?",
      en: "Which is the hottest layer of the atmosphere?"
    },
    options: {
      uz: ["Troposfera", "Stratosfera", "Termosfera", "Ekzosfera"],
      ru: ["Тропосфера", "Стратосфера", "Термосфера", "Экзосфера"],
      en: ["Troposphere", "Stratosphere", "Thermosphere", "Exosphere"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi hodisa 'Aurora Borealis' deb ataladi?",
      ru: "Какое явление называется 'Aurora Borealis'?",
      en: "What phenomenon is called 'Aurora Borealis'?"
    },
    options: {
      uz: ["Janubiy yog'du", "Shimoliy yog'du", "Yashin", "G'ubor"],
      ru: ["Южное сияние", "Северное сияние", "Молния", "Дымка"],
      en: ["Southern Lights", "Northern Lights", "Lightning", "Haze"]
    },
    correct: 1
  },
  {
    question: {
      uz: "G'arbiy shamollar qaysi kengliklarda esadi?",
      ru: "В каких широтах дуют западные ветры?",
      en: "In which latitudes do westerly winds blow?"
    },
    options: {
      uz: ["Ekvatorda", "O'rta kengliklarda", "Qutblarda", "Tropiklarda"],
      ru: ["На экваторе", "В средних широтах", "На полюсах", "В тропиках"],
      en: ["At the equator", "In middle latitudes", "At the poles", "In the tropics"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qurg'oqchilik nima?",
      ru: "Что такое засуха?",
      en: "What is a drought?"
    },
    options: {
      uz: ["Kuchli yomg'ir", "Uzoq vaqt yog'in bo'lmasligi", "Muzliklar erishi", "Toshqin"],
      ru: ["Сильный дождь", "Длительное отсутствие осадков", "Таяние ледников", "Наводнение"],
      en: ["Heavy rain", "Long period without precipitation", "Glacier melting", "Flood"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar 'qo'y juniga' o'xshaydi?",
      ru: "Какие облака похожи на 'овечью шерсть'?",
      en: "Which clouds look like 'sheep's wool'?"
    },
    options: {
      uz: ["Kumulus", "Stratus", "Altocumulus", "Cirrus"],
      ru: ["Кучевые", "Слоистые", "Высококучевые", "Перистые"],
      en: ["Cumulus", "Stratus", "Altocumulus", "Cirrus"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Ob-havo prognozi bilan shug'ullanuvchi mutaxassis kim?",
      ru: "Кто такой специалист, занимающийся прогнозом погоды?",
      en: "Who is the specialist involved in weather forecasting?"
    },
    options: {
      uz: ["Geolog", "Meteorolog", "Arxeolog", "Astronom"],
      ru: ["Геолог", "Метеоролог", "Археолог", "Астроном"],
      en: ["Geologist", "Meteorologist", "Archaeologist", "Astronomer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Dunyodagi eng issiq harorat qayerda qayd etilgan?",
      ru: "Где была зафиксирована самая высокая температура в мире?",
      en: "Where was the hottest temperature in the world recorded?"
    },
    options: {
      uz: ["Sahroi Kabir", "O'lim vodiysi (AQSH)", "Lut sahrosi", "Arabiston"],
      ru: ["Сахара", "Долина Смерти (США)", "Пустыня Деште-Лут", "Аравия"],
      en: ["Sahara", "Death Valley (USA)", "Lut Desert", "Arabia"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Atmosferaning qaysi qatlamida ozon qatlami joylashgan?",
      ru: "В каком слое атмосферы находится озоновый слой?",
      en: "In which layer of the atmosphere is the ozone layer located?"
    },
    options: {
      uz: ["Troposfera", "Stratosfera", "Mezosfera", "Termosfera"],
      ru: ["Тропосфера", "Стратосфера", "Мезосфера", "Термосфера"],
      en: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi gaz issiqxona effektini keltirib chiqaradi?",
      ru: "Какой газ вызывает парниковый эффект?",
      en: "Which gas causes the greenhouse effect?"
    },
    options: {
      uz: ["Kislorod", "Karbonat angidrid", "Azot", "Argon"],
      ru: ["Кислород", "Углекислый газ", "Азот", "Аргон"],
      en: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Tuman qachon hosil bo'ladi?",
      ru: "Когда образуется туман?",
      en: "When does fog form?"
    },
    options: {
      uz: ["Havo isiganda", "Havo sovuganda va namlik yuqori bo'lganda", "Shamol esganda", "Quyosh chiqqanda"],
      ru: ["При потеплении воздуха", "При охлаждении воздуха и высокой влажности", "При ветре", "При восходе солнца"],
      en: ["When air warms", "When air cools and humidity is high", "When wind blows", "At sunrise"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi okean oqimi Yevropa iqlimini yumshatadi?",
      ru: "Какое океаническое течение смягчает климат Европы?",
      en: "Which ocean current softens the climate of Europe?"
    },
    options: {
      uz: ["Kurosio", "Golvstrim", "Labrador", "Benguela"],
      ru: ["Куросио", "Гольфстрим", "Лабрадорское", "Бенгельское"],
      en: ["Kuroshio", "Gulf Stream", "Labrador", "Benguela"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Siklon markazida bosim qanday bo'ladi?",
      ru: "Какое давление в центре циклона?",
      en: "What is the pressure in the center of a cyclone?"
    },
    options: {
      uz: ["Yuqori", "Past", "O'rtacha", "O'zgaruvchan"],
      ru: ["Высокое", "Низкое", "Среднее", "Переменное"],
      en: ["High", "Low", "Average", "Variable"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Antisiklon nima olib keladi?",
      ru: "Что приносит антициклон?",
      en: "What does an anticyclone bring?"
    },
    options: {
      uz: ["Yomg'ir va bo'ron", "Ochiq va barqaror ob-havo", "Qor", "Tuman"],
      ru: ["Дождь и шторм", "Ясную и стабильную погоду", "Снег", "Туман"],
      en: ["Rain and storm", "Clear and stable weather", "Snow", "Fog"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi asbob quyosh radiatsiyasini o'lchaydi?",
      ru: "Какой прибор измеряет солнечную радиацию?",
      en: "Which instrument measures solar radiation?"
    },
    options: {
      uz: ["Piranometr", "Barometr", "Termometr", "Anemometr"],
      ru: ["Пиранометр", "Барометр", "Термометр", "Анемометр"],
      en: ["Pyranometer", "Barometer", "Thermometer", "Anemometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Havo massasi nima?",
      ru: "Что такое воздушная масса?",
      en: "What is an air mass?"
    },
    options: {
      uz: ["Kichik shamol", "Katta hajmdagi bir xil xususiyatli havo", "Bulutlar to'plami", "Tuman"],
      ru: ["Небольшой ветер", "Большой объем воздуха с однородными свойствами", "Скопление облаков", "Туман"],
      en: ["Small wind", "Large volume of air with uniform properties", "Collection of clouds", "Fog"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Atmosferaning eng yuqori qatlami qaysi?",
      ru: "Какой самый верхний слой атмосферы?",
      en: "Which is the uppermost layer of the atmosphere?"
    },
    options: {
      uz: ["Troposfera", "Stratosfera", "Mezosfera", "Ekzosfera"],
      ru: ["Тропосфера", "Стратосфера", "Мезосфера", "Экзосфера"],
      en: ["Troposphere", "Stratosphere", "Mesosphere", "Exosphere"]
    },
    correct: 3
  },
  {
    question: {
      uz: "Qaysi hodisa 'Yashil uy' effekti deb ham ataladi?",
      ru: "Какое явление также называют эффектом 'зеленого дома'?",
      en: "What phenomenon is also called the 'Greenhouse' effect?"
    },
    options: {
      uz: ["Global sovush", "Issiqxona effekti", "Ozon teshigi", "Kislotali yomg'ir"],
      ru: ["Глобальное похолодание", "Парниковый эффект", "Озоновая дыра", "Кислотный дождь"],
      en: ["Global cooling", "Greenhouse effect", "Ozone hole", "Acid rain"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Shamol kuchi qaysi shkala bo'yicha o'lchanadi?",
      ru: "По какой шкале измеряется сила ветра?",
      en: "By which scale is the wind force measured?"
    },
    options: {
      uz: ["Rixter", "Bofort", "Fudjita", "Selsiy"],
      ru: ["Рихтера", "Бофорта", "Фуджиты", "Цельсия"],
      en: ["Richter", "Beaufort", "Fujita", "Celsius"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar 'momaqaldiroq buluti' deb ataladi?",
      ru: "Какие облака называют 'грозовыми облаками'?",
      en: "Which clouds are called 'thunder clouds'?"
    },
    options: {
      uz: ["Sirus", "Kumulonimbus", "Stratus", "Altocumulus"],
      ru: ["Перистые", "Кучево-дождевые", "Слоистые", "Высококучевые"],
      en: ["Cirrus", "Cumulonimbus", "Stratus", "Altocumulus"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Havo harorati balandlikka ko'tarilgan sari qanday o'zgaradi (troposferada)?",
      ru: "Как меняется температура воздуха с высотой (в тропосфере)?",
      en: "How does air temperature change with altitude (in the troposphere)?"
    },
    options: {
      uz: ["Ko'tariladi", "Pasayadi", "O'zgarmaydi", "Avval pasayadi, keyin ko'tariladi"],
      ru: ["Повышается", "Понижается", "Не меняется", "Сначала понижается, затем повышается"],
      en: ["Increases", "Decreases", "Doesn't change", "First decreases, then increases"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi asbob havo zichligini o'lchashga yordam beradi?",
      ru: "Какой прибор помогает измерить плотность воздуха?",
      en: "Which instrument helps measure air density?"
    },
    options: {
      uz: ["Densitometr", "Barometr", "Termometr", "Anemometr"],
      ru: ["Денситометр", "Барометр", "Термометр", "Анемометр"],
      en: ["Densitometer", "Barometer", "Thermometer", "Anemometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Yomg'ir suvi nima uchun kislotali bo'lishi mumkin?",
      ru: "Почему дождевая вода может быть кислотной?",
      en: "Why can rainwater be acidic?"
    },
    options: {
      uz: ["Tuz ko'pligidan", "Ifloslanish (gazlar) tufayli", "Quyosh nuri tufayli", "Muz tufayli"],
      ru: ["Из-за избытка соли", "Из-за загрязнения (газов)", "Из-за солнечного света", "Из-за льда"],
      en: ["Due to excess salt", "Due to pollution (gases)", "Due to sunlight", "Due to ice"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi hodisa 'Tsunami' deb ataladi?",
      ru: "Какое явление называется 'Цунами'?",
      en: "What phenomenon is called 'Tsunami'?"
    },
    options: {
      uz: ["Kuchli shamol", "Dengiz ostidagi zilzila natijasidagi to'lqin", "Yomg'ir", "Tuman"],
      ru: ["Сильный ветер", "Волна в результате подводного землетрясения", "Дождь", "Туман"],
      en: ["Strong wind", "Wave resulting from an underwater earthquake", "Rain", "Fog"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Atmosferadagi eng ko'p tarqalgan ikkinchi gaz qaysi?",
      ru: "Какой второй по распространенности газ в атмосфере?",
      en: "Which is the second most abundant gas in the atmosphere?"
    },
    options: {
      uz: ["Azot", "Kislorod", "Argon", "Karbonat angidrid"],
      ru: ["Азот", "Кислород", "Аргон", "Углекислый газ"],
      en: ["Nitrogen", "Oxygen", "Argon", "Carbon Dioxide"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qutb yog'dusi qayerda kuzatiladi?",
      ru: "Где наблюдается полярное сияние?",
      en: "Where is the aurora observed?"
    },
    options: {
      uz: ["Ekvatorda", "Qutb doiralarida", "Tropiklarda", "Cho'llarda"],
      ru: ["На экваторе", "В полярных кругах", "В тропиках", "В пустынях"],
      en: ["At the equator", "In polar circles", "In the tropics", "In deserts"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Atmosfera bosimi qanday asbob bilan o'lchanadi?",
      ru: "Каким прибором измеряется атмосферное давление?",
      en: "What instrument is used to measure atmospheric pressure?"
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
      uz: "Havo namligi qanday asbob bilan o'lchanadi?",
      ru: "Каким прибором измеряется влажность воздуха?",
      en: "What instrument is used to measure air humidity?"
    },
    options: {
      uz: ["Barometr", "Gigrometr", "Anemometr", "Termometr"],
      ru: ["Барометр", "Гигрометр", "Анемометр", "Термометр"],
      en: ["Barometer", "Hygrometer", "Anemometer", "Thermometer"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Shamol tezligi qanday asbob bilan o'lchanadi?",
      ru: "Каким прибором измеряется скорость ветра?",
      en: "What instrument is used to measure wind speed?"
    },
    options: {
      uz: ["Anemometr", "Gigrometr", "Barometr", "Termometr"],
      ru: ["Анемометр", "Гигрометр", "Барометр", "Термометр"],
      en: ["Anemometer", "Hygrometer", "Barometer", "Thermometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Yog'ingarchilik miqdori qanday asbob bilan o'lchanadi?",
      ru: "Каким прибором измеряется количество осадков?",
      en: "What instrument is used to measure precipitation?"
    },
    options: {
      uz: ["Pluviometr", "Anemometr", "Gigrometr", "Barometr"],
      ru: ["Плювиометр", "Анемометр", "Гигрометр", "Барометр"],
      en: ["Pluviometer", "Anemometer", "Hygrometer", "Barometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Qaysi bulutlar eng balandda joylashgan?",
      ru: "Какие облака находятся выше всего?",
      en: "Which clouds are located highest?"
    },
    options: {
      uz: ["To'p-to'p bulutlar", "Qatlamli bulutlar", "Patli bulutlar", "Yomg'irli bulutlar"],
      ru: ["Кучевые облака", "Слоистые облака", "Перистые облака", "Дождевые облака"],
      en: ["Cumulus clouds", "Stratus clouds", "Cirrus clouds", "Nimbus clouds"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi bulutlar yashin va momaqaldiroq olib keladi?",
      ru: "Какие облака приносят грозу и молнию?",
      en: "Which clouds bring thunderstorms and lightning?"
    },
    options: {
      uz: ["To'p-to'p yomg'ir bulutlari", "Patli bulutlar", "Qatlamli bulutlar", "Oq to'p bulutlar"],
      ru: ["Кучево-дождевые облака", "Перистые облака", "Слоистые облака", "Белые кучевые облака"],
      en: ["Cumulonimbus clouds", "Cirrus clouds", "Stratus clouds", "White cumulus clouds"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Atmosferaning eng pastki qatlami nima deb ataladi?",
      ru: "Как называется самый нижний слой атмосферы?",
      en: "What is the lowest layer of the atmosphere called?"
    },
    options: {
      uz: ["Stratosfera", "Troposfera", "Mezosfera", "Termosfera"],
      ru: ["Стратосфера", "Тропосфера", "Мезосфера", "Термосфера"],
      en: ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Ozon qatlami atmosferaning qaysi qatlamida joylashgan?",
      ru: "В каком слое атмосферы находится озоновый слой?",
      en: "In which layer of the atmosphere is the ozone layer located?"
    },
    options: {
      uz: ["Troposfera", "Stratosfera", "Mezosfera", "Ekzosfera"],
      ru: ["Тропосфера", "Стратосфера", "Мезосфера", "Экзосфера"],
      en: ["Troposphere", "Stratosphere", "Mesosphere", "Exosphere"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Shamol nima sababdan paydo bo'ladi?",
      ru: "Почему возникает ветер?",
      en: "Why does wind occur?"
    },
    options: {
      uz: ["Yer aylanishi", "Bosimlar farqi", "Okean oqimlari", "Bulutlar harakati"],
      ru: ["Вращение Земли", "Разница давлений", "Океанские течения", "Движение облаков"],
      en: ["Earth's rotation", "Pressure difference", "Ocean currents", "Cloud movement"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Musson shamollari qanday yo'nalishda esadi?",
      ru: "В каком направлении дуют муссонные ветры?",
      en: "In what direction do monsoon winds blow?"
    },
    options: {
      uz: ["Faqat shimolga", "Faqat janubga", "Mavsumga qarab o'zgaradi", "Faqat g'arbga"],
      ru: ["Только на север", "Только на юг", "Меняются в зависимости от сезона", "Только на запад"],
      en: ["Only north", "Only south", "Changes depending on the season", "Only west"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Siklonda havo bosimi qanday bo'ladi?",
      ru: "Какое давление воздуха в циклоне?",
      en: "What is the air pressure in a cyclone?"
    },
    options: {
      uz: ["Yuqori", "Past", "O'rtacha", "O'zgarmas"],
      ru: ["Высокое", "Низкое", "Среднее", "Постоянное"],
      en: ["High", "Low", "Medium", "Constant"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Antisiklonda havo bosimi qanday bo'ladi?",
      ru: "Какое давление воздуха в антициклоне?",
      en: "What is the air pressure in an anticyclone?"
    },
    options: {
      uz: ["Past", "Yuqori", "O'rtacha", "Nolga teng"],
      ru: ["Низкое", "Высокое", "Среднее", "Равно нулю"],
      en: ["Low", "High", "Medium", "Zero"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Eng kuchli shamollar qayerda kuzatiladi?",
      ru: "Где наблюдаются самые сильные ветры?",
      en: "Where are the strongest winds observed?"
    },
    options: {
      uz: ["Tornado markazida", "O'rmonlarda", "Tog' etaklarida", "Daryo bo'ylarida"],
      ru: ["В центре торнадо", "В лесах", "У подножия гор", "Вдоль рек"],
      en: ["In the center of a tornado", "In forests", "At the foot of mountains", "Along rivers"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Iqlim nima?",
      ru: "Что такое климат?",
      en: "What is climate?"
    },
    options: {
      uz: ["Bir kunlik ob-havo", "Ko'p yillik ob-havo tartibi", "Faqat yomg'ir miqdori", "Havo harorati"],
      ru: ["Погода на один день", "Многолетний режим погоды", "Только количество осадков", "Температура воздуха"],
      en: ["Weather for one day", "Long-term weather pattern", "Only precipitation amount", "Air temperature"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Ekvatorial iqlim qanday xususiyatga ega?",
      ru: " Какими особенностями обладает экваториальный климат?",
      en: "What characteristics does the equatorial climate have?"
    },
    options: {
      uz: ["Sovuq va quruq", "Issiq va nam", "Issiq va quruq", "Sovuq va nam"],
      ru: ["Холодный и сухой", "Жаркий и влажный", "Жаркий и сухой", "Холодный и влажный"],
      en: ["Cold and dry", "Hot and humid", "Hot and dry", "Cold and humid"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Tropik iqlimda yoz qanday o'tadi?",
      ru: "Как проходит лето в тропическом климате?",
      en: "How is summer in a tropical climate?"
    },
    options: {
      uz: ["Yomg'irli", "Juda issiq va quruq", "Salqin", "Qorli"],
      ru: ["Дождливое", "Очень жаркое и сухое", "Прохладное", "Снежное"],
      en: ["Rainy", "Very hot and dry", "Cool", "Snowy"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Mo'tadil iqlimda nechta fasl bor?",
      ru: "Сколько сезонов в умеренном климате?",
      en: "How many seasons are there in a temperate climate?"
    },
    options: {
      uz: ["2 ta", "3 ta", "4 ta", "1 ta"],
      ru: ["2", "3", "4", "1"],
      en: ["2", "3", "4", "1"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Arktika iqlimi qayerda tarqalgan?",
      ru: "Где распространен арктический климат?",
      en: "Where is the Arctic climate spread?"
    },
    options: {
      uz: ["Shimoliy qutbda", "Ekvatorda", "Avstraliyada", "Afrikada"],
      ru: ["На Северном полюсе", "На экваторе", "В Австралии", "В Африке"],
      en: ["At the North Pole", "At the equator", "In Australia", "In Africa"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Dengiz iqlimi qanday bo'ladi?",
      ru: "Каков морской климат?",
      en: "What is the marine climate like?"
    },
    options: {
      uz: ["Keskin kontinental", "Yumshoq va nam", "Juda issiq", "Juda sovuq"],
      ru: ["Резко континентальный", "Мягкий и влажный", "Очень жаркий", "Очень холодный"],
      en: ["Sharply continental", "Mild and humid", "Very hot", "Very cold"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Kontinental iqlimda qish qanday bo'ladi?",
      ru: "Какая зима в континентальном климате?",
      en: "What is winter like in a continental climate?"
    },
    options: {
      uz: ["Iliq", "Sovuq va quruq", "Yomg'irli", "Issiq"],
      ru: ["Теплая", "Холодная и сухая", "Дождливая", "Жаркая"],
      en: ["Warm", "Cold and dry", "Rainy", "Hot"]
    },
    correct: 1
  },
  {
    question: {
      uz: "El-Ninyo hodisasi nima?",
      ru: "Что такое явление Эль-Ниньо?",
      en: "What is the El Niño phenomenon?"
    },
    options: {
      uz: ["Okean suvining isishi", "Okean suvining sovushi", "Kuchli shamol", "Qor bo'roni"],
      ru: ["Потепление океанской воды", "Похолодание океанской воды", "Сильный ветер", "Снежная буря"],
      en: ["Warming of ocean water", "Cooling of ocean water", "Strong wind", "Snowstorm"]
    },
    correct: 0
  },
  {
    question: {
      uz: "La-Ninya hodisasi nima?",
      ru: "Что такое явление Ла-Нинья?",
      en: "What is the La Niña phenomenon?"
    },
    options: {
      uz: ["Okean suvining isishi", "Okean suvining sovushi", "Tsunami", "Vulqon otilishi"],
      ru: ["Потепление океанской воды", "Похолодание океанской воды", "Цунами", "Извержение вулкана"],
      en: ["Warming of ocean water", "Cooling of ocean water", "Tsunami", "Volcanic eruption"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Global isish nima sababdan sodir bo'ladi?",
      ru: "Почему происходит глобальное потепление?",
      en: "Why does global warming occur?"
    },
    options: {
      uz: ["Daraxtlar ekish", "Issiqxona effekti", "Okean toshishi", "Yer aylanishi sekinlashishi"],
      ru: ["Посадка деревьев", "Парниковый эффект", "Разлив океана", "Замедление вращения Земли"],
      en: ["Planting trees", "Greenhouse effect", "Ocean flooding", "Slowing of Earth's rotation"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Issiqxona gazlariga qaysi gaz kiradi?",
      ru: "Какой газ относится к парниковым газам?",
      en: "Which gas is a greenhouse gas?"
    },
    options: {
      uz: ["Kislorod", "Karbonat angidrid", "Argon", "Geliy"],
      ru: ["Кислород", "Углекислый газ", "Аргон", "Гелий"],
      en: ["Oxygen", "Carbon dioxide", "Argon", "Helium"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Atmosferadagi ozon teshigi nima uchun xavfli?",
      ru: "Чем опасна озоновая дыра в атмосфере?",
      en: "Why is the ozone hole in the atmosphere dangerous?"
    },
    options: {
      uz: ["Yomg'ir ko'payadi", "Ultrabinafsha nurlar ko'payadi", "Havo soviydi", "Shamollar to'xtaydi"],
      ru: ["Дождей станет больше", "Увеличится количество ультрафиолетовых лучей", "Воздух станет холоднее", "Ветры прекратятся"],
      en: ["Rain will increase", "Ultraviolet rays will increase", "Air will cool down", "Winds will stop"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi qit'a eng quruq hisoblanadi?",
      ru: "Какой континент считается самым сухим?",
      en: "Which continent is considered the driest?"
    },
    options: {
      uz: ["Afrika", "Avstraliya", "Janubiy Amerika", "Osiyo"],
      ru: ["Африка", "Австралия", "Южная Америка", "Азия"],
      en: ["Africa", "Australia", "South America", "Asia"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi qit'a eng nam hisoblanadi?",
      ru: "Какой континент считается самым влажным?",
      en: "Which continent is considered the wettest?"
    },
    options: {
      uz: ["Janubiy Amerika", "Shimoliy Amerika", "Yevropa", "Afrika"],
      ru: ["Южная Америка", "Северная Америка", "Европа", "Африка"],
      en: ["South America", "North America", "Europe", "Africa"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Sahroi Kabir qayerda joylashgan?",
      ru: "Где находится пустыня Сахара?",
      en: "Where is the Sahara Desert located?"
    },
    options: {
      uz: ["Osiyoda", "Afrikada", "Avstraliyada", "Amerikada"],
      ru: ["В Азии", "В Африке", "В Австралии", "В Америке"],
      en: ["In Asia", "In Africa", "In Australia", "In America"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Eng past harorat qayerda qayd etilgan?",
      ru: "Где была зафиксирована самая низкая температура?",
      en: "Where was the lowest temperature recorded?"
    },
    options: {
      uz: ["Sibirda", "Antarktidada", "Grenlandiyada", "Alyaskada"],
      ru: ["В Сибири", "В Антарктиде", "В Гренландии", "На Аляске"],
      en: ["In Siberia", "In Antarctica", "In Greenland", "In Alaska"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Eng yuqori harorat qayerda qayd etilgan?",
      ru: "Где была зафиксирована самая высокая температура?",
      en: "Where was the highest temperature recorded?"
    },
    options: {
      uz: ["Liviya sahrosida", "O'rta Osiyoda", "Avstraliyada", "Hindistonda"],
      ru: ["В Ливийской пустыне", "В Средней Азии", "В Австралии", "В Индии"],
      en: ["In the Libyan Desert", "In Central Asia", "In Australia", "In India"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Tuman nima?",
      ru: "Что такое туман?",
      en: "What is fog?"
    },
    options: {
      uz: ["Yerdagi bulut", "Kuchli yomg'ir", "Muz bo'laklari", "Quruq havo"],
      ru: ["Облако у земли", "Сильный дождь", "Кусочки льда", "Сухой воздух"],
      en: ["Cloud at the ground", "Heavy rain", "Ice pieces", "Dry air"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Shudring qachon tushadi?",
      ru: "Когда выпадает роса?",
      en: "When does dew fall?"
    },
    options: {
      uz: ["Kunduzi", "Kechasi va tongda", "Faqat qishda", "Tush paytida"],
      ru: ["Днем", "Ночью и утром", "Только зимой", "В полдень"],
      en: ["During the day", "At night and in the morning", "Only in winter", "At noon"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qirov nima?",
      ru: "Что такое иней?",
      en: "What is frost?"
    },
    options: {
      uz: ["Muzlagan shudring", "Yomg'ir", "Qor bo'roni", "Tuman"],
      ru: ["Замерзшая роса", "Дождь", "Снежная буря", "Туман"],
      en: ["Frozen dew", "Rain", "Snowstorm", "Fog"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Do'l qanday faslda ko'proq yog'adi?",
      ru: "В какое время года чаще всего идет град?",
      en: "In what season does hail fall most often?"
    },
    options: {
      uz: ["Qishda", "Bahor va yozda", "Kuzda", "Faqat qishda"],
      ru: ["Зимой", "Весной и летом", "Осенью", "Только зимой"],
      en: ["In winter", "In spring and summer", "In autumn", "Only in winter"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Momaqaldiroq paytida birinchi nima ko'rinadi?",
      ru: "Что первым видно во время грозы?",
      en: "What is seen first during a thunderstorm?"
    },
    options: {
      uz: ["Gumburlash", "Yashin (chaqmoq)", "Yomg'ir", "Shamol"],
      ru: ["Гром", "Молния", "Дождь", "Ветер"],
      en: ["Thunder", "Lightning", "Rain", "Wind"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Nima uchun chaqmoq birinchi ko'rinadi, keyin gumburlash eshitiladi?",
      ru: "Почему сначала видна молния, а потом слышен гром?",
      en: "Why is lightning seen first, then thunder heard?"
    },
    options: {
      uz: ["Tovush tezligi yuqori", "Yorug'lik tezligi tovushdan yuqori", "Chaqmoq yaqinroq", "Gumburlash kechikadi"],
      ru: ["Скорость звука выше", "Скорость света выше скорости звука", "Молния ближе", "Гром запаздывает"],
      en: ["Sound speed is higher", "Light speed is higher than sound speed", "Lightning is closer", "Thunder is delayed"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Kamalak qachon paydo bo'ladi?",
      ru: "Когда появляется радуга?",
      en: "When does a rainbow appear?"
    },
    options: {
      uz: ["Faqat tunda", "Yomg'irdan keyin quyosh chiqqanda", "Qor yog'ganda", "Tuman tushganda"],
      ru: ["Только ночью", "Когда после дождя выходит солнце", "Когда идет снег", "Когда падает туман"],
      en: ["Only at night", "When the sun comes out after rain", "When it snows", "When fog falls"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Kamalakda nechta rang bor?",
      ru: "Сколько цветов в радуге?",
      en: "How many colors are in a rainbow?"
    },
    options: {
      uz: ["5 ta", "6 ta", "7 ta", "10 ta"],
      ru: ["5", "6", "7", "10"],
      en: ["5", "6", "7", "10"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi rang kamalakning eng tepasida bo'ladi?",
      ru: "Какой цвет находится на самом верху радуги?",
      en: "Which color is at the very top of the rainbow?"
    },
    options: {
      uz: ["Binafsha", "Yashil", "Qizil", "Sariq"],
      ru: ["Фиолетовый", "Зеленый", "Красный", "Желтый"],
      en: ["Violet", "Green", "Red", "Yellow"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Qaysi rang kamalakning eng pastida bo'ladi?",
      ru: "Какой цвет находится в самом низу радуги?",
      en: "Which color is at the very bottom of the rainbow?"
    },
    options: {
      uz: ["Qizil", "Sariq", "Binafsha", "Ko'k"],
      ru: ["Красный", "Желтый", "Фиолетовый", "Синий"],
      en: ["Red", "Yellow", "Violet", "Blue"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Tsunami nima sababdan paydo bo'ladi?",
      ru: "Из-за чего возникает цунами?",
      en: "What causes a tsunami?"
    },
    options: {
      uz: ["Kuchli shamol", "Suv osti zilzilasi", "Yomg'ir", "Oy tutilishi"],
      ru: ["Сильный ветер", "Подводное землетрясение", "Дождь", "Лунное затмение"],
      en: ["Strong wind", "Underwater earthquake", "Rain", "Lunar eclipse"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Smerch (tornado) nima?",
      ru: "Что такое смерч (торнадо)?",
      en: "What is a tornado?"
    },
    options: {
      uz: ["Aylanma shamol ustuni", "Kuchli yomg'ir", "Qor ko'chkisi", "Okean oqimi"],
      ru: ["Вращающийся столб воздуха", "Сильный дождь", "Снежная лавина", "Океанское течение"],
      en: ["Rotating column of air", "Heavy rain", "Avalanche", "Ocean current"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Qaysi davlatda eng ko'p tornado sodir bo'ladi?",
      ru: "В какой стране происходит больше всего торнадо?",
      en: "In which country do the most tornadoes occur?"
    },
    options: {
      uz: ["Rossiya", "AQSH", "Xitoy", "Braziliya"],
      ru: ["Россия", "США", "Китай", "Бразилия"],
      en: ["Russia", "USA", "China", "Brazil"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Tayfun nima?",
      ru: "Что такое тайфун?",
      en: "What is a typhoon?"
    },
    options: {
      uz: ["Tinch okeanidagi kuchli bo'ron", "Cho'l shamoli", "Muzlik erishi", "Daryo toshqini"],
      ru: ["Сильный шторм в Тихом океане", "Пустынный ветер", "Таяние ледников", "Разлив реки"],
      en: ["Strong storm in the Pacific Ocean", "Desert wind", "Glacier melting", "River flood"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Gidrosfera nima?",
      ru: "Что такое гидросфера?",
      en: "What is the hydrosphere?"
    },
    options: {
      uz: ["Yerning havo qobig'i", "Yerning suv qobig'i", "Yerning tosh qobig'i", "Yerning hayot qobig'i"],
      ru: ["Воздушная оболочка Земли", "Водная оболочка Земли", "Каменная оболочка Земли", "Живая оболочка Земли"],
      en: ["Earth's air shell", "Earth's water shell", "Earth's stone shell", "Earth's life shell"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Litosfera nima?",
      ru: "Что такое литосфера?",
      en: "What is the lithosphere?"
    },
    options: {
      uz: ["Suv qobig'i", "Havo qobig'i", "Qattiq tosh qobig'i", "O'simliklar dunyosi"],
      ru: ["Водная оболочка", "Воздушная оболочка", "Твердая каменная оболочка", "Растительный мир"],
      en: ["Water shell", "Air shell", "Solid stone shell", "Plant world"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Biosfera nima?",
      ru: "Что такое биосфера?",
      en: "What is the biosphere?"
    },
    options: {
      uz: ["Suv qatlami", "Hayot tarqalgan qobiq", "Atmosfera", "Yer yadrosi"],
      ru: ["Водный слой", "Оболочка, где распространена жизнь", "Атмосфера", "Ядро Земли"],
      en: ["Water layer", "Shell where life is spread", "Atmosphere", "Earth's core"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Yerning markazida nima joylashgan?",
      ru: "Что находится в центре Земли?",
      en: "What is at the center of the Earth?"
    },
    options: {
      uz: ["Mantiya", "Yadro", "Yer qobig'i", "Okean"],
      ru: ["Мантия", "Ядро", "Земная кора", "Океан"],
      en: ["Mantle", "Core", "Earth's crust", "Ocean"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Eng katta okean qaysi?",
      ru: "Какой океан самый большой?",
      en: "Which ocean is the largest?"
    },
    options: {
      uz: ["Atlantika", "Hind", "Tinch", "Shimoliy Muz"],
      ru: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"],
      en: ["Atlantic", "Indian", "Pacific", "Arctic"]
    },
    correct: 2
  }
];
