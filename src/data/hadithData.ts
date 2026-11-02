import { HadithItem } from '../types';

export const HADITH_COLLECTIONS: HadithItem[] = [
  // 1. Sahih al-Bukhari
  {
    id: 'bukhari-1',
    collection: 'Bukhari',
    bookName: 'Book of Revelation (Bad\' al-Wahy)',
    hadithNumber: 1,
    narrator: 'Umar ibn al-Khattab (RA)',
    arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
    translationEn: 'Actions are judged by intentions, and every person will get what he intended. So whoever emigrated for worldly gain or to marry a woman, his emigration was for that which he emigrated for.',
    translationUr: 'اعمال کا دارومدار نیتوں پر ہے اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی۔ پس جس کی ہجرت دنیا حاصل کرنے کے لیے ہو یا کسی عورت سے نکاح کے لیے، تو اس کی ہجرت اسی کے لیے ہے جس کے لیے اس نے ہجرت کی۔',
    grade: 'Sahih',
    topic: 'Intentions & Sincerity',
    reference: 'Sahih al-Bukhari 1'
  },
  {
    id: 'bukhari-13',
    collection: 'Bukhari',
    bookName: 'Book of Faith (Kitab al-Iman)',
    hadithNumber: 13,
    narrator: 'Anas ibn Malik (RA)',
    arabicText: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    translationEn: 'None of you truly believes until he loves for his brother what he loves for himself.',
    translationUr: 'تم میں سے کوئی شخص اس وقت تک سچا مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔',
    grade: 'Sahih',
    topic: 'Brotherhood & Compassion',
    reference: 'Sahih al-Bukhari 13'
  },
  {
    id: 'bukhari-6018',
    collection: 'Bukhari',
    bookName: 'Book of Good Manners (Kitab al-Adab)',
    hadithNumber: 6018,
    narrator: 'Abu Hurairah (RA)',
    arabicText: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ',
    translationEn: 'Whoever believes in Allah and the Last Day should speak good or remain silent; and whoever believes in Allah and the Last Day should honor his neighbor; and whoever believes in Allah and the Last Day should honor his guest.',
    translationUr: 'جو شخص اللہ اور آخرت کے دن پر ایمان رکھتا ہے اسے چاہیے کہ اچھی بات کہے یا خاموش رہے، اور جو اللہ اور یومِ آخرت پر ایمان رکھتا ہے وہ اپنے پڑوسی کی عزت کرے، اور جو اللہ اور یومِ آخرت پر ایمان رکھتا ہے وہ اپنے مہمان کی تکریم کرے۔',
    grade: 'Sahih',
    topic: 'Speech & Neighbor Rights',
    reference: 'Sahih al-Bukhari 6018'
  },

  // 2. Sahih Muslim
  {
    id: 'muslim-223',
    collection: 'Muslim',
    bookName: 'Book of Purification (Kitab al-Taharah)',
    hadithNumber: 223,
    narrator: 'Abu Malik al-Ash\'ari (RA)',
    arabicText: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ مَا بَيْنَ السَّمَاوَاتِ وَالأَرْضِ، وَالصَّلاَةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ',
    translationEn: 'Purity is half of faith, and Alhamdulillah fills the scale, and SubhanAllah and Alhamdulillah fill what is between heaven and earth. Prayer is light, charity is proof, patience is illumination, and the Quran is an argument for you or against you.',
    translationUr: 'پاکیزگی نصف ایمان ہے، اور الحمد للہ میزان کو بھر دیتا ہے، اور سبحان اللہ اور الحمد للہ زمین و آسمان کے درمیانی خلا کو بھر دیتے ہیں، اور نماز نور ہے، اور صدقہ برہان (دلیل) ہے، اور صبر روشنی ہے، اور قرآن تمہارے حق میں یا تمہارے خلاف حجت ہے۔',
    grade: 'Sahih',
    topic: 'Purification & Prayer',
    reference: 'Sahih Muslim 223'
  },
  {
    id: 'muslim-2564',
    collection: 'Muslim',
    bookName: 'Book of Virtue and Good Manners',
    hadithNumber: 2564,
    narrator: 'Abu Hurairah (RA)',
    arabicText: 'إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ',
    translationEn: 'Verily, Allah does not look at your appearances or your wealth, but rather He looks at your hearts and your actions.',
    translationUr: 'بیشک اللہ تمہاری صورتوں اور تمہارے مالوں کو نہیں دیکھتا، بلکہ وہ تمہارے دلوں اور تمہارے اعمال کو دیکھتا ہے۔',
    grade: 'Sahih',
    topic: 'Heart Purity & Devotion',
    reference: 'Sahih Muslim 2564'
  },

  // 3. Sunan Abu Dawood
  {
    id: 'abudawood-4941',
    collection: 'Abu Dawood',
    bookName: 'Book of General Behavior (Kitab al-Adab)',
    hadithNumber: 4941,
    narrator: 'Abdullah ibn Amr (RA)',
    arabicText: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
    translationEn: 'The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth, and the One in the heavens will have mercy on you.',
    translationUr: 'رحم کرنے والوں پر رحمان رحم فرماتا ہے۔ تم زمین والوں پر رحم کرو، آسمان والا تم پر رحم فرمائے گا۔',
    grade: 'Sahih',
    topic: 'Mercy & Compassion',
    reference: 'Sunan Abu Dawood 4941'
  },
  {
    id: 'abudawood-1479',
    collection: 'Abu Dawood',
    bookName: 'Book of Prayer (Kitab as-Salat)',
    hadithNumber: 1479,
    narrator: 'Al-Nu\'man ibn Bashir (RA)',
    arabicText: 'الدُّعَاءُ هُوَ الْعِبَادَةُ',
    translationEn: 'Supplication (Dua) is worship itself.',
    translationUr: 'دعا ہی اصل عبادت ہے۔',
    grade: 'Sahih',
    topic: 'Supplication & Dua',
    reference: 'Sunan Abu Dawood 1479'
  },

  // 4. Jami` at-Tirmidhi
  {
    id: 'tirmidhi-1987',
    collection: 'Tirmidhi',
    bookName: 'Book of Righteousness and Relations',
    hadithNumber: 1987,
    narrator: 'Abu Dharr (RA)',
    arabicText: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    translationEn: 'Your smiling in the face of your brother is charity for you.',
    translationUr: 'اپنے بھائی کے سامنے تمہارا مسکرانا تمہارے لیے صدقہ ہے۔',
    grade: 'Sahih',
    topic: 'Good Cheer & Charity',
    reference: 'Jami` at-Tirmidhi 1987'
  },
  {
    id: 'tirmidhi-2516',
    collection: 'Tirmidhi',
    bookName: 'Chapters on the Description of the Day of Judgment',
    hadithNumber: 2516,
    narrator: 'Ibn Abbas (RA)',
    arabicText: 'احْفَظِ اللَّهَ يَحْفَظْكَ، احْفَظِ اللَّهَ تَجِدْهُ تُجَاهَكَ، إِذَا سَأَلْتَ فَاسْأَلِ اللَّهَ، وَإِذَا اسْتَعَنْتَ فَاسْتَعِنْ بِاللَّهِ',
    translationEn: 'Be mindful of Allah and He will protect you. Be mindful of Allah and you will find Him before you. If you ask, ask of Allah; if you seek help, seek help from Allah.',
    translationUr: 'اللہ کے احکام کی حفاظت کرو وہ تمہاری حفاظت فرمائے گا، اللہ کے حقوق کا خیال رکھو تم اسے اپنے سامنے پاؤ گے، جب تم مانگو تو اللہ ہی سے مانگو، اور جب مدد طلب کرو تو اللہ ہی سے مدد طلب کرو۔',
    grade: 'Sahih',
    topic: 'Reliance & Mindfulness',
    reference: 'Jami` at-Tirmidhi 2516'
  },

  // 5. Sunan an-Nasa'i
  {
    id: 'nasai-3104',
    collection: 'Nasai',
    bookName: 'The Book of Jihad',
    hadithNumber: 3104,
    narrator: 'Mu\'awiyah ibn Jahima (RA)',
    arabicText: 'فَالْزَمْهَا فَإِنَّ الْجَنَّةَ تَحْتَ رِجْلَيْهَا',
    translationEn: 'Stay close to your mother, for Paradise lies beneath her feet.',
    translationUr: 'اپنی ماں کی خدمت کو لازم پکڑو کیونکہ جنت اس کے دونوں قدموں کے نیچے ہے۔',
    grade: 'Hasan',
    topic: 'Parents & Mother\'s Status',
    reference: 'Sunan an-Nasa\'i 3104'
  },
  {
    id: 'nasai-1300',
    collection: 'Nasai',
    bookName: 'Book of the Commencement of the Prayer',
    hadithNumber: 1300,
    narrator: 'Abu Hurairah (RA)',
    arabicText: 'أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ فَأَكْثِرُوا الدُّعَاءَ',
    translationEn: 'The nearest a servant comes to his Lord is when he is in prostration, so supplicate abundantly therein.',
    translationUr: 'بندہ اپنے رب کے سب سے زیادہ قریب اس وقت ہوتا ہے جب وہ سجدے میں ہو، پس (سجدے میں) کثرت سے دعا کیا کرو۔',
    grade: 'Sahih',
    topic: 'Prostration & Prayer',
    reference: 'Sunan an-Nasa\'i 1300'
  },

  // 6. Sunan Ibn Majah
  {
    id: 'ibnmajah-224',
    collection: 'Ibn Majah',
    bookName: 'The Book of the Sunnah (Introduction)',
    hadithNumber: 224,
    narrator: 'Anas ibn Malik (RA)',
    arabicText: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    translationEn: 'Seeking knowledge is an obligation upon every Muslim.',
    translationUr: 'علم حاصل کرنا ہر مسلمان پر فرض ہے۔',
    grade: 'Sahih',
    topic: 'Pursuit of Knowledge',
    reference: 'Sunan Ibn Majah 224'
  },
  {
    id: 'ibnmajah-4101',
    collection: 'Ibn Majah',
    bookName: 'Chapters on Zuhd (Asceticism)',
    hadithNumber: 4101,
    narrator: 'Sahl ibn Sa\'d (RA)',
    arabicText: 'ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ، وَازْهَدْ فِيمَا فِي أَيْدِي النَّاسِ يُحِبَّكَ النَّاسُ',
    translationEn: 'Renounce desire for the world and Allah will love you; renounce desire for what people possess and the people will love you.',
    translationUr: 'دنیا کی حرص سے بے رغبت ہو جاؤ اللہ تم سے محبت فرمائے گا، اور جو کچھ لوگوں کے پاس ہے اس سے بے نیازی اختیار کرو لوگ تم سے محبت کریں گے۔',
    grade: 'Hasan',
    topic: 'Contentment & Zuhd',
    reference: 'Sunan Ibn Majah 4101'
  },

  // Special Selection: 40 Hadith Nawawi
  {
    id: 'nawawi-2',
    collection: 'Nawawi',
    bookName: 'Hadith Jibril (Articles of Faith, Islam & Ihsan)',
    hadithNumber: 2,
    narrator: 'Umar ibn al-Khattab (RA)',
    arabicText: 'قَالَ: فَأَخْبِرْنِي عَنِ الإِحْسَانِ. قَالَ: أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ',
    translationEn: 'He said: "Inform me about Ihsan (excellence in faith)." The Prophet replied: "It is to worship Allah as if you see Him, and if you do not see Him, then indeed He sees you."',
    translationUr: 'انھوں نے کہا: مجھے احسان کے بارے میں بتائیے۔ آپ ﷺ نے فرمایا: احسان یہ ہے کہ تم اللہ کی عبادت اس طرح کرو گویا تم اسے دیکھ رہے ہو، اور اگر تم اسے نہیں دیکھ رہے تو وہ تمہیں دیکھ رہا ہے۔',
    grade: 'Sahih',
    topic: 'Ihsan & Excellence',
    reference: 'Sahih Muslim 8 / 40 Hadith Nawawi 2'
  }
];
