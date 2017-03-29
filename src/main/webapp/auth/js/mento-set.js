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
//mento-set button~
$( function() {
	$(document.body).on('click', '.user-change', function() {
		$('.user-change-modal').css('display','block');
		$('.user-change-modal').load('auth/mento-set.html #mento-set-wrap',function(){
			$('.mento-set-form').cf();
			$(document.body).on('click', '.mento-set-btn', function() {
				
				console.log('drdgdsds');
				var totalCheckList="";
				
				console.log($('.mento-set-ul li:nth-child(1) label:nth-child(1)').hasClass('checked'));
				console.log($('.mento-set-ul li:nth-child(1) input:nth-child(1)').val());
				console.log($('.mento-set-ul li:nth-child(2) label:nth-child(1)').hasClass('checked'));
				console.log($('.mento-set-ul li:nth-child(2) input:nth-child(1)').val());
				
				$.each([1,2], function(index, value) {
					
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
				/*
				$.post(serverRoot + '/mento/add.json', param, function(ajaxResult) {
					if (ajaxResult.status != "success") {
						alert(ajaxResult.data);
					}
					console.log(ajaxResult.status);
					
				}, 'json');*/
				
				
				$('.user-change-modal').css('display','none');
			});
			
			$(document.body).on('click', '.mento-set-cancel-btn', function() {
				$('.user-change-modal').css('display','none');
			});
		});
		
	
	});
	
	
});
 










