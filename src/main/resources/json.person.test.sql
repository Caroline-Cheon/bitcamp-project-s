<-- 테스트 데이터 -->

-- 멤버 데이터
	insert into membs(name,age,email,pwd) values('김지환', 15, 'user01@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('천지연', 17, 'user02@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('정은성', 14, 'json.jeong@gmail.com', password('1111'));
	insert into membs(name,age,email,pwd) values('이석환', 18, 'user03@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('이연희', 15, 'user04@test.com', password('1111'));
	insert into membs(name,age,email,pwd) values('조인성', 38, 'mento01@test.com', password('1111'));

- 멘티 데이터
	insert into mentee(sno) values(1); 
	insert into mentee(sno) values(2); 
	insert into mentee(sno) values(3); 
	insert into mentee(sno) values(4); 
	insert into mentee(sno) values(5); 

- 멘토 데이터
	insert into mento(eno, sarea) values(6, '배우'); 


- 콘텐츠헤더 데이터
	insert into contents(type) values('job');
	insert into contents(type) values('video');
	insert into contents(type) values('person');
	insert into contents(type) values('plan');
	insert into contents(type) values('video');
	insert into contents(type) values('video');
	insert into contents(type) values('video');
	insert into contents(type) values('video');
	insert into contents(type) values('video');
	insert into contents(type) values('video');


- 직업 데이터
	insert into job(cono, jbimg, jbnm, jbdsc) values(1, 'abce', '연구원', '연구한다'); 

- 영상 데이터
	insert into video(cono, kotl, entl, voimg, vodsc, spnm, sjob, simg, posted) values(5, '테스트 영상1', 'testVideo', 'teesthumb', 'desc', 'spk', 'spkjob', 'thumb',201703);
	insert into video(cono, kotl, entl, voimg, vodsc, spnm, sjob, simg, posted) values(6, '테스트 영상2', 'testVideo', 'teesthumb', 'desc', 'spk', 'spkjob', 'thumb',201703);
	insert into video(cono, kotl, entl, voimg, vodsc, spnm, sjob, simg, posted) values(7, '테스트 영상3', 'testVideo', 'teesthumb', 'desc', 'spk', 'spkjob', 'thumb',201703);
	insert into video(cono, kotl, entl, voimg, vodsc, spnm, sjob, simg, posted) values(8, '테스트 영상4', 'testVideo', 'teesthumb', 'desc', 'spk', 'spkjob', 'thumb',201703);
	insert into video(cono, kotl, entl, voimg, vodsc, spnm, sjob, simg, posted) values(9, '테스트 영상5', 'testVideo', 'teesthumb', 'desc', 'spk', 'spkjob', 'thumb',201703);
	insert into video(cono, kotl, entl, voimg, vodsc, spnm, sjob, simg, posted) values(10, '테스트 영상6', 'testVideo', 'teesthumb', 'desc', 'spk', 'spkjob', 'thumb',201703); 

- 인물 데이터
	insert into person(cono, psimg1, psimg2, psnm, psjob, psdsc) values(3, '썸네일1', '썸네일2', '인물이름', '인물직업', '인물설명'); 
	
	insert into contents(type) values('person'); 
	insert into person(cono, psimg1, psimg2, psnm, psjob, psdsc,pschl) 
    values
      (38, 
      'http://localhost:8080/bitcamp-project-s/mystuff/img/personImg/hubble.jpg', 
      'http://localhost:8080/bitcamp-project-s/mystuff/img/personImg/hubble(세로).jpg', 
      '에드윈 파월 허블(Edwin Powell Hubble)', 
      '미국의 천문학자', 
      '<pre><strong class="p-desc" style="font-size: 17px;">에드윈 파월 허블(Edwin Powell Hubble)은 미국의 천문학자이다.</strong><br>
그의 업적은 크게 두 가지가 있다. 그는 1921년 경 세페이드 변광성을 이용하여 
우주의 크기를 재었다. 이 발견은 후에 할로 섀플리와 히버 커티스의 대논쟁을 
종결하는 데 근거로 쓰였다. 또한, 그는 1929년 경 은하를 관측하여 그 스펙트럼의 
선에 나타나는 적색 편이를 시선 속도라고 해석하고, 후퇴하는 속도가 은하 간 
거리에 비례한다는 허블의 법칙을 발표하였다. 이는 우주가 팽창한다는 사실을 
뒷받침하여 이후 대폭발 이론의 기초가 된다. 
그의 발견 때문에 그는 여러 영예를 누렸다. 
허블 우주 망원경은 그의 이름을 따서 명명하였다.
</pre>',
      '여키스 천문대(Yerkes Observatory) 박사'
      );
	insert into person(cono, psimg1, psimg2, psnm, psjob, psdsc,pschl) 
    values
      (39, 
      'http://localhost:8080/bitcamp-project-s/mystuff/img/personImg/lee.jpg', 
      'http://localhost:8080/bitcamp-project-s/mystuff/img/personImg/studio/lee(세로).jpg', 
      '김연아', 
      '피겨스케이팅 선수', 
      '<pre><strong class="p-desc" style="font-size: 17px;">김연아는 대한민국의 은퇴한 국가대표 피겨 스케이팅 선수이다.</strong><br>
2010년 동계 올림픽 여자 싱글 부문 챔피언, 2014년 동계 올림픽 여자 싱글 부문 
은메달리스트, 2009년 · 2013년 세계 선수권 챔피언이며, 
대한민국 최초의 올림픽 메달리스트, 세계선수권대회 메달리스트이다.
2003년, 2004년, 2005년, 2006년, 2013년, 2014년 한국 피겨스케이팅 종합 선수권 
대회 우승자이기도 하다. 또한 2009년 4대륙 피겨 스케이팅 선수권 대회 우승, 
ISU 그랑프리 파이널 3회 우승을 통해 피겨 스케이팅의 여자 싱글 부문에서 
4대 국제 대회(동계 올림픽, 세계 선수권, 4대륙 선수권, 그랑프리 파이널)의 
그랜드 슬램을 사상 최초로 달성한 선수이기도 하다.
모두 11번의 세계 신기록을 수립했으며, 
이 중 8번이 자신의 기록을 자신이 경신한 것이다. 
</pre>',
      '고려대학교'
      );
  insert into person(cono, psimg1, psimg2, psnm, psjob, psdsc,pschl) 
    values
      (40, 
      'http://localhost:8080/bitcamp-project-s/mystuff/img/personImg/jobs.jpg', 
      'http://localhost:8080/bitcamp-project-s/mystuff/img/personImg/studio/jobs(세로).jpg', 
      '스티브 잡스(Steven Paul Jobs)', 
      ' 애플 창립자', 
      '<pre><strong class="p-desc" style="font-size: 17px;">故 스티브 잡스는 21세기 혁신의 대명사이자 아이콘격인 인물이다.</strong><br>
세계 최고의 전자기기, 소프트웨어 회사 애플의 창립자이지만 그가 디지털 시대의 
아이콘으로 평가 받는 것은 단순히 단순 성능을 끌어올린 신제품을 만드는 것이 
아니라 새로운 시도로 인류의 삶을 진일보시킨 창의적인 제품을 만든 것에 있다. 
맥킨토시를 통해 PC 열풍을 불러와 대부분의 가정에 컴퓨터가 보급되도록 개인PC 
시대를 연 인물이면서 또한 아이폰을 통해 스마트폰이 보급되도록 하여 오늘 날 
모바일 시대를 만든 인물이다. 일개 기업인이 창의적인 제품으로 인류의 삶을 
두 번이나 바꾸며 21세기 혁신의 아이콘이 되었다.
단순 기업인을 넘어 비범한 생각과 행보로 현재의 디지털 시대를 상징하는 
역사적 인물이라고 할 수 있다.
</pre>',
      '리드 대학교(Reed College)'
      );
  insert into person(cono, psimg1, psimg2, psnm, psjob, psdsc,pschl) 
    values
      (41, 
      'http://localhost:8080/bitcamp-project-s/mystuff/img/personImg/jordan.jpg', 
      'http://localhost:8080/bitcamp-project-s/mystuff/img/personImg/studio/jordan(세로).jpg', 
      '마이클 조던(Michael Jeffrey Jordan)', 
      '前 NBA 농구선수', 
      '<pre><strong class="p-desc" style="font-size: 17px;">마이클 조던은 NBA의 세계화를 이끈 스포츠 역사상 최고의 스타이다.</strong><br>
마이클 조던은 NBA는 물론 세계 농구사를 통틀어 가장 위대하고 뛰어났던 선수로 
평가받는다. 대부분의 다른 전설적인 농구선수, 전문가, 감독, 그리고 전 세계 팬들이 
그렇게 평가를 하고 있으며 더불어 NBA의 최고 부흥기를 이끈 주인공이기도 하다. 
조던의 전 세계적인 부상에는 본인의 최고 수준 실력 외에도 때마침 세계화를 꿈꾼 
NBA의 트렌드와 조던과 떼어 놓을 수 없는 관계가 되어버린 나이키의 역할이 컸다. 
80년대 초반 자신이 런칭한 조던운동화가 비교적 인지도가 낮은 브랜드 였던 조던은 
농구화를 발판삼아 세계 제1의 스포츠 브랜드로 자리잡았으며, 
매직 존슨과 레리 버드에 힘입어 성장한 NBA는 조던을 통하여 전 세계에 
실력을 뽐낼 수 있었다.
</pre>',
      '캐롤라이나 대학교(University of North Carolina)'
      );



- 설계도 데이터
	insert into plan(cono, eno, plmap, plimg) values(4, 6, '설계도 내용', '설계도 썸네일');
	insert into plan(cono, eno, plnm, plimg) values(38, 6, '연봉 수직선상을 꿈꾸다', 'http://cfile25.uf.tistory.com/image/23506637556925C1021DCE'); 
	insert into plan(cono, eno, plnm, plimg) values(39, 6, '사람을 위한, 사람에 의한 건축', 'http://www.issuemaker.kr/PEG/14469592276738.jpg'); 
	insert into plan(cono, eno, plnm, plimg) values(40, 6, '번역의 즐거움', 'http://cfile232.uf.daum.net/image/120CF7284CE4E98A3CB10D'); 
	insert into plan(cono, eno, plnm, plimg) values(41, 6, '대학로 연극 시크릿, 울어본 사람이 웃을 수 있다.', 'http://cfile10.uf.tistory.com/image/242BE538541FE62C26E41D'); 
	insert into plan(cono, eno, plnm, plimg) values(42, 6, '재무전략, 재무설계', 'http://cfile27.uf.tistory.com/image/173223334E0AA10C1F33CA'); 
	insert into plan(cono, eno, plnm, plimg) values(43, 6, '하늘을 보는 눈', 'https://i.ytimg.com/vi/8JW5PAcRmJo/maxresdefault.jpg'); 

- 주제 데이터
	insert into topic(tnm) values('천문학'); 
	insert into topic(tnm) values('바이오테크'); 
	insert into topic(tnm) values('재무'); 

- 콘텐츠 주제 데이터
	insert into copic(tno, cono) values(1, 1); 
	insert into copic(tno, cono) values(2, 2); 
	insert into copic(tno, cono) values(3, 3); 
	insert into copic(tno, cono) values(3, 4); 

- 검사결과 데이터
	insert into result(sno, type, rer) values(5, 'mbti', 'istp'); 

- 추천주제 데이터
	insert into snatr(tno, reno) values(1, 1); 
	insert into snatr(tno, reno) values(2, 1); 
	insert into snatr(tno, reno) values(3, 1); 



<-- SELECT query --> 

- mbti 검사 결과 기준 추천인물 select 하기
    select * 
    from person ps
      inner join contents ctt on ps.cono = ctt.cono
      inner join copic cp on ctt.cono = cp.cono
      inner join topic tp on cp.tno = tp.tno
      inner join snatr snt on tp.tno = snt.tno 
      inner join result ret on snt.reno = ret.reno 
    where ret.sno = '5';

- mbti 검사 결과 기준 추천영상 select 하기
	select * from video vd
	inner join contents ctt on vd.cono = ctt.cono
	inner join copic cp on ctt.cono = cp.cono
	inner join topic tp on cp.tno = tp.tno
	inner join snatr snt on tp.tno = snt.tno 
	inner join result ret on snt.reno = ret.reno 
	where ret.sno = '5';

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
	where ret.sno = '5';


