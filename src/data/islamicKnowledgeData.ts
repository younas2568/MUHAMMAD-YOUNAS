import { QuizQuestion } from '../types';

export const FIVE_PILLARS = [
  {
    number: 1,
    nameEn: 'Shahadah (Declaration of Faith)',
    nameUr: 'شہادت (توحید و رسالت کا اقرار)',
    nameAr: 'الشهادة',
    summary: 'Bearing witness that none has the right to be worshipped except Allah, and Muhammad ﷺ is the Messenger of Allah.',
    details: 'The foundational gateway into Islam. Without sincere internal belief and external proclamation of Shahadah, no other deeds are accepted. It establishes pure monotheism (Tawhid) and acknowledgment of the finality of Prophethood (Khatm an-Nubuwwah).'
  },
  {
    number: 2,
    nameEn: 'Salah (Five Daily Obligatory Prayers)',
    nameUr: 'نماز (روزانہ پانچ وقت کی نماز)',
    nameAr: 'الصلاة',
    summary: 'The direct communication between the believer and Allah performed 5 times each day.',
    details: 'The second pillar and the first matter for which a servant will be held accountable on the Day of Resurrection. Performed at dawn (Fajr), midday (Dhuhr), afternoon (Asr), sunset (Maghrib), and night (Isha). It instills discipline, spiritual cleanliness, and humility.'
  },
  {
    number: 3,
    nameEn: 'Zakat (Obligatory Almsgiving)',
    nameUr: 'زکوٰۃ (مالی فرض صدقہ)',
    nameAr: 'الزكاة',
    summary: 'Purifying wealth by giving 2.5% of qualifying surplus savings annually to the poor and needy.',
    details: 'Prescribed upon every mature, sane Muslim whose wealth exceeds the Nisab threshold (equivalent to 87.48 grams of gold or 612.36 grams of silver) held for one full lunar year. It eradicates poverty, curbs greed, and purifies society.'
  },
  {
    number: 4,
    nameEn: 'Sawm (Fasting during Ramadan)',
    nameUr: 'صوم (رمضان المبارک کے روزے)',
    nameAr: 'الصوم',
    summary: 'Abstaining from food, drink, and intimate relations from dawn until sunset throughout Ramadan.',
    details: 'Prescribed in Surah Al-Baqarah (2:183) to develop God-consciousness (Taqwa). Beyond physical abstinence, it requires guarding the tongue, eyes, and heart from sin, while increasing Quran recitation, charity, and nocturnal prayers.'
  },
  {
    number: 5,
    nameEn: 'Hajj (Pilgrimage to Makkah)',
    nameUr: 'حج (بیت اللہ کی زیارت)',
    nameAr: 'الحج',
    summary: 'The pilgrimage to the sacred Kaaba in Makkah performed at least once in a lifetime for those physically and financially able.',
    details: 'Performed during the month of Dhul-Hijjah (8th to 12th). Unites millions of Muslims irrespective of race, nationality, or status in simple white Ihram garments, performing Tawaf, Sa\'i between Safa and Marwah, standing at Arafat, and Rami at Jamarat.'
  }
];

export const SIX_ARTICLES_OF_FAITH = [
  {
    number: 1,
    titleEn: 'Belief in Allah (Tawhid)',
    titleUr: 'اللہ تعالیٰ پر ایمان',
    desc: 'Believing in the absolute Oneness of Allah in His Lordship (Rububiyyah), His exclusive right to worship (Uluhiyyah), and His unique Names and Attributes (Asma wa Sifat) without likening Him to creation.'
  },
  {
    number: 2,
    titleEn: 'Belief in the Angels (Mala\'ikah)',
    titleUr: 'فرشتوں پر ایمان',
    desc: 'Believing in the noble, sinless beings created from light who carry out Allah\'s divine commands without disobedience, including Jibril (revelation), Mika\'il (sustenance/rain), Israfil (trumpet), and Azra\'il / Malak al-Mawt (angel of death).'
  },
  {
    number: 3,
    titleEn: 'Belief in the Divine Books (Kutub)',
    titleUr: 'آسمانی کتابوں پر ایمان',
    desc: 'Believing in all original revelations sent to Prophets: the Suhuf of Ibrahim, the Tawrat of Musa, the Zabur of Dawud, the Injeel of Isa, and the Holy Quran revealed to Muhammad ﷺ as the final, protected, universal word of Allah.'
  },
  {
    number: 4,
    titleEn: 'Belief in the Messengers & Prophets (Rusul & Anbiya)',
    titleUr: 'تمام انبیاء و رسل پر ایمان',
    desc: 'Believing in all Prophets sent by Allah from Adam (AS) to the seal and leader of all messengers, Muhammad ﷺ. Muslims make no distinction between them in terms of their truthfulness.'
  },
  {
    number: 5,
    titleEn: 'Belief in the Day of Judgment (Yawm al-Qiyamah)',
    titleUr: 'قیامت کے دن پر ایمان',
    desc: 'Believing in physical resurrection after death, the reckoning (Hisab), the scale of deeds (Mizan), the bridge of Sirat, intercession (Shafa\'ah), and eternal abode in Jannah (Paradise) or Jahannam (Hellfire).'
  },
  {
    number: 6,
    titleEn: 'Belief in Divine Decree (Al-Qadar)',
    titleUr: 'تقدیر کے خیر اور شر پر ایمان',
    desc: 'Believing that everything that transpires—good and bad, sweet and bitter—occurs with Allah\'s prior knowledge, will, written decree (Al-Lawh al-Mahfuz), and divine power, while humans possess moral choice and accountability.'
  }
];

export const JURISPRUDENCE_CATEGORIES = [
  {
    term: 'Fard / Wajib (Obligatory)',
    arabic: 'الفرض والواجب',
    meaning: 'Commands established by definitive proofs. Missing them knowingly is sinful; fulfilling them earns immense reward. In Hanafi jurisprudence, Fard is proven by definitive text (Qat\'i), while Wajib is proven by probable evidence (Zanni) like Witr and Eid prayers.',
    examples: 'The 5 daily prayers, fasting Ramadan, giving Zakat, honoring parents.'
  },
  {
    term: 'Sunnah Mu\'akkadah (Emphasized Sunnah)',
    arabic: 'السنة المؤكدة',
    meaning: 'Practices that Prophet Muhammad ﷺ performed continually and rarely left. Neglecting them persistently without excuse is reprehensible and incurs spiritual blame.',
    examples: '2 Rakats before Fajr, 4 Rakats before and 2 after Dhuhr, 2 after Maghrib, 2 after Isha, rinsing mouth in Wudu.'
  },
  {
    term: 'Sunnah Ghair Mu\'akkadah / Mustahabb (Recommended)',
    arabic: 'المستحب والنفل',
    meaning: 'Deeds encouraged by the Prophet ﷺ. Performing them earns reward; omitting them carries no sin or penalty.',
    examples: 'Tahajjud prayer, fasting on Mondays and Thursdays, using miswak frequently, charity beyond Zakat.'
  },
  {
    term: 'Mubah (Permissible)',
    arabic: 'المباح',
    meaning: 'Actions upon which the Shariah takes a neutral stance; doing or omitting them carries neither reward nor punishment in itself, though good intentions elevate them to rewardable acts.',
    examples: 'Daily permissible food, clothing styles, lawful recreation, regular trade.'
  },
  {
    term: 'Makruh (Disliked)',
    arabic: 'المكروه',
    meaning: 'Actions disliked by Allah and His Messenger. Avoiding them earns reward; performing them does not constitute major transgression, although Makruh Tahrimi (severely disliked) borders close to Haram in Hanafi fiqh.',
    examples: 'Wasting water during Wudu, praying when food is served or while fighting bodily urges.'
  },
  {
    term: 'Haram (Strictly Prohibited)',
    arabic: 'الحرام',
    meaning: 'Actions categorically forbidden by decisive Islamic scriptures. Committing them incurs divine punishment and necessitates sincere repentance.',
    examples: 'Shirk (associating partners with Allah), taking interest (Riba), murder, lying, backbiting, intoxicants, pork.'
  }
];

export const JURISPRUDENCE_SCHOOLS = [
  {
    name: 'Hanafi (Imam Abu Hanifah 80–150 AH)',
    primaryRegions: 'South Asia (Pakistan, India, Bangladesh), Turkey, Central Asia, Balkans, Levant',
    distinctRules: 'Distinguishes between Fard and Wajib; Witr is 3 Rakats Wajib with Takbeer before Qunoot; Asr begins when shadow is twice the length; silent Ameen in congregation.'
  },
  {
    name: 'Shafi\'i (Imam Muhammad ibn Idris ash-Shafi\'i 150–204 AH)',
    primaryRegions: 'Southeast Asia (Indonesia, Malaysia), Egypt, East Africa, Yemen, Southern India',
    distinctRules: 'Surah Al-Fatihah is recited by both Imam and followers in all prayers; Raf\' al-Yadayn (raising hands) before/after Ruku; Ameen aloud; Witr is prayed in sets of 2 Rakats plus 1.'
  },
  {
    name: 'Maliki (Imam Malik ibn Anas 93–179 AH)',
    primaryRegions: 'North Africa (Morocco, Algeria, Tunisia), West Africa, Sudan',
    distinctRules: 'Relies heavily on the continuous living practice of the people of Madinah (\'Amal Ahl al-Madinah); arms may be left at sides (Sadl) or placed on chest in prayer; Basmalah is omitted in loud recitation.'
  },
  {
    name: 'Hanbali (Imam Ahmad ibn Hanbal 164–241 AH)',
    primaryRegions: 'Arabian Peninsula (Saudi Arabia, UAE, Qatar, Kuwait)',
    distinctRules: 'Strict adherence to Hadith and Athar of Companions; hands placed upon chest below collarbones; Raf\' al-Yadayn before and rising from Ruku.'
  }
];

export const ISLAMIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Quran',
    question: 'How many Surahs are there in the Holy Quran?',
    options: ['110', '112', '114', '120'],
    correctAnswerIndex: 2,
    explanation: 'The Holy Quran consists of exactly 114 Surahs, starting with Surah Al-Fatihah and concluding with Surah An-Nas.'
  },
  {
    id: 'q2',
    category: 'Quran',
    question: 'Which Surah does not begin with Bismillah-ir-Rahman-ir-Raheem?',
    options: ['Surah Al-Kahf', 'Surah At-Tawbah', 'Surah Yaseen', 'Surah Al-Mulk'],
    correctAnswerIndex: 1,
    explanation: 'Surah At-Tawbah (Chapter 9) is the only Surah in the Quran that does not begin with the Basmalah.'
  },
  {
    id: 'q3',
    category: 'Prophets',
    question: 'Who was the first Prophet sent to humanity?',
    options: ['Prophet Nuh (Noah)', 'Prophet Ibrahim (Abraham)', 'Prophet Adam (AS)', 'Prophet Idris (Enoch)'],
    correctAnswerIndex: 2,
    explanation: 'Prophet Adam (peace be upon him) was created by Allah Almighty as the first human being and the first Prophet of Islam.'
  },
  {
    id: 'q4',
    category: 'Prayer',
    question: 'What is the shortest obligatory prayer in terms of Fard Rakats?',
    options: ['Maghrib', 'Fajr', 'Asr', 'Dhuhr'],
    correctAnswerIndex: 1,
    explanation: 'Fajr prayer consists of only 2 Fard Rakats, making it the shortest obligatory daily prayer.'
  },
  {
    id: 'q5',
    category: 'Islamic History',
    question: 'In which lunar year did the Hijrah (migration from Makkah to Madinah) take place?',
    options: ['610 CE', '622 CE', '630 CE', '632 CE'],
    correctAnswerIndex: 1,
    explanation: 'The Hijrah occurred in 622 CE and marks year 1 of the Islamic lunar calendar (AH), established under Caliph Umar ibn al-Khattab (RA).'
  },
  {
    id: 'q6',
    category: 'Hadith',
    question: 'Which companion narrated the most Hadiths from the Prophet Muhammad ﷺ?',
    options: ['Abu Hurairah (RA)', 'Abdullah ibn Umar (RA)', 'Anas ibn Malik (RA)', 'Aisha bint Abi Bakr (RA)'],
    correctAnswerIndex: 0,
    explanation: 'Abu Hurairah (RA) narrated over 5,300 Hadiths due to his devotion, memory, and constant company of the Prophet ﷺ.'
  },
  {
    id: 'q7',
    category: 'Quran',
    question: 'Which verse in the Quran is known as the greatest verse (Sayyidat Ay al-Quran)?',
    options: ['Ayat al-Kursi (2:255)', 'Ayat al-Nur (24:35)', 'Surah Al-Ikhlas (112:1)', 'Al-Fatihah (1:1)'],
    correctAnswerIndex: 0,
    explanation: 'Ayat al-Kursi (The Throne Verse, Surah Al-Baqarah 2:255) was explicitly identified by Prophet Muhammad ﷺ as the greatest verse in the Quran.'
  },
  {
    id: 'q8',
    category: 'Prayer',
    question: 'How many times do Muslims wash each limb during the Sunnah ablution (Wudu)?',
    options: ['1 time', '2 times', '3 times', '7 times'],
    correctAnswerIndex: 2,
    explanation: 'Washing the limbs 3 times is the established Sunnah of Prophet Muhammad ﷺ; washing once is the minimum obligatory requirement (Fard).'
  }
];
