export type TabType = 
  | 'home' 
  | 'quran' 
  | 'namaz' 
  | 'kalmas' 
  | 'hadith' 
  | 'sunnah' 
  | 'knowledge' 
  | 'duas' 
  | 'prayer-times' 
  | 'qibla' 
  | 'tasbeeh' 
  | 'ramadan';

export type Language = 'en' | 'ur' | 'ar';

export interface SurahMeta {
  number: number;
  name: string;
  transliteration: string;
  englishName: string;
  urduName: string;
  hindiName: string;
  totalVerses: number;
  revelationType: 'Meccan' | 'Medinan';
  rukuCount: number;
  revelationOrder: number;
}

export interface Ayah {
  numberInSurah: number;
  textArabic: string;
  translationEn: string;
  translationUr: string;
  translationHi: string;
  transliterationEn?: string;
  tafsir?: string;
  audioUrl?: string;
}

export interface SurahDetail extends SurahMeta {
  verses: Ayah[];
  tafsirSummary?: string;
}

export interface BookmarkItem {
  id: string;
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  textArabic: string;
  translationEn: string;
  timestamp: number;
  note?: string;
}

export interface NamazStep {
  id: string;
  stepNumber: number;
  titleEn: string;
  titleUr: string;
  arabicName: string;
  postureDescription: string;
  postureIcon: string;
  arabicText?: string;
  transliterationEn?: string;
  translationEn?: string;
  translationUr?: string;
  repetitionCount?: number;
  audioVoiceText?: string;
  juridicalNote?: string;
}

export interface PrayerTypeInfo {
  id: string;
  nameEn: string;
  nameUr: string;
  nameAr: string;
  timing: string;
  totalRakats: number;
  breakdown: {
    sunnahMuakkadah?: number;
    fard: number;
    sunnahGhairMuakkadah?: number;
    witr?: number;
    nafl?: number;
  };
  description: string;
  importance: string;
}

export interface Kalma {
  id: number;
  numberUr: string;
  nameEn: string;
  nameUr: string;
  nameAr: string;
  meaningEn: string;
  arabicText: string;
  transliterationEn: string;
  translationEn: string;
  translationUr: string;
  benefits: string;
}

export interface HadithItem {
  id: string;
  collection: 'Bukhari' | 'Muslim' | 'Abu Dawood' | 'Tirmidhi' | 'Nasai' | 'Ibn Majah' | 'Nawawi';
  bookName: string;
  hadithNumber: string | number;
  narrator: string;
  arabicText: string;
  translationEn: string;
  translationUr: string;
  grade: 'Sahih' | 'Hasan';
  topic: string;
  reference: string;
}

export interface SunnahItem {
  id: string;
  category: 'eating' | 'sleeping' | 'drinking' | 'travelling' | 'grooming' | 'home' | 'greeting' | 'general';
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  arabicSupplication?: string;
  transliteration?: string;
  reference: string;
  completedToday?: boolean;
}

export interface DuaItem {
  id: string;
  category: 'morning_evening' | 'sleeping' | 'eating' | 'travelling' | 'masjid' | 'home' | 'wudu' | 'forgiveness' | 'protection' | 'illness';
  titleEn: string;
  titleUr: string;
  titleAr: string;
  occasion: string;
  arabicText: string;
  transliterationEn: string;
  translationEn: string;
  translationUr: string;
  reference: string;
  recommendedRepeat?: number;
}

export interface QuizQuestion {
  id: string;
  category: 'Quran' | 'Prophets' | 'Prayer' | 'Islamic History' | 'Hadith';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
