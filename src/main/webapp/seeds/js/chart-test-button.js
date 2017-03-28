var isopen_sharemenu = false;

$(document.body).on('click', '.fa-share-alt', function(e){
	if (!isopen_sharemenu) {
		$('.social-button-wrapper').children().css("display", "inline-block");
		$('.icon-button').children().css("display", "inline-block");
		isopen_sharemenu = true;
	} else {
		$('.social-button-wrapper').children().css("display", "none");
		$('.icon-button').children().css("display", "none");
		isopen_sharemenu = false;
	}
});

$(document.body).on("click", ".fa-times", function() {
	console.log("닫기버튼 클릭");
	
	$('.seeds-modal-call').addClass('animated fadeOut');
	setTimeout(function() {
		$('.seeds-modal-call').removeClass('animated fadeOut');
		$('.seeds-modal-call').removeClass('animated fadeIn');
		$('.seeds-modal-call').css('display','none');
		/*$('.seeds-modal-call').removeClass('seeds-modal');*/
		$('.temp-dashboard').remove();
	}, 800);
	
});


