import { SunnahItem } from '../types';

export const DAILY_SUNNAHS: SunnahItem[] = [
  // Eating Sunnahs
  {
    id: 'eat-1',
    category: 'eating',
    titleEn: 'Saying Bismillah and Eating with Right Hand',
    titleUr: 'بسم اللہ پڑھنا اور دائیں ہاتھ سے کھانا',
    descriptionEn: 'Begin eating by invoking Allah\'s name with "Bismillah", and eat strictly with the right hand.',
    descriptionUr: 'کھانے کے آغاز میں "بسم اللہ" پڑھیں اور ہمیشہ دائیں ہاتھ سے کھانا کھائیں۔',
    arabicSupplication: 'بِسْمِ اللَّهِ وَعَلَىٰ بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillaahi wa \'alaa barakatillaah',
    reference: 'Sahih al-Bukhari 5376'
  },
  {
    id: 'eat-2',
    category: 'eating',
    titleEn: 'Eating from What is Directly in Front of You',
    titleUr: 'اپنے آگے سے کھانا',
    descriptionEn: 'The Prophet ﷺ advised Umar ibn Abi Salamah: "O boy, mention the name of Allah, eat with your right hand, and eat from what is near you."',
    descriptionUr: 'رسول اللہ ﷺ نے فرمایا: اے لڑکے! اللہ کا نام لو، دائیں ہاتھ سے کھاؤ اور اپنے آگے سے کھاؤ۔',
    reference: 'Sahih al-Bukhari 5376'
  },
  {
    id: 'eat-3',
    category: 'eating',
    titleEn: 'Sitting Down while Eating & Not Reclining',
    titleUr: 'بیٹھ کر کھانا اور ٹیک لگا کر نہ کھانا',
    descriptionEn: 'Eat in a humble sitting position on the floor or dining seat, avoiding lounging or reclining proudly.',
    descriptionUr: 'عاجزی کے ساتھ بیٹھ کر کھانا کھائیں اور ٹیک لگا کر کھانے سے پرہیز کریں۔',
    reference: 'Sahih al-Bukhari 5398'
  },
  {
    id: 'eat-4',
    category: 'eating',
    titleEn: 'Praising Allah after Finishing Meal',
    titleUr: 'کھانے کے بعد اللہ کا شکر ادا کرنا',
    descriptionEn: 'Conclude eating by thanking Allah who fed, quenched thirst, and made us Muslims.',
    descriptionUr: 'کھانا ختم کرنے پر اللہ کی حمد و ثناء بیان کریں۔',
    arabicSupplication: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Alhamdu lillaahil-lazee at\'amanaa wa saqaanaa wa ja\'alanaa muslimeen',
    reference: 'Jami` at-Tirmidhi 3457'
  },

  // Drinking Sunnahs
  {
    id: 'drink-1',
    category: 'drinking',
    titleEn: 'Sitting Down to Drink Water',
    titleUr: 'بیٹھ کر پانی پینا',
    descriptionEn: 'Prophet Muhammad ﷺ instructed believers to sit down while drinking water rather than drinking standing.',
    descriptionUr: 'نبی کریم ﷺ نے کھڑے ہو کر پانی پینے سے منع فرمایا اور بیٹھ کر پینے کی تلقین فرمائی۔',
    reference: 'Sahih Muslim 2024'
  },
  {
    id: 'drink-2',
    category: 'drinking',
    titleEn: 'Holding Glass in Right Hand & Looking Inside',
    titleUr: 'دائیں ہاتھ سے گلاس پکڑنا اور دیکھ کر پینا',
    descriptionEn: 'Hold the container with your right hand, inspect the liquid before drinking to ensure cleanliness.',
    descriptionUr: 'پانی کا برتن دائیں ہاتھ سے پکڑیں اور پینے سے پہلے برتن میں دیکھ لیں تاکہ کوئی تنکا وغیرہ نہ ہو۔',
    reference: 'Sunan Abu Dawood 3723'
  },
  {
    id: 'drink-3',
    category: 'drinking',
    titleEn: 'Drinking in Three Sips with Breaths Outside Vessel',
    titleUr: 'تین گھونٹ میں پانی پینا اور برتن سے باہر سانس لینا',
    descriptionEn: 'Drink water in three pauses, removing the cup from your mouth while inhaling/exhaling.',
    descriptionUr: 'پانی تین سانسوں میں پئیں اور سانس لیتے وقت برتن منہ سے دور رکھیں۔',
    reference: 'Sahih al-Bukhari 5631'
  },

  // Sleeping Sunnahs
  {
    id: 'sleep-1',
    category: 'sleeping',
    titleEn: 'Performing Wudu before Going to Bed',
    titleUr: 'سونے سے پہلے باوضو ہونا',
    descriptionEn: 'Perform ablution just like the wudu for prayer before retiring to bed.',
    descriptionUr: 'سونے سے قبل اسی طرح وضو کریں جس طرح نماز کے لیے وضو کیا جاتا ہے۔',
    reference: 'Sahih al-Bukhari 247'
  },
  {
    id: 'sleep-2',
    category: 'sleeping',
    titleEn: 'Dusting the Bed Sheet Three Times',
    titleUr: 'بستر کو تین بار جھاڑنا',
    descriptionEn: 'Dust off the bedding with the edge of your cloth before lying down.',
    descriptionUr: 'بستر پر لیٹنے سے پہلے اپنے کپڑے کے کنارے سے بستر کو تین مرتبہ جھاڑ لیں۔',
    reference: 'Sahih al-Bukhari 6320'
  },
  {
    id: 'sleep-3',
    category: 'sleeping',
    titleEn: 'Sleeping on the Right Side Facing Qibla',
    titleUr: 'دائیں کروٹ پر سونا',
    descriptionEn: 'Lie down on your right side with your right palm placed beneath your right cheek.',
    descriptionUr: 'دائیں کروٹ پر لیٹیں اور دایاں ہاتھ دائیں رخسار کے نیچے رکھیں۔',
    reference: 'Sahih al-Bukhari 6314'
  },
  {
    id: 'sleep-4',
    category: 'sleeping',
    titleEn: 'Reciting Ayat al-Kursi & the 3 Quls',
    titleUr: 'آیت الکرسی اور تینوں قل پڑھنا',
    descriptionEn: 'Recite Ayat al-Kursi and Surahs Al-Ikhlas, Al-Falaq, and An-Nas, blowing into hands and wiping over whole body.',
    descriptionUr: 'سونے سے پہلے آیت الکرسی اور تینوں قل شریف پڑھ کر ہاتھوں پر دم کریں اور پورے جسم پر پھیریں۔',
    reference: 'Sahih al-Bukhari 5017'
  },

  // Travelling Sunnahs
  {
    id: 'travel-1',
    category: 'travelling',
    titleEn: 'Reciting the Travel Supplication (Dua Safar)',
    titleUr: 'سفر کی دعا پڑھنا',
    descriptionEn: 'Upon boarding any conveyance (car, plane, train), say Allahu Akbar 3 times and recite the journey prayer.',
    descriptionUr: 'سواری پر سوار ہو کر تین بار اللہ اکبر کہیں اور سفر کی مسنون دعا پڑھیں۔',
    arabicSupplication: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhaanal-lazee sakhkhara lanaa haazaa wa maa kunnaa lahoo muqrineen, wa innaaa ilaa Rabbinaa lamunqaliboon',
    reference: 'Sahih Muslim 1342'
  },
  {
    id: 'travel-2',
    category: 'travelling',
    titleEn: 'Starting Journeys Early on Thursday / Morning',
    titleUr: 'صبح سویرے یا جمعرات کے دن سفر کا آغاز',
    descriptionEn: 'The Prophet ﷺ preferred departing for travel on Thursday mornings, supplicating: "O Allah, bless my nation in their early mornings."',
    descriptionUr: 'رسول اللہ ﷺ صبح کے وقت یا جمعرات کو سفر پر روانہ ہونا پسند فرماتے تھے۔',
    reference: 'Sunan Abu Dawood 2606'
  },
  {
    id: 'travel-3',
    category: 'travelling',
    titleEn: 'Takbeer When Ascending, Tasbeeh When Descending',
    titleUr: 'بلندی پر چڑھتے وقت تکبیر اور اترتے وقت تسبیح',
    descriptionEn: 'Say "Allahu Akbar" when moving uphill or ascending, and "SubhanAllah" when going downhill or descending.',
    descriptionUr: 'بلندی کی طرف جاتے وقت "اللہ اکبر" اور اترتے وقت "سبحان اللہ" کہیں۔',
    reference: 'Sahih al-Bukhari 2993'
  },

  // Grooming & Daily Practices
  {
    id: 'groom-1',
    category: 'grooming',
    titleEn: 'Using the Miswak (Toothstick)',
    titleUr: 'مسواک کا باقاعدہ استعمال',
    descriptionEn: 'The Prophet ﷺ said: "The miswak cleans the mouth and pleases the Lord." Use before Wudu, prayer, and waking up.',
    descriptionUr: 'مسواک منہ کی پاکیزگی اور رب کی خوشنودی کا ذریعہ ہے۔ وضو، نماز اور نیند سے بیدار ہونے پر مسواک کریں۔',
    reference: 'Sahih al-Bukhari 887'
  },
  {
    id: 'groom-2',
    category: 'grooming',
    titleEn: 'Applying Pleasant Non-Alcoholic Fragrance (Ittar)',
    titleUr: 'عطر اور خوشبو لگانا',
    descriptionEn: 'Applying perfume/ittar is a cherished Sunnah, particularly on Fridays and for prayer gatherings.',
    descriptionUr: 'خوشبو لگانا پیارے نبی ﷺ کی محبوب سنت ہے، خصوصاً جمعہ کے دن اور باجماعت نمازوں میں۔',
    reference: 'Sahih Muslim 2253'
  },
  {
    id: 'greeting-1',
    category: 'greeting',
    titleEn: 'Initiating Salam with a Warm Smile',
    titleUr: 'پہل کر کے سلام کرنا اور مسکرانا',
    descriptionEn: 'Greet known and unknown Muslims with "As-Salaamu \'Alaykum wa Rahmatullah" and offer a warm handshake.',
    descriptionUr: 'جان پہچان والے اور انجان ہر مسلمان کو مسکرا کر سلام کریں اور مصافحہ کریں۔',
    reference: 'Sahih al-Bukhari 12'
  }
];
