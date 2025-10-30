export interface EventData {
  id: number;
  name: string;
  address: string;
  description: string;
  date: string;
  imageSrc?: string;
}

export const eventData: EventData[] = [
  {
    id: 1,
    name: 'ICPC',
    address: '다솔관',
    description: '야르',
    date: '2025-10-31',
    imageSrc: '',
  },
  {
    id: 2,
    name: '아우름제',
    address: '울학교',
    description: '야르',
    date: '2025-10-31',
    imageSrc: '',
  },
  {
    id: 3,
    name: '졸업식',
    address: '가톨릭대학교',
    description: '야르',
    date: '2025-10-31',
    imageSrc: '',
  },
  {
    id: 4,
    name: '학술제',
    address: '가톨릭대학교',
    description: '야르',
    date: '2025-10-31',
    imageSrc: '',
  },
  {
    id: 5,
    name: '둡둗다다',
    address: '부천시청',
    description: '야르',
    date: '2025-10-31',
    imageSrc: '',
  },
  {
    id: 6,
    name: '배고파요',
    address: '부천역',
    description: '야르',
    date: '2025-10-31',
    imageSrc: '',
  },
  {
    id: 7,
    name: '마짐막 테스트',
    address: '가톨릭대학교',
    description: '야르',
    date: '2025-10-31',
    imageSrc: '',
  },
];
