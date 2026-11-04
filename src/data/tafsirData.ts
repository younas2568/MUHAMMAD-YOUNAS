export interface SurahTafsirOverview {
  surahNumber: number;
  nameArabic: string;
  transliteration: string;
  revelationType: 'Meccan' | 'Medinan';
  totalVerses: number;
  
  // Urdu Tafsir Overview
  urdu: {
    title: string;
    tafsirSource: string; // e.g. "تفسیر ابن کثیر و معارف القرآن"
    shanENuzul: string; // شان نزول و تاریخی پس منظر
    keyThemes: string[]; // اہم مضامین
    virtuesAndBenefits: string; // فضائل و برکات
    coreGuidance: string; // عملی ہدایات
  };

  // Pashto Tafsir Overview
  pashto: {
    title: string;
    tafsirSource: string; // e.g. "پښتو تفسیر: تفسیر کابلي او تفسیر دراني"
    shanENuzul: string; // د سورت شان نزول او پس منظر
    keyThemes: string[]; // مهم مضامین او موضوعات
    virtuesAndBenefits: string; // د سورت فضیلتونه او برکتونه
    coreGuidance: string; // د عملي ژوند لارښوونې
  };

  // English Tafsir Overview
  english: {
    title: string;
    tafsirSource: string; // e.g. "Tafseer Ibn Kathir & Maariful Quran"
    shanENuzul: string; // Background & Circumstances of Revelation
    keyThemes: string[]; // Core Themes
    virtuesAndBenefits: string; // Virtues & Hadith Proofs
    coreGuidance: string; // Practical Guidance for Believers
  };
}

export const TAFSIR_SURAH_OVERVIEWS: Record<number, SurahTafsirOverview> = {
  1: {
    surahNumber: 1,
    nameArabic: "الفاتحة",
    transliteration: "Al-Fatihah",
    revelationType: "Meccan",
    totalVerses: 7,
    urdu: {
      title: "سورۃ الفاتحہ (ام الکتاب، السبع المثانی)",
      tafsirSource: "تفسیر معارف القرآن و تفسیر ابن کثیر",
      shanENuzul: "سورۃ الفاتحہ مکہ مکرمہ میں ابتدائے بعثت میں نازل ہوئی۔ اسے 'ام القرآن' (قرآن کی ماں) اور 'السبع المثانی' (بار بار دہرائی جانے والی سات آیات) کہا جاتا ہے۔ نماز کی ہر رکعت میں اس کی تلاوت فرض و واجب قرار دی گئی ہے۔ یہ دراصل بندے کی طرف سے بارگاہ الہی میں ایک پرخلوص دعا ہے جس کے جواب میں پورا قرآن پاک بطور ہدایت نازل فرمایا گیا۔",
      keyThemes: [
        "اللہ رب العزت کی توحید، ربوبیت اور رحمانیت کا اعتراف",
        "روزِ جزا (قیامت) اور آخرت کے احتساب پر پختہ یقین",
        "عبادت اور استعانت کا صرف اور صرف اللہ کی ذاتِ اقدس کے ساتھ مخصوص ہونا",
        "صراطِ مستقیم (سیدھے راستے) کی طلب اور گمراہی و غضب سے بچاؤ کی التجاء"
      ],
      virtuesAndBenefits: "صحیح بخاری کی حدیثِ قدسی کے مطابق اللہ تعالیٰ نے فرمایا: 'میں نے نماز (سورۃ الفاتحہ) کو اپنے اور اپنے بندے کے درمیان دو برابر حصوں میں تقسیم کر دیا ہے، اور میرا بندہ جو مانگے گا وہ اسے عطا کیا جائے گا۔' نیز یہ سورہ ہر بیماری اور نظرِ بد کے لیے 'الشافیہ' (شفا بخش) ہے۔",
      coreGuidance: "ہر نماز اور ہر نیک عمل کا آغاز اللہ کی حمد و ثنا اور رحمت کے اعتراف سے کریں، اور ہر لمحہ صراطِ مستقیم پر استقامت کی دعا مانگتے رہیں۔"
    },
    pashto: {
      title: "د فاتحې سورت (ام الکتاب او سبع مثاني)",
      tafsirSource: "د قرآن مجید تفصیلي پښتو تفسیر (تفسیر کابلي او تفسیر دراني)",
      shanENuzul: "دغه مبارک سورت په مکه مکرمه کې د نبوت په لومړیو وختونو کې نازل شوی دی. دې سورت ته 'ام الکتاب' او 'سبع مثاني' (اووه تکرارېدونکي آیتونه) ویل کېږي ځکه چې د هر لمانځه په هر رکعت کې لوستل کېږي. دغه سورت د یوه مسلمان بنده له لوري د الله تعالی حضور ته تر ټولو غوره دعا ده او پاتې ټول قرآن د همدې دعا ځواب دی.",
      keyThemes: [
        "د الله تعالی خالص توحید، د هغه ربوبیت او بې پایه رحمت پیژندنه",
        "د جزا او حساب کتاب په ورځ (قیامت) کلک باور",
        "خاص د الله عبادت کول او یوازې له هغه څخه د مرستې او مدد غوښتنه",
        "د نېغې او سمې لارې (صراط مستقیم) طلب او د ګمراهانو له بدې لارې څخه پناه"
      ],
      virtuesAndBenefits: "په صحیح بخاري کې راغلي چې دا د قرآن عظیم الشان تر ټولو لوړ او غوره سورت دی. دې ته 'سورة الشفاء' هم وايي ځکه چې د هر جسماني او روحاني تکلیف، دم او نظر ماتولو لپاره د شفا سبب دی.",
      coreGuidance: "هره ورځ د لمانځه په جریان او له لمانځه بهر د زړه له کومي دا دعا کوئ چې الله مو پر حق، صبر او صراط مستقیم تلپاتې او ثابت قدمه وساتي."
    },
    english: {
      title: "Surah Al-Fatihah (The Opening / Mother of the Book)",
      tafsirSource: "Tafseer Ibn Kathir & Maariful Quran",
      shanENuzul: "Revealed in Makkah during the earliest phase of Prophethood. Named 'Al-Fatihah' (The Opening) because the Noble Quran opens with it, and it opens every unit (Rak'ah) of obligatory prayer. It acts as the preface and foundational supplication of the entire scripture.",
      keyThemes: [
        "Praise and gratitude exclusively to Allah as Cherisher and Sustainer of all existence",
        "Divine Mercy: Ar-Rahman (universal mercy) and Ar-Raheem (special enduring mercy)",
        "Accountability on the Day of Recompense and absolute sovereignty of God",
        "Tawhid in worship (Ibadah) and exclusive reliance (Isti'anah)",
        "The prayer for unwavering guidance along the Straight Path (Sirat al-Mustaqeem)"
      ],
      virtuesAndBenefits: "Reported in Sahih Bukhari: Prophet Muhammad ﷺ declared Al-Fatihah to be the greatest chapter in the Quran. In a Hadith Qudsi, Allah states: 'I have divided the prayer between Myself and My servant into two halves, and My servant shall have what he asks for.' It is universally recognized as Ash-Shifa (The Cure).",
      coreGuidance: "Center daily life on total reliance upon Allah, frequent renewal of monotheism, and constant seeking of divine guidance away from anger and misguidance."
    }
  },
  2: {
    surahNumber: 2,
    nameArabic: "البقرة",
    transliteration: "Al-Baqarah",
    revelationType: "Medinan",
    totalVerses: 286,
    urdu: {
      title: "سورۃ البقرہ (فسطاط القرآن)",
      tafsirSource: "تفسیر معارف القرآن و تفسیر احسن البیان",
      shanENuzul: "یہ مدینہ منورہ میں نازل ہونے والی سب سے پہلی اور طویل ترین سورۃ ہے۔ اس میں اسلامی ریاست، شریعت، عبادات (نماز، روزہ، زکوٰۃ، حج)، عائلی قوانین (نکاح، طلاق، وصیت)، معاشی اصول (حرمتِ سود)، اور جہاد و قصاص کے جامع احکامات بیان ہوئے ہیں۔ اس میں آیت الکرسی بھی موجود ہے جو قرآن کی سب سے بڑی آیت ہے۔",
      keyThemes: [
        "قرآن پاک کا بے عیب کتابِ ہدایت ہونا اور متقین کے اوصاف",
        "حضرت آدم علیہ السلام کی تخلیق اور خلافتِ ارضی کا واقعہ",
        "بنی اسرائیل کی تاریخ، نعمتیں، سرکشی اور گائے کا واقعہ (البقرہ)",
        "تحویلِ قبلہ: بیت المقدس سے کعبۃ اللہ کی طرف رُخ کی تبدیلی",
        "احکامِ شریعت: روزے، حج، قصاص، وصیت اور حرمتِ سود کا حتمی اعلان",
        "آیت الکرسی اور توحیدِ خالص کا عظیم الشان بیان"
      ],
      virtuesAndBenefits: "رسول اللہ ﷺ نے فرمایا: 'اپنے گھروں کو قبرستان نہ بناؤ، جس گھر میں سورۃ البقرہ پڑھی جائے وہاں سے شیطان بھاگ جاتا ہے۔' (صحیح مسلم)۔ نیز قیامت کے دن سورۃ البقرہ اور آل عمران اپنے پڑھنے والوں پر بادل بن کر سایہ کریں گی۔",
      coreGuidance: "سود اور باطل کمائی سے قطعی پرہیز کریں، قرآنی احکام پر بلا چوں و چرا عمل کریں اور اپنے گھروں میں باقاعدگی سے اس سورۃ کی تلاوت کا اہتمام رکھیں۔"
    },
    pashto: {
      title: "د البقرې سورت (د قرآن خیمه او چت)",
      tafsirSource: "د قرآن مجید تفصیلي پښتو تفسیر (تفسیر دراني او کابلي)",
      shanENuzul: "دا د قرآن تر ټولو اوږد سورت دی چې په مدینه منوره کې د هجرت نه وروسته نازل شوی دی. په دې سورت کې د اسلامي ټولنې، شرعي احکامو، لمانځه، روژې، زکات، حج، سود د حراموالي، جهاد او د کورني ژوند (نکاح او طلاق) بشپړ احکام بیان شوي دي. پدې کې آیت الکرسي هم شامله ده.",
      keyThemes: [
        "د قرآن پاک بې شکه حقانیت او د پرهیزګارانو صفتونه",
        "د انسان او حضرت آدم علیه السلام پیداښت او د ځمکې پر مخ خلافت",
        "د بني اسرائیلو تاریخ، د هغوی سرکشي او د غوا (البقرة) عبرتناکه واقعه",
        "د قبلې بدلون د بیت المقدس څخه د مکې معظمې کعبې شریفې ته",
        "د سود (ربا) قطعي حراموالی او د حلال رزق تاکید",
        "آیت الکرسي: د الله تعالی د عظمت او تسلط تر ټولو عالي بیان"
      ],
      virtuesAndBenefits: "حضرت محمد ﷺ فرمایلي دي: 'په کوم کور کې چې د سورة البقره تلاوت کېږي له هغه ځایه شیطان تښتي.' (صحیح مسلم). او په قیامت کې به دا سورت د خپلو تلاوت کوونکو لپاره د شفاعت کوونکې ورېځې په څېر وي.",
      coreGuidance: "له حرامه روزي او سود څخه په کلکه ځان وساتئ، خپل کورونه د قرآن په تلاوت روښانه وساتئ او د قرآن احکام په خپل انفرادي او ټولنیز ژوند کې پلي کړئ."
    },
    english: {
      title: "Surah Al-Baqarah (The Cow)",
      tafsirSource: "Tafseer Ibn Kathir & Maariful Quran",
      shanENuzul: "The longest chapter of the Quran, revealed in Madinah over several years. It lays the comprehensive legislative, moral, social, financial, and spiritual constitution of the newly established Islamic society.",
      keyThemes: [
        "Criteria of the pious (Muttaqeen) and absolute certainty of Divine revelation",
        "Creation of Adam (AS), appointment as steward on earth, and angels' prostration",
        "Extensive address to the Children of Israel regarding their covenant and historical lapses",
        "The shift of the Qiblah from Jerusalem to the Kaaba in Makkah",
        "Comprehensive rulings: Fasting in Ramadan, Hajj, Qisas, Marriage, and Divorce",
        "Absolute prohibition of Usury (Riba) and guidelines for financial contracts",
        "Ayat al-Kursi (2:255): The apex verse affirming divine majesty and eternal sovereignty"
      ],
      virtuesAndBenefits: "Prophet Muhammad ﷺ said: 'Do not turn your houses into graves; Satan flees from a house in which Surah Al-Baqarah is recited' (Sahih Muslim). It will shield its reciters on the Day of Resurrection like two cooling clouds.",
      coreGuidance: "Purify wealth by eradicating interest and deceit, uphold family and societal justice, and preserve morning and evening recitations of Ayat al-Kursi."
    }
  },
  36: {
    surahNumber: 36,
    nameArabic: "يس",
    transliteration: "Ya-Sin",
    revelationType: "Meccan",
    totalVerses: 83,
    urdu: {
      title: "سورۃ یٰس (قلب القرآن - قرآن کا دل)",
      tafsirSource: "تفسیر ابن کثیر و معارف القرآن",
      shanENuzul: "سورۃ یٰس مکی سورت ہے جو قریش مکہ کے انکارِ رسالت اور بعث بعد الموت (مرنے کے بعد دوبارہ جی اٹھنے) کے رد میں نازل ہوئی۔ اس میں حضرت حبیب نجار (مومن آل یٰس) کا ایمان افروز واقعہ، کائنات کے فلکیاتی نظام، زمین کی نباتاتی حیات، اور قیامت کی ہولناکیوں کو بلاغت کے ساتھ پیش کیا گیا ہے۔",
      keyThemes: [
        "رسالتِ محمدی ﷺ کی حقانیت پر قرآن حکیم کی قسم",
        "اصحاب القریہ (بستی والے) اور مومنِ مجاہد کی دعوت و شہادت",
        "قدرتِ الٰہی کے دلائل: مردہ زمین کا زندہ ہونا، سورج چاند کا اپنے مدار میں گردش کرنا",
        "صور پھونکے جانے کے بعد قبروں سے نکلنا اور حساب کتاب کا قائم ہونا",
        "کُنْ فَيَكُونُ: اللہ تعالیٰ کی لامحدود تخلیقی طاقت کا مظہر"
      ],
      virtuesAndBenefits: "حدیث مبارکہ میں وارد ہے: 'ہر چیز کا ایک دل ہوتا ہے اور قرآن کا دل سورۃ یٰس ہے۔' جو شخص اللہ کی رضا کے لیے اس کی تلاوت کرے اس کے گناہ بخش دیے جاتے ہیں۔",
      coreGuidance: "آخرت کے حساب اور مرنے کے بعد کی زندگی کو ہمیشہ نگاہ میں رکھیں اور حق کی گواہی اور دعوت میں کبھی بزدلی یا ہچکچاہٹ نہ دکھائیں۔"
    },
    pashto: {
      title: "د یٰس سورت (د قرآن زړه)",
      tafsirSource: "د قرآن مجید پښتو تفسیر (تفسیر کابلي)",
      shanENuzul: "دا یو ډېر با برکته مکی سورت دی. کله چې د مکې مشرکینو د پیغمبرۍ او د قیامت نه وروسته بیا ژوندي کېدو څخه انکار کاوه، الله تعالی دا سورت د هغوی د شکونو د ماتولو لپاره نازل کړ. پدې سورت کې د ایمان، آخرت او د کایناتو د سترو نښو په زړه پورې ثبوتونه وړاندې شوي دي.",
      keyThemes: [
        "د حضرت محمد ﷺ د حقانیت او رسالت شاهدي په حکمت ډک قرآن سره",
        "د هغې کلي کیسه چې پیغمبران یې دروغجن وبلل او د یوه با ایمانه سړي شجاعت",
        "د کایناتو نښې: د مړې ځمکې را ژوندي کول، د لمر او سپوږمۍ منظم حرکت",
        "د شپې او ورځې اوښتل او په کښتیو کې د انسانانو سفر",
        "د قیامت ورځ: کله چې انسانان د قبرونو څخه د حساب لپاره را ووځي",
        "کُنْ فَيَكُونُ: د الله تعالی بې انتها طاقت چې هر څه ته د 'شه' په ویلو پیدا کوي"
      ],
      virtuesAndBenefits: "نبي کریم ﷺ فرمایلي: 'د هر څه لپاره یو زړه شته، او د قرآن زړه سورة یٰس دی.' څوک چې دغه سورت تلاوت کړي د بښنې او مغفرت زېری ورکول کېږي.",
      coreGuidance: "د مرګ نه وروسته ابدي ژوند او د اعمالو حساب هره شیبه یاد ساتئ او په سختو حالاتو کې د حق لار مه پرېږدئ."
    },
    english: {
      title: "Surah Ya-Sin (The Heart of the Quran)",
      tafsirSource: "Tafseer Ibn Kathir & Maariful Quran",
      shanENuzul: "A Meccan Surah revealed to address pagan skepticism regarding the veracity of the Prophet Muhammad ﷺ and the bodily resurrection of the dead. It vividly illustrates divine power across astronomy, biology, history, and eschatology.",
      keyThemes: [
        "Divine oath swearing by the Quran that Muhammad ﷺ is upon the true path",
        "Parable of the townspeople who rejected their Messengers and the faithful man who bore witness unto martyrdom",
        "Cosmic signs: dead earth brought to life, alternating day and night, calibrated orbits of sun and moon",
        "The blast of the Trumpet, resurrection from graves, and ultimate accountability",
        "The creative command: Kun Fa-Yakoon ('Be', and it is)"
      ],
      virtuesAndBenefits: "The Prophet ﷺ remarked: 'Everything has a heart, and the heart of the Quran is Ya-Sin.' Classical scholars noted its immense comfort for individuals confronting sickness and passing toward the Hereafter.",
      coreGuidance: "Reflect constantly on resurrection, heed cosmic signs testifying to God's singularity, and champion truth steadfastly."
    }
  },
  67: {
    surahNumber: 67,
    nameArabic: "الملك",
    transliteration: "Al-Mulk",
    revelationType: "Meccan",
    totalVerses: 30,
    urdu: {
      title: "سورۃ الملک (تبارک الذی - عذابِ قبر سے نجات دہندہ)",
      tafsirSource: "تفسیر ابن کثیر و معارف القرآن",
      shanENuzul: "سورۃ الملک مکی سورت ہے جس کے 30 آیات ہیں۔ اس میں انسانی زندگی اور موت کا اصل مقصد 'آزمائش برائے بہترین عمل' قرار دیا گیا ہے۔ آسمانوں کی بے عیب ساخت، پرندوں کا ہوا میں معلق رہنا اور رزق کے سرچشموں پر غور و خوض کی دعوت دی گئی ہے۔",
      keyThemes: [
        "کائنات کی مطلق بادشاہی اور ہر چیز پر اللہ کا مکمل اختیار",
        "زندگی اور موت کا بنیادی مقصد: اچھے اعمال کی آزمائش",
        "آسمانوں اور کہکشاؤں کی خلقت میں کسی بھی نقص کا نہ ہونا",
        "جہنم کی دہکتی آگ اور اس کے داروغوں کا مکالمہ",
        "غیب کی حالت میں اللہ سے ڈرنے والوں کے لیے مغفرت اور بڑا اجر",
        "زمین پر چلنے اور رزق تلاش کرنے کے آداب اور نعمتِ آب پر شکر گزاری"
      ],
      virtuesAndBenefits: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: 'قرآن میں 30 آیات پر مشتمل ایک سورت ہے جس نے ایک شخص کے لیے اس وقت تک سفارش کی یہاں تک کہ اس کو بخش دیا گیا، اور وہ سورۃ تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ ہے۔' (جامع ترمذی و ابوداؤد)۔ نبی کریم ﷺ رات کو سونے سے قبل اس کی تلاوت فرماتے تھے۔",
      coreGuidance: "ہر رات سونے سے پہلے اس سورت کو باقاعدگی سے پڑھیں تاکہ قبر کے سوالات اور عذاب سے امان حاصل ہو۔"
    },
    pashto: {
      title: "د الملک سورت (تبارک الذی - د قبر د عذاب نه ژغورونکی)",
      tafsirSource: "د قرآن مجید پښتو تفسیر (تفسیر دراني او کابلي)",
      shanENuzul: "دا د مکی سورتونو څخه دی چې ۳۰ مبارک آیتونه لري. پدې سورت کې ښودل شوي چې مرګ او ژوند الله تعالی ددې لپاره پیدا کړي چې وګوري څوک غوره او نېک عمل کوي. پدې کې د اسمانونو د بې عیبه جوړښت او د پرندانو د الوتلو په واسطه د توحید ثبوتونه ورکړل شوي دي.",
      keyThemes: [
        "د ټولې نړۍ او کایناتو بادشاهي او واکمني یوازې د الله په لاس کې ده",
        "د ژوند او مرګ مقصد: د انسان د نېکو اعمالو امتحان او ازموینه",
        "د اووو اسمانونو پیداښت پرته له کوم نیمګړتیا او شګاف څخه",
        "د هغو کسانو لوی اجر چې په پټه او یوازیتوب کې د خپل رب څخه وېریږي",
        "د ځمکې اسانتیاوې او د حلال رزق لټون",
        "که ستا خواږه اوبه ځمکه کې لاندې ولاړې شي، نو څوک به درته تازه روانې اوبه راولي؟"
      ],
      virtuesAndBenefits: "په حدیث شریف کې راغلي چې د قرآن ۳۰ آیتونو یو سورت شته چې د خپل لوستونکي لپاره په قبر کې سفارش کوي تر دې چې هغه بښل کېږي، او دا سورة تبارک (الملک) دی. رسول الله ﷺ به هره شپه د ویده کېدو نه مخکې دا سورت لوستلو.",
      coreGuidance: "هره شپه د خوب نه وړاندې د دې مبارک سورت تلاوت کوئ ترڅو د قبر له تاریکۍ او عذاب څخه وساتل شئ."
    },
    english: {
      title: "Surah Al-Mulk (The Dominion / The Grave Protector)",
      tafsirSource: "Tafseer Ibn Kathir & Maariful Quran",
      shanENuzul: "A Meccan Surah comprising 30 verses. It reorients the human conscience by articulating the core objective of existence: testing humanity as to who is best in righteous conduct (Ihsan).",
      keyThemes: [
        "The Supreme Sovereignty and Omnipotence of God over the entire cosmos",
        "Life and death purposeful design: a temporary examination in righteous action",
        "Flawless cosmic architecture of the seven layered heavens",
        "Vindication for those who revere their Lord unseen (Bil-Ghayb)",
        "God's intimacy with the secrets harbored inside human chests",
        "The vital blessing of water and the vulnerability of creaturely sustenance"
      ],
      virtuesAndBenefits: "Prophet Muhammad ﷺ said: 'A Surah of the Quran, consisting of thirty verses, interceded for a man until his sins were forgiven: Blessed is He in whose hand is the dominion' (Abu Dawood & Tirmidhi). The Prophet ﷺ never slept before reciting Surah As-Sajdah and Surah Al-Mulk.",
      coreGuidance: "Recite this Surah nightly before sleep to attain intercession and protection in the Barzakh (the grave)."
    }
  },
  112: {
    surahNumber: 112,
    nameArabic: "الإخلاص",
    transliteration: "Al-Ikhlas",
    revelationType: "Meccan",
    totalVerses: 4,
    urdu: {
      title: "سورۃ الاخلاص (قل ہو اللہ احد - توحید کا عطر)",
      tafsirSource: "تفسیر ابن کثیر و معارف القرآن",
      shanENuzul: "مشرکین مکہ اور یہود نے جب رسول اللہ ﷺ سے سوال کیا: 'اپنے رب کا نسب اور حسب بیان کیجیے، وہ کس چیز سے بنا ہے؟' تو اللہ تعالیٰ نے یہ جامع سورت نازل فرمائی جس نے شرک کی ہر قسم کی جڑ کاٹ دی اور توحیدِ خالص کو ثابت کیا۔",
      keyThemes: [
        "اللہ تعالیٰ کی ذات میں یکتائی اور لاشریک ہونا (احد)",
        "الصمد: وہ ذات جو ہر احتیاج سے بے نیاز ہو اور کائنات اس کی محتاج ہو",
        "نہ اس نے کسی کو جنا اور نہ وہ کسی سے جنا گیا (نسب اور اولاد کی کلی نفی)",
        "کائنات میں کوئی شے اس کے ہمسر اور برابر نہیں (لا مثل لہ)"
      ],
      virtuesAndBenefits: "صحیح احادیث کے مطابق سورۃ الاخلاص کی ایک بار تلاوت ایک تہائی (1/3) قرآن کے ثواب کے برابر ہے۔ جو شخص اس سے محبت رکھتا ہے یہ محبت اسے جنت میں داخل کرے گی۔",
      coreGuidance: "اپنے عقیدے کو ہر قسم کی ملاوٹ اور شرک سے پاک رکھیں اور صبح و شام معوذتین کے ساتھ اس کا ورد رکھیں۔"
    },
    pashto: {
      title: "د الاخلاص سورت (قل هو الله احد - د توحید جوهر)",
      tafsirSource: "د قرآن مجید تفصیلي پښتو تفسیر (تفسیر کابلي)",
      shanENuzul: "کله چې د مکې مشرکانو له نبي کریم ﷺ څخه وپوښتل چې ستا د رب نسب او نژاد څه دی؟ هغه د سرو زرو دی که د سپینو زرو؟ نو الله تعالی دا سورت نازل کړ ترڅو د شرک، کفر او غلطو عقایدو بنسټونه ونړوي.",
      keyThemes: [
        "الله تعالی یو او یوازینی معبود دی، هېڅ شریک نه لري",
        "الصمد: هغه بې نیازه ذات دی چې ټول کاینات ورته اړ دي او دی هېچا ته اړتیا نه لري",
        "نه د هغه اولاد شته او نه پخپله د چا اولاد دی (د نسب او زیږون نفی)",
        "په ټوله هستۍ کې هېڅوک د هغه په شان، صفت او قدرت کې برابر نشته"
      ],
      virtuesAndBenefits: "په صحیح احادیثو کې راغلي چې د سورة اخلاص تلاوت کول د قرآن د دریمې برخې (ثُلث القرآن) سره برابر ثواب لري. ددې سورت سره مینه انسان جنت ته بیایي.",
      coreGuidance: "خپل عقیده د هر ډول شرک او بدعت څخه پاکه وساتئ او هره ورځ سهار او ماښام دا سورت تکراروئ."
    },
    english: {
      title: "Surah Al-Ikhlas (Sincerity / The Pure Monotheism)",
      tafsirSource: "Tafseer Ibn Kathir & Maariful Quran",
      shanENuzul: "Revealed when the polytheists of Makkah and Jewish rabbis challenged the Messenger ﷺ: 'Describe for us the lineage and substance of your Lord.' Allah revealed these concise four verses which encapsulate the entirety of monotheism.",
      keyThemes: [
        "Ahad: Absolute, indivisible, singular Oneness of God",
        "As-Samad: The Self-Sufficient Master upon whom all depends, who depends on nothing",
        "Absolute refutation of lineage, parentage, offspring, and anthropomorphic concepts",
        "Kufuwan Ahad: Total incomparability of God to any created reality"
      ],
      virtuesAndBenefits: "Authentic Hadith in Sahih Bukhari establishes that reciting Surah Al-Ikhlas equals one-third of the Quran in spiritual reward. A companion who loved reciting it in every prayer was told by the Prophet ﷺ: 'Your love for it will admit you into Paradise.'",
      coreGuidance: "Purify faith from subtle polytheism (Riya) and rely wholeheartedly on Allah's self-sufficiency."
    }
  },
  113: {
    surahNumber: 113,
    nameArabic: "الفلق",
    transliteration: "Al-Falaq",
    revelationType: "Meccan",
    totalVerses: 5,
    urdu: {
      title: "سورۃ الفلق (رب الفلق - بیرونی شرور سے پناہ)",
      tafsirSource: "تفسیر ابن کثیر و معارف القرآن",
      shanENuzul: "جب لبید بن اعصم یہودی نے نبی کریم ﷺ پر جادو کیا جس سے آپ ﷺ پر ظاہری اثرات مرتب ہوئے، تو جبرائیل علیہ السلام معوذتین (سورۃ الفلق اور سورۃ الناس) لے کر نازل ہوئے، جن کی تلاوت سے جادو کی تمام گرہیں کھل گئیں اور آپ ﷺ صحت یاب ہوئے۔",
      keyThemes: [
        "صبح کے رب کی پناہ طلب کرنا",
        "مخلوقات کے تمام قسم کے شرور سے پناہ",
        "اندھیری رات کے شر سے پناہ جب وہ چھا جائے",
        "گرہوں پر پھونکنے والیوں (جادوگروں) کے شر سے پناہ",
        "حسد کرنے والے کے شر سے پناہ جب وہ حسد کی آگ بھڑکائے"
      ],
      virtuesAndBenefits: "رسول اللہ ﷺ نے فرمایا: 'ان دو سورتوں (الفلق اور الناس) جیسی کوئی اور پناہ مانگنے والی سورتیں نہیں دیکھی گئیں۔' ہر فرض نماز کے بعد اور رات سوتے وقت ان کی تلاوت مسنون ہے۔",
      coreGuidance: "جادو، نظر بد اور حاسدین کے شر سے بچنے کے لیے صبح و شام معوذتین کو اپنا مضبوط قلعہ بنائیں۔"
    },
    pashto: {
      title: "د الفلق سورت (د سباوون د رب پناه)",
      tafsirSource: "د قرآن مجید پښتو تفسیر (تفسیر کابلي)",
      shanENuzul: "کله چې یوه یهودي د نبي کریم ﷺ پر مبارک ذات باندې جادو کړی و، نو جبرائیل علیه السلام د سورة الفلق او سورة الناس سره راغی. د دې مبارکو آیتونو په لوستلو سره د جادو ټولې غوټې خلاصې شوې او نبي علیه السلام روغ رمټ شو.",
      keyThemes: [
        "د سهار د رب پناه غوښتل چې تیاره په رڼا بدلوي",
        "د ټولو پیدا شوو مخلوقاتو د شر او ضرر څخه پناه",
        "د تورې او خاموشې شپې له خطراتو او شر څخه پناه",
        "د جادوګرانو، کوډګرو او شیطاني کارونو له بدۍ څخه پناه",
        "د کینه‌ګرو او حاسدانو له بد نظر او حسد څخه پناه"
      ],
      virtuesAndBenefits: "رسول الله ﷺ فرمایلي: 'هېڅ پناه غوښتونکي د معوذتین (الفلق او الناس) په څېر بل څه سره پناه نه ده غوښتې.' دا د سترګو د لګېدو (نظر بد) او حسد تر ټولو پیاوړی علاج دی.",
      coreGuidance: "هره ورځ سهار او ماښام درې ځله دغه سورت ولولئ ترڅو د بدو سترګو، جادو او پټو خطراتو څخه په امن کې پاتې شئ."
    },
    english: {
      title: "Surah Al-Falaq (The Daybreak / Refuge from External Evils)",
      tafsirSource: "Tafseer Ibn Kathir & Maariful Quran",
      shanENuzul: "Revealed alongside Surah An-Nas (known collectively as Al-Mu'awwidhatan, the Two Protectors) when the sorcerer Labid ibn al-A'sam cast a spell upon Prophet Muhammad ﷺ. As the verses were recited, every enchanted knot dissolved.",
      keyThemes: [
        "Seeking refuge in the Lord of the dawn who bursts forth light from dark abyss",
        "Shielding against the harms latent in created beings, beasts, and poisons",
        "Protection from nocturnal perils when night settles",
        "Refuge from occult practitioners and sorcerers blowing upon knots",
        "Deliverance from the venomous gaze and machinations of the envious (Hasad)"
      ],
      virtuesAndBenefits: "The Messenger ﷺ advised his companions: 'Recite them when you go to sleep and when you wake up; nothing protects like them' (Sunan An-Nasa'i).",
      coreGuidance: "Combat occult harm and envy by regularly blowing over palms and wiping the body with Surah Al-Falaq and Surah An-Nas."
    }
  },
  114: {
    surahNumber: 114,
    nameArabic: "الناس",
    transliteration: "An-Nas",
    revelationType: "Meccan",
    totalVerses: 6,
    urdu: {
      title: "سورۃ الناس (قل اعوذ برب الناس - باطنی وسوسوں سے پناہ)",
      tafsirSource: "تفسیر ابن کثیر و معارف القرآن",
      shanENuzul: "سورۃ الناس قرآن کریم کی آخری سورت ہے۔ یہ انسان کے سب سے خطرناک اور چھپے ہوئے دشمن یعنی شیطان اور اس کے وسوسوں کے خلاف ڈھال ہے۔ اگر سورۃ الفلق بیرونی شرور کا توڑ ہے، تو سورۃ الناس دل کے اندرونی وسوسوں اور گمراہیوں کا علاج ہے۔",
      keyThemes: [
        "اللہ کے تین عظیم القابات: رب الناس (پالنے والا)، ملک الناس (بادشاہ)، الہ الناس (معبود)",
        "الوسواس الخناس: وہ وسوسہ باز جو اللہ کا ذکر سن کر پیچھے ہٹ جاتا ہے",
        "دلوں اور سینوں کے اندر شکوک و شبہات اور گناہ کی ترغیب ڈالنا",
        "وسوسہ ڈالنے والے دو گروہ: جنات میں سے شیاطین اور انسانوں میں سے برے ساتھی"
      ],
      virtuesAndBenefits: "معوذتین وہ دو عظیم سورتیں ہیں جن کے ذریعے ہر قسم کی شیطانی وسوسوں، ڈپریشن، خوف اور روحانی گھبراہٹ سے نجات ملتی ہے۔ قرآن کا اختتام اسی حفاظت کی دعا پر ہوا ہے۔",
      coreGuidance: "جب بھی دل میں شکوک، پریشانی یا برائی کا خیال آئے فوراً 'اعوذ باللہ' پڑھیں اور سورۃ الناس کی تلاوت کریں۔"
    },
    pashto: {
      title: "د الناس سورت (د انسانانو د رب پناه - د زړه د وسوسو علاج)",
      tafsirSource: "د قرآن مجید تفصیلي پښتو تفسیر (تفسیر کابلي)",
      shanENuzul: "دا د قرآن پاک وروستی سورت دی. دا مبارک سورت د انسان د تر ټولو خطرناک او پټ دښمن (شیطان او د هغه د وسوسو) پر ضد تر ټولو لویه وسله ده. که سورة الفلق د بهرنیو ضررونو نه ساتنه کوي، نو سورة الناس د انسان د باطن او زړه د وسوسو علاج دی.",
      keyThemes: [
        "د انسانانو د پالونکي، د انسانانو د حقیقي باچا، او د انسانانو د معبود پناه",
        "الوسواس الخناس: هغه پټ شیطان چې د الله په ذکر سره شاته تښتي",
        "هغه وسوسې چې د خلکو په سینو او زړونو کې شکونه او ګناهونه را پیدا کوي",
        "شیطانان دوه ډوله دي: یو د پیریانو او بل د بدو انسانانو په بڼه کې"
      ],
      virtuesAndBenefits: "د دې سورت په لوستلو سره زړه ته سکون او د شیطاني خیالاتو څخه امان حاصلیږي. د قران کریم پای د انسان د پناه غوښتنې په دې مبارک کلام پای ته رسیدلی دی.",
      coreGuidance: "کله چې مو زړه ته بد خیالات، وسوسې او وېره راځي، په اخلاص سره دغه سورت ولولئ او په الله توکل وکړئ."
    },
    english: {
      title: "Surah An-Nas (Mankind / Refuge from Internal Whispers)",
      tafsirSource: "Tafseer Ibn Kathir & Maariful Quran",
      shanENuzul: "The concluding Surah of the Holy Quran. It provides spiritual sanctuary against humanity's most insidious and stealthy adversary: the whispers (waswas) of Satan injected into the sanctuary of the heart.",
      keyThemes: [
        "Invoking three foundational divine attributes: Rabbin-Nas (Lord/Cherisher), Malikin-Nas (Sovereign/King), Ilaahin-Nas (Sole True God)",
        "Al-Waswas Al-Khannas: the sneaking whisperer who slinks away when Allah is remembered",
        "Psychological infiltration: sowing doubt, despair, paranoia, and moral corruption in the human chest",
        "Two conduits of demonic deception: unseen Jinn devils and corrupt human instigators"
      ],
      virtuesAndBenefits: "Together with Surah Al-Falaq, it serves as the ultimate spiritual therapy and protective shield prescribed by the Prophet ﷺ against spiritual unease and demonic deception.",
      coreGuidance: "Whenever anxiety, doubt, or illicit impulses strike, immediately utter the Isti'adhah and recite Surah An-Nas."
    }
  }
};
