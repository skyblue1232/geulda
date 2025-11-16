## ❄️ Frontend Setup

### ⚙️ 아키텍처 및 프로젝트 구조
- **Framework:** Next.js (Page Router) + TypeScript  
- **Package Manager:** pnpm  
- **Architecture:** `src` 기반 FSD 적용  
  - `src/pages`: 라우팅 및 페이지 구성  
  - `src/shared`: 공통 컴포넌트, 훅, API, 유틸 통합  
- **Absolute Path:** `@/shared/*`, `@/pages/*` 등 명시적 절대경로 설정
---
#### 🎨 스타일링
- **Tailwind CSS v4** 적용  
- 글꼴, 색상, 전역 스타일을 별도 파일로 분리  
- 디자인 시스템 적용을 위한 커스텀 config 세팅

#### 🌐 API & 네트워크
- **Axios 기반 API 레이어** 구축  
  - 전역 axios instance (`instance.ts`) 정의  
- **인증 로직 완성**  
  - 401 발생 시 자동 토큰 재발급  
  - 중복 요청 시 Race Condition 방지 로직 구현

---

<img width="4068" height="1697" alt="1" src="https://github.com/user-attachments/assets/8cdd704d-2a71-441f-bc85-97d4b18adf67" />
<img width="4314" height="1798" alt="2" src="https://github.com/user-attachments/assets/1040e9ce-4b4f-4501-ad6f-8d108e4a795e" />
<img width="4314" height="1798" alt="3" src="https://github.com/user-attachments/assets/8e9b0439-d3bf-4974-95c1-76daeb9efb6a" />
<img width="4314" height="1798" alt="4" src="https://github.com/user-attachments/assets/c8a98718-75c6-41ae-a862-9afda7880e32" />
<img width="5752" height="1798" alt="5" src="https://github.com/user-attachments/assets/813109d0-2af8-4951-abbb-6f084b8dbadc" />
