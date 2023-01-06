# Health Match

> 프로젝트 기간 : 2022.03.21(월) ~ 2022.05.30(월)

> 담당 업무 : (강사)시간표등록, (강사)커리큘럼, (일반사용자)매칭조건설정, 강사목록 및 매칭완료

<br/>

해당 프로젝트는 로그인 시 회원구분이 되어있지 않아 한 아이디로 실행되었습니다.  
회원 구분이 되어있지 않는 것을 고려하여 (강사)시간표 등록 시 DB로 전송되는 시간표 등록 id값을 강사 번호로 구분하고,  
(일반사용자)매칭조건설정 후 나타는 강사목록은 마지막에 DB로 전송된 (일반사용자)매칭조건과  
DB에 등록된 전체 (강사)시간표 정보를 비교하여 같은 조건의 강사 목록이 나타나도록 하였습니다.

<br/>

## 프로젝트 계획 이유
코로나로 인해 헬스장 이용의 어려움과 인원 제한이 발생하였고,  
헬스 입문 시 정보 부족과 조건에 맞는 강사를 찾는데 어려움이 있어  
조건에 맞는 헬스 파트너 매칭 및 운동 관련 커뮤니티 웹 서비스를 제공하기 위해서 계획하게 되었습니다. 

<br/>
<br/>

## 실행 방법

- 프로그램 실행
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
<br/>

## 개발 환경
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC??style=flat-square&logo=Visual Studio Code&logoColor=white"/>
<br/>
<br/>

## 기술 스택
<img src="https://img.shields.io/badge/HTML5-E34F26??style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6??style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E??style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB??style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1??style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933??style=flat-square&logo=Node.js&logoColor=white"/>
<br/>
<br/>

## 기능 설명
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

## 테스트 환경
- Web
