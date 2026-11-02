import { NamazStep, PrayerTypeInfo } from '../types';

export const PRAYERS_INFO: PrayerTypeInfo[] = [
  {
    id: 'fajr',
    nameEn: 'Fajr',
    nameUr: 'فجر',
    nameAr: 'الفجر',
    timing: 'From dawn (true morning) until just before sunrise',
    totalRakats: 4,
    breakdown: {
      sunnahMuakkadah: 2,
      fard: 2,
    },
    description: 'The early morning prayer. The 2 Sunnah before Fajr hold immense virtue, described by the Prophet ﷺ as "better than the world and all that is in it" (Sahih Muslim).',
    importance: 'Guarantees protection under Allah’s care throughout the day and acts as a shield against hypocrisy.'
  },
  {
    id: 'dhuhr',
    nameEn: 'Dhuhr',
    nameUr: 'ظہر',
    nameAr: 'الظهر',
    timing: 'Begins after the sun passes its zenith (zawal) until an object’s shadow equals its length (or twice its length in Hanafi fiqh)',
    totalRakats: 12,
    breakdown: {
      sunnahMuakkadah: 4,
      fard: 4,
      sunnahMuakkadahAfter: 2,
      nafl: 2,
    } as any,
    description: 'The midday prayer. Prayed when the gates of heaven are opened and righteous deeds ascend.',
    importance: 'Brings immense tranquility during the hustle of the midday workday.'
  },
  {
    id: 'asr',
    nameEn: 'Asr',
    nameUr: 'عصر',
    nameAr: 'العصر',
    timing: 'From late afternoon when the shadow equals or doubles an object’s height until sunset',
    totalRakats: 8,
    breakdown: {
      sunnahGhairMuakkadah: 4,
      fard: 4,
    },
    description: 'The middle prayer (As-Salat al-Wusta) specifically emphasized in Surah Al-Baqarah (2:238). Missing Asr invalidates deeds of the day (Sahih Bukhari).',
    importance: 'The changing of the guardian angels takes place during Asr and Fajr.'
  },
  {
    id: 'maghrib',
    nameEn: 'Maghrib',
    nameUr: 'مغرب',
    nameAr: 'المغرب',
    timing: 'Begins immediately after complete sunset until the red twilight disappears',
    totalRakats: 7,
    breakdown: {
      fard: 3,
      sunnahMuakkadah: 2,
      nafl: 2,
    },
    description: 'The sunset prayer. Must be performed promptly after sunset without unnecessary delay.',
    importance: 'Marks the transition to night and breaking of the fast during Ramadan.'
  },
  {
    id: 'isha',
    nameEn: 'Isha',
    nameUr: 'عشاء',
    nameAr: 'العشاء',
    timing: 'From the disappearance of twilight until the middle of the night (or dawn in necessity)',
    totalRakats: 17,
    breakdown: {
      sunnahGhairMuakkadah: 4,
      fard: 4,
      sunnahMuakkadah: 2,
      nafl: 2,
      witr: 3,
      naflAfter: 2,
    } as any,
    description: 'The night prayer concluding with Witr. Performing Isha in congregation earns the reward of praying half the night.',
    importance: 'Provides spiritual solace before sleeping and seals the day with repentance.'
  },
  {
    id: 'jumuah',
    nameEn: 'Jumu\'ah (Friday)',
    nameUr: 'جمعۃ المبارک',
    nameAr: 'الجمعة',
    timing: 'Replaces Dhuhr prayer on Fridays for men in congregation preceded by two Khutbahs',
    totalRakats: 14,
    breakdown: {
      sunnahMuakkadah: 4,
      fard: 2,
      sunnahMuakkadahAfter: 4,
      nafl: 2,
      witr: 0
    } as any,
    description: 'The weekly congregational obligation on the best day upon which the sun rises.',
    importance: 'Expiation for sins committed between one Friday and the next when major sins are avoided.'
  },
  {
    id: 'tahajjud',
    nameEn: 'Tahajjud (Qiyam al-Layl)',
    nameUr: 'تہجد',
    nameAr: 'التهجد',
    timing: 'The last third of the night before Fajr after awakening from sleep',
    totalRakats: 8,
    breakdown: {
      fard: 0,
      nafl: 8,
    },
    description: 'The voluntary night vigil practiced faithfully by the Prophet ﷺ. The best prayer after obligatory prayers.',
    importance: 'The time when Allah descends to the lowest heaven asking: "Who is calling upon Me, that I may answer him?"'
  },
  {
    id: 'janazah',
    nameEn: 'Salat al-Janazah (Funeral Prayer)',
    nameUr: 'نمازِ جنازہ',
    nameAr: 'صلاة الجنازة',
    timing: 'Performed in standing (no Ruku or Sujood) over a deceased Muslim (Fard Kifayah)',
    totalRakats: 1,
    breakdown: {
      fard: 4, // 4 Takbeers
    },
    description: 'Consists of 4 Takbeers while standing: 1st Takbeer (Fatiha/Sana), 2nd (Durood), 3rd (Dua for Deceased), 4th (Salam).',
    importance: 'Intercedes for the deceased and earns the reward of a Qirat (mountain of Uhud in good deeds).'
  }
];

export const STEP_BY_STEP_PRAYER: NamazStep[] = [
  {
    id: 'niyyah',
    stepNumber: 1,
    titleEn: 'Niyyah (Intention) & Standing (Qiyam)',
    titleUr: 'نیت اور قیام',
    arabicName: 'النية والقيام',
    postureDescription: 'Stand facing the Qiblah (Kaaba) with feet shoulder-width apart, looking respectfully down at the spot where your forehead will touch the ground.',
    postureIcon: 'standing',
    arabicText: 'نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَىٰ رَكَعَاتِ صَلَاةِ...',
    transliterationEn: 'Nawaytu an usalliya lillaahi ta\'aalaa...',
    translationEn: 'I intend to pray for the sake of Allah Almighty [specify prayer, e.g., 2 Rakats Fard of Fajr] facing the Holy Kaaba.',
    translationUr: 'میں اللہ تعالیٰ کی رضا کے لیے قبلہ رخ ہو کر نماز پڑھنے کی نیت کرتا ہوں۔',
    juridicalNote: 'Intention is made sincerely in the heart; uttering it softly with the tongue is recommended in Hanafi fiqh for focus.'
  },
  {
    id: 'takbeer_tahreemah',
    stepNumber: 2,
    titleEn: 'Takbeer al-Tahrimah (Opening Takbeer)',
    titleUr: 'تکبیر تحریمہ',
    arabicName: 'تكبيرة الإحرام',
    postureDescription: 'Raise both hands up to earlobes (men) or shoulder level (women), palms facing outward toward the Qiblah, fingers naturally apart, while proclaiming Allahu Akbar.',
    postureIcon: 'takbeer',
    arabicText: 'اللَّهُ أَكْبَرُ',
    transliterationEn: 'Allaahu Akbar',
    translationEn: 'Allah is the Greatest.',
    translationUr: 'اللہ سب سے بڑا ہے۔',
    audioVoiceText: 'Allahu Akbar'
  },
  {
    id: 'qiyam_folding',
    stepNumber: 3,
    titleEn: 'Folding Hands & Sana (Opening Supplication)',
    titleUr: 'ہاتھ باندھنا اور ثناء',
    arabicName: 'وضع اليدين ودعاء الاستفتاح',
    postureDescription: 'Place the right hand over the left wrist. Men rest hands below the navel (Hanafi) or upon the chest (Shafi\'i/Hanbali); women place hands upon the chest. Recite Sana softly.',
    postureIcon: 'folded_standing',
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ',
    transliterationEn: 'Subhaanaka Allaahumma wa bihamdika wa tabaarakasmuka wa ta\'aalaa jadduka wa laa ilaaha ghayruk',
    translationEn: 'Glory be to You, O Allah, and all praise is Yours, blessed is Your Name, exalted is Your Majesty, and there is no deity worthy of worship besides You.',
    translationUr: 'اے اللہ! تو پاک ہے اور تیری ہی حمد ہے، اور تیرا نام برکت والا ہے، اور تیری عظمت بلند ہے، اور تیرے سوا کوئی معبود نہیں۔',
    audioVoiceText: 'Subhaanaka Allaahumma wa bihamdika wa tabaarakasmuka wa ta\'aalaa jadduka wa laa ilaaha ghayruk'
  },
  {
    id: 'taawwudh_fatiha',
    stepNumber: 4,
    titleEn: 'Ta\'awwudh, Tasmiyah & Surah Al-Fatihah',
    titleUr: 'تعوذ، تسمیہ اور سورۃ الفاتحہ',
    arabicName: 'التعوذ والبسملة وقراءة الفاتحة',
    postureDescription: 'Seek refuge from Shaytan, recite Bismillah, then recite Surah Al-Fatihah followed by "Ameen", and then recite another Surah or at least 3 verses.',
    postureIcon: 'reciting',
    arabicText: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ • بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...',
    transliterationEn: 'A\'oozu billaahi minash-shaytaanir-rajeem. Bismillaahir-Rahmaanir-Raheem. Alhamdu lillaahi Rabbil \'aalameen...',
    translationEn: 'I seek refuge in Allah from the accursed Satan. In the name of Allah, the Most Gracious, Most Merciful. All praise is due to Allah, Lord of the worlds...',
    translationUr: 'میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں۔ اللہ کے نام سے شروع جو بڑا مہربان نہایت رحم والا ہے۔ تمام تعریفیں اللہ ہی کے لیے ہیں...',
  },
  {
    id: 'ruku',
    stepNumber: 5,
    titleEn: 'Ruku (Bowing Down)',
    titleUr: 'رکوع',
    arabicName: 'الركوع',
    postureDescription: 'Say "Allahu Akbar" and bow down, grasping your knees with spread fingers, keeping your back and head in a straight horizontal line. Recite the Tasbeeh at least 3 times.',
    postureIcon: 'bowing',
    arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliterationEn: 'Subhaana Rabbiyal-\'Azeem (x3)',
    translationEn: 'Glory be to my Lord, the Almighty (recited 3 times).',
    translationUr: 'پاک ہے میرا رب جو بڑی عظمت والا ہے (3 مرتبہ)۔',
    repetitionCount: 3,
    audioVoiceText: 'Subhaana Rabbiyal Azeem'
  },
  {
    id: 'qawmah',
    stepNumber: 6,
    titleEn: 'Qawmah (Standing Up Straight from Bowing)',
    titleUr: 'قومہ (رکوع سے سیدھا کھڑا ہونا)',
    arabicName: 'القومة بعد الركوع',
    postureDescription: 'Rise upright from bowing while lifting hands to ears (or sides) reciting Tasmee\', then praise Allah in full erect posture.',
    postureIcon: 'standing',
    arabicText: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
    transliterationEn: 'Sami\' Allaahu liman hamidah. Rabbanaa lakal-hamd, hamdan kaseeran tayyiban mubaarakan feeh',
    translationEn: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise, abundant, pure, and blessed praise.',
    translationUr: 'اللہ نے اس کی سن لی جس نے اس کی تعریف کی۔ اے ہمارے رب! تیرے ہی لیے تمام تعریفیں ہیں، بہت زیادہ، پاکیزہ اور برکت والی تعریف۔',
    audioVoiceText: 'Sami Allahu liman hamidah. Rabbana lakal hamd'
  },
  {
    id: 'sujood',
    stepNumber: 7,
    titleEn: 'Sujood (First Prostration)',
    titleUr: 'سجدہ اول',
    arabicName: 'السجود',
    postureDescription: 'Proclaim "Allahu Akbar" and go down into Sujood: knees touch ground first, then hands, then nose and forehead. Ensure 7 bodily points touch ground firmly. Recite Tasbeeh 3 times.',
    postureIcon: 'prostration',
    arabicText: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
    transliterationEn: 'Subhaana Rabbiyal-A\'laa (x3)',
    translationEn: 'Glory be to my Lord, the Most High (recited 3 times).',
    translationUr: 'پاک ہے میرا رب جو سب سے بلند و بالا ہے (3 مرتبہ)۔',
    repetitionCount: 3,
    audioVoiceText: 'Subhaana Rabbiyal A\'laa'
  },
  {
    id: 'jalsah',
    stepNumber: 8,
    titleEn: 'Jalsah (Sitting between the Two Prostrations)',
    titleUr: 'جلسہ (دو سجدوں کے درمیان بیٹھنا)',
    arabicName: 'الجلسة بين السجدتين',
    postureDescription: 'Say "Allahu Akbar" and rise to sit peacefully upon your left foot with the right foot upright, hands resting on thighs near knees. Pause calmly and supplicate.',
    postureIcon: 'sitting',
    arabicText: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَارْزُقْنِي، وَعَافِنِي',
    transliterationEn: 'Rabbighfir lee, Rabbighfir lee, warhamnee, wahdinee, warzuqnee, wa \'aafinee',
    translationEn: 'O my Lord, forgive me, O my Lord forgive me, have mercy on me, guide me, provide for me, and grant me well-being.',
    translationUr: 'اے میرے رب! مجھے بخش دے، اے میرے رب مجھے بخش دے، مجھ پر رحم فرما، مجھے ہدایت دے، مجھے رزق عطا فرما اور مجھے عافیت بخش۔',
    audioVoiceText: 'Rabbighfir lee warhamnee'
  },
  {
    id: 'sujood_second',
    stepNumber: 9,
    titleEn: 'Second Sujood & Rising for Next Rakat',
    titleUr: 'سجدہ دوم اور اگلی رکعت',
    arabicName: 'السجدة الثانية',
    postureDescription: 'Say "Allahu Akbar" and perform the second prostration identically with full humility, reciting the Tasbeeh 3 times. This completes 1 full Rakat. Rise for the 2nd Rakat.',
    postureIcon: 'prostration',
    arabicText: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
    transliterationEn: 'Subhaana Rabbiyal-A\'laa (x3)',
    translationEn: 'Glory be to my Lord, the Most High.',
    translationUr: 'پاک ہے میرا رب جو سب سے بلند و بالا ہے۔',
    repetitionCount: 3
  },
  {
    id: 'tashahhud',
    stepNumber: 10,
    titleEn: 'Qa\'dah (Sitting) & Tashahhud (Attahiyyat)',
    titleUr: 'قعدہ اور تشہد (التحیات)',
    arabicName: 'التشهد',
    postureDescription: 'In the 2nd or final Rakat, sit upright in Qa\'dah. Recite Attahiyyat. When uttering "Ashhadu alla ilaha", raise the index finger of the right hand testifying to Tawheed and lower it on "illallah".',
    postureIcon: 'tashahhud_finger',
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliterationEn: 'At-tahiyyaatu lillaahi was-salawaatu wat-tayyibaat. As-salaamu \'alayka ayyuhan-Nabiyyu wa rahmatullaahi wa barakaatuh. As-salaamu \'alaynaa wa \'alaa \'ibaadillaahis-saaliheen. Ash-hadu allaa ilaaha illallaahu wa ash-hadu anna Muhammadan \'abduhoo wa Rasooluh',
    translationEn: 'All compliments, prayers, and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is His servant and His Messenger.',
    translationUr: 'تمام قولی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ اے نبی! آپ پر سلام اور اللہ کی رحمت اور اس کی برکتیں ہوں۔ ہم پر اور اللہ کے نیک بندوں پر سلام ہو۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور میں گواہی دیتا ہوں کہ محمد (ﷺ) اس کے بندے اور اس کے رسول ہیں۔',
    audioVoiceText: 'At-tahiyyaatu lillaahi was-salawaatu wat-tayyibaat. As-salaamu alayka ayyuhan Nabiyyu wa rahmatullaahi wa barakaatuh'
  },
  {
    id: 'durood_ibrahim',
    stepNumber: 11,
    titleEn: 'Durood Ibrahim (Salawat upon the Prophet ﷺ)',
    titleUr: 'درودِ ابراہیمی',
    arabicName: 'الصلاة الإبراهيمية',
    postureDescription: 'Recited in the final sitting (Qa\'dah Akhirah) following Tashahhud. It is the most authentic, blessed benediction taught directly by the Holy Prophet ﷺ.',
    postureIcon: 'sitting',
    arabicText: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ • اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliterationEn: 'Allaahumma salli \'alaa Muhammadin wa \'alaa aali Muhammadin kamaa sallayta \'alaa Ibraaheema wa \'alaa aali Ibraaheema innaka Hameedum Majeed. Allaahumma baarik \'alaa Muhammadin wa \'alaa aali Muhammadin kamaa baarakta \'alaa Ibraaheema wa \'alaa aali Ibraaheema innaka Hameedum Majeed',
    translationEn: 'O Allah, bestow Your grace upon Muhammad and the family of Muhammad, as You bestowed Your grace upon Abraham and the family of Abraham, indeed You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Abraham and the family of Abraham, indeed You are Praiseworthy, Glorious.',
    translationUr: 'اے اللہ! رحمت نازل فرما محمد (ﷺ) پر اور آلِ محمد پر جیسا کہ تو نے رحمت نازل فرمائی ابراہیم (علیہ السلام) پر اور آلِ ابراہیم پر، بیشک تو تعریف کے لائق بڑی بزرگی والا ہے۔ اے اللہ! برکت نازل فرما محمد (ﷺ) پر اور آلِ محمد پر جیسا کہ تو نے برکت نازل فرمائی ابراہیم (علیہ السلام) پر اور آلِ ابراہیم پر، بیشک تو تعریف کے لائق بڑی بزرگی والا ہے۔',
    audioVoiceText: 'Allaahumma salli alaa Muhammadin wa alaa aali Muhammad'
  },
  {
    id: 'dua_masura',
    stepNumber: 12,
    titleEn: 'Dua Masoora (Supplication before Salam)',
    titleUr: 'دعائے ماثورہ',
    arabicName: 'الدعاء المأثور',
    postureDescription: 'Supplicate earnestly before concluding the prayer with Salam using the prophetic words taught to Abu Bakr As-Siddiq (RA).',
    postureIcon: 'sitting',
    arabicText: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
    transliterationEn: 'Allaahumma innee zalamtu nafsee zulman kaseeran wa laa yaghfiruz-zunooba illaa Anta faghfir lee maghfiratan min \'indika warhamnee innaka Antal-Ghafoorur-Raheem',
    translationEn: 'O Allah, I have wronged myself greatly, and no one forgives sins except You, so grant me forgiveness from You and have mercy on me. Indeed, You are the Forgiving, the Merciful.',
    translationUr: 'اے اللہ! میں نے اپنی جان پر بہت بڑا ظلم کیا اور تیرے سوا گناہوں کو کوئی نہیں بخش سکتا، پس تو اپنے پاس سے میری خصوصی مغفرت فرما اور مجھ پر رحم فرما، بیشک تو ہی بخشنے والا نہایت رحم فرمانے والا ہے۔',
    audioVoiceText: 'Allaahumma innee zalamtu nafsee zulman kaseeraa'
  },
  {
    id: 'tasleem',
    stepNumber: 13,
    titleEn: 'Tasleem (Concluding Salam to Right and Left)',
    titleUr: 'سلام پھیرنا',
    arabicName: 'التسليم',
    postureDescription: 'Turn your head gently to the right shoulder greeting the angels and congregation, saying "As-Salaamu \'Alaykum wa Rahmatullah", then turn your head to the left shoulder repeating the same.',
    postureIcon: 'turning_head',
    arabicText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliterationEn: 'As-Salaamu \'Alaykum wa Rahmatullaah',
    translationEn: 'May the peace and mercy of Allah be upon you.',
    translationUr: 'تم پر اللہ کی سلامتی اور اس کی رحمت ہو۔',
    audioVoiceText: 'As-Salaamu alaykum wa Rahmatullah'
  },
  {
    id: 'dua_qunoot',
    stepNumber: 14,
    titleEn: 'Dua-e-Qunoot (For Witr Prayer)',
    titleUr: 'دعائے قنوت (نمازِ وتر)',
    arabicName: 'دعاء القنوت في صلاة الوتر',
    postureDescription: 'Recited in the 3rd Rakat of Witr prayer before going into Ruku (Hanafi) or after rising from Ruku (Shafi\'i/Hanbali) with hands raised.',
    postureIcon: 'dua_standing',
    arabicText: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ وَنَشْكُرُكَ وَلَا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ • اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ وَإِلَيْكَ نَسْعَىٰ وَنَحْفِدُ وَنَرْجُو رَحْمَتَكَ وَنَخْشَىٰ عَذَابَكَ إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحَقٌ',
    transliterationEn: 'Allaahumma innaa nasta\'eenuka wa nastaghfiruka wa nu\'minu bika wa natawakkalu \'alayka wa nusnee \'alaykal-khayra wa nashkuruka wa laa nakfuruka wa nakhla\'u wa natruku may-yafjuruk. Allaahumma iyyaaka na\'budu wa laka nusallee wa nasjudu wa ilayka nas\'aa wa nahfidu wa narjoo rahmataka wa nakhshaa \'azaabaka inna \'azaabaka bil-kuffaari mulhaq',
    translationEn: 'O Allah! We seek Your assistance, we seek Your forgiveness, we believe in You, we place our trust in You, we praise You in the best manner, we thank You, we are not ungrateful to You, and we forsake and abandon anyone who disobeys You. O Allah! You alone do we worship, to You we pray and prostrate, toward You we strive and hurry, we hope for Your mercy and fear Your punishment. Surely Your punishment overtakes the disbelievers.',
    translationUr: 'اے اللہ! ہم تجھ ہی سے مدد چاہتے ہیں اور تجھ ہی سے معافی مانگتے ہیں اور تجھ پر ایمان لاتے ہیں اور تجھ پر بھروسہ کرتے ہیں اور تیری بہت اچھی تعریف کرتے ہیں اور تیرا شکر ادا کرتے ہیں اور تیری ناشکری نہیں کرتے اور ہم الگ کرتے ہیں اور چھوڑتے ہیں اس شخص کو جو تیری نافرمانی کرے۔ اے اللہ! ہم تیری ہی عبادت کرتے ہیں اور تیرے ہی لیے نماز پڑھتے اور سجدہ کرتے ہیں اور تیری ہی طرف دوڑتے اور خدمت کے لیے حاضر ہوتے ہیں اور تیری رحمت کے امیدوار ہیں اور تیرے عذاب سے ڈرتے ہیں، بیشک تیرا عذاب کافروں کو پہنچنے والا ہے۔',
    audioVoiceText: 'Allaahumma innaa nasta\'eenuka wa nastaghfiruk'
  }
];

export const WUDU_GUIDE = {
  fardSteps: [
    { number: 1, title: 'Washing the Face', desc: 'Wash the entire face once from hairline to under the chin, and from earlobe to earlobe.' },
    { number: 2, title: 'Washing Both Arms', desc: 'Wash both arms including the elbows, right arm first then left arm.' },
    { number: 3, title: 'Masah (Wiping) of the Head', desc: 'Wipe at least one quarter (Hanafi) or the whole head (Maliki/Hanbali) with wet hands.' },
    { number: 4, title: 'Washing Both Feet', desc: 'Wash both feet including the ankles thoroughly, right foot first then left foot.' }
  ],
  sunnahSteps: [
    { number: 1, title: 'Niyyah & Bismillah', desc: 'Make sincere intention and say "Bismillah-ir-Rahman-ir-Raheem".' },
    { number: 2, title: 'Washing Hands to Wrists', desc: 'Wash hands up to the wrists three times, rubbing between fingers.' },
    { number: 3, title: 'Miswak / Toothstick', desc: 'Clean teeth with miswak or finger to purify the mouth for recitation.' },
    { number: 4, title: 'Rinsing the Mouth (Madmadah)', desc: 'Rinse mouth thoroughly 3 times, gargling if not fasting.' },
    { number: 5, title: 'Sniffing Water into Nose (Istinshaq)', desc: 'Gently sniff water into nostrils with right hand and blow out with left hand 3 times.' },
    { number: 6, title: 'Washing Face Three Times', desc: 'Wash the face three times, running wet fingers through beard (Khilal).' },
    { number: 7, title: 'Washing Arms Three Times', desc: 'Wash arms from fingertips to elbows three times, starting with right.' },
    { number: 8, title: 'Complete Head Masah', desc: 'Wipe entire head from forehead back to nape and return to front.' },
    { number: 9, title: 'Wiping Ears & Neck', desc: 'Wipe inside of ears with index fingers and back of ears with thumbs.' },
    { number: 10, title: 'Washing Feet Three Times', desc: 'Wash feet 3 times up to ankles, cleaning between toes with left pinky finger.' }
  ],
  nullifiers: [
    'Anything discharged from private parts (urine, stool, gas, semen, pre-seminal fluid).',
    'Flow of blood or pus from body that exits its wound boundary (Hanafi) or vomiting a mouthful.',
    'Deep sleep where awareness is completely lost (lying down or leaning).',
    'Loss of consciousness, fainting, intoxication, or severe delirium.',
    'Laughter out loud in prayer that involves Ruku and Sujood (Hanafi).'
  ],
  wuduDua: {
    arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ • اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration: 'Ash-hadu allaa ilaaha illallaahu wahdahoo laa shareeka lahoo wa ash-hadu anna Muhammadan \'abduhoo wa Rasooluh. Allaahummaj\'alnee minat-tawwaabeena waj\'alnee minal-mutatahhireen',
    translationEn: 'I bear witness that there is no deity except Allah alone without partner, and Muhammad is His servant and Messenger. O Allah, make me of those who constantly repent and make me of those who keep themselves pure.',
    translationUr: 'میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں اور محمد (ﷺ) اس کے بندے اور رسول ہیں۔ اے اللہ! مجھے توبہ کرنے والوں میں شامل فرما اور مجھے پاک صاف رہنے والوں میں بنا۔'
  }
};

export const GHUSL_GUIDE = {
  fardSteps: [
    { number: 1, title: 'Rinsing the Mouth thoroughly', desc: 'Gargle water reaching the entire mouth and throat cavity.' },
    { number: 2, title: 'Rinsing the Nostrils thoroughly', desc: 'Sniff water up to the soft bone of the nose.' },
    { number: 3, title: 'Washing the Entire Body', desc: 'Ensure water reaches every single strand of hair, root, and skin surface without leaving a hair\'s breadth dry.' }
  ],
  sunnahMethod: [
    '1. Formulate sincere intention (Niyyah) in heart to cleanse ritual impurity.',
    '2. Wash hands up to wrists three times.',
    '3. Wash private parts and remove any bodily impurities.',
    '4. Perform complete Wudu as for prayer (feet may be washed at end if standing in puddle).',
    '5. Pour water over head 3 times, rubbing scalp so water reaches hair roots.',
    '6. Pour water over right side of entire body, then left side, rubbing with hands.',
    '7. Step away from washing area and wash both feet.'
  ]
};
