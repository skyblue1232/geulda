const boardData = [
  //라벨-> id 로 변경 후 서버 데이터랑 매칭 필요
  [{ active: false }, { active: false }, { active: false }, { active: false }],
  [
    { active: true, placeId: 1, name: '김수환관' },
    { active: true, placeId: 2, name: '부천 아트 벙커' },
    { active: true, placeId: 3, name: '한국 만화 박물관' },
    { active: false },
  ],
  [
    { active: false },
    { active: false },
    { active: false },
    { active: true, placeId: 4, name: '상동 호수 공원' },
  ],
  [
    { active: false },
    { active: true, placeId: 5, name: '부천역 마루 광장' },
    { active: true, placeId: 6, name: '다솔관' },
    { active: true, placeId: 7, name: '부천 자유 시장' },
  ],
  [
    { active: false },
    { active: true, placeId: 8, name: '중앙도서관' },
    { active: false },
    { active: false },
  ],
  [
    { active: false },
    { active: false },
    { active: true, placeId: 9, name: '원미산 진달래 동산' },
    { active: false },
  ],
  [
    { active: false },
    { active: false },
    { active: false },
    { active: true, placeId: 10, name: '부천 호수 식물원 수피아' },
  ],
  [{ active: false }, { active: false }, { active: false }, { active: false }],
];
export { boardData };
