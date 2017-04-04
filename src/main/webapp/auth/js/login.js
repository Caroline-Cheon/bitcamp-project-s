$(function() {
	$(document.body).on('click', '.login-form-toggle', function() {
	  $('.login-form-container').stop().addClass('login-form-active');
	});
	
	$(document.body).on('click', '.login-form-close', function() {
	  $('.login-form-container').stop().removeClass('login-form-active');
	});
	
	$(document.body).on('click', '.auth-login-form', function(event) {
		formClose(event);
	});
	
	function formClose(e) {
		console.log(e);
		if (e != 'undefined') {
			if (e.target.classList[0] != 'auth-login-form') return;
		}
		$('.login-form-container').addClass('animated fadeOutRight');
		setTimeout(function() {
		  $('.auth-login-form').css('display', 'none');
		}, 800);
	}
	
/*   로그인 이벤트   */
	function logIn(event, login) {
		console.log('logIn().start');
		console.log(event, login);
		if (event != 'undefined') 
			event.preventDefault();
		var param = login; 
		if (login == undefined) {
			param = {
					email: $('#login-input-email').val(),
					password: $('#login-input-password').val()
				};
			console.log('login().param');
			console.log(param);
		}
		$.post(serverRoot + '/auth/login.json', param, function(ajaxResult) {
			userInfo(); 
			
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
			}
				console.log('logIn().ajaxResult');
				console.log(ajaxResult.status);
				console.log(ajaxResult.data.mento);
				console.log(memsType);
				eventControll();
				// 서비스 대상에 따른 페이지 분기점
				$('.login-form-container').removeClass("animated fadeInRight");
				$('.login-form-container').addClass("animated fadeOutRight");
		    	setTimeout(function() {
		    		$('.auth-login-form').css("display", "none");
		    		$('.login-form-container').removeClass("animated fadeOutRight");
		    		if (memsType == 'mentee') {
		    			console.log("멘티");
		    			$('.header-icon-user').css("display", "inline-block");
		    			$('.header-icon-message').css("display", "inline-block");
		                $('.user-menu').load(clientRoot + '/common/header.html .user-menu-call', function() {
				    		setTimeout(function() {
				    			loadContorl();
				    		}, 3500);
				    	});
		    			
		    		}
		    		else {
		    			console.log("멘토");
		    			$('.header-icon-user').css("display", "inline-block");
		    			location.href=serverRoot + '/expert/driver.html';
		                $('.mento-menu').load(clientRoot + '/common/header.html .mento-menu-call', function() {
				    		setTimeout(function() {
				    			loadContorl();
				    		}, 3500);
				    	});
		    		}
		    	}, 600);
		    	$('.header-icon-power').css("display", "none");
		    	
		    	
/*                $('.user-menu').load(clientRoot + '/common/header.html .user-menu-call', function() {
		    		setTimeout(function() {
		    			loadContorl();
		    		}, 3500);
		    	});*/
		}, 'json');
	}
	$(document.body).on('keypress', '.login-button-go', function(event) {
		logIn(event);
	});
	$(document.body).on('click', '.login-button-go', function(event) {
		logIn(event);
	});
/*   /로그인 이벤트   */
	
/*   회원가입 이벤트   */
	function signUp(event) {
		event.preventDefault();
		console.log(event);
		console.log('signUp ok?');
			var param = {
					name: $('#signup-form-username').val(),
					age: $('#signup-form-age').val(),
					email: $('#signup-form-email').val(),
					password: $('#signup-form-password').val()
			}
			login = {
					email: $('#signup-form-email').val(),
					password: $('#signup-form-password').val()
			}
			console.log('signUp() :' + param);
			console.log(param);
		$.post(serverRoot + '/mentee/add.json', param, function(ajaxResult) {
			console.log('회원가입 반환 데이터');
			console.log(ajaxResult);
			if (ajaxResult.status == "fail") {
				console.log('회원가입 실패 시 반환 데이터');
				console.log(ajaxResult.data);
				warnModalStart('email-check');
			} else {
				var result = window.sessionStorage.getItem('result');
				var resultValue = window.sessionStorage.getItem('resultValues');
				formClose(event);
				logIn(event, login); 
				if (result != null) {
					console.log(event);
					warnModalStart('confirm');
				}
			}
		}, 'json');

	}
	$(document.body).on('click', '.modal-confirm-no-btn, .modal-confirm-btn', function(event) {
		warnModalEnd();
	});
	$(document.body).on('click', '.modal-confirm-yes-btn', function(event) {
		warnModalEnd();
		var param = {
				'memberNo' : memberInfo.memberNo,
				'type' : 'mbti',
				'resultResult' : window.sessionStorage.getItem('result'),
				'eachResult' : window.sessionStorage.getItem('resultValues')
				}
		$.post(serverRoot + '/seeds/add.json', param, function(ajaxResult) {
			if (ajaxResult.status == 'success') {
				warnModalStart('save-success');
				console.log('modal-confirm-yes-btn :', param);
				userInfo();
				eventControll();
				$(".seeds").switchClass("frame-area-center", "frame-area-left", 2000, "easeInOutBack");
				$(".mystuff").switchClass("frame-area-right", "frame-area-center", 2000, "easeInOutBack");
			} else {
				warnModalStart('save-fail');
			}
			window.sessionStorage.removeItem('result');
			window.sessionStorage.removeItem('resultValues');
		});
	});
	$(document.body).on('keypress', '.login-button-next', function(event) {
		signUp(event);
	});
	$(document.body).on('click', '.login-button-next', function(event) {
		signUp(event);
	});
/*   /회원가입 이벤트   */
});