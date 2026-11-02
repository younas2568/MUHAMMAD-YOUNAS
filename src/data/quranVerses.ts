import { Ayah, SurahDetail } from '../types';
import { ALL_114_SURAHS } from './quranMeta';

// Authentic built-in verses with verified Arabic, English, Urdu, Hindi, transliteration & tafsir
export const BUILTIN_SURAHS: Record<number, SurahDetail> = {
  1: {
    ...ALL_114_SURAHS[0],
    tafsirSummary: "Surah Al-Fatihah (The Opening) is the greatest Surah in the Holy Quran, referred to as Umm al-Kitab (Mother of the Book) and As-Sab' al-Mathani (The Seven Oft-Repeated Verses). It is a complete prayer comprising praise of Allah Almighty, acknowledgment of His sovereignty, declaration of servitude, and a plea for guidance upon the straight path.",
    verses: [
      {
        numberInSurah: 1,
        textArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliterationEn: "Bismillaahir-Rahmaanir-Raheem",
        translationEn: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        translationUr: "اللہ کے نام سے شروع جو نہایت مہربان بہت رحم والا ہے۔",
        translationHi: "अल्लाह के नाम से शुरू जो बड़ा मेहरबान, निहायत रहम वाला है।",
        tafsir: "The Basmalah begins every Surah except Surah At-Tawbah. It invokes the divine name Allah alongside His grand attributes of mercy (Ar-Rahman and Ar-Raheem)."
      },
      {
        numberInSurah: 2,
        textArabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliterationEn: "Alhamdu lillaahi Rabbil 'aalameen",
        translationEn: "[All] praise is [due] to Allah, Lord of the worlds.",
        translationUr: "سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔",
        translationHi: "सब तारीफ अल्लाह ही के लिए है जो सारे जहां का रब (पालने वाला) है।",
        tafsir: "Al-Hamd expresses universal praise, gratitude and glorification for Allah's countless blessings across physical and spiritual realms."
      },
      {
        numberInSurah: 3,
        textArabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        transliterationEn: "Ar-Rahmaanir-Raheem",
        translationEn: "The Entirely Merciful, the Especially Merciful.",
        translationUr: "بہت مہربان، نہایت رحم کرنے والا ہے۔",
        translationHi: "बड़ा मेहरबान, निहायत रहम करने वाला।",
        tafsir: "Ar-Rahman signifies all-encompassing mercy for every creature; Ar-Raheem denotes specific, enduring mercy bestowed upon the believers."
      },
      {
        numberInSurah: 4,
        textArabic: "مَالِكِ يَوْمِ الدِّينِ",
        transliterationEn: "Maaliki Yawmid-Deen",
        translationEn: "Sovereign of the Day of Recompense.",
        translationUr: "روزِ جزا کا مالک ہے۔",
        translationHi: "बदले के दिन (क़ियामत) का मालिक।",
        tafsir: "On the Day of Judgment, all worldly illusions of power disappear and absolute justice belongs exclusively to Allah."
      },
      {
        numberInSurah: 5,
        textArabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        transliterationEn: "Iyyaaka na'budu wa lyyaaka nasta'een",
        translationEn: "It is You we worship and You we ask for help.",
        translationUr: "ہم صرف تیری ہی عبادت کرتے ہیں اور صرف تجھ ہی سے مدد مانگتے ہیں۔",
        translationHi: "हम तेरी ही इबादत करते हैं और तुझ ही से मदद मांगते हैं।",
        tafsir: "The central covenant of Islam: pure monotheism (Tawhid). Worship is directed exclusively to Allah, and reliance is placed solely in Him."
      },
      {
        numberInSurah: 6,
        textArabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        transliterationEn: "Ihdinas-Siraatal-Mustaqeem",
        translationEn: "Guide us to the straight path.",
        translationUr: "ہمیں سیدھے راستے کی ہدایت فرما۔",
        translationHi: "हमें सीधे रास्ते की हिदायत दे।",
        tafsir: "The ultimate supplication: asking for unwavering guidance upon the authentic path of truth, righteous deeds, and divine pleasure."
      },
      {
        numberInSurah: 7,
        textArabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        transliterationEn: "Siraatal-lazeena an'amta 'alayhim ghayril-maghdoobi 'alayhim wa lad-daalleen",
        translationEn: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
        translationUr: "ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر غضب نازل ہوا اور نہ گمراہوں کا۔",
        translationHi: "उन लोगों का रास्ता जिन पर तूने इनाम किया, उनका नहीं जिन पर ग़ज़ब हुआ और न भटके हुओं का।",
        tafsir: "The path of the Prophets, truthful believers, martyrs, and righteous, avoiding rebellion against truth and ignorance."
      }
    ]
  },
  112: {
    ...ALL_114_SURAHS[111],
    tafsirSummary: "Surah Al-Ikhlas (The Sincerity) equates to one-third of the Quran in reward. It defines the absolute oneness, eternity, and singularity of Allah (Tawhid), refuting polytheism, anthropomorphism, and pantheism.",
    verses: [
      {
        numberInSurah: 1,
        textArabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        transliterationEn: "Qul Huwal-laahu Ahad",
        translationEn: "Say, 'He is Allah, [who is] One.'",
        translationUr: "فرما دیجیے: وہ اللہ ایک (ہی) ہے۔",
        translationHi: "कह दो कि वह अल्लाह एक है।",
        tafsir: "An affirmation of the unique, undivided Oneness of Allah who has no partner, equal, or associate."
      },
      {
        numberInSurah: 2,
        textArabic: "اللَّهُ الصَّمَدُ",
        transliterationEn: "Allaahus-Samad",
        translationEn: "Allah, the Eternal Refuge.",
        translationUr: "اللہ بے نیاز ہے (سب اس کے محتاج ہیں)۔",
        translationHi: "अल्लाह बेनियाज़ (सबका सहारा) है।",
        tafsir: "As-Samad is the Self-Sufficient Lord upon whom all creation depends for their needs, while He needs nothing from any creation."
      },
      {
        numberInSurah: 3,
        textArabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        transliterationEn: "Lam yalid wa lam yoolad",
        translationEn: "He neither begets nor is born,",
        translationUr: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی سے پیدا ہوا ہے۔",
        translationHi: "न उसकी कोई औलाद है और न वह किसी से पैदा हुआ।",
        tafsir: "Negates lineage, offspring, parentage, and physical origin, refuting polytheistic claims of sons/daughters of God."
      },
      {
        numberInSurah: 4,
        textArabic: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
        transliterationEn: "Wa lam yakul-lahoo kufuwan ahad",
        translationEn: "Nor is there to Him any equivalent.",
        translationUr: "اور نہ ہی کوئی اس کا ہمسر (برابر کا) ہے۔",
        translationHi: "और कोई उसके बराबर का नहीं है।",
        tafsir: "Nothing in existence resembles Allah in His Essence, Attributes, Power, or Actions."
      }
    ]
  },
  113: {
    ...ALL_114_SURAHS[112],
    tafsirSummary: "Surah Al-Falaq (The Daybreak) is a refuge prayer (Al-Mu'awwidhatan) taught by Prophet Muhammad ﷺ for protection against external evils: darkness, witchcraft, sorcery, and jealous envy.",
    verses: [
      {
        numberInSurah: 1,
        textArabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        transliterationEn: "Qul a'oozu bi Rabbil-falaq",
        translationEn: "Say, 'I seek refuge in the Lord of daybreak'",
        translationUr: "آپ کہئے کہ میں صبح کے رب کی پناہ مانگتا ہوں۔",
        translationHi: "कहो कि मैं सुबह के रब की पनाह मांगता हूँ।",
        tafsir: "Seeking protection from the Creator who cleaves dawn through the darkness of night."
      },
      {
        numberInSurah: 2,
        textArabic: "مِنْ شَرِّ مَا خَلَقَ",
        transliterationEn: "Min sharri maa khalaq",
        translationEn: "From the evil of that which He created",
        translationUr: "ہر اس چیز کی برائی سے جو اس نے پیدا فرمائی۔",
        translationHi: "उसकी हर पैदा की हुई चीज़ की बुराई से।",
        tafsir: "Protection against any harm arising from creatures, beasts, poison, or evil beings."
      },
      {
        numberInSurah: 3,
        textArabic: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        transliterationEn: "Wa min sharri ghaasiqin izaa waqab",
        translationEn: "And from the evil of darkness when it settles",
        translationUr: "اور اندھیری رات کی برائی سے جب وہ چھا جائے۔",
        translationHi: "और अंधेरी रात की बुराई से जब वह छा जाए।",
        tafsir: "Nightfall often facilitates harm, predatory dangers, and malevolent deeds."
      },
      {
        numberInSurah: 4,
        textArabic: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        transliterationEn: "Wa min sharrin-naffaasaati fil 'uqad",
        translationEn: "And from the evil of the blowers in knots",
        translationUr: "اور گرہوں پر پھونکنے والیوں (جادوگروں) کی برائی سے۔",
        translationHi: "और गिरहों में फूंकने वालों (जादूगरों) की बुराई से।",
        tafsir: "Protection from witchcraft, dark magic, and occult manipulation."
      },
      {
        numberInSurah: 5,
        textArabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliterationEn: "Wa min sharri haasidin izaa hasad",
        translationEn: "And from the evil of an envier when he envies.",
        translationUr: "اور حسد کرنے والے کی برائی سے جب وہ حسد کرے۔",
        translationHi: "और हसद करने वाले की बुराई से जब वह हसद (ईर्ष्या) करे।",
        tafsir: "Envy (hasad) seeks the removal of blessings from others; seeking Allah's shield prevents the evil eye (al-ayn)."
      }
    ]
  },
  114: {
    ...ALL_114_SURAHS[113],
    tafsirSummary: "Surah An-Nas (Mankind) shields the believer from internal whisperings and spiritual deception (waswas) coming from both unseen devils (Jinn) and human instigators.",
    verses: [
      {
        numberInSurah: 1,
        textArabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliterationEn: "Qul a'oozu bi Rabbin-naas",
        translationEn: "Say, 'I seek refuge in the Lord of mankind,'",
        translationUr: "آپ عرض کیجئے کہ میں سب انسانوں کے رب کی پناہ میں آتا ہوں۔",
        translationHi: "कहो कि मैं इंसानों के रब की पनाह में आता हूँ।",
        tafsir: "Invoking Allah as the Cherisher and Preserver of human beings."
      },
      {
        numberInSurah: 2,
        textArabic: "مَلِكِ النَّاسِ",
        transliterationEn: "Malikin-naas",
        translationEn: "The Sovereign of mankind,",
        translationUr: "سب انسانوں کے بادشاہ کی،",
        translationHi: "इंसानों के बादशाह की,",
        tafsir: "The true King who exercises ultimate authority and dominion over human affairs."
      },
      {
        numberInSurah: 3,
        textArabic: "إِلَٰهِ النَّاسِ",
        transliterationEn: "Ilaahin-naas",
        translationEn: "The God of mankind,",
        translationUr: "سب انسانوں کے معبود کی،",
        translationHi: "इंसानों के माबूद (पूज्य) की,",
        tafsir: "The only Deity worthy of devotion, trust, and worship."
      },
      {
        numberInSurah: 4,
        textArabic: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        transliterationEn: "Min sharril-waswaasil-khannaas",
        translationEn: "From the evil of the retreating whisperer -",
        translationUr: "وسوسہ ڈالنے والے (شیطان) کے شر سے جو پیچھے ہٹ جاتا ہے۔",
        translationHi: "उस वसवसा डालने वाले के शर से जो छुपकर वार करता है।",
        tafsir: "Al-Khannas: the whisperer who retreats and shrinks whenever the remembrance (Zikr) of Allah is invoked."
      },
      {
        numberInSurah: 5,
        textArabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        transliterationEn: "Allazee yuwaswisu fee sudoorin-naas",
        translationEn: "Who whispers into the breasts of mankind -",
        translationUr: "جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے،",
        translationHi: "जो लोगों के सीनों में वसवसा (संदेह व बुराई) डालता है,",
        tafsir: "Sowing doubts, evil impulses, despair, and temptation into hearts."
      },
      {
        numberInSurah: 6,
        textArabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        transliterationEn: "Minal-jinnati wan-naas",
        translationEn: "From among the jinn and mankind.",
        translationUr: "خواہ وہ جنات میں سے ہو یا انسانوں میں سے۔",
        translationHi: "ख्वाह वह जिन्नात में से हो या इंसानों में से।",
        tafsir: "Whispers may stem from demonic beings or corrupt human companions who encourage wrongdoing."
      }
    ]
  },
  67: {
    ...ALL_114_SURAHS[66],
    tafsirSummary: "Surah Al-Mulk (The Sovereignty / Tabarak) intercedes for its companion in the grave until forgiven, as reported in authentic Hadith. It reflects on the majesty of cosmic creation, life and death as a test, and divine omnipotence.",
    verses: [
      {
        numberInSurah: 1,
        textArabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        transliterationEn: "Tabaarakal-lazee biyadihil-mulku wa Huwa 'alaa kulli shay'in Qadeer",
        translationEn: "Blessed is He in whose hand is dominion, and He is over all things competent -",
        translationUr: "بڑی برکت والا ہے وہ ذات جس کے ہاتھ میں ساری بادشاہی ہے اور وہ ہر چیز پر قادر ہے۔",
        translationHi: "बड़ी बरकत वाला है वह जिसके हाथ में सारी हुकूमत है और वह हर चीज़ पर क़ादिर है।",
        tafsir: "Exaltation of Allah whose kingdom encompasses the heavens and earth, possessing boundless power."
      },
      {
        numberInSurah: 2,
        textArabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ",
        transliterationEn: "Allazee khalaqal-mawta wal-hayaata liyabluwakum ayyukum ahsanu 'amalaa; wa Huwal-'Azeezul-Ghafoor",
        translationEn: "[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -",
        translationUr: "جس نے موت اور زندگی کو پیدا کیا تاکہ تمہیں آزمائے کہ تم میں سے عمل کے لحاظ سے کون سب سے اچھا ہے، اور وہ زبردست بخشنے والا ہے۔",
        translationHi: "जिसने मौत और ज़िन्दगी को पैदा किया ताकि तुम्हें आज़माए कि तुममें से अमल के एतबार से कौन सबसे बेहतर है।",
        tafsir: "The purpose of earthly existence: not mere accumulation of years or wealth, but excellence of conduct (Ihsan) and sincerity for Allah."
      },
      {
        numberInSurah: 3,
        textArabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ",
        transliterationEn: "Allazee khalaqa sab'a samaawaatin tibaaqan maa taraa fee khalqir-Rahmaani min tafaawutin farji'il-basara hal taraa min futoor",
        translationEn: "[And] who created seven heavens in layers. You see no flaw in the creation of the Most Merciful. So turn your vision again; do you see any break?",
        translationUr: "جس نے سات آسمان اوپر تلے پیدا کیے۔ تم رحمان کی تخلیق میں کوئی نقص نہیں دیکھو گے۔ نگاہ دوبارہ اٹھا کر دیکھو، کیا تمہیں کوئی شگاف نظر آتا ہے؟",
        translationHi: "जिसने तह-दर-तह सात आसमान बनाए। तुम रहमान की पैदाइश में कोई ख़ामी न पाओगे। नज़र दौड़ा कर देखो, क्या कोई दरार दिखती है?",
        tafsir: "Flawless cosmic architecture reflecting supreme intelligence, balance, and intentional design."
      },
      {
        numberInSurah: 4,
        textArabic: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ",
        transliterationEn: "Summarji'il-basara karratayni yanqalib ilaykal-basaru khaasi'anw wa huwa haseer",
        translationEn: "Then return your vision twice again. Your vision will return to you humbled while it is fatigued.",
        translationUr: "پھر دوبارہ نگاہ کرو، نگاہ عاجز اور تھک کر تمہاری طرف پلٹ آئے گی۔",
        translationHi: "फिर बार-बार नज़र दौड़ाओ, तुम्हारी नज़र थकी-हारी होकर बे-बस वापस लौट आएगी।",
        tafsir: "Human faculties reach exhaustion admiring the perfection and harmony of the universe without discovering a single defect."
      },
      {
        numberInSurah: 5,
        textArabic: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ",
        transliterationEn: "Wa laqad zayyannas-samaaa'ad-dunyaa bimasaabeeha wa ja'alnaahaa rujoomal lish-shayaateeni wa a'tadnaa lahum 'azaabas-sa'eer",
        translationEn: "And We have certainly beautified the nearest heaven with lamps and have made [from] them what is thrown at the devils and have prepared for them the punishment of the Blaze.",
        translationUr: "اور بیشک ہم نے قریب ترین آسمان کو چراغوں (ستاروں) سے آراستہ کیا اور انہیں شیطانوں کو مار بھگانے کا ذریعہ بنایا اور ان کے لیے دہکتی آگ کا عذاب تیار کر رکھا ہے۔",
        translationHi: "और हमने सबसे करीबी आसमान को चिराग़ों (सितारों) से सजाया और उन्हें शैतानों को भगाने का ज़रिया बनाया।",
        tafsir: "Stars serve as cosmic ornament, celestial beacons for navigation, and shields against evil eavesdropping."
      }
    ]
  },
  103: {
    ...ALL_114_SURAHS[102],
    tafsirSummary: "Surah Al-'Asr (The Declining Day) is one of the shortest yet most profound chapters. Imam Ash-Shafi'i noted: 'If humanity contemplated this Surah alone, it would suffice them.' It provides the blueprint for salvation from spiritual ruin.",
    verses: [
      {
        numberInSurah: 1,
        textArabic: "وَالْعَصْرِ",
        transliterationEn: "Wal-'Asr",
        translationEn: "By time,",
        translationUr: "زمانے کی قسم!",
        translationHi: "ज़माने (वक़्त) की क़सम!",
        tafsir: "Allah swears by passing time, human history, and the fleeting nature of life."
      },
      {
        numberInSurah: 2,
        textArabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
        transliterationEn: "Innal-insaana lafee khusr",
        translationEn: "Indeed, mankind is in loss,",
        translationUr: "بیشک تمام انسان بڑے خسارے میں ہیں،",
        translationHi: "बेशक इंसान बड़े घाटे में है,",
        tafsir: "Every passing second depletes one's life capital toward eventual death."
      },
      {
        numberInSurah: 3,
        textArabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
        transliterationEn: "Illal-lazeena aamanoo wa 'amilus-saalihaati wa tawaasaw bil-haqqi wa tawaasaw bis-sabr",
        translationEn: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
        translationUr: "سوائے ان لوگوں کے جو ایمان لائے اور نیک اعمال کیے اور ایک دوسرے کو حق کی نصیحت کی اور صبر کی تلقین کی۔",
        translationHi: "सिवाय उन लोगों के जो ईमान लाए, नेक काम किए, और एक दूसरे को हक़ और सब्र की ताकीद करते रहे।",
        tafsir: "Four essential pillars for salvation: (1) Sound faith, (2) Righteous conduct, (3) Exhorting toward truth, and (4) Mutual perseverance upon patience."
      }
    ]
  },
  108: {
    ...ALL_114_SURAHS[107],
    tafsirSummary: "Surah Al-Kawthar (The Abundance) was revealed to comfort the Holy Prophet ﷺ when adversaries taunted him after the passing of his infant son. Allah promised him limitless abundance in this world and the eternal reservoir (Al-Kawthar) in Paradise.",
    verses: [
      {
        numberInSurah: 1,
        textArabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        transliterationEn: "Innaaa a'taynaakal-Kawthar",
        translationEn: "Indeed, We have granted you, [O Muhammad], al-Kawthar.",
        translationUr: "بیشک ہم نے آپ کو کوثر (بے انتہا بھلائی) عطا فرمائی ہے۔",
        translationHi: "बेशक हमने आपको कौसर (बेपनाह भलाई व हौज़) अता किया।",
        tafsir: "Al-Kawthar denotes immense goodness in this life and the celestial spring in Jannah from which the Ummah will drink."
      },
      {
        numberInSurah: 2,
        textArabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
        transliterationEn: "Fasalli li Rabbika wanhar",
        translationEn: "So pray to your Lord and sacrifice [to Him alone].",
        translationUr: "پس آپ اپنے رب کے لیے نماز پڑھیں اور قربانی کریں۔",
        translationHi: "लिहाज़ा अपने रब के लिए नमाज़ पढ़ो और क़ुरबानी करो।",
        tafsir: "Dedicate all prayer and sacrifice exclusively to Allah, contrasting with pagan practices."
      },
      {
        numberInSurah: 3,
        textArabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
        transliterationEn: "Inna shaani'aka huwal-abtar",
        translationEn: "Indeed, your enemy is the one cut off.",
        translationUr: "بیشک آپ کا دشمن ہی بے نام و نشان رہے گا۔",
        translationHi: "यक़ीनन आपका दुश्मन ही बे-नाम व निशान रहेगा।",
        tafsir: "Those who harbored hostility toward the Prophet ﷺ were cut off from remembrance, while the Prophet's legacy illuminates all generations."
      }
    ]
  }
};

// Helper function to get audio URL for reciter Mishary Rashid Alafasy
export function getSurahAudioUrl(surahNumber: number): string {
  // CDN for Mishary Rashid Alafasy surah recitations
  const padded = surahNumber.toString().padStart(3, '0');
  return `https://server8.mp3quran.net/afs/${padded}.mp3`;
}

export function getAyahAudioUrl(surahNumber: number, ayahNumber: number): string {
  // EveryAyah Mishary Rashid Alafasy verse CDN
  const s = surahNumber.toString().padStart(3, '0');
  const a = ayahNumber.toString().padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
}
