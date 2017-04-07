### SNS_Project

참여자 : 박찬우, 엄호경, 박춘호

목표 : 미니 프로젝트 수행 간 협업을 체험해보고 어떻게 하면 더 나은 협업이 될지 고민해보고 토론하며 적용해본다.

사용 기술 : HTML, CSS, JS, Nodejs, MySql

###### 프로젝트 예시 이미지

![image](https://cloud.githubusercontent.com/assets/7167344/24348347/5a836cbc-1316-11e7-88d9-778f47d78367.png)

프로젝트는 크게 3가지 파트로 나뉘며 한 파트씩 담당한다.

- 게시물 작성 기능

> 담당자 : 박찬우
>
>게시글 작성란 클릭시에 백그라운드 어두운색으로 투명 해진다.
>
>게시글 작성 중에는 스크롤 고정한다.
>
>게시글 작성 상태에서 나오면 다시 스크롤 가능 모드. 
>
>게시글은 글, (/*사진*/보류)을 올릴수 있으며 기분과 활동을 나타내주는 버튼이 있다.

- 게시물 영역 기능

> 담당자 : 엄호경
>
>게시글 upload시에는 최상단에서부터 아래로 밀어넣기.
>
>스크롤 끝 까지 내려가면 그다음 게시물을 로드해 무한 스크롤링 되도록 한다.
>
>게시글 우측 상단의 v버튼을 누르면 게시물 삭제, 게시물 수정 기능 들이 있다.
>
>게시글 좌층 상단에는 아이디,프로필 사진이 있다.
>
>아이디 아래에 작성시간 나타난다.
>
>좋아요 기능 추가 댓글 기능은 x 공유하기 x

- 로그인 기능

> 담당자 : 박춘호
>
>회원가입기능ㅇ
>
>로그인,로그아웃 기능 ㅇ

##### Backlog
3.28 프로젝트 백로그 작성
[Backlog](https://docs.google.com/spreadsheets/d/1nMgwXN6MQNQbCNf4bs4PR7NoABAu9KM9CY-XbmV8cmE/edit#gid=0)

### DB
USER
```
  id VARCHAR(24) PRIMARY KEY
  pw VARCHAR(16)
  img VARCHAR(100)
  name VARCHAR(16)
```
POST
```
  userId VARCHAR(24)
  postTime DATETIME
  postNum INT(10) PRIMARY KEY AUTO_INCREMENT
  likeNum INT(5)
  content TEXT
```