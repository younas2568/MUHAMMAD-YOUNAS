// Accurate astronomical calculation for Islamic Prayer Times & Qibla Direction

export interface Coordinates {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface PrayerTimesResult {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string;
  midnight: string;
  currentPrayer: string;
  nextPrayer: string;
  timeToNext: string;
  nextPrayerDate: Date;
}

export type JuristicMethod = 'standard' | 'hanafi'; // Asr shadow factor: 1 vs 2
export type CalculationMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi' | 'Tehran';

export const POPULAR_CITIES: Coordinates[] = [
  { city: 'Makkah', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262 },
  { city: 'Madinah', country: 'Saudi Arabia', latitude: 24.4672, longitude: 39.6111 },
  { city: 'Jerusalem', country: 'Palestine', latitude: 31.7683, longitude: 35.2137 },
  { city: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011 },
  { city: 'Lahore', country: 'Pakistan', latitude: 31.5204, longitude: 74.3587 },
  { city: 'Islamabad', country: 'Pakistan', latitude: 33.6844, longitude: 73.0479 },
  { city: 'Dhaka', country: 'Bangladesh', latitude: 23.8103, longitude: 90.4125 },
  { city: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090 },
  { city: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777 },
  { city: 'Dubai', country: 'UAE', latitude: 25.2048, longitude: 55.2708 },
  { city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784 },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357 },
  { city: 'London', country: 'UK', latitude: 51.5074, longitude: -0.1278 },
  { city: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060 },
  { city: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832 },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869 },
  { city: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456 }
];

// Calculation Method Angles
const METHOD_ANGLES: Record<CalculationMethod, { fajr: number; isha: number }> = {
  MWL: { fajr: 18, isha: 17 }, // Muslim World League
  ISNA: { fajr: 15, isha: 15 }, // Islamic Society of North America
  Egypt: { fajr: 19.5, isha: 17.5 }, // Egyptian General Authority
  Makkah: { fajr: 18.5, isha: 19 }, // Umm al-Qura University
  Karachi: { fajr: 18, isha: 18 }, // University of Islamic Sciences, Karachi
  Tehran: { fajr: 17.7, isha: 14 }
};

// Trigonometry in Degrees
const d2r = (d: number) => (d * Math.PI) / 180.0;
const r2d = (r: number) => (r * 180.0) / Math.PI;
const sin = (d: number) => Math.sin(d2r(d));
const cos = (d: number) => Math.cos(d2r(d));
const tan = (d: number) => Math.tan(d2r(d));
const asin = (x: number) => r2d(Math.asin(x));
const acos = (x: number) => r2d(Math.acos(x));
const atan = (x: number) => r2d(Math.atan(x));
const atan2 = (y: number, x: number) => r2d(Math.atan2(y, x));

// Julian Day
function getJulianDate(date: Date): number {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
}

// Sun Position calculations
function getSunCoordinates(d: number) {
  const q = 280.459 + 0.98564736 * d;
  const g = 357.529 + 0.98560028 * d;
  const L = (q + 1.915 * sin(g) + 0.02 * sin(2 * g)) % 360;
  const e = 23.439 - 0.00000036 * d;
  const ra = atan2(cos(e) * sin(L), cos(L)) / 15.0;
  const dec = asin(sin(e) * sin(L));
  return { dec, ra: (ra + 24) % 24, eqt: q / 15.0 - ((ra + 24) % 24) };
}

// Calculate Astronomical Prayer Times
export function calculatePrayerTimes(
  date: Date,
  coords: Coordinates,
  juristic: JuristicMethod = 'hanafi',
  method: CalculationMethod = 'Karachi'
): PrayerTimesResult {
  const lat = coords.latitude;
  const lng = coords.longitude;
  const timezoneOffset = -date.getTimezoneOffset() / 60; // in hours

  const jd = getJulianDate(date);
  const d = jd - 2451545.0;
  const sun = getSunCoordinates(d);

  // Solar noon
  const noon = 12 + timezoneOffset - lng / 15 - sun.eqt;

  // Hour angle for horizon depression angle
  const hourAngle = (angle: number): number => {
    const val = (-sin(angle) - sin(lat) * sin(sun.dec)) / (cos(lat) * cos(sun.dec));
    if (val > 1 || val < -1) return 0;
    return acos(val) / 15.0;
  };

  // Asr hour angle based on juristic shadow multiplier
  const asrMultiplier = juristic === 'hanafi' ? 2 : 1;
  const asrAngle = -atan(1 / (asrMultiplier + tan(Math.abs(lat - sun.dec))));
  const asrHA = hourAngle(-asrAngle);

  const { fajr: fajrAngle, isha: ishaAngle } = METHOD_ANGLES[method];

  const fajrTime = noon - hourAngle(fajrAngle);
  const sunriseTime = noon - hourAngle(0.833);
  const dhuhrTime = noon;
  const asrTime = noon + asrHA;
  const sunsetTime = noon + hourAngle(0.833);
  const ishaTime = noon + hourAngle(ishaAngle);

  // Format decimal hours to HH:MM AM/PM
  const formatTime = (t: number, adjustMinutes: number = 0): string => {
    let totalMinutes = Math.round(t * 60) + adjustMinutes;
    while (totalMinutes < 0) totalMinutes += 24 * 60;
    totalMinutes = totalMinutes % (24 * 60);

    const hours24 = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

    return `${hours12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  // Convert decimal hour to Date object on given date
  const toDate = (t: number, dayOffset = 0): Date => {
    const d = new Date(date);
    d.setDate(d.getDate() + dayOffset);
    let totalMinutes = Math.round(t * 60);
    while (totalMinutes < 0) totalMinutes += 24 * 60;
    totalMinutes = totalMinutes % (24 * 60);
    d.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0);
    return d;
  };

  const now = new Date();
  const timesList = [
    { name: 'Fajr', date: toDate(fajrTime) },
    { name: 'Sunrise', date: toDate(sunriseTime) },
    { name: 'Dhuhr', date: toDate(dhuhrTime) },
    { name: 'Asr', date: toDate(asrTime) },
    { name: 'Maghrib', date: toDate(sunsetTime) },
    { name: 'Isha', date: toDate(ishaTime) }
  ];

  let currentPrayer = 'Isha';
  let nextPrayer = 'Fajr';
  let nextPrayerDate = toDate(fajrTime, 1); // default next day Fajr

  for (let i = 0; i < timesList.length; i++) {
    if (now < timesList[i].date) {
      nextPrayer = timesList[i].name;
      nextPrayerDate = timesList[i].date;
      currentPrayer = i === 0 ? 'Isha (Previous Night)' : timesList[i - 1].name;
      break;
    }
  }

  // Calculate remaining time
  const diffMs = Math.max(0, nextPrayerDate.getTime() - now.getTime());
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
  const timeToNext = `${diffHrs}h ${diffMins}m ${diffSecs}s`;

  return {
    fajr: formatTime(fajrTime),
    sunrise: formatTime(sunriseTime),
    dhuhr: formatTime(dhuhrTime),
    asr: formatTime(asrTime),
    maghrib: formatTime(sunsetTime),
    isha: formatTime(ishaTime),
    imsak: formatTime(fajrTime, -10), // 10 minutes before Fajr for Ramadan
    midnight: formatTime((sunsetTime + (fajrTime + 24)) / 2),
    currentPrayer,
    nextPrayer,
    timeToNext,
    nextPrayerDate
  };
}

// Exact Qibla calculation using spherical trigonometry
export function calculateQibla(latitude: number, longitude: number): { bearing: number; distanceKm: number } {
  const kaabaLat = 21.422487;
  const kaabaLng = 39.826206;

  const lat1 = d2r(latitude);
  const lat2 = d2r(kaabaLat);
  const dLng = d2r(kaabaLng - longitude);

  const y = Math.sin(dLng);
  const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
  let qiblaBearing = r2d(Math.atan2(y, x));
  qiblaBearing = (qiblaBearing + 360) % 360;

  // Haversine formula for distance
  const R = 6371; // Earth radius in km
  const dLat = d2r(kaabaLat - latitude);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  return {
    bearing: Math.round(qiblaBearing * 10) / 10,
    distanceKm
  };
}

// Hijri Date Calculation with Month Names and Key Islamic Events
export const HIJRI_MONTHS = [
  { en: 'Muharram', ur: 'محرم الحرام', ar: 'مُحَرَّم' },
  { en: 'Safar', ur: 'صفر المظفر', ar: 'صَفَر' },
  { en: 'Rabi al-Awwal', ur: 'ربیع الاول', ar: 'رَبِيع الأَوَّل' },
  { en: 'Rabi al-Thani', ur: 'ربیع الثانی', ar: 'رَبِيع الآخِر' },
  { en: 'Jumada al-Awwal', ur: 'جمادی الاول', ar: 'جُمَادَى الأُولَى' },
  { en: 'Jumada al-Thani', ur: 'جمادی الثانی', ar: 'جُمَادَى الآخِرَة' },
  { en: 'Rajab', ur: 'رجب المرجب', ar: 'رَجَب' },
  { en: 'Sha\'ban', ur: 'شعبان المعظم', ar: 'شَعْبَان' },
  { en: 'Ramadan', ur: 'رمضان المبارک', ar: 'رَمَضَان' },
  { en: 'Shawwal', ur: 'شوال المکرم', ar: 'شَوَّال' },
  { en: 'Dhul-Qi\'dah', ur: 'ذو القعدہ', ar: 'ذُو القَعْدَة' },
  { en: 'Dhul-Hijjah', ur: 'ذو الحجہ', ar: 'ذُو الحِجَّة' }
];

export function getHijriDate(gregorianDate: Date = new Date(), adjustmentDays: number = 0) {
  // Approximate algorithmic conversion using Kuwaiti Algorithm
  const adjusted = new Date(gregorianDate);
  adjusted.setDate(adjusted.getDate() + adjustmentDays);

  let day = adjusted.getDate();
  let month = adjusted.getMonth();
  let year = adjusted.getFullYear();

  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

  let b2 = jd - 1948440 + 10632;
  let n = Math.floor((b2 - 1) / 10631);
  b2 = b2 - 10631 * n + 354;
  let j = (Math.floor((10985 - b2) / 5316)) * (Math.floor((50 * b2) / 17719)) + (Math.floor(b2 / 5670)) * (Math.floor((43 * b2) / 15238));
  b2 = b2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  let m2 = Math.floor((24 * b2) / 709);
  let d2 = b2 - Math.floor((709 * m2) / 24);
  let y2 = 30 * n + j - 30;

  const hijriMonthIndex = Math.max(0, Math.min(11, m2 - 1));
  const hijriMonth = HIJRI_MONTHS[hijriMonthIndex];

  return {
    day: d2,
    monthIndex: hijriMonthIndex,
    monthEn: hijriMonth.en,
    monthUr: hijriMonth.ur,
    monthAr: hijriMonth.ar,
    year: y2,
    formattedEn: `${d2} ${hijriMonth.en} ${y2} AH`,
    formattedUr: `${d2} ${hijriMonth.ur} ${y2} ہجری`,
    isRamadan: hijriMonthIndex === 8
  };
}

export const ISLAMIC_EVENTS = [
  { nameEn: 'Islamic New Year', nameUr: 'نیا اسلامی سال', hijriDate: '1 Muharram', description: 'Beginning of the Hijri calendar year.' },
  { nameEn: 'Day of Ashura', nameUr: 'یومِ عاشورہ', hijriDate: '10 Muharram', description: 'Day Musa (AS) was delivered from Pharaoh; Martyrdom of Imam Hussain (RA).' },
  { nameEn: 'Mawlid al-Nabi ﷺ', nameUr: 'عید میلاد النبی ﷺ', hijriDate: '12 Rabi al-Awwal', description: 'Commemoration of the birth of the Holy Prophet Muhammad ﷺ.' },
  { nameEn: 'Isra & Mi\'raj', nameUr: 'شبِ معراج', hijriDate: '27 Rajab', description: 'Miraculous Night Journey of Prophet Muhammad ﷺ to the heavens.' },
  { nameEn: 'Shab-e-Barat (Laylat al-Bara\'ah)', nameUr: 'شبِ برات', hijriDate: '15 Sha\'ban', description: 'Night of salvation and seeking forgiveness.' },
  { nameEn: 'First Day of Ramadan', nameUr: 'رمضان المبارک کا پہلا روزہ', hijriDate: '1 Ramadan', description: 'Start of the blessed month of obligatory fasting.' },
  { nameEn: 'Laylat al-Qadr', nameUr: 'شبِ قدر', hijriDate: '27 Ramadan (odd nights of last 10 days)', description: 'Night of Decree, better than a thousand months.' },
  { nameEn: 'Eid al-Fitr', nameUr: 'عید الفطر المبارک', hijriDate: '1 Shawwal', description: 'Joyful celebration marking completion of Ramadan.' },
  { nameEn: 'Day of Arafah', nameUr: 'یومِ عرفہ', hijriDate: '9 Dhul-Hijjah', description: 'Greatest day of Hajj; expiation for sins of previous and coming year.' },
  { nameEn: 'Eid al-Adha', nameUr: 'عید الاضحیٰ المبارک', hijriDate: '10 Dhul-Hijjah', description: 'Feast of Sacrifice honoring Prophet Ibrahim\'s devotion.' }
];
