### 🛠️ Initial Setup Complete
## [아키텍처 및 구조]
- **프레임워크:** Next.js (Page Router), TypeScript, pnpm 
- **구조:** src + FSD 아키텍처 적용 (src/pages-Auth 통합형, src/shared 분리)
- **절대 경로:** tsconfig.json에 @/shared/*, @/pages/* 등 명시적 절대 경로

## [핵심 라이브러리 통합]
- **스타일:** Tailwind CSS 설치 및 전역 스타일 분리
- **API:** Axios 설치 및 전역 인스턴스 (instance.ts) 정의
- **인증:** 토큰 자동 재발급(401 처리) 및 경쟁 조건(Race Condition) 방지 로직 구현
- **폼 관리:** React Hook Form 설치

<img width="4068" height="1697" alt="1" src="https://github.com/user-attachments/assets/8cdd704d-2a71-441f-bc85-97d4b18adf67" />
<img width="4314" height="1798" alt="2" src="https://github.com/user-attachments/assets/1040e9ce-4b4f-4501-ad6f-8d108e4a795e" />
<img width="4314" height="1798" alt="3" src="https://github.com/user-attachments/assets/8e9b0439-d3bf-4974-95c1-76daeb9efb6a" />
<img width="4314" height="1798" alt="4" src="https://github.com/user-attachments/assets/c8a98718-75c6-41ae-a862-9afda7880e32" />
<img width="5752" height="1798" alt="5" src="https://github.com/user-attachments/assets/813109d0-2af8-4951-abbb-6f084b8dbadc" />
