// 국가기술자격 및 국가전문자격 데이터베이스
// 분류(type): tech(국가기술), special(국가전문), global(해외/국제), language(어학)

export const ALL_CERTIFICATES = [
  // === IT / 정보통신 ===
  { id: 'tech_001', name: '정보처리기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['컴퓨터', 'IT', '소프트웨어'] },
  { id: 'tech_002', name: '정보처리산업기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['컴퓨터', 'IT'] },
  { id: 'tech_003', name: '정보처리기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['컴퓨터', 'IT'] },
  { id: 'tech_004', name: '정보보안기사', type: 'tech', issuer: 'KISA', keywords: ['보안', '해킹'] },
  { id: 'tech_005', name: '정보보안산업기사', type: 'tech', issuer: 'KISA', keywords: ['보안'] },
  { id: 'tech_006', name: '빅데이터분석기사', type: 'tech', issuer: '한국데이터산업진흥원', keywords: ['데이터', '분석'] },
  { id: 'tech_007', name: '사무자동화산업기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['사무', '엑셀'] },
  { id: 'tech_008', name: '컴퓨터활용능력 1급', type: 'tech', issuer: '대한상공회의소', keywords: ['엑셀', '데이터베이스'] },
  { id: 'tech_009', name: '컴퓨터활용능력 2급', type: 'tech', issuer: '대한상공회의소', keywords: ['엑셀'] },
  { id: 'tech_010', name: '워드프로세서', type: 'tech', issuer: '대한상공회의소', keywords: ['문서'] },
  { id: 'tech_011', name: '전자계산기조직응용기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['하드웨어'] },
  { id: 'tech_012', name: '정보통신기사', type: 'tech', issuer: '한국방송통신전파진흥원', keywords: ['통신', '네트워크'] },
  { id: 'tech_013', name: '무선설비기사', type: 'tech', issuer: '한국방송통신전파진흥원', keywords: ['통신', '무선'] },

  // === 전기 / 전자 ===
  { id: 'tech_101', name: '전기기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['전기', '공사'] },
  { id: 'tech_102', name: '전기산업기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['전기'] },
  { id: 'tech_103', name: '전기공사기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['전기', '공사'] },
  { id: 'tech_104', name: '전기기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['전기'] },
  { id: 'tech_105', name: '소방설비기사(전기)', type: 'tech', issuer: '한국산업인력공단', keywords: ['소방', '전기'] },
  { id: 'tech_106', name: '전자기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['전자', '회로'] },
  { id: 'tech_107', name: '승강기기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['기계', '안전'] },

  // === 안전 / 환경 / 에너지 ===
  { id: 'tech_201', name: '산업안전기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['안전'] },
  { id: 'tech_202', name: '산업안전산업기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['안전'] },
  { id: 'tech_203', name: '건설안전기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['건설', '안전'] },
  { id: 'tech_204', name: '위험물산업기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['화학', '안전'] },
  { id: 'tech_205', name: '위험물기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['화학'] },
  { id: 'tech_206', name: '대기환경기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['환경'] },
  { id: 'tech_207', name: '수질환경기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['환경', '물'] },
  { id: 'tech_208', name: '폐기물처리기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['환경'] },
  { id: 'tech_209', name: '가스기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['가스', '에너지'] },
  { id: 'tech_210', name: '에너지관리기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['에너지', '보일러'] },
  { id: 'tech_211', name: '소방설비기사(기계)', type: 'tech', issuer: '한국산업인력공단', keywords: ['소방', '기계'] },
  { id: 'tech_212', name: '산업위생관리기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['위생', '보건'] },

  // === 건설 / 건축 / 토목 ===
  { id: 'tech_301', name: '건축기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['건축', '설계'] },
  { id: 'tech_302', name: '실내건축기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['인테리어', '건축'] },
  { id: 'tech_303', name: '토목기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['토목', '건설'] },
  { id: 'tech_304', name: '조경기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['조경', '식물'] },
  { id: 'tech_305', name: '도시계획기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['도시'] },
  { id: 'tech_306', name: '측량및지형공간정보기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['측량', '지도'] },
  { id: 'tech_307', name: '전산응용건축제도기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['CAD', '건축'] },

  // === 기계 / 운전 / 정비 ===
  { id: 'tech_401', name: '일반기계기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['기계', '설계'] },
  { id: 'tech_402', name: '공조냉동기계기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['에어컨', '기계'] },
  { id: 'tech_403', name: '지게차운전기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['운전', '중장비'] },
  { id: 'tech_404', name: '굴착기운전기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['운전', '중장비'] },
  { id: 'tech_405', name: '자동차정비기사', type: 'tech', issuer: '한국산업인력공단', keywords: ['자동차'] },
  { id: 'tech_406', name: '자동차정비기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['자동차'] },

  // === 조리 / 제과 / 제빵 / 미용 ===
  { id: 'tech_501', name: '한식조리기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['요리'] },
  { id: 'tech_502', name: '양식조리기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['요리'] },
  { id: 'tech_503', name: '일식조리기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['요리'] },
  { id: 'tech_504', name: '중식조리기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['요리'] },
  { id: 'tech_505', name: '제과기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['빵'] },
  { id: 'tech_506', name: '제빵기능사', type: 'tech', issuer: '한국산업인력공단', keywords: ['빵'] },
  { id: 'tech_507', name: '미용사(일반)', type: 'tech', issuer: '한국산업인력공단', keywords: ['미용'] },
  { id: 'tech_508', name: '미용사(피부)', type: 'tech', issuer: '한국산업인력공단', keywords: ['피부'] },
  { id: 'tech_509', name: '미용사(네일)', type: 'tech', issuer: '한국산업인력공단', keywords: ['네일'] },

  // === 국가전문자격 ===
  { id: 'spec_001', name: '변호사', type: 'special', issuer: '법무부', keywords: ['법'] },
  { id: 'spec_002', name: '공인회계사(CPA)', type: 'special', issuer: '금융감독원', keywords: ['회계'] },
  { id: 'spec_003', name: '세무사', type: 'special', issuer: '국세청', keywords: ['세금'] },
  { id: 'spec_004', name: '관세사', type: 'special', issuer: '관세청', keywords: ['무역'] },
  { id: 'spec_005', name: '변리사', type: 'special', issuer: '특허청', keywords: ['특허'] },
  { id: 'spec_006', name: '법무사', type: 'special', issuer: '법원행정처', keywords: ['법'] },
  { id: 'spec_007', name: '감정평가사', type: 'special', issuer: '국토교통부', keywords: ['부동산'] },
  { id: 'spec_008', name: '공인노무사', type: 'special', issuer: '고용노동부', keywords: ['노동'] },
  { id: 'spec_009', name: '공인중개사', type: 'special', issuer: '국토교통부', keywords: ['부동산'] },
  { id: 'spec_010', name: '주택관리사보', type: 'special', issuer: '국토교통부', keywords: ['아파트'] },
  { id: 'spec_011', name: '사회복지사 1급', type: 'special', issuer: '보건복지부', keywords: ['복지'] },
  { id: 'spec_012', name: '보육교사 1급', type: 'special', issuer: '보건복지부', keywords: ['교육'] },
  { id: 'spec_013', name: '청소년상담사 1급', type: 'special', issuer: '여성가족부', keywords: ['상담'] },
  { id: 'spec_014', name: '직업상담사 1급', type: 'special', issuer: '고용노동부', keywords: ['상담'] },
  { id: 'spec_015', name: '직업상담사 2급', type: 'special', issuer: '고용노동부', keywords: ['상담'] },
  { id: 'spec_016', name: '한국사능력검정시험(심화)', type: 'special', issuer: '국사편찬위원회', keywords: ['역사'] },
  { id: 'spec_017', name: '물류관리사', type: 'special', issuer: '국토교통부', keywords: ['물류'] },
  { id: 'spec_018', name: '유통관리사 2급', type: 'special', issuer: '대한상공회의소', keywords: ['유통'] },
  { id: 'spec_019', name: '행정사', type: 'special', issuer: '행정안전부', keywords: ['행정'] },
  { id: 'spec_020', name: '가맹거래사', type: 'special', issuer: '공정거래위원회', keywords: ['프랜차이즈'] },
  { id: 'spec_021', name: '손해사정사', type: 'special', issuer: '금융감독원', keywords: ['보험'] },
  { id: 'spec_022', name: '보험계리사', type: 'special', issuer: '금융감독원', keywords: ['보험'] },

  // === 민간/기타 (유명한 것 몇 가지만 포함 요청에 따라 제외 가능하나 호환성 위해 유지) ===
  { id: 'pvt_001', name: 'SQLD', type: 'special', issuer: '한국데이터산업진흥원', keywords: ['데이터'] },
  { id: 'pvt_002', name: 'ADsP', type: 'special', issuer: '한국데이터산업진흥원', keywords: ['데이터'] },
  { id: 'pvt_003', name: '리눅스마스터 2급', type: 'special', issuer: 'KAIT', keywords: ['리눅스'] },
  { id: 'pvt_004', name: '네트워크관리사 2급', type: 'special', issuer: 'ICQA', keywords: ['네트워크'] },
  { id: 'pvt_005', name: '재경관리사', type: 'special', issuer: '삼일회계법인', keywords: ['회계'] },
  { id: 'pvt_006', name: '전산세무 1급', type: 'special', issuer: '한국세무사회', keywords: ['세무'] },
  { id: 'pvt_007', name: '전산세무 2급', type: 'special', issuer: '한국세무사회', keywords: ['세무'] },
  { id: 'pvt_008', name: '전산회계 1급', type: 'special', issuer: '한국세무사회', keywords: ['회계'] },
  { id: 'pvt_009', name: 'GTQ 1급', type: 'special', issuer: 'KPC', keywords: ['디자인'] },
  
  // === 어학 ===
  { id: 'lang_001', name: '토익 (TOEIC)', type: 'language', issuer: 'ETS', keywords: ['영어'] },
  { id: 'lang_002', name: '토익스피킹', type: 'language', issuer: 'ETS', keywords: ['영어', '말하기'] },
  { id: 'lang_003', name: 'OPIC', type: 'language', issuer: 'ACTFL', keywords: ['영어', '말하기'] },
  { id: 'lang_004', name: 'JLPT N1', type: 'language', issuer: '일본국제교류기금', keywords: ['일본어'] },
  { id: 'lang_005', name: 'JLPT N2', type: 'language', issuer: '일본국제교류기금', keywords: ['일본어'] },
  { id: 'lang_006', name: 'HSK 6급', type: 'language', issuer: '중국국가한반', keywords: ['중국어'] },
  { id: 'lang_007', name: 'HSK 5급', type: 'language', issuer: '중국국가한반', keywords: ['중국어'] },
  { id: 'lang_008', name: 'KBS한국어능력시험', type: 'language', issuer: 'KBS', keywords: ['한국어'] },

  // === 해외/국제 ===
  { id: 'glob_001', name: 'AWS SAA', type: 'global', issuer: 'AWS', keywords: ['클라우드'] },
  { id: 'glob_002', name: 'AWS SAP', type: 'global', issuer: 'AWS', keywords: ['클라우드'] },
  { id: 'glob_003', name: 'PMP', type: 'global', issuer: 'PMI', keywords: ['매니지먼트'] },
  { id: 'glob_004', name: 'CISA', type: 'global', issuer: 'ISACA', keywords: ['감사'] },
  { id: 'glob_005', name: 'CISSP', type: 'global', issuer: 'ISC2', keywords: ['보안'] },
  { id: 'glob_006', name: 'Google Analytics (GA4)', type: 'global', issuer: 'Google', keywords: ['마케팅'] },
];

// Helper to determine icon based on keywords
export const getCertIcon = (cert) => {
  const name = cert.name.toLowerCase();
  const kws = cert.keywords || [];
  
  if (kws.includes('전기') || kws.includes('에너지')) return '⚡';
  if (kws.includes('컴퓨터') || kws.includes('소프트웨어') || kws.includes('IT')) return '💻';
  if (kws.includes('보안') || kws.includes('해킹')) return '🛡️';
  if (kws.includes('데이터') || kws.includes('분석')) return '📊';
  if (kws.includes('클라우드')) return '☁️';
  if (kws.includes('안전') || kws.includes('소방')) return '🧯';
  if (kws.includes('환경') || kws.includes('물')) return '🌿';
  if (kws.includes('건축') || kws.includes('건설') || kws.includes('토목')) return '🏗️';
  if (kws.includes('기계') || kws.includes('설계')) return '⚙️';
  if (kws.includes('운전') || kws.includes('자동차')) return '🚗';
  if (kws.includes('요리') || kws.includes('빵')) return '👨‍🍳';
  if (kws.includes('미용') || kws.includes('피부')) return '✂️';
  if (kws.includes('법') || kws.includes('특허')) return '⚖️';
  if (kws.includes('회계') || kws.includes('세무') || kws.includes('돈')) return '💰';
  if (kws.includes('부동산')) return '🏠';
  if (kws.includes('영어') || kws.includes('일본어') || kws.includes('중국어')) return '🗣️';
  if (kws.includes('문서') || kws.includes('사무')) return '📝';
  if (kws.includes('디자인')) return '🎨';
  if (name.includes('기술사')) return '👑';
  
  return '📜'; // Default
};
