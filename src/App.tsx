import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Moon,
  Wind, 
  Droplets, 
  Clock, 
  Globe, 
  Calendar as CalendarIcon,
  DollarSign, 
  Plane, 
  Search, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Home, 
  Compass, 
  ArrowRight, 
  ChevronRight, 
  Menu, 
  X,
  RefreshCw,
  TrendingUp,
  Camera,
  Navigation,
  Loader2,
  AlertCircle,
  Languages,
  Sparkles,
  Github,
  Twitter,
  Gamepad2,
  Info,
  Rocket,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Send,
  Instagram,
  LayoutDashboard,
  CloudSun,
  Coins,
  BellRing,
  Download,
  TrendingDown,
  Bitcoin,
  BarChart3,
  Shirt,
  WindArrowDown,
  SunMedium,
  Globe2,
  MessageSquare,
  SendHorizontal,
  Users
} from 'lucide-react';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import Markdown from 'react-markdown';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './utils';
import { AnimatedWeather } from './components/AnimatedWeather';
import { QuizDashboard } from './components/QuizDashboard';
import { AdminPanel } from './components/AdminPanel';
import { Bell, ShieldCheck } from 'lucide-react';

import { 
  generateDailyFact, 
  generateWeatherInsight, 
  generateMarketInsight, 
  generateTravelPlan, 
  generateOutfitRecommendation,
  generateCityInsight
} from './services/geminiService';

import { WEATHER_QUESTIONS, Question } from './data/questions';
import { CITY_QUESTIONS } from './data/cityQuestions';

// --- Constants & Types ---
interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  aqi?: number;
  uvIndex?: number;
  forecast: { time: string; temp: number }[];
  dailyForecast: { date: string; maxTemp: number; minTemp: number; condition: string }[];
}

interface CurrencyData {
  base: string;
  rates: Record<string, number>;
}

interface CityInsight {
  name: string;
  description: string;
  work: string;
  study: string;
  live: string;
  travel: string;
  fact: string;
  images: string[];
  cuisine: { name: string, description: string }[];
  safety: string;
  packing: string[];
  activities: string[];
}

interface FlightInfo {
  from: string;
  to: string;
  price: string;
  duration: string;
  airline: string;
}

const WORLD_CITIES = [
  { name: 'Tashkent', tz: 'Asia/Tashkent' },
  { name: 'London', tz: 'Europe/London' },
  { name: 'New York', tz: 'America/New_York' },
  { name: 'Tokyo', tz: 'Asia/Tokyo' },
  { name: 'Dubai', tz: 'Asia/Dubai' }
];

const STATIC_CITY_DATA: Record<string, Record<string, CityInsight>> = {
  'tashkent': {
    uz: {
      name: 'Toshkent',
      description: 'O\'zbekistonning poytaxti va eng yirik shahri. Markaziy Osiyoning madaniy va iqtisodiy markazi.',
      work: 'IT, moliya, qurilish va xizmat ko\'rsatish sohalarida keng imkoniyatlar.',
      study: 'O\'zbekiston Milliy Universiteti, Toshkent Davlat Texnika Universiteti va ko\'plab xalqaro universitetlar.',
      live: 'Zamonaviy infratuzilma, arzon yashash xarajatlari va mehmondo\'st xalq.',
      travel: 'Chorsu bozori, Hazrati Imom majmuasi, Toshkent metrosi va Teleminora.',
      fact: 'Toshkent metrosi Markaziy Osiyodagi birinchi metro hisoblanadi.',
      images: ['tashkent', 'uzbekistan', 'city'],
      cuisine: [
        { name: 'Palov', description: 'O\'zbek oshxonasining shohi.' },
        { name: 'Somsa', description: 'Tandirda pishirilgan mazali xamir ovqat.' },
        { name: 'Norin', description: 'Yupqa kesilgan xamir va go\'shtli an\'anaviy taom.' }
      ],
      safety: 'Shahar juda xavfsiz, ayniqsa sayyohlar uchun. Kechki sayrlar bexatar.',
      packing: ['Quyosh ko\'zoynagi', 'Yengil kiyim', 'Qulay poyabzal', 'Powerbank', 'Shaxsiy gigiyena vositalari'],
      activities: ["Eski shaharni aylanish", "Metroda sayohat qilish", "Milliy taomlarni tatib ko'rish"]
    },
    ru: {
      name: 'Ташкент',
      description: 'Столица и крупнейший город Узбекистана. Культурный и экономический центр Центральной Азии.',
      work: 'Широкие возможности в сферах IT, финансов, строительства и услуг.',
      study: 'Национальный университет Узбекистана, Ташкентский государственный технический университет и многие международные вузы.',
      live: 'Современная инфраструктура, низкая стоимость жизни и гостеприимный народ.',
      travel: 'Базар Чорсу, комплекс Хазрати Имам, Ташкентское метро и Телебашня.',
      fact: 'Ташкентское метро — первое метро в Центральной Азии.',
      images: ['tashkent', 'uzbekistan', 'city'],
      cuisine: [
        { name: 'Плов', description: 'Король узбекской кухни.' },
        { name: 'Самса', description: 'Вкусная выпечка, приготовленная в тандыре.' },
        { name: 'Нарын', description: 'Традиционное блюдо из тонко нарезанного теста и мяса.' }
      ],
      safety: 'Город очень безопасен, особенно для туристов. Ночные прогулки безопасны.',
      packing: ['Солнцезащитные очки', 'Легкая одежда', 'Удобная обувь', 'Пауэрбанк', 'Средства личной гигиены'],
      activities: ['Прогулка по старому городу', 'Поездка на метро', 'Дегустация национальных блюд']
    },
    en: {
      name: 'Tashkent',
      description: 'The capital and largest city of Uzbekistan. The cultural and economic center of Central Asia.',
      work: 'Wide opportunities in IT, finance, construction, and services.',
      study: 'National University of Uzbekistan, Tashkent State Technical University, and many international universities.',
      live: 'Modern infrastructure, low cost of living, and hospitable people.',
      travel: 'Chorsu Bazaar, Hast Imam Complex, Tashkent Metro, and TV Tower.',
      fact: 'The Tashkent Metro was the first metro in Central Asia.',
      images: ['tashkent', 'uzbekistan', 'city'],
      cuisine: [
        { name: 'Plov', description: 'The king of Uzbek cuisine.' },
        { name: 'Samsa', description: 'Delicious pastry cooked in a tandoor.' },
        { name: 'Norin', description: 'Traditional dish of thinly sliced dough and meat.' }
      ],
      safety: 'The city is very safe, especially for tourists. Night walks are safe.',
      packing: ['Sunglasses', 'Light clothing', 'Comfortable shoes', 'Powerbank', 'Personal hygiene items'],
      activities: ['Explore the Old City', 'Ride the Metro', 'Taste national dishes']
    }
  },
  'london': {
    uz: {
      name: 'London',
      description: 'Buyuk Britaniya poytaxti, tarixiy va zamonaviy shahar.',
      work: 'Moliya, texnologiya va san\'at sohalarida global markaz.',
      study: 'London Iqtisodiyot Maktabi, Imperial Kolleji va boshqalar.',
      live: 'Yuqori hayot darajasi, ko\'p madaniyatli muhit.',
      travel: 'Big Ben, London ko\'zi, Bukingem saroyi.',
      fact: 'London metrosi dunyodagi eng qadimgi metrodir.',
      images: ['london', 'uk', 'bigben'],
      cuisine: [{ name: 'Fish and Chips', description: 'Mashhur baliq va kartoshka.' }],
      safety: 'Umuman xavfsiz, lekin gavjum joylarda ehtiyot bo\'ling.',
      packing: ['Soyabon', 'Issiq kiyim', 'Qulay poyabzal'],
      activities: ['Muzeylarni ko\'rish', 'Temza bo\'yida sayr', 'Teatrga borish']
    },
    en: {
      name: 'London',
      description: 'The capital of the UK, a historic and modern city.',
      work: 'Global hub for finance, tech, and arts.',
      study: 'LSE, Imperial College, and many more.',
      live: 'High standard of living, multicultural environment.',
      travel: 'Big Ben, London Eye, Buckingham Palace.',
      fact: 'The London Underground is the oldest in the world.',
      images: ['london', 'uk', 'bigben'],
      cuisine: [{ name: 'Fish and Chips', description: 'Famous fish and chips.' }],
      safety: 'Generally safe, but be careful in crowded areas.',
      packing: ['Umbrella', 'Warm clothes', 'Comfortable shoes'],
      activities: ['Visit museums', 'Walk along the Thames', 'Go to a theater']
    }
  },
  'moscow': {
    uz: {
      name: 'Moskva',
      description: 'Rossiya poytaxti, ulkan va dinamik megapolis.',
      work: 'Rossiyaning iqtisodiy va siyosiy markazi.',
      study: 'MDU, Bauman universiteti va boshqalar.',
      live: 'Boy madaniy hayot, rivojlangan transport.',
      travel: 'Qizil maydon, Kreml, Bolshoy teatr.',
      fact: 'Moskva metrosi dunyodagi eng chiroyli metrolardan biridir.',
      images: ['moscow', 'russia', 'kremlin'],
      cuisine: [{ name: 'Borщ', description: 'An\'anaviy sho\'rva.' }],
      safety: 'Xavfsizlik choralari yuqori darajada.',
      packing: ['Issiq kiyim', 'Xarita', 'Qulay poyabzal'],
      activities: ['Qizil maydonda sayr', 'Metroni ko\'rish', 'Parklarda dam olish']
    },
    en: {
      name: 'Moscow',
      description: 'The capital of Russia, a vast and dynamic megapolis.',
      work: 'Economic and political center of Russia.',
      study: 'MSU, Bauman University, and others.',
      live: 'Rich cultural life, developed transport.',
      travel: 'Red Square, Kremlin, Bolshoi Theatre.',
      fact: 'The Moscow Metro is one of the most beautiful in the world.',
      images: ['moscow', 'russia', 'kremlin'],
      cuisine: [{ name: 'Borscht', description: 'Traditional soup.' }],
      safety: 'Security measures are at a level of high standard.',
      packing: ['Warm clothes', 'Map', 'Comfortable shoes'],
      activities: ['Walk on Red Square', 'See the Metro', 'Relax in parks']
    }
  },
  'new york': {
    uz: {
      name: 'Nyu-York',
      description: 'AQSHning eng yirik shahri, dunyo moliya va madaniyat markazi.',
      work: 'Uoll-strit, texnologiya va media sohalarida cheksiz imkoniyatlar.',
      study: 'Kolumbiya universiteti, NYU va boshqalar.',
      live: 'Tezkor hayot tarzi, "hech qachon uxlamaydigan shahar".',
      travel: 'Tayms-skver, Ozodlik haykali, Markaziy park.',
      fact: 'Nyu-Yorkda 800 dan ortiq tillarda gaplashiladi.',
      images: ['newyork', 'manhattan', 'skyline'],
      cuisine: [{ name: 'New York Pizza', description: 'Yupqa va mazali pitsa.' }],
      safety: 'Gavjum joylarda ehtiyot bo\'ling, shahar umuman xavfsiz.',
      packing: ['Qulay poyabzal', 'Kamera', 'Powerbank'],
      activities: ['Tayms-skverda sayr', 'Brodvey shousi', 'Muzeylar']
    },
    en: {
      name: 'New York',
      description: 'The largest city in the US, a global center for finance and culture.',
      work: 'Wall Street, tech, and media opportunities.',
      study: 'Columbia University, NYU, and more.',
      live: 'Fast-paced lifestyle, "the city that never sleeps".',
      travel: 'Times Square, Statue of Liberty, Central Park.',
      fact: 'Over 800 languages are spoken in New York City.',
      images: ['newyork', 'manhattan', 'skyline'],
      cuisine: [{ name: 'New York Pizza', description: 'Thin and delicious pizza.' }],
      safety: 'Be careful in crowded areas, the city is generally safe.',
      packing: ['Comfortable shoes', 'Camera', 'Powerbank'],
      activities: ['Walk in Times Square', 'Broadway show', 'Museums']
    }
  },
  'tokyo': {
    uz: {
      name: 'Tokio',
      description: 'Yaponiya poytaxti, texnologiya va an\'analar uyg\'unligi.',
      work: 'Yuqori texnologiyalar, robototexnika va moliya.',
      study: 'Tokio universiteti, Vaseda universiteti.',
      live: 'Tartibli hayot, juda xavfsiz va toza shahar.',
      travel: 'Sibuya chorrahasi, Tokio minorasi, Senso-ji ibodatxonasi.',
      fact: 'Tokio dunyodagi eng ko\'p aholiga ega megapolisdir.',
      images: ['tokyo', 'japan', 'shibuya'],
      cuisine: [{ name: 'Sushi', description: 'Yaponiyaning ramziy taomi.' }],
      safety: 'Dunyodagi eng xavfsiz shaharlardan biri.',
      packing: ['Yurish uchun poyabzal', 'Yapon tili lug\'ati', 'Yengil kiyim'],
      activities: ['Sibuya chorrahasi', 'Ibodatxonalar', "Elektronika do'konlari"]
    },
    en: {
      name: 'Tokyo',
      description: 'The capital of Japan, a blend of technology and tradition.',
      work: 'High tech, robotics, and finance.',
      study: 'University of Tokyo, Waseda University.',
      live: 'Orderly life, very safe and clean city.',
      travel: 'Shibuya Crossing, Tokyo Tower, Senso-ji Temple.',
      fact: 'Tokyo is the most populous metropolitan area in the world.',
      images: ['tokyo', 'japan', 'shibuya'],
      cuisine: [{ name: 'Sushi', description: 'Iconic Japanese dish.' }],
      safety: 'One of the safest cities in the world.',
      packing: ['Walking shoes', 'Japanese phrasebook', 'Light clothing'],
      activities: ['Shibuya Crossing', 'Temples', 'Electronics stores']
    }
  },
  'dubai': {
    uz: {
      name: 'Dubay',
      description: 'BAAning eng mashhur shahri, hashamat va kelajak shahri.',
      work: 'Turizm, ko\'chmas mulk va xalqaro savdo.',
      study: 'Dubay Amerika universiteti, xalqaro filiallar.',
      live: 'Yuqori darajadagi xizmatlar, soliqsiz daromad.',
      travel: 'Burj Xalifa, Dubay Mall, Palm Jumeirah.',
      fact: 'Dubayda politsiya xodimlari superkarlardan foydalanishadi.',
      images: ['dubai', 'burjkhalifa', 'desert'],
      cuisine: [{ name: 'Shawarma', description: 'Mashhur arab taomi.' }],
      safety: 'Dunyodagi eng xavfsiz shaharlardan biri.',
      packing: ['Quyoshdan himoya kremi', 'Yengil kiyim', 'Quyosh ko\'zoynagi'],
      activities: ['Burj Xalifaga chiqish', 'Cho\'l safari', 'Sohil dam olishi']
    },
    en: {
      name: 'Dubai',
      description: 'The most famous city in the UAE, a city of luxury and the future.',
      work: 'Tourism, real estate, and international trade.',
      study: 'American University in Dubai, international branches.',
      live: 'High-end services, tax-free income.',
      travel: 'Burj Khalifa, Dubai Mall, Palm Jumeirah.',
      fact: 'Police officers in Dubai use supercars.',
      images: ['dubai', 'burjkhalifa', 'desert'],
      cuisine: [{ name: 'Shawarma', description: 'Famous Arabic dish.' }],
      safety: 'One of the safest cities in the world.',
      packing: ['Sunscreen', 'Light clothing', 'Sunglasses'],
      activities: ['Visit Burj Khalifa', 'Desert safari', 'Beach relaxation']
    }
  },
  'paris': {
    uz: {
      name: 'Parij',
      description: 'Fransiya poytaxti, sevgi va san\'at shahri.',
      work: 'Moda, dizayn va turizm sohalarida yetakchi.',
      study: 'Sorbonna universiteti, san\'at akademiyalari.',
      live: 'Boy madaniyat, tarixiy binolar va romantik muhit.',
      travel: 'Eyfel minorasi, Luvr muzeyi, Notr-Dam.',
      fact: 'Luvr muzeyini to\'liq ko\'rish uchun bir necha oy kerak bo\'ladi.',
      images: ['paris', 'eiffel', 'louvre'],
      cuisine: [{ name: 'Croissant', description: 'Mashhur fransuz nonushtasi.' }],
      safety: "Sayyohlar gavjum joylarda cho'ntakkesarlardan ehtiyot bo'ling.",
      packing: ['Zamonaviy kiyim', 'Kamera', 'Qulay poyabzal'],
      activities: ['Eyfel minorasi', 'Sena daryosida sayr', 'Muzeylar']
    },
    en: {
      name: 'Paris',
      description: 'The capital of France, the city of love and art.',
      work: 'Leader in fashion, design, and tourism.',
      study: 'Sorbonne University, art academies.',
      live: 'Rich culture, historic buildings, and romantic atmosphere.',
      travel: 'Eiffel Tower, Louvre Museum, Notre-Dame.',
      fact: 'It would take months to see everything in the Louvre Museum.',
      images: ['paris', 'eiffel', 'louvre'],
      cuisine: [{ name: 'Croissant', description: 'Famous French breakfast.' }],
      safety: 'Be careful of pickpockets in crowded tourist areas.',
      packing: ['Stylish clothes', 'Camera', 'Comfortable shoes'],
      activities: ['Eiffel Tower', 'Seine river cruise', 'Museums']
    }
  },
  'berlin': {
    uz: {
      name: 'Berlin',
      description: 'Germaniya poytaxti, tarix va zamonaviylik markazi.',
      work: 'Texnologiya, startaplar va muhandislik.',
      study: 'Gumboldt universiteti, Berlin Texnika universiteti.',
      live: 'Erkin muhit, yashil parklar va rivojlangan transport.',
      travel: 'Brandenburg darvozasi, Reyxstag, Berlin devori.',
      fact: 'Berlinda Venetsiyadan ko\'ra ko\'proq ko\'priklar bor.',
      images: ['berlin', 'germany', 'brandenburg'],
      cuisine: [{ name: 'Currywurst', description: 'Mashhur nemis sosiskasi.' }],
      safety: 'Shahar juda xavfsiz va tartibli.',
      packing: ['Issiq kiyim (mavsumga qarab)', 'Xarita', 'Qulay poyabzal'],
      activities: ['Tarixiy obidalar', 'Parklarda sayr', 'Tungi hayot']
    },
    en: {
      name: 'Berlin',
      description: 'The capital of Germany, a center of history and modernity.',
      work: 'Tech, startups, and engineering.',
      study: 'Humboldt University, Technical University of Berlin.',
      live: 'Free atmosphere, green parks, and developed transport.',
      travel: 'Brandenburg Gate, Reichstag, Berlin Wall.',
      fact: 'Berlin has more bridges than Venice.',
      images: ['berlin', 'germany', 'brandenburg'],
      cuisine: [{ name: 'Currywurst', description: 'Famous German sausage.' }],
      safety: 'The city is very safe and orderly.',
      packing: ['Warm clothes (seasonal)', 'Map', 'Comfortable shoes'],
      activities: ['Historical sites', 'Park walks', 'Nightlife']
    }
  }
};

// --- Main Component ---
export default function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCity, setCurrentCity] = useState('Tashkent');
  const [homeCity, setHomeCity] = useState<string | null>(() => localStorage.getItem('home_city'));
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [currency, setCurrency] = useState<CurrencyData | null>(null);
  const [insight, setInsight] = useState<CityInsight | null>(null);
  const [flights, setFlights] = useState<FlightInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(() => localStorage.getItem('notifications') === 'true');
  
  // New States for v3.9.2
  const [showLangModal, setShowLangModal] = useState(() => !localStorage.getItem('user_lang'));
  const [aiFact, setAiFact] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [marketInsight, setMarketInsight] = useState<string | null>(null);
  const [travelPlan, setTravelPlan] = useState<string | null>(null);
  const [outfitRec, setOutfitRec] = useState<string | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (isInitialLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInitialLoading]);

  // Initial Loading Simulation
  useEffect(() => {
    const duration = Math.random() * 3000 + 5000; // 5-8 seconds
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsInitialLoading(false), 500);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Theme Sync with System
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // CityQuiz State
  const [cityQuizIndex, setCityQuizIndex] = useState(0);
  const [cityQuizStats, setCityQuizStats] = useState(() => {
    const saved = localStorage.getItem('city_quiz_stats');
    return saved ? JSON.parse(saved) : {
      total: 0,
      correct: 0,
      incorrect: 0,
      daily: {}
    };
  });
  const [cityQuizFeedback, setCityQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showCityQuizResult, setShowCityQuizResult] = useState(false);
  const [answeredCityQuizIds, setAnsweredCityQuizIds] = useState<number[]>([]);

  const currentCityQuiz = useMemo(() => CITY_QUESTIONS[cityQuizIndex], [cityQuizIndex]);

  const handleCityQuizAnswer = (optionIdx: number) => {
    if (cityQuizFeedback) return;

    const isCorrect = optionIdx === currentCityQuiz.correct;
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const newStats = {
      ...cityQuizStats,
      total: cityQuizStats.total + 1,
      correct: cityQuizStats.correct + (isCorrect ? 1 : 0),
      incorrect: cityQuizStats.incorrect + (isCorrect ? 0 : 1),
      daily: {
        ...cityQuizStats.daily,
        [today]: {
          total: (cityQuizStats.daily[today]?.total || 0) + 1,
          correct: (cityQuizStats.daily[today]?.correct || 0) + (isCorrect ? 1 : 0)
        }
      }
    };
    
    setCityQuizStats(newStats);
    localStorage.setItem('city_quiz_stats', JSON.stringify(newStats));

    setCityQuizFeedback({
      isCorrect,
      message: isCorrect ? t('correct') : `${t('incorrect')} ${t('correct_was')} ${currentCityQuiz.options[i18n.language as 'uz' | 'ru' | 'en'][currentCityQuiz.correct]}`
    });
    setAnsweredCityQuizIds(prev => [...prev, cityQuizIndex]);
  };

  const nextCityQuiz = () => {
    setCityQuizFeedback(null);
    if (cityQuizIndex < CITY_QUESTIONS.length - 1) {
      setCityQuizIndex(prev => prev + 1);
    } else {
      setShowCityQuizResult(true);
    }
  };

  const resetCityQuiz = () => {
    setCityQuizIndex(0);
    setCityQuizFeedback(null);
    setShowCityQuizResult(false);
    setAnsweredCityQuizIds([]);
  };

  // Weather Quiz State
  const [weatherQuizIndex, setWeatherQuizIndex] = useState(0);
  const [weatherQuizFeedback, setWeatherQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showWeatherQuizResult, setShowWeatherQuizResult] = useState(false);
  const [answeredWeatherQuizIds, setAnsweredWeatherQuizIds] = useState<number[]>([]);

  const currentWeatherQuiz = useMemo(() => WEATHER_QUESTIONS[weatherQuizIndex], [weatherQuizIndex]);

  const handleWeatherQuizAnswer = (optionIdx: number) => {
    if (weatherQuizFeedback) return;

    const isCorrect = optionIdx === currentWeatherQuiz.correct;
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const newStats = {
      ...quizStats,
      total: quizStats.total + 1,
      correct: quizStats.correct + (isCorrect ? 1 : 0),
      incorrect: quizStats.incorrect + (isCorrect ? 0 : 1),
      daily: {
        ...quizStats.daily,
        [today]: {
          total: (quizStats.daily[today]?.total || 0) + 1,
          correct: (quizStats.daily[today]?.correct || 0) + (isCorrect ? 1 : 0)
        }
      }
    };
    
    setQuizStats(newStats);
    localStorage.setItem('quiz_stats', JSON.stringify(newStats));

    setWeatherQuizFeedback({
      isCorrect,
      message: isCorrect ? t('correct') : `${t('incorrect')} ${t('correct_was')} ${currentWeatherQuiz.options[i18n.language as 'uz' | 'ru' | 'en'][currentWeatherQuiz.correct]}`
    });
    setAnsweredWeatherQuizIds(prev => [...prev, weatherQuizIndex]);
  };

  const nextWeatherQuiz = () => {
    setWeatherQuizFeedback(null);
    if (weatherQuizIndex < WEATHER_QUESTIONS.length - 1) {
      setWeatherQuizIndex(prev => prev + 1);
    } else {
      setShowWeatherQuizResult(true);
    }
  };

  const resetWeatherQuiz = () => {
    setWeatherQuizIndex(0);
    setWeatherQuizFeedback(null);
    setShowWeatherQuizResult(false);
    setAnsweredWeatherQuizIds([]);
  };

  const [cryptoRates, setCryptoRates] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [plannerData, setPlannerData] = useState({ destination: '', days: 3 });
  const [notifications, setNotifications] = useState<{id: number, message: string, type: 'success' | 'error'}[]>([]);

  const addNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const [survey, setSurvey] = useState({ from: '', to: '' });
  
  // Quiz Stats State
  const [quizStats, setQuizStats] = useState(() => {
    const saved = localStorage.getItem('quiz_stats');
    return saved ? JSON.parse(saved) : {
      total: 0,
      correct: 0,
      incorrect: 0,
      daily: {}
    };
  });
  
  // New States for v3.8.1
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(['USD', 'EUR', 'RUB', 'UZS', 'GBP', 'JPY', 'CNY', 'CHF', 'CAD', 'AUD', 'KRW', 'TRY', 'AED', 'SAR', 'INR', 'BRL', 'ZAR', 'SGD', 'HKD', 'NZD', 'MXN', 'PLN', 'SEK', 'NOK', 'DKK', 'THB', 'MYR', 'IDR', 'PHP', 'VND']);
  const [currencyAmount, setCurrencyAmount] = useState<number>(1);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('UZS');
  const [worldClocks, setWorldClocks] = useState<{name: string, tz: string}[]>(WORLD_CITIES);
  const [clockSearch, setClockSearch] = useState('');
  const [isAddingClock, setIsAddingClock] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [calendarNotes, setCalendarNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('calendar_notes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (isNotificationsEnabled && Notification.permission === 'granted') {
      const today = new Date();
      const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const note = calendarNotes[dateKey];
      
      if (note) {
        const lastNotified = localStorage.getItem(`notified_${dateKey}`);
        if (!lastNotified) {
          new Notification(t('calendar_reminder'), {
            body: note,
            icon: '/icon-192x192.png'
          });
          localStorage.setItem(`notified_${dateKey}`, 'true');
        }
      }
    }
  }, [isNotificationsEnabled, calendarNotes, t]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const saveNote = () => {
    if (!selectedDate) return;
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const newNotes = { ...calendarNotes, [dateKey]: noteInput };
    setCalendarNotes(newNotes);
    localStorage.setItem('calendar_notes', JSON.stringify(newNotes));
    setSelectedDate(null);
    setNoteInput('');
    addNotification(t('note_saved') || 'Note saved!');
  };

  // Weather Quest States
  const [apiError, setApiError] = useState<string | null>(null);

  // Admin Auth State
  const formatTranslatedDate = (date: Date, pattern: string) => {
    const dayName = t(format(date, 'eee').toLowerCase());
    const monthName = t(format(date, 'MMM').toLowerCase());
    
    return pattern
      .replace('EEEE', t(format(date, 'eeee').toLowerCase()))
      .replace('EEEE', dayName) // fallback
      .replace('MMMM', t(format(date, 'MMMM').toLowerCase()))
      .replace('MMMM', monthName) // fallback
      .replace('d', format(date, 'd'))
      .replace('MMM', monthName)
      .replace('eee', dayName);
  };

  const getTranslatedDate = (date: Date) => {
    const day = t(format(date, 'eee').toLowerCase());
    const month = t(format(date, 'MMM').toLowerCase());
    const dayNum = format(date, 'd');
    return `${day}, ${dayNum} ${month}`;
  };

  // --- API Calls ---

  const fetchWeather = async (city: string) => {
    try {
      setApiError(null);
      const geoRes = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      
      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude: lat, longitude: lon } = geoRes.data.results[0];

      const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`);
      const current = res.data.current_weather;
      const hourly = res.data.hourly;
      const daily = res.data.daily;

      const weatherData: WeatherData = {
        temp: current.temperature,
        condition: getWeatherCondition(current.weathercode),
        humidity: hourly.relative_humidity_2m[0],
        windSpeed: current.windspeed,
        feelsLike: current.temperature - 2,
        sunrise: daily.sunrise[0].split('T')[1],
        sunset: daily.sunset[0].split('T')[1],
        uvIndex: daily.uv_index_max[0],
        forecast: hourly.time.slice(0, 24).map((t: string, i: number) => ({
          time: format(new Date(t), 'HH:mm'),
          temp: hourly.temperature_2m[i]
        })),
        dailyForecast: daily.time.map((d: string, i: number) => ({
          date: d,
          maxTemp: daily.temperature_2m_max[i],
          minTemp: daily.temperature_2m_min[i],
          condition: getWeatherCondition(daily.weathercode[i])
        }))
      };

      setWeather(weatherData);
      
      // Trigger AI Insight
      generateWeatherInsight(weatherData, i18n.language).then(setAiInsight);
      generateOutfitRecommendation(weatherData.condition, weatherData.temp, i18n.language).then(setOutfitRec);
    } catch (err) {
      console.error("Weather error:", err);
    }
  };

  const fetchCurrency = async () => {
    try {
      const res = await axios.get('https://open.er-api.com/v6/latest/USD');
      if (res.data && res.data.rates) {
        setCurrency({
          base: res.data.base_code || 'USD',
          rates: res.data.rates
        });
      }
      
      // Fetch Crypto
      const cryptoRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple,cardano,polkadot&vs_currencies=usd&include_24hr_change=true');
      setCryptoRates(cryptoRes.data);
    } catch (err) {
      console.error("Currency/Crypto API error:", err);
    }
  };

  const fetchCityInsight = async (city: string) => {
    setLoading(true);
    setApiError(null);
    
    const cityLower = city.toLowerCase();
    if (STATIC_CITY_DATA[cityLower]) {
      setInsight(STATIC_CITY_DATA[cityLower][i18n.language] || STATIC_CITY_DATA[cityLower]['en']);
      setLoading(false);
      return;
    }

    // Simple Cache Check
    const cacheKey = `insight_${city.toLowerCase()}_${i18n.language}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const timestamp = parsed._timestamp || 0;
        // Cache for 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setInsight(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        localStorage.removeItem(cacheKey);
      }
    }

    try {
      const data = await generateCityInsight(city, i18n.language);
      
      // Save to cache
      localStorage.setItem(cacheKey, JSON.stringify({ ...data, _timestamp: Date.now() }));
      setInsight(data as any);
    } catch (err: any) {
      console.error("Insight error:", err);
      const errorMsg = err.message || "Failed to fetch insights";
      
      if (errorMsg?.includes("quota") || errorMsg?.includes("RESOURCE_EXHAUSTED")) {
        setApiError("Gemini API quota exceeded. Please try again in a minute.");
      } else {
        setApiError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchFlights = async (from: string, to: string) => {
    setLoading(true);
    setApiError(null);
    try {
      // Mock flight generation to save Gemini quota
      const airlines = ['Uzbekistan Airways', 'Turkish Airlines', 'Emirates', 'Lufthansa', 'Qatar Airways'];
      const mockFlights = Array.from({ length: 3 }, () => ({
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        price: `$${Math.floor(Math.random() * 800) + 200}`,
        duration: `${Math.floor(Math.random() * 10) + 2}h ${Math.floor(Math.random() * 60)}m`,
        from,
        to
      }));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setFlights(mockFlights);
    } catch (err: any) {
      console.error("Flight error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addWorldClock = async () => {
    if (!clockSearch.trim()) return;
    setIsAddingClock(true);
    try {
      // Use Open-Meteo Geocoding for timezone lookup to save Gemini quota
      const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(clockSearch)}&count=1&language=en&format=json`);
      
      if (res.data.results && res.data.results.length > 0) {
        const result = res.data.results[0];
        const data = {
          name: result.name,
          tz: result.timezone
        };
        setWorldClocks(prev => [...prev.filter(c => c.name !== data.name), data]);
        setClockSearch('');
      } else {
        setApiError("City not found for world clock.");
      }
    } catch (err) {
      console.error("Clock error:", err);
    } finally {
      setIsAddingClock(false);
    }
  };

  const toggleCurrency = (code: string) => {
    setSelectedCurrencies(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    addNotification(t(newMode ? 'function_enabled' : 'function_disabled', { name: t('dark_mode') }));
  };

  const toggleNotifications = async () => {
    try {
      if (!isNotificationsEnabled) {
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            setIsNotificationsEnabled(true);
            localStorage.setItem('notifications', 'true');
            setApiError(null);
            addNotification(t('function_enabled', { name: t('notifications') }));
          } else if (permission === 'denied') {
            setApiError(t('notification_denied_hint'));
          }
        } else {
          setApiError("Brauzeringiz bildirishnomalarni qo'llab-quvvatlamaydi.");
        }
      } else {
        setIsNotificationsEnabled(false);
        localStorage.setItem('notifications', 'false');
        addNotification(t('function_disabled', { name: t('notifications') }));
      }
    } catch (err) {
      console.error("Notification error:", err);
      setApiError(t('notification_iframe_error'));
    }
  };

  const updateGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const geoRes = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const detectedCity = geoRes.data.city || geoRes.data.locality;
          if (detectedCity) {
            setCurrentCity(detectedCity);
            setApiError(null);
          }
        } catch (err) {
          console.error("Location detection error:", err);
        } finally {
          setLoading(false);
        }
      }, () => setLoading(false));
    }
  };

  const [showAdminLink, setShowAdminLink] = useState(false);
  const [versionClicks, setVersionClicks] = useState(0);

  const handleVersionClick = () => {
    const newClicks = versionClicks + 1;
    setVersionClicks(newClicks);
    if (newClicks >= 5) {
      setShowAdminLink(true);
    }
  };

  useEffect(() => {
    // Track activity
    fetch('/api/track-activity', { method: 'POST' }).catch(() => {});
    
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Inactivity check (12 hours)
    const checkInactivity = () => {
      const lastActive = localStorage.getItem('last_active');
      const now = Date.now();
      const twelveHours = 12 * 60 * 60 * 1000;
      
      if (lastActive) {
        const inactiveTime = now - parseInt(lastActive);
        if (inactiveTime > twelveHours && isNotificationsEnabled) {
          if (Notification.permission === 'granted') {
            new Notification(t('inactivity_title'), {
              body: t('inactivity_body'),
              icon: '/icon-192x192.png'
            });
          }
        }
      }
      localStorage.setItem('last_active', now.toString());
    };

    checkInactivity();
    const inactivityInterval = setInterval(checkInactivity, 60 * 60 * 1000); // Check every hour

    return () => {
      clearInterval(timer);
      clearInterval(inactivityInterval);
    };
  }, [isNotificationsEnabled, t]);

  useEffect(() => {
    fetchCurrency();
    generateDailyFact(i18n.language).then(setAiFact);
    generateMarketInsight(i18n.language).then(setMarketInsight);
  }, [i18n.language]);

  useEffect(() => {
    const autoLocate = async () => {
      const savedCity = localStorage.getItem('home_city');
      if (savedCity) {
        setCurrentCity(savedCity);
        setHomeCity(savedCity);
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const geoRes = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const detectedCity = geoRes.data.city || geoRes.data.locality;
            if (detectedCity) {
              setCurrentCity(detectedCity);
              setHomeCity(detectedCity);
              localStorage.setItem('home_city', detectedCity);
            }
          } catch (err) {
            console.error("Location detection error:", err);
          }
        });
      }
    };

    autoLocate();
  }, []);

  useEffect(() => {
    if (currentCity) {
      fetchWeather(currentCity);
      fetchCityInsight(currentCity);
    }
  }, [currentCity, i18n.language]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentCity(searchQuery);
      setSearchQuery('');
    }
  };

  const getWeatherCondition = (code: number) => {
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    return 'Stormy';
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Clear': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'Partly Cloudy': return <Cloud className="w-8 h-8 text-blue-400" />;
      case 'Rainy': return <CloudRain className="w-8 h-8 text-blue-600" />;
      default: return <Cloud className="w-8 h-8 text-slate-400" />;
    }
  };

  // --- Render Helpers ---

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={cn(
        "w-full flex items-center gap-4 px-6 py-4 text-sm font-semibold transition-all rounded-2xl mb-2 cursor-pointer group",
        activeTab === id 
          ? "bg-indigo-600 text-white shadow-lg dark:shadow-none shadow-indigo-200" 
          : isDarkMode 
            ? "text-slate-400 hover:bg-slate-800 hover:text-white"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === id ? "text-white" : "text-indigo-500")} />
      {label}
    </button>
  );

  return (
    <div className={cn(
      "min-h-screen flex font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300",
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-[#F1F5F9] text-slate-900"
    )}>
      {/* Language Selection Modal */}
      <AnimatePresence>
        {showLangModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={cn(
                "max-w-md w-full p-10 rounded-[40px] border shadow-2xl text-center",
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
              )}
            >
              <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-indigo-500/20">
                <Languages className="w-10 h-10" />
              </div>
              <h2 className={cn("text-3xl font-black mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{t('select_language')}</h2>
              <p className="text-slate-500 font-medium mb-10">{t('welcome_message')}</p>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { code: 'uz', name: "O'zbekcha" },
                  { code: 'ru', name: "Русский" },
                  { code: 'en', name: "English" }
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      localStorage.setItem('user_lang', lang.code);
                      setShowLangModal(false);
                      addNotification(t('lang_changed', { lang: lang.name }));
                    }}
                    className={cn(
                      "w-full p-5 rounded-2xl font-black text-lg transition-all border flex items-center justify-between group",
                      isDarkMode 
                        ? "bg-slate-800 border-slate-700 text-white hover:border-indigo-500" 
                        : "bg-slate-50 border-slate-200 text-slate-900 hover:border-indigo-500"
                    )}
                  >
                    {lang.name}
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile Header */}
      <div className={cn(
        "lg:hidden fixed top-0 left-0 right-0 border-b z-50 px-4 h-16 flex items-center justify-between transition-colors",
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      )}>
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-indigo-600" />
          <span className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-slate-900")}>WSA v3.9.1</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleDarkMode} className="p-2 text-slate-500">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 border-r z-40 transition-all lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen overflow-y-auto",
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Cloud className="w-6 h-6" />
              </div>
              <span className={cn("text-xl font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>WSA v3.9.1</span>
            </div>
          </div>

          <nav>
            <SidebarItem id="dashboard" icon={LayoutDashboard} label={t('dashboard')} />
            <SidebarItem id="weather" icon={CloudSun} label={t('weather')} />
            <SidebarItem id="market" icon={BarChart3} label={t('market_insights')} />
            <SidebarItem id="currency" icon={Coins} label={t('currency')} />
            <SidebarItem id="clock" icon={Clock} label={t('world_clock')} />
            <SidebarItem id="insights" icon={MapPin} label={t('city_insights')} />
            <SidebarItem id="planner" icon={Compass} label={t('ai_planner')} />
            <SidebarItem id="flights" icon={Plane} label={t('flights')} />
            <SidebarItem id="quest" icon={Gamepad2} label={t('weather_quest')} />
            <SidebarItem id="cityquiz" icon={Globe2} label={t('city_quiz')} />
            <SidebarItem id="feedback" icon={MessageSquare} label={t('feedback')} />
            <SidebarItem id="notifications" icon={Bell} label={t('notifications')} />
            {showAdminLink && <SidebarItem id="admin" icon={ShieldCheck} label={t('admin_panel')} />}
            <SidebarItem id="upcoming" icon={Rocket} label={t('upcoming')} />
          </nav>

          <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('theme')}</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={cn(
                "w-full flex items-center justify-between px-6 py-4 text-sm font-semibold transition-all rounded-2xl mb-6",
                isDarkMode ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                {isDarkMode ? t('light_mode') : t('dark_mode')}
              </div>
              <div className={cn(
                "w-10 h-5 rounded-full relative transition-colors",
                isDarkMode ? "bg-indigo-600" : "bg-slate-300"
              )}>
                <div className={cn(
                  "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                  isDarkMode ? "right-1" : "left-1"
                )} />
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('info')}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 text-sm font-semibold transition-all rounded-2xl mb-6",
                activeTab === 'info' 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                  : isDarkMode 
                    ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Info className="w-5 h-5" />
              {t('info_page')}
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('language')}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['uz', 'ru', 'en'].map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    i18n.changeLanguage(lang);
                    addNotification(t('lang_changed', { lang: lang.toUpperCase() }));
                  }}
                  className={cn(
                    "py-2 text-xs font-bold rounded-lg transition-all border cursor-pointer",
                    i18n.language === lang 
                      ? isDarkMode ? "bg-indigo-600 border-indigo-500 text-white" : "bg-indigo-50 border-indigo-200 text-indigo-600" 
                      : isDarkMode ? "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                  )}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 pt-20 lg:pt-10 overflow-x-hidden pb-32">
        {/* Header Search */}
        <div className="max-w-7xl mx-auto mb-10">
          {apiError && (
            <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-3xl flex items-center gap-4 text-amber-800 animate-in fade-in slide-in-from-top-4 duration-500">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <div className="flex-1">
                <p className="font-bold">{apiError.includes("quota") ? "API Limit Reached" : t('error')}</p>
                <p className="text-sm font-medium opacity-80">{apiError}</p>
                {apiError.includes("Gemini") && (
                  <button 
                    onClick={() => fetchCityInsight(currentCity)}
                    className="mt-2 text-xs font-bold underline hover:no-underline"
                  >
                    Try Again
                  </button>
                )}
              </div>
              <button 
                onClick={() => setApiError(null)}
                className="p-2 hover:bg-amber-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className={cn("text-3xl font-black mb-2", isDarkMode ? "text-white" : "text-slate-900")}>{t(activeTab)}</h1>
              <div className={cn("flex flex-wrap items-center gap-2 font-medium", isDarkMode ? "text-slate-400" : "text-slate-500")}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{currentCity}</span>
                </div>
                
                {homeCity && currentCity !== homeCity && (
                  <button 
                    onClick={() => setCurrentCity(homeCity)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border",
                      isDarkMode ? "bg-indigo-900/20 border-indigo-500/20 text-indigo-400 hover:bg-indigo-900/30" : "bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100"
                    )}
                  >
                    <Home className="w-3 h-3" />
                    {t('back_to_home')}
                  </button>
                )}

                <button 
                  onClick={updateGeolocation}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border",
                    isDarkMode ? "bg-emerald-900/20 border-emerald-500/20 text-emerald-400 hover:bg-emerald-900/30" : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100"
                  )}
                >
                  <Navigation className={cn("w-3 h-3", loading && "animate-spin")} />
                  {t('update_geo')}
                </button>

                <span className="mx-2 opacity-20 hidden sm:inline">|</span>
                <span>{getTranslatedDate(currentTime)}</span>
                <span className="mx-2 opacity-20 hidden sm:inline">|</span>
                <span className="font-bold text-indigo-600">{format(currentTime, 'HH:mm:ss')}</span>
              </div>
            </div>

            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_city')}
                className={cn(
                  "w-full pl-12 pr-4 py-4 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all border",
                  isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                )}
              />
            </form>
          </div>
        </div>

        {/* Initial Loading Screen */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-6 overflow-hidden"
            style={{ height: '100dvh', width: '100vw' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center mb-12 shadow-2xl shadow-indigo-500/20"
            >
              <Cloud className="w-12 h-12 text-white animate-pulse" />
            </motion.div>
            
            <div className="w-full max-w-xs space-y-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-indigo-400 font-black text-sm tracking-widest uppercase">WSA Loading...</span>
                <span className="text-white font-black text-2xl">{Math.round(loadingProgress)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-slate-500 text-center text-xs font-bold uppercase tracking-tighter animate-pulse">
                Optimizing network traffic & loading assets
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Weather Card */}
                <div className={cn(
                  "p-8 rounded-3xl shadow-sm border flex flex-col justify-between transition-all",
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                )}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{t('weather')}</p>
                      <h3 className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{currentCity}</h3>
                    </div>
                    {weather && <AnimatedWeather condition={weather.condition} size={40} />}
                  </div>
                  {weather ? (
                    <div>
                      <div className={cn("text-6xl font-black mb-2", isDarkMode ? "text-white" : "text-slate-900")}>{Math.round(weather.temp)}°</div>
                      <p className="text-slate-500 font-medium mb-4">{t(`weather_${weather.condition.toLowerCase().replace(' ', '_')}`) || weather.condition}</p>
                      <div className="flex gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-bold text-slate-400">{weather.sunrise}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4 text-indigo-400" />
                          <span className="text-xs font-bold text-slate-400">{weather.sunset}</span>
                        </div>
                      </div>
                    </div>
                  ) : <Loader2 className="animate-spin text-indigo-600" />}
                </div>

                {/* Currency Card */}
                <div className={cn(
                  "p-8 rounded-3xl shadow-sm border transition-all",
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                )}>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">{t('currency')}</p>
                  <div className="space-y-4">
                    {currency ? (
                      <>
                        {selectedCurrencies.slice(0, 3).map(code => (
                          <div key={code} className={cn(
                            "flex justify-between items-center p-3 rounded-xl transition-all",
                            isDarkMode ? "bg-slate-800/50 border border-slate-700" : "bg-slate-50"
                          )}>
                            <span className={cn("font-bold", isDarkMode ? "text-slate-300" : "text-slate-700")}>USD/{code}</span>
                            <span className="text-indigo-600 font-black">
                              {currency.rates[code] > 100 ? currency.rates[code].toLocaleString() : currency.rates[code].toFixed(4)}
                            </span>
                          </div>
                        ))}
                      </>
                    ) : <Loader2 className="animate-spin text-indigo-600" />}
                  </div>
                </div>

                {/* AI Daily Fact Card */}
                <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl dark:shadow-none text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-indigo-200 font-bold text-xs uppercase tracking-widest mb-4">{t('ai_fact_title')}</p>
                    {aiFact ? (
                      <p className="text-lg font-medium leading-relaxed italic">
                        "{aiFact}"
                      </p>
                    ) : (
                      <div className="flex items-center gap-2 text-indigo-200">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">{t('ai_generating')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Weather Insight Card */}
                <div className={cn(
                  "p-8 rounded-3xl border transition-all",
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                )}>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">{t('ai_weather_insight')}</p>
                  {weather && (
                    <div className="flex gap-6 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                          <Sun className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{t('sunrise')}</p>
                          <p className={cn("text-sm font-black", isDarkMode ? "text-white" : "text-slate-900")}>{weather.sunrise}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                          <Moon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{t('sunset')}</p>
                          <p className={cn("text-sm font-black", isDarkMode ? "text-white" : "text-slate-900")}>{weather.sunset}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {aiInsight ? (
                    <div className={cn("text-sm font-medium leading-relaxed", isDarkMode ? "text-slate-300" : "text-slate-700")}>
                      <Markdown>{aiInsight}</Markdown>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">{t('ai_generating')}</span>
                    </div>
                  )}
                </div>

                {/* AQI & UV Index Card */}
                <div className={cn(
                  "p-8 rounded-3xl border transition-all",
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                )}>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{t('weather_facts')}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={cn(
                      "flex flex-col items-center p-4 rounded-2xl border",
                      isDarkMode ? "bg-emerald-900/20 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"
                    )}>
                      <WindArrowDown className="w-8 h-8 text-emerald-500 mb-2" />
                      <p className={cn("text-xs font-bold uppercase mb-1", isDarkMode ? "text-emerald-400" : "text-emerald-800")}>{t('aqi')}</p>
                      <p className={cn("text-lg font-black", isDarkMode ? "text-emerald-300" : "text-emerald-900")}>{t('aqi_good')}</p>
                    </div>
                    <div className={cn(
                      "flex flex-col items-center p-4 rounded-2xl border",
                      isDarkMode ? "bg-orange-900/20 border-orange-500/20" : "bg-orange-50 border-orange-100"
                    )}>
                      <SunMedium className="w-8 h-8 text-orange-500 mb-2" />
                      <p className={cn("text-xs font-bold uppercase mb-1", isDarkMode ? "text-orange-400" : "text-orange-800")}>{t('uv_index')}</p>
                      <p className={cn("text-lg font-black", isDarkMode ? "text-orange-300" : "text-orange-900")}>{weather?.uvIndex || 0}</p>
                    </div>
                  </div>

                  {weather && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl border",
                        isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100"
                      )}>
                        <Sun className="w-6 h-6 text-amber-500" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{t('sunrise')}</p>
                          <p className={cn("font-black", isDarkMode ? "text-white" : "text-slate-900")}>{weather.sunrise}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl border",
                        isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100"
                      )}>
                        <Moon className="w-6 h-6 text-indigo-400" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{t('sunset')}</p>
                          <p className={cn("font-black", isDarkMode ? "text-white" : "text-slate-900")}>{weather.sunset}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                    {/* City Insight Card */}
                <div className={cn(
                  "p-8 rounded-3xl border transition-all flex flex-col justify-between",
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                )}>
                  <div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">{t('ai_weather_insight')}</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className={cn("text-sm font-medium leading-relaxed", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                          {aiFact || t('ai_generating')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">{t('real_time_updates')}</p>
                  </div>
                </div>

                {/* 5-Day Forecast */}
                    <div className={cn(
                      "md:col-span-2 lg:col-span-2 p-8 rounded-3xl shadow-sm border transition-all",
                      isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    )}>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{t('forecast_5day')}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {weather ? weather.dailyForecast.slice(1, 6).map((day, idx) => (
                          <div key={idx} className={cn(
                            "flex flex-col items-center p-4 rounded-2xl border transition-all",
                            isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
                          )}>
                            <p className="text-xs font-bold text-slate-500 mb-2">{getTranslatedDate(new Date(day.date))}</p>
                            <AnimatedWeather condition={day.condition} size={32} />
                            <div className="mt-2 text-center">
                              <p className={cn("text-sm font-black", isDarkMode ? "text-white" : "text-slate-900")}>{Math.round(day.maxTemp)}°</p>
                              <p className="text-xs font-bold text-slate-400">{Math.round(day.minTemp)}°</p>
                            </div>
                          </div>
                        )) : (
                          <div className="col-span-full flex justify-center py-4">
                            <Loader2 className="animate-spin text-indigo-600" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Calendar Widget */}
                    <div className={cn(
                      "p-8 rounded-3xl shadow-sm border transition-all",
                      isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    )}>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t('calendar')}</p>
                          <h4 className={cn("text-lg font-black", isDarkMode ? "text-white" : "text-slate-900")}>
                            {t(format(currentTime, 'MMM').toLowerCase())} {currentTime.getFullYear()}
                          </h4>
                        </div>
                        <CalendarIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center mb-4">
                        {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(d => (
                          <div key={d} className="text-[10px] font-black text-slate-400 uppercase">{t(d).slice(0, 3)}</div>
                        ))}
                        {(() => {
                          const start = startOfMonth(currentTime);
                          const end = endOfMonth(currentTime);
                          const days = eachDayOfInterval({ start, end });
                          const padding = Array.from({ length: start.getDay() });
                          
                          return [
                            ...padding.map((_, i) => <div key={`pad-${i}`} />),
                            ...days.map((date, i) => {
                              const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                              const dateKey = format(date, 'yyyy-MM-dd');
                              const hasNote = !!calendarNotes[dateKey];
                              
                              return (
                                <button 
                                  key={i} 
                                  onClick={() => {
                                    setSelectedDate(date);
                                    setNoteInput(calendarNotes[dateKey] || '');
                                  }}
                                  className={cn(
                                    "aspect-square flex flex-col items-center justify-center text-xs font-bold rounded-lg transition-all relative group",
                                    isToday 
                                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                                      : isDarkMode 
                                        ? "hover:bg-slate-800 text-slate-400" 
                                        : "hover:bg-slate-100 text-slate-600"
                                  )}
                                >
                                  {date.getDate()}
                                  {hasNote && (
                                    <div className="absolute bottom-1 w-1 h-1 bg-amber-500 rounded-full" />
                                  )}
                                  {hasNote && (
                                    <div className={cn(
                                      "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 rounded-lg text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl",
                                      isDarkMode ? "bg-slate-800 text-slate-200 border border-slate-700" : "bg-white text-slate-600 border border-slate-100"
                                    )}>
                                      {calendarNotes[dateKey]}
                                    </div>
                                  )}
                                </button>
                              );
                            })
                          ];
                        })()}
                      </div>
                      
                      {selectedDate && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "mt-4 p-4 rounded-2xl border",
                            isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
                          )}
                        >
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">{format(selectedDate, 'dd MMMM yyyy')}</p>
                          <textarea 
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            placeholder={t('write_note') || "Write a note..."}
                            className={cn(
                              "w-full bg-transparent border-none focus:ring-0 text-sm resize-none h-20",
                              isDarkMode ? "text-white placeholder-slate-600" : "text-slate-900 placeholder-slate-400"
                            )}
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button 
                              onClick={() => setSelectedDate(null)}
                              className="px-3 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-300"
                            >
                              {t('cancel') || "Cancel"}
                            </button>
                            <button 
                              onClick={saveNote}
                              className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-500"
                            >
                              {t('save') || "Save"}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>

                {/* Weather Chart */}
                <div className={cn(
                  "md:col-span-2 lg:col-span-3 p-8 rounded-3xl shadow-sm border transition-all",
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                )}>
                  <h3 className={cn("text-xl font-bold mb-6", isDarkMode ? "text-white" : "text-slate-900")}>{t('temp')} (24h)</h3>
                  <div className="h-64">
                    {weather ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weather.forecast}>
                          <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} />
                          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{
                              borderRadius: '16px', 
                              border: 'none', 
                              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                              color: isDarkMode ? '#f8fafc' : '#0f172a'
                            }}
                          />
                          <Area type="monotone" dataKey="temp" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : <Loader2 className="animate-spin text-indigo-600" />}
                  </div>
                </div>
              </div>
            )}

            {/* Market Insights View */}
            {activeTab === 'market' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className={cn(
                    "lg:col-span-2 p-10 rounded-[40px] border shadow-sm",
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  )}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <TrendingUp className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className={cn("text-2xl sm:text-3xl font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>{t('market_insights')}</h2>
                        <p className="text-slate-500 font-medium text-sm sm:text-base">{t('market_insight_desc')}</p>
                      </div>
                    </div>
                    
                    {marketInsight ? (
                      <div className={cn(
                        "p-8 rounded-3xl border leading-relaxed",
                        isDarkMode ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-700"
                      )}>
                        <Markdown>{marketInsight}</Markdown>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="font-bold">{t('ai_generating')}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className={cn(
                      "p-8 rounded-[40px] border shadow-sm",
                      isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    )}>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className={cn("text-xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('crypto_market')}</h3>
                        <Bitcoin className="w-6 h-6 text-orange-500" />
                      </div>
                      <div className="space-y-4">
                        {cryptoRates ? Object.entries(cryptoRates).map(([id, data]: [string, any]) => (
                          <div key={id} className={cn(
                            "flex justify-between items-center p-4 rounded-2xl border transition-all",
                            isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100"
                          )}>
                            <div>
                              <p className={cn("font-black uppercase", isDarkMode ? "text-white" : "text-slate-900")}>{id}</p>
                              <p className={cn("text-xs font-bold", data.usd_24h_change >= 0 ? "text-emerald-500" : "text-rose-500")}>
                                {data.usd_24h_change >= 0 ? '+' : ''}{data.usd_24h_change.toFixed(2)}%
                              </p>
                            </div>
                            <p className="text-indigo-600 font-black">${data.usd.toLocaleString()}</p>
                          </div>
                        )) : <Loader2 className="animate-spin text-indigo-600 mx-auto" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Travel Planner View */}
            {activeTab === 'planner' && (
              <div className="max-w-2xl mx-auto py-20 text-center">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="inline-block mb-12"
                >
                  <div className="w-32 h-32 bg-indigo-600 rounded-[40px] flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40">
                    <Rocket className="w-16 h-16" />
                  </div>
                </motion.div>
                <h2 className={cn("text-5xl font-black mb-6", isDarkMode ? "text-white" : "text-slate-900")}>Coming Soon</h2>
                <p className="text-slate-500 text-xl font-medium mb-12 max-w-md mx-auto">
                  Our AI Travel Planner is currently being upgraded to provide even better itineraries. Stay tuned!
                </p>
                <div className="flex justify-center gap-4">
                  <div className="h-1 w-12 bg-indigo-600 rounded-full" />
                  <div className="h-1 w-4 bg-slate-300 rounded-full" />
                  <div className="h-1 w-4 bg-slate-300 rounded-full" />
                </div>

                {/* Original code commented out for future use
                <div className="max-w-4xl mx-auto">
                  <div className={cn(
                    "p-10 rounded-[40px] border shadow-sm mb-8",
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  )}>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                        <Compass className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('ai_planner')}</h2>
                        <p className="text-slate-500 font-medium">AI-powered travel itinerary generator</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('travel_destination')}</label>
                        <input 
                          type="text"
                          value={plannerData.destination}
                          onChange={(e) => setPlannerData({...plannerData, destination: e.target.value})}
                          placeholder={t('travel_destination')}
                          className={cn(
                            "w-full p-4 rounded-2xl border focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all",
                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                          )}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('travel_duration')}</label>
                        <input 
                          type="number"
                          value={plannerData.days}
                          onChange={(e) => setPlannerData({...plannerData, days: parseInt(e.target.value)})}
                          placeholder={t('travel_duration')}
                          className={cn(
                            "w-full p-4 rounded-2xl border focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all",
                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                          )}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setIsAiLoading(true);
                        generateTravelPlan(plannerData.destination, plannerData.days, i18n.language)
                          .then(setTravelPlan)
                          .finally(() => setIsAiLoading(false));
                      }}
                      disabled={!plannerData.destination || isAiLoading}
                      className={cn(
                        "w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3",
                        isDarkMode ? "" : "shadow-xl shadow-indigo-500/20"
                      )}
                    >
                      {isAiLoading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-6 h-6" />}
                      {t('generate_plan')}
                    </button>
                  </div>

                  {travelPlan && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-10 rounded-[40px] border shadow-sm leading-relaxed",
                        isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
                      )}
                    >
                      <Markdown>{travelPlan}</Markdown>
                    </motion.div>
                  )}
                </div>
                */}
              </div>
            )}

            {/* Weather Detail View */}
            {activeTab === 'weather' && weather && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={cn(
                    "p-10 rounded-3xl border flex flex-col items-center text-center transition-all",
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  )}>
                    <AnimatedWeather condition={weather.condition} size={80} />
                    <div className={cn("text-7xl font-black my-4", isDarkMode ? "text-white" : "text-slate-900")}>{Math.round(weather.temp)}°</div>
                    <p className="text-xl font-bold text-slate-500">{t(`weather_${weather.condition.toLowerCase().replace(' ', '_')}`) || weather.condition}</p>
                    <div className="mt-6 flex gap-4">
                      <div className={cn("px-4 py-2 rounded-full text-sm font-bold", isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600")}>H: {Math.round(weather.temp + 3)}°</div>
                      <div className={cn("px-4 py-2 rounded-full text-sm font-bold", isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600")}>L: {Math.round(weather.temp - 3)}°</div>
                    </div>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-2 gap-6">
                    <div className={cn("p-8 rounded-3xl border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                      <Wind className="w-6 h-6 text-indigo-600 mb-4" />
                      <p className="text-slate-400 text-sm font-bold uppercase mb-1">{t('wind')}</p>
                      <p className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{weather.windSpeed} km/h</p>
                    </div>
                    <div className={cn("p-8 rounded-3xl border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                      <Droplets className="w-6 h-6 text-blue-500 mb-4" />
                      <p className="text-slate-400 text-sm font-bold uppercase mb-1">{t('humidity')}</p>
                      <p className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{weather.humidity}%</p>
                    </div>
                    <div className={cn("p-8 rounded-3xl border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                      <Navigation className="w-6 h-6 text-emerald-500 mb-4" />
                      <p className="text-slate-400 text-sm font-bold uppercase mb-1">{t('feels_like')}</p>
                      <p className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{Math.round(weather.feelsLike)}°</p>
                    </div>
                    <div className={cn("p-8 rounded-3xl border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                      <SunMedium className="w-6 h-6 text-orange-500 mb-4" />
                      <p className="text-slate-400 text-sm font-bold uppercase mb-1">{t('uv_index')}</p>
                      <p className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{weather.uvIndex || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* AI Outfit Recommendation */}
                  <div className={cn("p-10 rounded-[40px] border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                    <div className="flex items-center gap-3 mb-8">
                      <Shirt className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-2xl font-black">{t('outfit_recommender')}</h3>
                    </div>
                    {outfitRec ? (
                      <div className={cn("p-6 rounded-3xl border leading-relaxed", isDarkMode ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-700")}>
                        <Markdown>{outfitRec}</Markdown>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">{t('ai_generating')}</span>
                      </div>
                    )}
                  </div>

                  {/* AI Weather Insight */}
                  <div className={cn("p-10 rounded-[40px] border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                    <div className="flex items-center gap-3 mb-8">
                      <Sparkles className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-2xl font-black">{t('ai_weather_insight')}</h3>
                    </div>
                    {aiInsight ? (
                      <div className={cn("p-6 rounded-3xl border leading-relaxed", isDarkMode ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-700")}>
                        <Markdown>{aiInsight}</Markdown>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">{t('ai_generating')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Currency View */}
            {activeTab === 'currency' && currency && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className={cn(
                    "lg:col-span-2 p-10 rounded-[40px] border shadow-sm",
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  )}>
                    <div className="flex items-center justify-between mb-10">
                      <h3 className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('currency_rates')}</h3>
                      <div className={cn(
                        "p-4 bg-indigo-600 text-white rounded-2xl",
                        isDarkMode ? "" : "shadow-lg shadow-indigo-500/20"
                      )}>
                        <DollarSign className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Currency Comparison Tool */}
                    <div className={cn(
                      "mb-10 p-8 rounded-3xl border",
                      isDarkMode ? "bg-slate-800/30 border-slate-700" : "bg-indigo-50/50 border-indigo-100"
                    )}>
                      <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-indigo-600" />
                        {t('compare_currencies')}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('amount')}</label>
                          <input 
                            type="number" 
                            value={currencyAmount}
                            onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                            className={cn(
                              "w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-black",
                              isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200"
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('from')}</label>
                            <select 
                              value={currencyFrom}
                              onChange={(e) => setCurrencyFrom(e.target.value)}
                              className={cn(
                                "w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold",
                                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200"
                              )}
                            >
                              {Object.keys(currency.rates).map(code => <option key={code} value={code}>{code}</option>)}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('to')}</label>
                            <select 
                              value={currencyTo}
                              onChange={(e) => setCurrencyTo(e.target.value)}
                              className={cn(
                                "w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold",
                                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200"
                              )}
                            >
                              {Object.keys(currency.rates).map(code => <option key={code} value={code}>{code}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className={cn(
                          "p-4 rounded-2xl border text-center",
                          isDarkMode ? "bg-indigo-900/20 border-indigo-900/30" : "bg-white border-indigo-100"
                        )}>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Result</p>
                          <p className="text-2xl font-black text-indigo-600">
                            {((currencyAmount / currency.rates[currencyFrom]) * currency.rates[currencyTo]).toLocaleString(undefined, { maximumFractionDigits: 2 })} {currencyTo}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
                      {['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'RUB', 'UZS', 'CHF', 'CAD', 'AUD', 'KRW', 'TRY', 'AED', 'SAR', 'INR'].map(code => (
                        <button
                          key={code}
                          onClick={() => toggleCurrency(code)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold border transition-all",
                            selectedCurrencies.includes(code)
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg dark:shadow-none shadow-indigo-100"
                              : isDarkMode ? "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          )}
                        >
                          {code}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedCurrencies.map(code => (
                        <div key={code} className={cn(
                          "flex items-center justify-between p-6 rounded-3xl border transition-all group hover:border-indigo-500",
                          isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100"
                        )}>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm font-black text-indigo-600 text-lg">
                              {code.substring(0, 2)}
                            </div>
                            <span className={cn("font-black text-lg", isDarkMode ? "text-white" : "text-slate-900")}>{code}</span>
                          </div>
                          <span className="text-xl font-black text-indigo-600 group-hover:scale-110 transition-transform">
                            {currency.rates[code] > 100 ? currency.rates[code].toLocaleString() : currency.rates[code].toFixed(4)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Crypto Rates Card */}
                    <div className={cn(
                      "p-8 rounded-[40px] border shadow-sm",
                      isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    )}>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className={cn("text-xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('crypto_rates')}</h3>
                        <Bitcoin className="w-6 h-6 text-orange-500" />
                      </div>
                      <div className="space-y-4">
                        {cryptoRates ? Object.entries(cryptoRates).map(([id, data]: [string, any]) => (
                          <div key={id} className={cn(
                            "flex justify-between items-center p-4 rounded-2xl border transition-all",
                            isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100"
                          )}>
                            <div>
                              <p className={cn("font-black uppercase", isDarkMode ? "text-white" : "text-slate-900")}>{id}</p>
                              <p className={cn("text-xs font-bold", data.usd_24h_change >= 0 ? "text-emerald-500" : "text-rose-500")}>
                                {data.usd_24h_change >= 0 ? '+' : ''}{data.usd_24h_change.toFixed(2)}%
                              </p>
                            </div>
                            <p className="text-indigo-600 font-black">${data.usd.toLocaleString()}</p>
                          </div>
                        )) : <Loader2 className="animate-spin text-indigo-600 mx-auto" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CityQuiz View */}
            {activeTab === 'cityquiz' && (
              <div className="space-y-12">
                <div className="max-w-2xl mx-auto">
                  <div className={cn(
                    "p-10 rounded-[40px] border shadow-xl transition-all",
                    isDarkMode ? "bg-slate-900 border-slate-800 shadow-slate-950/50" : "bg-white border-slate-200 shadow-slate-200/50"
                  )}>
                    <div className="flex items-center gap-3 mb-8">
                      <Globe2 className="w-8 h-8 text-indigo-600" />
                      <h3 className="text-3xl font-black">{t('city_quiz')}</h3>
                    </div>

                    {!showCityQuizResult ? (
                      <div className="space-y-8">
                        <div className="flex justify-between items-center">
                          <span className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-sm">
                            Question {cityQuizIndex + 1} / {CITY_QUESTIONS.length}
                          </span>
                        </div>

                        <h4 className={cn("text-xl md:text-2xl font-black leading-tight", isDarkMode ? "text-white" : "text-slate-900")}>
                          {currentCityQuiz.question[i18n.language as 'uz' | 'ru' | 'en']}
                        </h4>

                        <div className="grid grid-cols-1 gap-4">
                          {currentCityQuiz.options[i18n.language as 'uz' | 'ru' | 'en'].map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleCityQuizAnswer(idx)}
                              disabled={!!cityQuizFeedback}
                              className={cn(
                                "p-5 rounded-2xl text-left font-bold transition-all border-2 cursor-pointer",
                                cityQuizFeedback 
                                  ? idx === currentCityQuiz.correct
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                    : cityQuizFeedback.isCorrect === false && idx === currentCityQuiz.correct
                                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                      : "bg-slate-50 border-slate-200 text-slate-400 opacity-50"
                                  : isDarkMode
                                    ? "bg-slate-800 border-slate-700 text-white hover:border-indigo-500"
                                    : "bg-white border-slate-100 text-slate-700 hover:border-indigo-500 shadow-sm"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>

                        {cityQuizFeedback && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "p-6 rounded-2xl font-bold text-center",
                              cityQuizFeedback.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                            )}
                          >
                            <p className="mb-4">{cityQuizFeedback.message}</p>
                            <button 
                              onClick={nextCityQuiz}
                              className="px-8 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                              {t('next_question')}
                            </button>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-10 space-y-8">
                        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Sparkles className="w-12 h-12 text-indigo-600" />
                        </div>
                        <h4 className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>Quiz Completed!</h4>
                        <div className="flex justify-center gap-12">
                          <div>
                            <p className="text-slate-400 font-bold uppercase text-xs mb-1">Correct</p>
                            <p className="text-4xl font-black text-emerald-500">{cityQuizStats.correct}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 font-bold uppercase text-xs mb-1">Incorrect</p>
                            <p className="text-4xl font-black text-rose-500">{cityQuizStats.incorrect}</p>
                          </div>
                        </div>
                        <button 
                          onClick={resetCityQuiz}
                          className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 cursor-pointer"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <QuizDashboard 
                  stats={cityQuizStats}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}

            {/* Weather Quiz View */}
            {activeTab === 'quest' && (
              <div className="space-y-12">
                <div className="max-w-2xl mx-auto">
                  <div className={cn(
                    "p-10 rounded-[40px] border shadow-xl transition-all",
                    isDarkMode ? "bg-slate-900 border-slate-800 shadow-slate-950/50" : "bg-white border-slate-200 shadow-slate-200/50"
                  )}>
                    <div className="flex items-center gap-3 mb-8">
                      <Gamepad2 className="w-8 h-8 text-indigo-600" />
                      <h3 className="text-3xl font-black">{t('weather_quest')}</h3>
                    </div>

                    {!showWeatherQuizResult ? (
                      <div className="space-y-8">
                        <div className="flex justify-between items-center">
                          <span className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-sm">
                            Question {weatherQuizIndex + 1} / {WEATHER_QUESTIONS.length}
                          </span>
                        </div>

                        <h4 className={cn("text-xl md:text-2xl font-black leading-tight", isDarkMode ? "text-white" : "text-slate-900")}>
                          {currentWeatherQuiz.question[i18n.language as 'uz' | 'ru' | 'en']}
                        </h4>

                        <div className="grid grid-cols-1 gap-4">
                          {currentWeatherQuiz.options[i18n.language as 'uz' | 'ru' | 'en'].map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleWeatherQuizAnswer(idx)}
                              disabled={!!weatherQuizFeedback}
                              className={cn(
                                "p-5 rounded-2xl text-left font-bold transition-all border-2 cursor-pointer",
                                weatherQuizFeedback 
                                  ? idx === currentWeatherQuiz.correct
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                    : weatherQuizFeedback.isCorrect === false && idx === currentWeatherQuiz.correct
                                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                      : "bg-slate-50 border-slate-200 text-slate-400 opacity-50"
                                  : isDarkMode
                                    ? "bg-slate-800 border-slate-700 text-white hover:border-indigo-500"
                                    : "bg-white border-slate-100 text-slate-700 hover:border-indigo-500 shadow-sm"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>

                        {weatherQuizFeedback && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "p-6 rounded-2xl font-bold text-center",
                              weatherQuizFeedback.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                            )}
                          >
                            <p className="mb-4">{weatherQuizFeedback.message}</p>
                            <button 
                              onClick={nextWeatherQuiz}
                              className="px-8 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                              {t('next_question')}
                            </button>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-10 space-y-8">
                        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Sparkles className="w-12 h-12 text-indigo-600" />
                        </div>
                        <h4 className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>Quiz Completed!</h4>
                        <div className="flex justify-center gap-12">
                          <div>
                            <p className="text-slate-400 font-bold uppercase text-xs mb-1">Correct</p>
                            <p className="text-4xl font-black text-emerald-500">{quizStats.correct}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 font-bold uppercase text-xs mb-1">Incorrect</p>
                            <p className="text-4xl font-black text-rose-500">{quizStats.incorrect}</p>
                          </div>
                        </div>
                        <button 
                          onClick={resetWeatherQuiz}
                          className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 cursor-pointer"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <QuizDashboard 
                  stats={quizStats}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}

            {/* Feedback View */}
            {activeTab === 'feedback' && (
              <div className="max-w-2xl mx-auto">
                <div className={cn(
                  "p-10 rounded-[40px] border shadow-xl transition-all",
                  isDarkMode ? "bg-slate-900 border-slate-800 shadow-slate-950/50" : "bg-white border-slate-200 shadow-slate-200/50"
                )}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('feedback')}</h2>
                      <p className="text-slate-500 font-medium">{t('feedback_desc')}</p>
                    </div>
                  </div>

                  {feedbackStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h3 className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('feedback_success')}</h3>
                      <button 
                        onClick={() => setFeedbackStatus('idle')}
                        className="text-indigo-600 font-bold hover:underline cursor-pointer"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form 
                      action="https://formspree.io/f/xwvrpvoj" 
                      method="POST"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setFeedbackStatus('loading');
                        const form = e.target as HTMLFormElement;
                        const data = new FormData(form);
                        try {
                          const response = await fetch(form.action, {
                            method: form.method,
                            body: data,
                            headers: { 'Accept': 'application/json' }
                          });
                          if (response.ok) {
                            setFeedbackStatus('success');
                            form.reset();
                          } else {
                            setFeedbackStatus('error');
                          }
                        } catch (err) {
                          setFeedbackStatus('error');
                        }
                      }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className={cn("text-sm font-bold uppercase tracking-widest", isDarkMode ? "text-slate-400" : "text-slate-500")}>{t('feedback_name')}</label>
                        <input 
                          type="text" 
                          name="name" 
                          required
                          placeholder={t('feedback_name')}
                          className={cn(
                            "w-full p-4 rounded-2xl border outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all",
                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={cn("text-sm font-bold uppercase tracking-widest", isDarkMode ? "text-slate-400" : "text-slate-500")}>{t('feedback_email')}</label>
                        <input 
                          type="email" 
                          name="email" 
                          required
                          placeholder={t('feedback_email')}
                          className={cn(
                            "w-full p-4 rounded-2xl border outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all",
                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={cn("text-sm font-bold uppercase tracking-widest", isDarkMode ? "text-slate-400" : "text-slate-500")}>{t('feedback_message')}</label>
                        <textarea 
                          name="message" 
                          required
                          rows={5}
                          placeholder={t('feedback_message')}
                          className={cn(
                            "w-full p-4 rounded-2xl border outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none",
                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                          )}
                        ></textarea>
                      </div>
                      {feedbackStatus === 'error' && (
                        <p className="text-rose-500 text-sm font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Something went wrong. Please try again.
                        </p>
                      )}
                      <button 
                        type="submit"
                        disabled={feedbackStatus === 'loading'}
                        className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
                      >
                        {feedbackStatus === 'loading' && <Loader2 className="animate-spin" />}
                        {t('feedback_submit')}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Notifications View */}
            {activeTab === 'notifications' && (
              <div className="max-w-2xl mx-auto">
                <div className={cn(
                  "p-6 md:p-10 rounded-[32px] md:rounded-[40px] border shadow-xl transition-all",
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                )}>
                  <div className="flex items-center gap-3 mb-8">
                    <Bell className="w-8 h-8 text-indigo-600" />
                    <h3 className="text-2xl md:text-3xl font-black">{t('notifications')}</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <p className="text-sm text-indigo-700 font-medium text-center">
                        {t('notification_instruction')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 rounded-3xl">
                      <div className="flex-1 pr-4">
                        <h4 className="font-bold text-lg">{t('enable_notifications')}</h4>
                        <p className="text-sm text-slate-500">{t('notification_instruction')}</p>
                      </div>
                      <button 
                        onClick={toggleNotifications}
                        className={cn(
                          "w-14 h-7 rounded-full relative transition-colors shrink-0",
                          isNotificationsEnabled ? "bg-emerald-500" : "bg-slate-300"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-5 h-5 bg-white rounded-full transition-all",
                          isNotificationsEnabled ? "right-1" : "left-1"
                        )} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 rounded-3xl">
                      <div className="flex-1 pr-4">
                        <h4 className="font-bold text-lg">{t('calendar_reminder')}</h4>
                        <p className="text-sm text-slate-500">{t('calendar_reminder_desc')}</p>
                      </div>
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 rounded-3xl">
                      <div className="flex-1 pr-4">
                        <h4 className="font-bold text-lg">{t('weather_alerts')}</h4>
                        <p className="text-sm text-slate-500">{t('weather_alerts_desc')}</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
                        <CloudRain className="w-6 h-6 text-amber-600" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className={cn("p-6 rounded-3xl border-2 border-dashed flex flex-col items-center text-center gap-4", isDarkMode ? "border-slate-800 bg-slate-900/50" : "border-slate-100 bg-slate-50/50")}>
                        <ShieldCheck className="w-10 h-10 text-emerald-500" />
                        <div>
                          <h4 className="font-black text-lg mb-1">{t('reliability_title')}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{t('reliability_desc')}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          if (Notification.permission === "granted") {
                            new Notification("WSA v3.9.1", {
                              body: t('notification_sent'),
                              icon: "/icon-192x192.png"
                            });
                          } else {
                            alert(t('enable_notifications'));
                          }
                        }}
                        className={cn("w-full py-4 font-black rounded-2xl transition-all border flex items-center justify-center gap-3", isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-100 text-slate-900")}
                      >
                        <BellRing className="w-5 h-5" />
                        {t('test_notification')}
                      </button>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {['Rain', 'Wind', 'Hail', 'Heat', 'Earthquake'].map(type => (
                          <div key={type} className="flex items-center gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl opacity-60">
                            <AlertCircle className="w-5 h-5 text-indigo-600" />
                            <span className="font-bold text-sm md:text-base">{type} {t('upcoming')}</span>
                            <span className="ml-auto text-[10px] font-bold text-slate-400 uppercase">{t('upcoming')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Panel View */}
            {activeTab === 'admin' && (
              <AdminPanel isDarkMode={isDarkMode} />
            )}

            {/* Upcoming Updates View */}
            {activeTab === 'upcoming' && (
              <div className="max-w-4xl mx-auto space-y-12 pb-20">
                <div className="text-center mb-12">
                  <h3 className={cn("text-4xl font-black mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{t('upcoming_title')}</h3>
                  <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* CityQuest Active Card (Auto-hide logic) */}
                  {(() => {
                    const releaseDate = new Date('2026-03-06T12:00:00');
                    const now = new Date();
                    const diffHours = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60);
                    if (diffHours < 48) {
                      return (
                        <div className={cn(
                          "p-10 rounded-[40px] border transition-all group relative overflow-hidden",
                          isDarkMode ? "bg-emerald-900/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200 shadow-sm"
                        )}>
                          <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">
                            Active
                          </div>
                          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                            <Globe2 className="w-8 h-8" />
                          </div>
                          <h4 className={cn("text-2xl font-black mb-4", isDarkMode ? "text-white" : "text-slate-900")}>CityQuest</h4>
                          <p className="text-slate-500 leading-relaxed font-medium">{t('cityquiz_desc')}</p>
                          <button 
                            onClick={() => setActiveTab('cityquiz')}
                            className="mt-8 flex items-center gap-2 text-emerald-600 font-bold hover:underline cursor-pointer"
                          >
                            Play Now <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  <div className={cn(
                    "p-10 rounded-[40px] border transition-all group",
                    isDarkMode ? "bg-slate-900 border-slate-800 hover:border-indigo-500/50" : "bg-white border-slate-200 hover:border-indigo-300 shadow-sm"
                  )}>
                    <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Globe className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className={cn("text-2xl font-black mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{t('upcoming_update_3_title')}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">{t('upcoming_update_3_desc')}</p>
                    <div className="mt-8 flex items-center gap-2 text-slate-400 font-bold">
                      <Clock className="w-4 h-4" />
                      Coming Soon
                    </div>
                  </div>

                  <div className={cn(
                    "p-10 rounded-[40px] border transition-all group",
                    isDarkMode ? "bg-slate-900 border-slate-800 hover:border-amber-500/50" : "bg-white border-slate-200 hover:border-amber-300 shadow-sm"
                  )}>
                    <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <AlertCircle className="w-8 h-8 text-amber-600" />
                    </div>
                    <h4 className={cn("text-2xl font-black mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{t('upcoming_update_2_title')}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">{t('upcoming_update_2_desc')}</p>
                    <div className="mt-8 flex items-center gap-2 text-slate-400 font-bold">
                      <Clock className="w-4 h-4" />
                      Coming Soon
                    </div>
                  </div>

                  <div className={cn(
                    "p-10 rounded-[40px] border transition-all group",
                    isDarkMode ? "bg-slate-900 border-slate-800 hover:border-violet-500/50" : "bg-white border-slate-200 hover:border-violet-300 shadow-sm"
                  )}>
                    <div className="w-16 h-16 bg-violet-50 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Download className="w-8 h-8 text-violet-600" />
                    </div>
                    <h4 className={cn("text-2xl font-black mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{t('upcoming_update_3_title')}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">{t('upcoming_update_3_desc')}</p>
                    <div className="mt-8 flex items-center gap-2 text-slate-400 font-bold">
                      <Clock className="w-4 h-4" />
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Info View */}
            {activeTab === 'info' && (
              <div className="max-w-5xl mx-auto pb-20">
                <div className={cn(
                  "p-8 lg:p-12 rounded-[40px] border transition-colors",
                  isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                )}>
                  <h2 className={cn(
                    "text-3xl lg:text-4xl font-black text-center mb-12",
                    isDarkMode ? "text-white" : "text-slate-900"
                  )}>
                    {t('info_page')}
                  </h2>

                  <div className="grid grid-cols-1 gap-12 items-center">
                    <div className="space-y-8">
                      <div className="flex gap-6">
                        <div className="w-10 h-10 shrink-0 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">1</div>
                        <div>
                          <h4 className={cn("text-lg font-bold mb-2", isDarkMode ? "text-white" : "text-slate-900")}>{t('platform_about')}</h4>
                          <p className="text-slate-500 font-medium leading-relaxed">{t('project_info')}</p>
                        </div>
                      </div>

                      <div className="flex gap-6">
                        <div className="w-10 h-10 shrink-0 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">2</div>
                        <div>
                          <h4 className={cn("text-lg font-bold mb-2", isDarkMode ? "text-white" : "text-slate-900")}>{t('reliability_title')}</h4>
                          <p className="text-slate-500 font-medium leading-relaxed">{t('reliability_desc')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* World Clock View */}
            {activeTab === 'clock' && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <h3 className="text-3xl font-black">{t('world_clock')}</h3>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={clockSearch}
                      onChange={(e) => setClockSearch(e.target.value)}
                      placeholder={t('search_clock')}
                      className="px-6 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
                    />
                    <button 
                      onClick={addWorldClock}
                      className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all"
                    >
                      <RefreshCw className={cn("w-6 h-6", isAddingClock && "animate-spin")} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {worldClocks.map((city, i) => (
                    <div key={i} className={cn(
                      "p-8 rounded-[40px] border transition-all group relative overflow-hidden",
                      isDarkMode ? "bg-slate-900 border-slate-800 hover:border-indigo-500/50" : "bg-white border-slate-200 hover:border-indigo-300"
                    )}>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h4 className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{city.name}</h4>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{city.tz}</p>
                          </div>
                          <Clock className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className={cn("text-5xl font-black mb-2", isDarkMode ? "text-white" : "text-slate-900")}>
                          {formatInTimeZone(currentTime, city.tz, 'HH:mm:ss')}
                        </div>
                        <p className="text-slate-500 font-medium">
                          {getTranslatedDate(new Date(currentTime.toLocaleString('en-US', { timeZone: city.tz })))}
                        </p>
                      </div>
                      <div className={cn(
                        "absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                        isDarkMode ? "bg-indigo-900/20" : "bg-indigo-50"
                      )}></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* City Insights View */}
            {activeTab === 'insights' && insight && (
              <div className="space-y-10">
                <div className="relative h-96 rounded-[40px] overflow-hidden group">
                  <img 
                    src={`https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1600&q=80`} 
                    alt={insight.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
                    <h2 className="text-5xl font-black text-white mb-4">{insight.name}</h2>
                    <p className="text-xl text-white/80 max-w-2xl leading-relaxed">{insight.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className={cn("p-8 rounded-3xl border transition-all", isDarkMode ? "bg-slate-900 border-slate-800 hover:border-indigo-500/50" : "bg-white border-slate-200 hover:border-indigo-200")}>
                    <Briefcase className="w-8 h-8 text-indigo-600 mb-6" />
                    <h4 className={cn("text-lg font-bold mb-3", isDarkMode ? "text-white" : "text-slate-900")}>{t('work')}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{insight.work}</p>
                  </div>
                  <div className={cn("p-8 rounded-3xl border transition-all", isDarkMode ? "bg-slate-900 border-slate-800 hover:border-violet-500/50" : "bg-white border-slate-200 hover:border-indigo-200")}>
                    <GraduationCap className="w-8 h-8 text-violet-600 mb-6" />
                    <h4 className={cn("text-lg font-bold mb-3", isDarkMode ? "text-white" : "text-slate-900")}>{t('study')}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{insight.study}</p>
                  </div>
                  <div className={cn("p-8 rounded-3xl border transition-all", isDarkMode ? "bg-slate-900 border-slate-800 hover:border-emerald-500/50" : "bg-white border-slate-200 hover:border-indigo-200")}>
                    <Home className="w-8 h-8 text-emerald-600 mb-6" />
                    <h4 className={cn("text-lg font-bold mb-3", isDarkMode ? "text-white" : "text-slate-900")}>{t('live')}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{insight.live}</p>
                  </div>
                  <div className={cn("p-8 rounded-3xl border transition-all", isDarkMode ? "bg-slate-900 border-slate-800 hover:border-orange-500/50" : "bg-white border-slate-200 hover:border-indigo-200")}>
                    <Compass className="w-8 h-8 text-orange-600 mb-6" />
                    <h4 className={cn("text-lg font-bold mb-3", isDarkMode ? "text-white" : "text-slate-900")}>{t('travel')}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{insight.travel}</p>
                  </div>
                </div>

                <div className={cn("p-10 rounded-[40px] border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                  <div className="flex items-center gap-3 mb-8">
                    <Camera className="w-6 h-6 text-indigo-600" />
                    <h3 className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('photos')}</h3>
                  </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {insight?.images?.map((kw, i) => (
                        <div key={i} className={cn("aspect-square rounded-3xl overflow-hidden", isDarkMode ? "bg-slate-800" : "bg-slate-100")}>
                          <img 
                            src={`https://picsum.photos/seed/${kw}/800/800`} 
                            alt={kw}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* New Features v3.8.2 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Cuisine */}
                    <div className={cn("p-10 rounded-[40px] border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                      <div className="flex items-center gap-3 mb-8">
                        <Droplets className="w-6 h-6 text-indigo-600" />
                        <h3 className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('cuisine')}</h3>
                      </div>
                      <div className="space-y-6">
                        {insight?.cuisine?.map((dish, i) => (
                          <div key={i} className="flex gap-4">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center font-bold shrink-0", isDarkMode ? "bg-slate-800 text-indigo-400" : "bg-indigo-50 text-indigo-600")}>
                              {i + 1}
                            </div>
                            <div>
                              <h5 className={cn("font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{dish.name}</h5>
                              <p className="text-sm text-slate-500 leading-relaxed">{dish.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packing List & Safety */}
                    <div className="space-y-6">
                      <div className={cn(
                        "bg-indigo-600 p-10 rounded-[40px] text-white",
                        isDarkMode ? "" : "shadow-xl shadow-indigo-500/10"
                      )}>
                        <div className="flex items-center gap-3 mb-6">
                          <Briefcase className="w-6 h-6 text-indigo-200" />
                          <h3 className="text-2xl font-black">{t('packing_list')}</h3>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {insight?.packing?.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-indigo-50 font-medium">
                              <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={cn("p-10 rounded-[40px] border transition-all", isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
                        <div className="flex items-center gap-3 mb-6">
                          <AlertCircle className="w-6 h-6 text-emerald-600" />
                          <h3 className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('safety')}</h3>
                        </div>
                        <p className="text-slate-500 leading-relaxed">{insight?.safety}</p>
                      </div>
                    </div>
                  </div>
              </div>
            )}

            {/* Flights View */}
            {activeTab === 'flights' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-8">
                  <div className={cn(
                    "p-8 rounded-3xl border shadow-sm transition-all",
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  )}>
                    <h3 className={cn("text-2xl font-black mb-6", isDarkMode ? "text-white" : "text-slate-900")}>{t('survey_title')}</h3>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-2xl mb-6">
                      <p className="text-sm text-amber-700 dark:text-amber-400 font-medium flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {t('flight_disclaimer')}
                      </p>
                      <a 
                        href="https://www.skyscanner.net" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {t('check_official')}
                      </a>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('where_from')}</label>
                        <input 
                          type="text" 
                          value={survey.from}
                          onChange={(e) => setSurvey({...survey, from: e.target.value})}
                          placeholder={t('where_from')}
                          className={cn(
                            "w-full p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all border",
                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                          )}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('where_to')}</label>
                        <input 
                          type="text" 
                          value={survey.to}
                          onChange={(e) => setSurvey({...survey, to: e.target.value})}
                          placeholder={t('where_to')}
                          className={cn(
                            "w-full p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all border",
                            isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                          )}
                        />
                      </div>
                      <button 
                        onClick={() => fetchFlights(survey.from, survey.to)}
                        disabled={loading || !survey.from || !survey.to}
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="animate-spin" /> : <><Search className="w-5 h-5" /> {t('find_flights')}</>}
                      </button>
                    </div>
                  </div>

                  <div className={cn(
                    "p-8 rounded-3xl border transition-all",
                    isDarkMode ? "bg-indigo-900/20 border-indigo-500/20" : "bg-indigo-50 border-indigo-100"
                  )}>
                    <AlertCircle className="w-6 h-6 text-indigo-600 mb-4" />
                    <p className={cn("font-bold mb-2", isDarkMode ? "text-indigo-300" : "text-indigo-900")}>Travel Tip</p>
                    <p className={cn("text-sm leading-relaxed", isDarkMode ? "text-indigo-400" : "text-indigo-700")}>Booking your flight at least 3 weeks in advance can save you up to 20% on ticket prices.</p>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  {flights.length > 0 ? (
                    flights.map((flight, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          "p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-8 transition-all",
                          isDarkMode 
                            ? "bg-slate-900 border-slate-800 hover:border-indigo-500/50" 
                            : "bg-white border-slate-200 hover:shadow-xl hover:shadow-slate-200/50"
                        )}
                      >
                        <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center",
                            isDarkMode ? "bg-slate-800" : "bg-slate-50"
                          )}>
                            <Plane className="w-8 h-8 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{flight.airline}</h4>
                            <p className="text-slate-500 font-medium">{flight.from} → {flight.to}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="text-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('flight_duration')}</p>
                            <p className={cn("font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{flight.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('flight_price')}</p>
                            <p className="text-2xl font-black text-indigo-600">${flight.price}</p>
                          </div>
                          <button className={cn(
                            "p-3 rounded-xl transition-all",
                            isDarkMode ? "bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white" : "bg-slate-100 hover:bg-indigo-600 hover:text-white"
                          )}>
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className={cn(
                      "h-full flex flex-col items-center justify-center text-center py-20 rounded-[40px] border-2 border-dashed",
                      isDarkMode ? "border-slate-800 bg-slate-900/50 text-slate-600" : "border-slate-100 bg-slate-50/50 text-slate-400"
                    )}>
                      <Plane className="w-16 h-16 mb-4 opacity-20" />
                      <p className="text-lg font-medium">{t('no_data')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className={cn(
        "fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-4 px-4 md:px-8 z-30 transition-all",
        "lg:left-72",
        isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
      )}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleVersionClick}
              className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors"
            >
              © {new Date().getFullYear()} WSA v3.9.1. {t('all_rights_reserved')}
            </button>
            <div className="flex gap-4">
              <a 
                href="https://t.me/morv1uss" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs font-bold text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors"
              >
                {t('author')}
              </a>
              <a 
                href="https://t.me/Eshkhuvvatofff" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs font-bold text-slate-500 hover:text-slate-400 cursor-pointer transition-colors"
              >
                {t('admin')}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-emerald-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              {t('real_time')}
            </span>
            <span className="text-slate-300 hidden md:block">|</span>
            <div className="flex gap-4">
              <a href="https://github.com/Maksudzhon" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 text-slate-400 hover:text-indigo-600 cursor-pointer" />
              </a>
              <a href="https://t.me/wsa_project" target="_blank" rel="noopener noreferrer">
                <SendHorizontal className="w-4 h-4 text-slate-400 hover:text-indigo-600 cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/wsaofficialpage?igsh=MTZ3bGNsajJ2anhqYw==" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4 text-slate-400 hover:text-indigo-600 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Notifications Container */}
      <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={cn(
                "px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 pointer-events-auto backdrop-blur-md",
                isDarkMode ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white/90 border-slate-200 text-slate-900"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                n.type === 'success' ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"
              )}>
                {n.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              </div>
              <span className="font-black text-sm">{n.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
