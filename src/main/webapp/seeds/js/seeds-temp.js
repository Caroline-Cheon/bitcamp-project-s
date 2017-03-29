$( function() {
	$(document.body).on('click', '#test1', function() {
		console.log('#test1.clickEvent')
		userInfo(); // 세션 정보 획득 
		console.log(memberInfo); 
	if (memberInfo == undefined) {
	  $(".seeds").removeClass("seeds-call");
	  $(".seeds").load("seeds/json.mbti.html #container");
	} else {
		
		console.log('memberInfo.resultNo 테스트 결과 존재유무');
		console.log(memberInfo.resultNo);
	  if(memberInfo.resultNo != undefined) {
	      /*$(".seeds").load("seeds/seeds-temp.html .seeds-call",function(){*/
	    	  $('.seeds-modal-call')/*.addClass('seeds-modal',function(){
          		console.log('modal 추가 됐다.');
          		$('.seeds-modal')*/.load('seeds/chart-test.html','.chart-result', function() {
          			var eare = memberInfo.eachResult.split(',');
          			console.log('로그인한 회원의 테스트 결과가 존재하는 경우');
          			console.log('chartCreater 생성을 위한 eare');
          			console.log(eare);
          			chartCreater(eare[0], eare[1], eare[2], eare[3], eare[4], eare[5], eare[6], eare[7]);
          			$('.seeds-modal-call').addClass('animated fadeIn');
          			$('.seeds-modal-call').css('display','block');
                    makembtizero();
          		});
          /*	});*/
	      /*});*/
	    } else { //검사안했으면? 검사페이지로 이동
	    	if ($('.seeds').hasClass('frame-area-center')) {
	    		$('.seeds').switchClass('frame-area-center', 'frame-area-out', 1200, 'easeInOutBack',
	    				function() {
	    					$(".json-mbti").load("seeds/json.mbti.html #container");
	    		});
	    	}
	    }
	}
	});
});
 

