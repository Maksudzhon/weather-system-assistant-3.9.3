import { Question } from './questions';

export const WEATHER_QUESTIONS: Question[] = [
  {
    question: {
      uz: "Shamol tezligini o'lchaydigan asbob nima deb ataladi?",
      ru: "Как называется прибор для измерения скорости ветра?",
      en: "What is the instrument used to measure wind speed called?"
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
      uz: "Atmosfera bosimini o'lchaydigan asbob nima?",
      ru: "Какой прибор измеряет атмосферное давление?",
      en: "What instrument measures atmospheric pressure?"
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
      uz: "Havo namligini o'lchaydigan asbob nima?",
      ru: "Какой прибор измеряет влажность воздуха?",
      en: "What instrument measures air humidity?"
    },
    options: {
      uz: ["Gigrometr", "Anemometr", "Barometr", "Termometr"],
      ru: ["Гигрометр", "Анемометр", "Барометр", "Термометр"],
      en: ["Hygrometer", "Anemometer", "Barometer", "Thermometer"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Grom (momaqaldiroq ovozi) nima sababdan paydo bo'ladi?",
      ru: "От чего возникает гром?",
      en: "What causes thunder?"
    },
    options: {
      uz: ["Bulutlar to'qnashuvi", "Yashin havoni tez qizdirishi", "Yomg'ir tomchilari", "Shamol"],
      ru: ["Столкновение облаков", "Быстрый нагрев воздуха молнией", "Капли дождя", "Ветер"],
      en: ["Clouds colliding", "Rapid heating of air by lightning", "Raindrops", "Wind"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Qaysi bulutlar odatda kuchli yomg'ir va momaqaldiroq olib keladi?",
      ru: "Какие облака обычно приносят сильный дождь и грозу?",
      en: "Which clouds usually bring heavy rain and thunderstorms?"
    },
    options: {
      uz: ["Sirus (patli)", "Kumulus (to'p-to'p)", "Kumulonimbus (to'p-to'p yomg'ir)", "Stratus (qatlamli)"],
      ru: ["Перистые", "Кучевые", "Кучево-дождевые", "Слоистые"],
      en: ["Cirrus", "Cumulus", "Cumulonimbus", "Stratus"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Kamalak paydo bo'lishi uchun nima kerak?",
      ru: "Что нужно для появления радуги?",
      en: "What is needed for a rainbow to appear?"
    },
    options: {
      uz: ["Faqat yomg'ir", "Faqat quyosh", "Yomg'ir va quyosh nuri", "Faqat shamol"],
      ru: ["Только дождь", "Только солнце", "Дождь и солнечный свет", "Только ветер"],
      en: ["Only rain", "Only sun", "Rain and sunlight", "Only wind"]
    },
    correct: 2
  },
  {
    question: {
      uz: "Dunyodagi eng sovuq joy qayerda joylashgan?",
      ru: "Где находится самое холодное место в мире?",
      en: "Where is the coldest place in the world located?"
    },
    options: {
      uz: ["Arktika", "Antarktida", "Sibir", "Grenlandiya"],
      ru: ["Арктика", "Антарктида", "Сибирь", "Гренландия"],
      en: ["Arctic", "Antarctica", "Siberia", "Greenland"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Tuman nima?",
      ru: "Что такое туман?",
      en: "What is fog?"
    },
    options: {
      uz: ["Yer yuzasidagi bulut", "Tutun", "Chang", "Muz bo'laklari"],
      ru: ["Облако у поверхности земли", "Дым", "Пыль", "Кусочки льда"],
      en: ["A cloud at ground level", "Smoke", "Dust", "Ice pieces"]
    },
    correct: 0
  },
  {
    question: {
      uz: "Yashin nima?",
      ru: "Что такое молния?",
      en: "What is lightning?"
    },
    options: {
      uz: ["Olov", "Elektr razryadi", "Nur", "Shovqin"],
      ru: ["Огонь", "Электрический разряд", "Свет", "Шум"],
      en: ["Fire", "Electric discharge", "Light", "Noise"]
    },
    correct: 1
  },
  {
    question: {
      uz: "Quyosh nuri yerga necha daqiqada yetib keladi?",
      ru: "За сколько минут солнечный свет доходит до земли?",
      en: "How many minutes does it take for sunlight to reach Earth?"
    },
    options: {
      uz: ["1 daqiqa", "5 daqiqa", "8 daqiqa", "15 daqiqa"],
      ru: ["1 минута", "5 минут", "8 минут", "15 минут"],
      en: ["1 minute", "5 minutes", "8 minutes", "15 minutes"]
    },
    correct: 2
  }
];
