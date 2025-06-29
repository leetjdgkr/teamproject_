# AdminPage - 관리자 인원 관리 페이지

직원 정보를 관리할 수 있는 React 기반의 관리자 페이지입니다. 사용자 조회, 정렬, 추가, 삭제, 열 너비 조정 기능 등을 제공합니다.

## 주요 기능

* 직원 목록 테이블 표시
* 행 클릭 시 상세 정보 수정
* 직원 추가 기능
* 직원 검색 및 정렬 기능
* 열 너비 마우스로 조절
* 열 너비 더블 클릭 시 자동 맞춰지기
* 다중 선택 후 일괄 삭제

---

## 화면 구성

| 기능                 | 설명             |
| ------------------ | ------------------------ |
| `AddButton`        | 직원 추가 버튼      |
| `AdminInformation` | 직원 정보 수정      |
| `AddPersonModal`   | 직원 추가           |
| 검색 / 정렬               | 사원번호, 이름, 전화번호로 필터링 및 정렬 |
| 테이블 열 너비 조절        | 마우스로 드래그 및 더블클릭 자동 맞춰지기  |

---

## 디렉토리 구조

```
adminpage/
│
├── adminPage.js              # 메인 관리자 페이지
├── adminInformation.js       # 정보 수정 
├── addPersonModal.js         # 직원 추가 
├── adminAddBtn.js            # 추가 버튼 
├── js/
│   └── adminPageLogic.js     # 필터/정렬 API 호출 로직
├── css/
│   └── adminPage.css         # 스타일시트
└── ...
```

---

## 설치 및 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm start
```

---

## API 호출 예시

`fetchFilteredPeople` 함수는 다음과 같은 형태로 데이터를 요청합니다:

```js
fetchFilteredPeople({
  filters: {
    employee_number: "1234",
    user_name: "홍길동",
  },
  sort: {
    key: "user_name",
    direction: "asc",
  },
});
```

---

## 사용된 기술 스택

* React
* JavaScript
* CSS
* Context API
* HTML Canvas API (열 너비 자동 계산)

---

## 작성자

* 남진우

---
