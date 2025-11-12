const boardData = [
  //라벨-> id 로 변경 후 서버 데이터랑 매칭 필요
  [{ active: false }, { active: false }, { active: false }, { active: false }],
  [
    { active: true, placeId: 1 },
    { active: true, placeId: 2 },
    { active: true, placeId: 3 },
    { active: false },
  ],
  [
    { active: false },
    { active: false },
    { active: false },
    { active: true, placeId: 4 },
  ],
  [
    { active: false },
    { active: true, placeId: 5 },
    { active: true, placeId: 6 },
    { active: true, placeId: 7 },
  ],
  [
    { active: false },
    { active: true, placeId: 8 },
    { active: false },
    { active: false },
  ],
  [
    { active: false },
    { active: false },
    { active: true, placeId: 9 },
    { active: false },
  ],
  [
    { active: false },
    { active: false },
    { active: false },
    { active: true, placeId: 10 },
  ],
  [{ active: false }, { active: false }, { active: false }, { active: false }],
];
export { boardData };
