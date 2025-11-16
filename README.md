## ❄️ Frontend Setup

### ⚙️ 아키텍처 및 프로젝트 구조
- **Framework:** Next.js (Page Router) + TypeScript  
- **Package Manager:** pnpm  
- **Architecture:** `src` 기반 FSD 적용  
  - `src/pages`: 라우팅 및 페이지 구성  
  - `src/shared`: 공통 컴포넌트, 훅, API, 유틸 통합  
- **Absolute Path:** `@/shared/*`, `@/pages/*` 등 명시적 절대경로 설정

#### 🎨 스타일링
- **Tailwind CSS v4** 적용  
- 글꼴, 색상, 전역 스타일을 별도 파일로 분리  
- 디자인 시스템 적용을 위한 커스텀 config 세팅

#### 🔗 API 
- **Axios 기반 API 레이어** 구축  
  - 전역 axios instance (`instance.ts`) 정의  
- **인증 로직 완성**  
  - 401 발생 시 자동 토큰 재발급  
  - 중복 요청 시 Race Condition 방지 로직 구현

---

# 글다(geulDa)
> [글다 이용하기](https://www.geulda.kr/)
<img width="4068" height="1697" alt="image" src="https://github.com/user-attachments/assets/e32f0223-da7a-475d-99bb-f77fe5a64405" />

## 프론트 팀원
| 파트 | ✧ FE                              | FE                                      | FE                                      |
| ---- | -------------------------------- | ---------------------------------------- | ---------------------------------------- |
| 이름 | [이수민](https://github.com/KongMezu) | [김정민](https://github.com/jjangminii) | [고민균](https://github.com/skyblue1232) |


## 🩵 서비스 소개
<img width="4314" height="1798" alt="image" src="https://github.com/user-attachments/assets/7f9bf6eb-ea17-4d44-8388-05d8638ee71a" />
<img width="4314" height="1798" alt="image" src="https://github.com/user-attachments/assets/4d7daa9f-a3f4-4b12-ba00-a7f7e4dd7a31" />
<img width="5752" height="1798" alt="image" src="https://github.com/user-attachments/assets/6b080ad6-c549-4903-8a8d-6ede5061d30c" />
<img width="4314" height="1798" alt="image" src="https://github.com/user-attachments/assets/c3994407-a3b8-4630-b4ba-6e8555d011ce" />
