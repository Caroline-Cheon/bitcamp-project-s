$.fn.cf = function () {
	return this.each(function () {
		var 
		$this = $(this),
		$ccbx = $this.find('.label-checkbox'),
		checkbox = $ccbx.find(':checkbox'),
		innerEls = '<span><i></i></span>';
		
		$ccbx.find('input').wrap(innerEls);
		
		$ccbx.on('click', function (e) {
			e.preventDefault();
			var 
			$this = $(this);
			$this.toggleClass('checked');
			$this.find(':checkbox').attr('checked', $this.hasClass('checked'));
			console.log($this.hasClass('checked')); 
			/*
			if($this.hasClass('checked')) { //체크 되었으면 어떤 것인지 알아보자
				var area = $this.children().children().children()[0].value;
				console.log("방금 체크한 것:" +area); //accounting 출력
			}
			*/
			
		});
		
		$this.find('[checked="checked"]').closest('.mento-set-box').addClass('checked');
	});
}


$( function() {
  $(document.body).on('click', '.user-change', function() {
    
    $('.warn-modal').css('border','1px solid rgba(51, 122, 183, 0.76)');
    $('.warn-modal-head').css('background','rgba(51, 122, 183, 0.76)');
    $('.fa-px').css('color','#cfecd0');
    warnModalStart('info-about-mentoSet');
    $(".user-menu").hide();
  });
});

function colorSet() {
    $('.warn-modal').css('border','1px solid #e2525c');
    $('.warn-modal-head').css('background','#e2525c');
    $('.fa-px').css('color','#e2525c');
}



//mento-set button~
$( function() {
	$(document.body).on('click', '.okay-mentoset', function() {
		
		/*$(".user-menu").hide();*/
		
		
		/*이미 멘토전환을 한 멘티는 멘토페이지로 가는 버튼으로 수정하기*/
		console.log("memsType은? " + memsType);
		if(memsType == "mento") {
			/*warnModalStart('alreadyMento-check');*/
			
		} else if(memsType != "mento") {
			$('.user-change-modal').css('display','block');
			
			$('.user-change-modal').load('auth/mento-set.html #mento-set-wrap',function() {
				/*$('#mento-set-wrap').addClass('animated fadeIn');
				setTimeout(function(){
					$('#mento-set-wrap').css('display','block');
				},500);*/
				$('#mento-set-wrap').css('display','block');
				$('.mento-set-form').cf();

			});
		}
		
	
	});
	$(document.body).on('click', '.mento-set-btn', function() {
		
		
		var totalCheckList=" ";
		
		console.log($('.mento-set-ul li:nth-child(1) label:nth-child(1)').hasClass('checked'));
		console.log($('.mento-set-ul li:nth-child(1) input:nth-child(1)').val());
		console.log($('.mento-set-ul li:nth-child(2) label:nth-child(1)').hasClass('checked'));
		console.log($('.mento-set-ul li:nth-child(2) input:nth-child(1)').val());
		
		$.each([1,2,3,4,5,6,7], function(index, value) {
			
			if($('.mento-set-ul li:nth-child(' + value +') label:nth-child(1)').hasClass('checked')) {
				totalCheckList += $('.mento-set-ul li:nth-child(' + value +') input:nth-child(1)').val() + ",";
			}
		});
		console.log("totalCheckList: " + totalCheckList);
		console.log(".detail-area:"  + $('.detail-area ').val());
		console.log(".career-area:"  + $('.career-area ').val());
		
		userInfo();
		console.log("멤버번호? " + memberInfo.memberNo);
		
		var param = {
			'mentoNo' :	memberInfo.memberNo,
			'specialArea' : totalCheckList,
			'detailArea' : $('.detail-area ').val(),
			'career' : $('.career-area ').val()
		}
		
		/*전문분야가 널이면 값을 넣지 않게*/
		if(totalCheckList != " ") {
			
			$.post(serverRoot + '/mento/add.json', param, function(ajaxResult) {
				if (ajaxResult.status != "success") {
					alert(ajaxResult.data);
				}
				console.log(ajaxResult.status);
				
			}, 'json');
			
			$('#mento-set-wrap').css('display','none');
			$('.user-change-modal').css('display','none');
			location.href=serverRoot + "/expert/driver.html";
			
		}	else if(totalCheckList == " ") {
			warnModalStart('specialArea-check');
		}
		
	});
	
});

$( function() {
  $(document.body).on('click', '.mento-set-cancel-btn', function() {
    $('#mento-set-wrap').css('display','none');
    $('.user-change-modal').css('display','none');
  });
  
});

$( function() {
  $(document.body).on('click', '.cancel-mentoset, .okay-mentoset', function(event) {
    warnModalEnd();
  });
});


