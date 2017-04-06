<-- 테스트 데이터 -->

-- 멤버 데이터
	insert into membs(name,age,email,pwd) values('김지환', 15, 'user01@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('천지연', 17, 'user02@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('정은성', 14, 'json.jeong@gmail.com', password('1111'));
	insert into membs(name,age,email,pwd) values('이석환', 18, 'user03@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('이연희', 15, 'user04@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('조인성', 38, 'mento01@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('엄진영', 45, 'mento02@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('바이오멘토', 39, 'mento03@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('재무멘토', 48, 'mento04@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('천문학멘토', 35, 'mento05@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('천문멘토', 37, 'mento06@test.com', password('1111'));

- 멘티 데이터
	insert into mentee(sno) values(1); 
	insert into mentee(sno) values(2); 
	insert into mentee(sno) values(3); 
	insert into mentee(sno) values(4); 
	insert into mentee(sno) values(5); 

- 멘토 데이터
	insert into mento(eno, sarea) values(6, '배우');
	insert into mento(eno, sarea) values(7, 'IT개발자');
	insert into mento(eno, sarea) values(8, '바이오');
	insert into mento(eno, sarea) values(9, '재무');
	insert into mento(eno, sarea) values(10, '천문학');
	insert into mento(eno, sarea) values(11, '천문학');


- 콘텐츠헤더 데이터
insert into contents(type) values('job');
insert into contents(type) values('video');
insert into contents(type) values('person');
insert into contents(type) values('plan');

- 직업 데이터
insert into job(cono, jbimg, jbnm, jbdsc) values(1, 'abce', '연구원', '연구한다'); 

- 콘텐츠 주제 데이터
	insert into copic(tno, cono) values(1, 2);
	insert into copic(tno, cono) values(1, 3);
	insert into copic(tno, cono) values(1, 4);
	insert into copic(tno, cono) values(1, 5);
	insert into copic(tno, cono) values(1, 6);
	insert into copic(tno, cono) values(1, 7);
	insert into copic(tno, cono) values(1, 8);
	insert into copic(tno, cono) values(1, 9);
	insert into copic(tno, cono) values(1, 10);
	insert into copic(tno, cono) values(1, 11);
  insert into copic(tno, cono) values(1, 12);
  insert into copic(tno, cono) values(1, 13);
  insert into copic(tno, cono) values(1, 14);
  insert into copic(tno, cono) values(1, 15);
	insert into copic(tno, cono) values(1, 16);
	insert into copic(tno, cono) values(1, 17);
	insert into copic(tno, cono) values(1, 18);
	insert into copic(tno, cono) values(1, 19);
	insert into copic(tno, cono) values(1, 20);
	insert into copic(tno, cono) values(1, 21);
	insert into copic(tno, cono) values(1, 22);
	insert into copic(tno, cono) values(1, 23);
	insert into copic(tno, cono) values(1, 24);

	- 아래부터 설계도 리스트
  insert into copic(tno, cono) values(1, 37);
  insert into copic(tno, cono) values(1, 38);
  insert into copic(tno, cono) values(1, 39); 
  insert into copic(tno, cono) values(1, 40);
  insert into copic(tno, cono) values(1, 41);
  insert into copic(tno, cono) values(1, 42);
  insert into copic(tno, cono) values(1, 43);
  insert into copic(tno, cono) values(1, 44);
  insert into copic(tno, cono) values(1, 45);
  insert into copic(tno, cono) values(1, 46);
  
  insert into copic(tno, cono) values(1, 494);
  insert into copic(tno, cono) values(1, 495);
  insert into copic(tno, cono) values(1, 496);
  insert into copic(tno, cono) values(1, 497);
  insert into copic(tno, cono) values(1, 498);

- 검사결과 데이터
	insert into result(sno, type, rer) values(5, 'mbti', 'istp');
	
	- 주제 데이터
  insert into topic(tnm) values('천문학'); 
  insert into topic(tnm) values('바이오테크'); 
  insert into topic(tnm) values('재무'); 

- 추천주제 데이터
	insert into snatr(tno, define) values(1, 'ISTP');  
	insert into snatr(tno, define) values(2, 'ISTP');  
	insert into snatr(tno, define) values(3, 'ISTP');
	
	insert into snatr(tno, define) values(1, 'INTP');  
  insert into snatr(tno, define) values(2, 'INTP');  
  insert into snatr(tno, define) values(3, 'INTP');
  
  insert into snatr(tno, define) values(1, 'ENTJ');  
  insert into snatr(tno, define) values(2, 'ENTJ');  
  insert into snatr(tno, define) values(3, 'ENTJ');
  
  insert into snatr(tno, define) values(1, 'ENTP');  
  insert into snatr(tno, define) values(2, 'ENTP');  
  insert into snatr(tno, define) values(3, 'ENTP');
  
  insert into snatr(tno, define) values(1, 'INFJ');  
  insert into snatr(tno, define) values(2, 'INFJ');  
  insert into snatr(tno, define) values(3, 'INFJ');
  
  insert into snatr(tno, define) values(1, 'INFP');  
  insert into snatr(tno, define) values(2, 'INFP');  
  insert into snatr(tno, define) values(3, 'INFP');
  
  insert into snatr(tno, define) values(1, 'ENFJ');  
  insert into snatr(tno, define) values(2, 'ENFJ');  
  insert into snatr(tno, define) values(3, 'ENFJ');

  insert into snatr(tno, define) values(1, 'ENFP');  
  insert into snatr(tno, define) values(2, 'ENFP');  
  insert into snatr(tno, define) values(3, 'ENFP');
  
  insert into snatr(tno, define) values(1, 'ISTJ');  
  insert into snatr(tno, define) values(2, 'ISTJ');  
  insert into snatr(tno, define) values(3, 'ISTJ');
  
  insert into snatr(tno, define) values(1, 'ISFJ');  
  insert into snatr(tno, define) values(2, 'ISFJ');  
  insert into snatr(tno, define) values(3, 'ISFJ');
  
  insert into snatr(tno, define) values(1, 'ESTJ');  
  insert into snatr(tno, define) values(2, 'ESTJ');  
  insert into snatr(tno, define) values(3, 'ESTJ');
  
  insert into snatr(tno, define) values(1, 'ESFJ');  
  insert into snatr(tno, define) values(2, 'ESFJ');  
  insert into snatr(tno, define) values(3, 'ESFJ');
  
  insert into snatr(tno, define) values(1, 'ISFP');  
  insert into snatr(tno, define) values(2, 'ISFP');  
  insert into snatr(tno, define) values(3, 'ISFP');
  
  insert into snatr(tno, define) values(1, 'ESTP');  
  insert into snatr(tno, define) values(2, 'ESTP');  
  insert into snatr(tno, define) values(3, 'ESTP');
  
  insert into snatr(tno, define) values(1, 'ESFP');  
  insert into snatr(tno, define) values(2, 'ESFP');  
  insert into snatr(tno, define) values(3, 'ESFP');
  
  
  - 검사결과 16가지 정의 
  insert into res_define(define) values('INTJ');
  insert into res_define(define) values('INTP');
  insert into res_define(define) values('ENTJ');
  insert into res_define(define) values('ENTP');
  insert into res_define(define) values('INFJ');
  insert into res_define(define) values('INFP');
  insert into res_define(define) values('ENFJ');
  insert into res_define(define) values('ENFP');
  insert into res_define(define) values('ISTJ');
  insert into res_define(define) values('ISFJ');
  insert into res_define(define) values('ESTJ');
  insert into res_define(define) values('ESFJ');
  insert into res_define(define) values('ISTP');
  insert into res_define(define) values('ISFP');
  insert into res_define(define) values('ESTP');
  insert into res_define(define) values('ESFP');
  
  
- 질의응답 데이터
insert into qna(cono,sno) values(38,5);
insert into qna(cono,sno) values(38,1);
insert into qna(cono,sno) values(38,2);

insert into qna(cono,sno) values(5,5);
insert into qna(cono,sno) values(5,1);
insert into qna(cono,sno) values(5,2);
	
	
	
	- 좋아요 비디오 목록 불러오기
	 select * from video vd
  inner join contents ctt on vd.cono = ctt.cono
  inner join copic cp on ctt.cono = cp.cono
  inner join topic tp on cp.tno = tp.tno
  inner join snatr snt on tp.tno = snt.tno 
  inner join result ret on snt.reno = ret.reno 
  inner join mentee mte on ret.sno = mte.sno
  inner join lklst lk on ctt.cono = lk.cono
  where ret.sno = '5';
  
  
     select * from plan pl
  inner join contents ctt on pl.cono = ctt.cono
  inner join copic cp on ctt.cono = cp.cono
  inner join topic tp on cp.tno = tp.tno
  inner join snatr snt on tp.tno = snt.tno 
  inner join result ret on snt.reno = ret.reno 
  inner join mentee mte on ret.sno = mte.sno
  inner join lklst lk on ctt.cono = lk.cono
  where ret.sno = '5'\G


<-- SELECT query --> 

- mbti 검사 결과 기준 추천인물 select 하기
	select * from person ps
	inner join contents ctt on ps.cono = ctt.cono
	inner join copic cp on ctt.cono = cp.cono
	inner join topic tp on cp.tno = tp.tno
	inner join snatr snt on tp.tno = snt.tno 
	inner join result ret on snt.reno = ret.reno 
	where ret.sno = '5';

- mbti 검사 결과 기준 추천영상 select 하기
	select DISTINCT vd.cono from video vd
	inner join contents ctt on vd.cono = ctt.cono
	inner join copic cp on ctt.cono = cp.cono
	inner join topic tp on cp.tno = tp.tno
	inner join snatr snt on tp.tno = snt.tno 
	inner join result ret on snt.reno = ret.reno
	where ret.sno = '5'
	
	- mbti 검사 결과 기준 추천영상 select 하기 (좋아요 포함)
  select vd.cono as cono, vd.kotl, lst.sno
  from video vd
	  inner join contents ctt on vd.cono = ctt.cono
	  inner join copic cp on ctt.cono = cp.cono
	  inner join topic tp on cp.tno = tp.tno
	  inner join snatr snt on tp.tno = snt.tno 
	  inner join result ret on snt.reno = ret.reno
	  inner join lklst lst on ctt.cono = lst.cono
  where ret.sno = '5';
  
  select cono from lklst
  where cono = 2 and sno = 5
     or cono = 5 and sno = 5
     or cono = 5 and sno = 5
     or cono = 5 and sno = 5
     or cono = 5 and sno = 5
     or cono = 5 and sno = 5

- mbti 검사 결과 기준 추천직업 select 하기
	select * from job
	inner join contents ctt on job.cono = ctt.cono
	inner join copic cp on ctt.cono = cp.cono
	inner join topic tp on cp.tno = tp.tno
	inner join snatr snt on tp.tno = snt.tno 
	inner join result ret on snt.reno = ret.reno 
	where ret.sno = '5';

- mbti 검사 결과 기준 추천멘토 select 하기
	select * from plan
	inner join contents ctt on plan.cono = ctt.cono
	inner join copic cp on ctt.cono = cp.cono
	inner join topic tp on cp.tno = tp.tno
	inner join snatr snt on tp.tno = snt.tno 
	inner join result ret on snt.reno = ret.reno
	inner join membs mb on mb.mno = plan.eno
	where ret.sno = '5';



	
	
	
	
	
	
	
==============================================================================================	
	모든 테이블 삭제
SET @tables = NULL;
 SELECT GROUP_CONCAT(table_schema, '.', table_name) INTO @tables
   FROM information_schema.tables 
   WHERE table_schema = 'sdb'; -- specify DB name here.
 SET @tables = CONCAT('DROP TABLE ', @tables);
 PREPARE stmt FROM @tables;
 EXECUTE stmt;
 DEALLOCATE PREPARE stmt;
	
	============================================================================================
	
	
	
	
	
	
	
	
	
