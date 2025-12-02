# EATi Frontend

**AI가 추천하는 점심 식사** - 메뉴 추천 및 같이 먹기 매칭 서비스 (Web Client)

## 📋 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [기술 스택](#-기술-스택)
3. [아키텍처](#-아키텍처)
4. [주요 기능 및 UI](#-주요-기능-및-ui)
5. [프로젝트 구조](#-프로젝트-구조)
6. [실행 방법](#-실행-방법)
7. [개발 현황](#-개발-현황)

---

## 🎯 프로젝트 소개

**EATi Web**은 사용자의 취향을 분석하여 점심 메뉴를 추천하고, 주변 동료들과 식사 파티를 모집할 수 있는 **반응형 웹 애플리케이션**입니다.
직관적인 카드 UI와 지도 기반 검색을 통해 최적의 사용자 경험(UX)을 제공합니다.

---

## 🛠 기술 스택

| 분류 | 기술 스택 |
| :--- | :--- |
| **Language** | JavaScript (ES6+) |
| **Framework** | **React 18** (Vite) |
| **State Management** | **Context API** (Auth), `useState`, `useEffect` |
| **Routing** | **React Router v6** (Protected Routes 적용) |
| **HTTP Client** | **Axios** (Interceptors 적용) |
| **Styling** | **CSS3** (Custom Responsive Design), Media Queries |
| **UI/UX Libraries** | `SweetAlert2` (Custom Modal), `js-cookie` |
| **Deploy** | Vercel (CI/CD) |

---

## 🏗 아키텍처

**Component-Based Architecture (컴포넌트 기반 아키텍처)**

애플리케이션을 **기능(Feature)과 재사용성(Reusability)**을 기준으로 계층화하여 설계했습니다.

graph TD
    User[User Client] -->|Access| Pages[Pages Layer]
    Pages -->|Compose| Components[Components Layer]
    Pages -->|Subscribe| Context[Context Layer\n(Global State)]
    Context -->|Request| API[API Layer\n(Axios)]
    Components -->|Trigger| Hooks[Custom Hooks]
    API -->|Fetch| Backend[EATi Backend API]
🔹 Layer 설계
Pages Layer (/pages): 라우팅과 페이지 단위의 비즈니스 로직을 담당 (View)

Components Layer (/components): 재사용 가능한 UI 조각 (Header, Cards, Modals)

Context Layer (/context): 전역 상태 관리 (로그인 세션, 유저 정보 유지)

API Layer (/api): 백엔드 서버와의 통신 규약 정의 및 Axios 설정

Hooks Layer (/hooks): 공통 로직 모듈화 (useRequireAuth 등)

---

##📱 주요 기능 및 UI
*1. 🤖 AI 메뉴 추천 (Home)
일 1회 스마트 팝업: 하루 한 번, 접속 시 AI가 추천 메뉴를 팝업으로 제안합니다.

쿠키 기반 제어: js-cookie를 활용하여 사용자 경험을 해치지 않도록 팝업 노출을 제어합니다.

카테고리 필터링: 한식, 중식, 일식 등 카테고리별로 메뉴 카드를 필터링하여 보여줍니다.

2. 🗺️ 스마트 검색 (Search)
지도/리스트 하이브리드 뷰: SearchMapPage에서 지도와 식당 리스트를 동시에 확인할 수 있습니다.

반응형 레이아웃: * Mobile: 세로 스크롤 (지도 상단, 리스트 하단)

PC: 가로 분할 (좌측 리스트, 우측 지도)

3. 🍚 같이 먹기 (Social)
파티 모집: 혼밥이 싫을 때, 원하는 메뉴로 식사 파티원을 모집할 수 있습니다.

보안 접근 (Security): useRequireAuth 훅을 통해 로그인된 사용자만 접근 가능하도록 보호합니다.

4. 🔐 인증 (Auth)
단계별 회원가입: 아이디 중복 체크, 이메일 인증 등 철저한 유효성 검사를 수행합니다.

로그인 상태 유지: LocalStorage와 Context를 연동하여 새로고침 시에도 로그인이 유지됩니다.

##📂 프로젝트 구조
Bash

src/
├── api/             # 백엔드 통신 (Axios Instance, API endpoints)
│   ├── authApi.js
│   ├── restaurantApi.js
│   └── axiosConfig.js
├── components/      # 재사용 UI 컴포넌트
│   ├── AI_Card.js
│   ├── Header.js
│   ├── RestaurantListItem.js
│   └── css/         # 컴포넌트별 스타일 분리
├── context/         # 전역 상태 (AuthContext)
├── hooks/           # 커스텀 훅 (useRequireAuth)
├── layouts/         # 레이아웃 템플릿 (MainLayout)
├── pages/           # 화면 페이지
│   ├── HomePage.js
│   ├── SearchMapPage.js
│   ├── LoginPage.js
│   ├── RestaurantDetailPage.js
│   └── css/         # 페이지별 스타일
└── data/            # Mock Data (개발용 데이터)

##🚀 실행 방법
사전 요구사항
Node.js 18+
npm
설치 및 실행
프로젝트 클론

Bash

git clone [https://github.com/YOUR-USERNAME/eati-web.git](https://github.com/YOUR-USERNAME/eati-web.git)
cd eati-web
패키지 설치

Bash

npm install
환경 변수 설정 (.env) 프로젝트 루트에 .env 파일을 생성합니다.

코드 스니펫

# 백엔드 API 주소
개발 서버 실행

Bash

npm run dev
# 또는 npm start
📊 개발 현황
✅ 완료된 작업
[x] 프로젝트 초기 설정: Vite + React 환경 구축

[x] UI/UX 디자인: 모바일 퍼스트 반응형 디자인 구현 (CSS)

[x] 라우팅: React Router v6 기반 페이지 이동 구조 설계

[x] 인증 시스템: 로그인/회원가입 UI 및 Context API 기반 상태 관리

[x] 기능 구현:

메인 홈 (필터링, 팝업)

지도 찾기 (레이아웃)

상세 페이지 (동적 라우팅)

🔄 진행 중
[ ] API 연동: 백엔드 API 배포 후 Mock Data를 실제 API 호출로 교체

[ ] 소켓 통신: 같이 먹기 실시간 채팅 기능 (예정)

👨‍💻 개발자 (Frontend)
GitHub: [본인 깃허브 링크]

Role: Frontend Architecture, UI Implementation, State Management