export const getCertIcon = (cert) => {
  const name = cert.name;
  const kws = cert.keywords || [];
  
  // 1. 등급별 뱃지
  if (name.includes('기술사')) return '👑';
  if (name.includes('기능장')) return '🏅';
  if (name.includes('명장')) return '⚜️';

  // 2. 전문직
  if (name.includes('변호사') || name.includes('법무사') || name.includes('노무사')) return '⚖️';
  if (name.includes('회계사') || name.includes('세무사')) return '💰';
  if (name.includes('의사') || name.includes('약사') || name.includes('간호사')) return '⚕️';

  // 3. 분야별
  if (kws.includes('전기') || kws.includes('전자') || kws.includes('반도체')) return '⚡';
  if (kws.includes('IT') || kws.includes('컴퓨터') || kws.includes('소프트웨어') || kws.includes('데이터')) return '💻';
  if (kws.includes('보안') || kws.includes('해킹')) return '🛡️';
  if (kws.includes('안전') || kws.includes('소방') || kws.includes('위험물')) return '🧯';
  if (kws.includes('건설') || kws.includes('건축') || kws.includes('토목')) return '🏗️';
  if (kws.includes('환경') || kws.includes('에너지')) return '🌿';
  if (kws.includes('기계') || kws.includes('자동차') || kws.includes('설비')) return '⚙️';
  if (kws.includes('운전') || kws.includes('중장비')) return '🚜';
  if (kws.includes('항공') || kws.includes('드론')) return '✈️';
  if (kws.includes('요리') || kws.includes('제과')) return '👨‍🍳';
  if (kws.includes('미용')) return '✂️';
  if (kws.includes('영어') || kws.includes('외국어')) return '🗣️';
  if (kws.includes('사무') || kws.includes('회계')) return '📝';
  if (kws.includes('디자인')) return '🎨';

  // Default
  return '📜';
};
