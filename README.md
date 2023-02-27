# :bulb: Health Match

> 프로젝트 기간 : 2022.03.21(월) ~ 2022.05.30(월)

<img width="100%" alt="image" src="https://user-images.githubusercontent.com/59152019/221532132-ff3ff748-7949-4639-b83b-51f1fb6bd7ce.png">
<br/>

<b>Health Matching은 일반 사용자의 조건에 맞는 강사님을 찾아주고, 운동 커뮤니티를 제공하는 웹 서비스</b>

해당 프로젝트는 로그인 시 <b>회원 구분이 되어있지 않아 한 아이디로 실행</b>되었습니다.  
<details>
<summary>그럼 어떻게 매칭이 이루어지나요?</summary>
<div markdown="1">
<br/>
회원 구분이 되어있지 않는 것을 고려하여 <b>(강사)시간표 등록 시</b> DB로 전송되는 <b>시간표 등록 id값을 강사 번호로 구분</b>하고,  <br/>
(일반사용자)매칭조건설정 후 나타는 강사목록은 <b>마지막에 DB로 전송된 (일반사용자)매칭조건</b>과 <b>DB에 등록된 전체 (강사)시간표 정보를 비교</b>하여 <br/>
<b>같은 조건의 강사 목록</b>이 나타나도록 하였습니다.
</div>
</details>

<br/>

## :question: 프로젝트 계획 이유
- 헬스 입문의 어려움
- 운동 관련 커뮤니티 제공
- 코로나로 인한 헬스장 이용 제한
- 대면, 시간, 지역 등 조건에 맞는 강사 찾기
- 직접 상담하지 않고 온라인으로 확인 가능한 커리큘럼 제공

<br/>

## :clipboard: 담당 업무 
> 페이지 구성 및 기능(DB 데이터 전송 및 가져오기 등)을 담당했습니다.

1. 강사 스케줄 페이지 (스케줄 확인 + 등록 팝업)
2. 강사 커리큘럼 등록 페이지
3. 일반 사용자 매칭 조건 설정 페이지
4. 일반 사용자 조건 설정 후 강사 목록 페이지
5. 커리큘럼 상세 페이지
6. 매칭 완료 페이지
7. 전체 페이지 Footer 고정

<br/>

## :link: 실행 방법

- 프로그램 실행
```
$ npm install
``` 
```
$ npm start
``` 
<br/>

- 서버 실행
```
$ cd server
```
```
$ node server.js
```

<br/>

## :file_folder: 개발 환경
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC??style=flat-square&logo=Visual Studio Code&logoColor=white"/>

<br/>

## :hammer: 기술 스택
<img src="https://img.shields.io/badge/HTML5-E34F26??style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6??style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E??style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB??style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1??style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933??style=flat-square&logo=Node.js&logoColor=white"/>

<br/>

## :eyes: 기능 설명
기능|메인페이지|
|--|--|
|화면|<p align="center"><img width="850" height="450" src="https://user-images.githubusercontent.com/59152019/210941947-4ea80ce9-3386-4c66-8672-107788d3248a.gif">|
|설명|헬스 파트너 매칭 메인 페이지이다.|
<br/>

기능|회원가입 및 로그인|
|--|--|
|화면|<p align="center"><img width="850" height="450" src="https://user-images.githubusercontent.com/59152019/210941976-9770aad6-de72-466c-bbf5-b718428d9b59.gif">|
|설명|사용자는 회원가입 및 로그인을 할 수 있다. 회원가입 시 이메일 여부, 비밀번호 조건 등을 확인한다.|
<br/>

기능|강사 시간표 등록|
|--|--|
|화면|<p align="center"><img width="850" height="450" src="https://user-images.githubusercontent.com/59152019/210941978-5ee6eed8-8bcd-4fde-b5cc-a584e021af67.gif">|
|설명|강사는 캘린더의 빈 곳을 클릭하면 시간표를 등록할 수 있다.|
<br/>

기능|강사 커리큘럼 작성|
|--|--|
|화면|<p align="center"><img width="850" height="450" src="https://user-images.githubusercontent.com/59152019/210941980-fe60fc21-50e1-466b-859b-f0090dd72c37.gif">|
|설명|강사는 커리큘럼을 작성할 수 있다.|
<br/>

기능|게시판 글 작성|
|--|--|
|화면|<p align="center"><img width="850" height="450" src="https://user-images.githubusercontent.com/59152019/210941983-c827fc9d-0ce4-4772-b808-57ddc2db8141.gif">|
|설명|사용자는 게시판 목록을 확인하고 글을 작성할 수 있다.|
<br/>

기능|상세 글|
|--|--|
|화면|<p align="center"><img width="850" height="450" src="https://user-images.githubusercontent.com/59152019/210941985-4046b3cd-2370-4809-94b5-50c1cf346f7b.gif">|
|설명|사용자는 게시판 상세 글을 확인할 수 있다.|
<br/>

기능|사용자 조건 설정|
|--|--|
|화면|<p align="center"><img width="850" height="450" src="https://user-images.githubusercontent.com/59152019/210941987-584e49a4-cdf6-46f2-8e0d-015a2b2baf7f.gif">|
|설명|일반사용자는 조건을 설정하고 조건에 맞는 강사 목록을 확인할 수 있다.|
<br/>

기능|강사 목록 및 매칭완료|
|--|--|
|화면|<p align="center"><img width="850" height="450" src="https://user-images.githubusercontent.com/59152019/210941993-be0ffe95-645f-4381-a8ea-ac86a02725e5.gif">|
|설명|일반사용자는 조건에 맞게 추출된 강사 목록을 확인하고 강사의 커리큘럼을 확인하고 선택할 수 있다.<br/>원하는 조건의 강사를 선택한 후 매칭 완료 내역을 확인할 수 있다.|
<br/>

## :page_facing_up: 테스트 환경
- Google Chrome
