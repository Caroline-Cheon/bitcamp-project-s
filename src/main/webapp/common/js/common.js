function loadContorl() {
	console.log('loadContorl 시작');
	console.log(memberInfo.memberNo);
	if (memberInfo.memberNo != null) pageLoad('mystuff'); 
	if (hasLike == 'has') pageLoad('mento-likes'); 
}
function pageLoad(choose) {
	if (choose == 'mystuff') {
		$(".mystuff").load("mystuff/mystuff.html .dashboard", function() {
			$.getJSON(serverRoot + '/person/list.json', 
				    {
					  "pageNo": currPageNo,
					  "pageSize": pageSize,
					  "sno": memberInfo.memberNo
					}, function(ajaxResult) {
				      var status = ajaxResult.status;
				      if (status != "success") return;
				      console.log("person 객체");
				      console.log(ajaxResult.data.list);
				      var list = ajaxResult.data.list;
				      var section = $('.ps-carousel .ul');
				      console.log(section);
				      var template = Handlebars.compile($('#personList').html());
				      section.html(template({"list": list}));
					});
			$.getJSON(serverRoot + '/video/list.json', 
				    {
					  "pageNo": currPageNo,
					  "pageSize": pageSize,
					  "sno": memberInfo.memberNo
					}, function(ajaxResult) {
				      var status = ajaxResult.status;
				      if (status != "success") return;
				      console.log("video 객체");
				      console.log(ajaxResult);
				      var list = ajaxResult.data.list;
				      $.each(list, function(k, v) {
				    	  $.getJSON(serverRoot + '/video/isLike.json', 
				    		{
				    		  "cono": v.contentsNo,
				    		  "sno": memberInfo.memberNo
				    		}, function(ajaxResult) {
				  		      var status = ajaxResult.status;
						      if (status != "success") return;
						      var isLike = ajaxResult.data.isLike;
						      if (isLike == 1) {
						    	  list[k].isLike = true;
						      } else {
						    	  list[k].isLike = false;
						      }
						      var section = $('.section');
						      var template = Handlebars.compile($('#trTemplate').html());
						      section.html(template({"list": list}));
				    		});
				      });
				  	});  
	//		멘토 슬라이드 
			$.getJSON(serverRoot + '/plan/list.json',
					 {
				  "pageNo": currPageNo,
				  "pageSize": pageSize,
				  "sno": memberInfo.memberNo
				},
				    function(ajaxResult) {
				      var status = ajaxResult.status;
				      if (status != "success")
				        return;
				      var list = ajaxResult.data.list;
				      countLike();
				      function countLike() {
				      $.each(list, function(k, v) {
				    	  $.getJSON(serverRoot + '/video/isLike.json', 
				    		{
				    		  "cono": v.contentsNo,
				    		  "sno": memberInfo.memberNo
				    		}, function(ajaxResult) {
				  		      var status = ajaxResult.status;
						      if (status != "success") return;
						      var isLike = ajaxResult.data.isLike;
						      if (isLike == 1) {
						    	  list[k].isLike = true;
						      } else {
						    	  list[k].isLike = false;
						      }
						      var section = $('.mt-carousel > .ul');
						      var template = Handlebars.compile($('#mentoList').html());
						      section.html(template({"list": list}));
						      jcarousels();
				    		});
				      });
				      }
				  });  
			});
	} else if (choose == 'likes') {
		
	} else if (choose == 'seeds') {
		$(".seeds").load("seeds/seeds-temp.html .seeds");
	} else if (choose == 'mento-like') {
		var currPageNo = 1;
		var pageSize = 4;
		$.getJSON(serverRoot + '/mentoLike/Count.json', memberInfo.memberNo, function(ajaxResult) {
			if (ajaxResult.status == 'success') {
				$(".likes").load("likes/mento-like.html .dashboard", function() {
					likeMentoList(currPageNo, pageSize);
				});
			}
		});
		
		$(document.body).on( "click", "#likes-btn, .mento-like-btn", function() {

			});
			$('#prevPgBtn').click(function() {
				if (currPageNo > 1) {
					likeMentoList(--currPageNo, 4);
				}
			});
			$('#nextPgBtn').click(function() {
				likeMentoList(++currPageNo, 4);
			});
			function mentoLikePreparePagingButton(totalCount) {
				// 현재 페이지 번호가 1이면 이전 버튼을 비활성시킨다.
				if (currPageNo <= 1) {
					$('#prevPgBtn').attr('disabled', true);
				} else {
					$('#prevPgBtn').attr('disabled', false);
				}

				var maxPageNo = parseInt(totalCount / pageSize);
				if ((totalCount % pageSize) > 0) {
					maxPageNo++;
				}

				if (currPageNo >= maxPageNo) {
					$('#nextPgBtn').attr('disabled', true); 
				} else {
					$('#nextPgBtn').attr('disabled', false);
				}

				// 현재 페이지 번호를 출력한다.
				$('#pageNo').text(currPageNo);
			}
			function likeMentoList(currPageNo, pageSize) {
				$.getJSON(serverRoot + '/mentoLike/list.json', 
						{
					"pageNo": currPageNo,
					"pageSize": pageSize,
					"sno": memberInfo.memberNo
						}, 
						function(ajaxResult) {
							var status = ajaxResult.status;
							if (status != "success")
								return;

							var list = ajaxResult.data.list;
							console.log(list);

							var section = $('.mento-like-list');

							var template = Handlebars.compile($('#mentoLike').html());
							section.html(template({"list": list}));

							mtHover();
							mentoLikePreparePagingButton(ajaxResult.data.totalCount);
							console.log(ajaxResult.data.totalCount);
						});
			}

	} else if (choose == 'video-like') {
		// 좋아하는 영상 클릭시.
		$(document.body).on( "click", ".video-like-btn", function() {
			var currPageNo = 1;
			var pageSize = 15;
			var sno = memberInfo.memberNo;
			$.getJSON(serverRoot + '/videoLike/Count.json', sno, function(ajaxResult) {
				if (ajaxResult.status == 'success') {
					$(".likes").load("likes/video-like.html .dashboard", function() {
						likeVideoList(currPageNo, pageSize, sno);
					});
				}
			});
			$('#prevPgBtn').click(function() {
				if (currPageNo > 1) {
					likeVideoList(--currPageNo, 15, sno);
				}
			});
			$('#nextPgBtn').click(function() {
				likeVideoList(++currPageNo, 15, sno);
			});
			function preparePagingButton(totalCount) {
				// 현재 페이지 번호가 1이면 이전 버튼을 비활성시킨다.
				if (currPageNo <= 1) {
					$('#prevPgBtn').attr('disabled', true);
				} else {
					$('#prevPgBtn').attr('disabled', false);
				}

				var maxPageNo = parseInt(totalCount / pageSize);
				if ((totalCount % pageSize) > 0) {
					maxPageNo++;
				}

				if (currPageNo >= maxPageNo) {
					$('#nextPgBtn').attr('disabled', true); 
				} else {
					$('#nextPgBtn').attr('disabled', false);
				}

				// 현재 페이지 번호를 출력한다.
				$('#pageNo').text(currPageNo);
			}

			function likeVideoList(pageNo, pageSize, sno) {
				$.getJSON(serverRoot + '/videoLike/list.json', 
						{
					"pageNo": pageNo,
					"pageSize": pageSize,
					"sno": memberInfo.memberNo
						}, 
						function(ajaxResult) {
							var status = ajaxResult.status;
							if (status != "success")
								return;

							var list = ajaxResult.data.list;
							console.log(list);

							var section = $('.video-like-list');

							var template = Handlebars.compile($('#videoLike').html());
							section.html(template({"list": list}));

							console.log("like");
							console.log(ajaxResult.data.totalCount);
							preparePagingButton(ajaxResult.data.totalCount);
						});
			}
		}); // 좋아하는 영상 클릭시 이벤트
	}
}


/*   user session 정보 받아오는 함수   */
function userInfo() {
	console.log('userInfo().start');
	  $.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
			memberInfo = ajaxResult.data.topic;
			topicName = ajaxResult.data.topicName;
			hasLike = ajaxResult.data.hasLike;
			console.log('세션 획득 정보');
			console.log(memberInfo);
			console.log(topicName);
			console.log(hasLike);
			eventControll();
			if(memberInfo != undefined) {
	    		$('.user-info h3').text(memberInfo.name);
	    		if (memberInfo.photoPath != undefined) {
	    			console.log(memberInfo.photoPath);
	    			$('.profile-img').attr('src', clientRoot + '/mystuff/img/' + memberInfo.photoPath);
	    		}
			}
	  });
}
/*   /user session 정보 받아오는 함수   */

$(function() {
	/*   header 호출 스크립트 및 로그인 유저 로그인 상태 확인.   */
	var memberNo = 0;
	var date = new Date();
	var photoPath;
	$.get(clientRoot + '/common/header.html', function(result) {
		console.log("header 호출");
		  $.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
				$('#header').html(result);
					if (ajaxResult.status == "fail") { // 로그인 되지 않았으면,
						$('.header-icon-power').css("display", "inline-block");
						return;
					} else {
						memberInfo = ajaxResult.data.topic;
						topicName = ajaxResult.data.topicName;
						
						if(ajaxResult.data.topic == null || ajaxResult.data.topicName == []) {
							userInfo();
						}
						console.log('세션 획득 정보');
						console.log(memberInfo);
						console.log(topicName);
						eventControll();
						$('.header-icon-user').css("display", "inline-block");
						$('.header-icon-message').css("display", "inline-block");
					}
				memberNo = memberInfo.memberNo;
				
				// 로그인 되었으면
				setInterval(function(){
					$(".new-message blink").toggle();
					}, 550);
				if (memberInfo.photoPath != undefined) {
					
					$('.profile-img').attr('src', serverRoot + '/mystuff/img/' + memberInfo.photoPath);
				}
				$('.user-info h3').text(memberInfo.name);
				/* topicName length 만큼 반복문 돌려서 생성해야 함 */ 
				$('.recommand-info .one').text(topicName[0]);
				$('.recommand-info .two').text(topicName[1]);
				$('.recommand-info .three').text(topicName[2]);
				/*   /topicName length 만큼 반복문 돌려서 생성해야 함   */ 
				$('.result-info .test-name').text(memberInfo.type);
				$('.result-info .test-result').text(memberInfo.resultResult);
				// 파일 업로드
				$('#photo').fileupload({
				    url: serverRoot + '/common/fileupload.json', // 서버에 요청할 URL
				    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
				    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
				    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
				    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
				    disableImageResize: /Android(?!.*Chrome)|Opera/
				        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
				    previewMaxWidth: 800,   // 미리보기 이미지 너비
				    previewMaxHeight: 800,  // 미리보기 이미지 높이 
				    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
				    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
				    	console.log('done()...');
				    	console.log(data.result.data[0]);
				       photoPath = data.result.data[0];
//				        $('#photo-path').val(data.result);
				       console.log("하하하하");
				       console.log(data.result.data[0]);
				        
					
					    	var param = {
					    			"memberNo": memberInfo.memberNo,
					    			"name": $('.user-info h3').val(),
					    			"photoPath": photoPath
					    	};
					    
						    $.post(serverRoot + '/mentee/update.json', param, function(ajaxResult) {
						    	if (ajaxResult.status != "success") {
						    		console.log("업데이트안됨.");
						    		alert(ajaxResult.data);
						    		return;
						    	}
						    	console.log("파일업로드!");
						    	console.log(ajaxResult.data);
						    	photoPath = ajaxResult.data.photoPath

						    	console.log(date.getTime())
						    	console.log(location.href); 
						    	
//						    	refresh();			    		
//						    	function refresh() {
//						  		  $.ajax({
//						                type: 'POST',
//						                url: 'http://localhost:8080/bitcamp-project-s/main.html', 
//						                success: function(msg) {
//						                	$('.profile-img').removeAttr('src').attr('src', clientRoot + '/mystuff/img/' + photoPath);
//						                }
//						            });
//						  		} 
						    		

							    	
						    }, 'json'); // 새 파일 업로드 post 요청. update 요청.
						    
						    $('.user-menu').load(clientRoot + '/common/header.html .user-menu-call');
						    setTimeout(function() {
						    	userInfo(); 
						    	console.log('로드 오케이?');
						    	console.log(memberInfo.name);
						    	$('.user-info h3').text(memberInfo.name);
						    $('.profile-img').attr('src', clientRoot + '/mystuff/img/' + memberInfo.photoPath);
						    }, 5000);
						    
				    } // 사진 새로 바꿨을 때 호출되는 함수.
				}); // 업로드 컴플릿 펑션 
			  }); // loginUser
	});
	
	/*   /header 호출 스크립트 및 로그인 유저 로그인 상태 확인.   */
	
	/*   header toggle menu event   */
	  var isopen_usermenu = false;
	  var isopen_messagemenu = false;
	  
	  $(document.body).on("click", function(e) {
	    var target = $(e.target); 
	    console.log(target);
	    if (target.hasClass('cont')) {
	    	$('.demo').removeClass("animated fadeInRight");
	    	$('.demo').addClass("animated fadeOutRight");
	    	setTimeout(function() {
	    		$('.auth-login-form').css("display", "none");
	    		$('.demo').removeClass("animated fadeOutRight");
	    	}, 600);
	    }
	    if (!target.parents().hasClass("header-icons")) {
	      $(".user-menu").hide();
	      $(".message-menu").hide();
		  isopen_usermenu = false;
		  isopen_messagemenu = false;
	    } else {
	      if (target.hasClass("header-icon-user")) { // 사용자 정보 창
	        if (!isopen_usermenu) {
		        $(".message-menu").hide();
		        $(".user-menu").show(); // 사용자 정보 창 div
		        isopen_usermenu = true;
	            isopen_messagemenu = false;
		      } else {
	    		  $(".user-menu").hide();
	    		  isopen_usermenu = false;
	          }
	      }
	      if (target.hasClass("header-icon-message")) {
	        if (!isopen_messagemenu) {
	        $(".user-menu").hide();
	        $(".message-menu").show();
	        isopen_messagemenu = true;
	        isopen_usermenu = false;
	        } else {
	            $(".message-menu").hide();
	            isopen_messagemenu = false;
	        }
	      }
	      if (target.hasClass("header-icon-power")) {
				$('.auth-login-form').load(clientRoot + "/auth/login.html .login-form-container", function() {
					$('.auth-login-form').css("display", "block");
					$('.login-form-card').addClass("animated fadeInRight");
					});
	      }
	      if (target.parents().hasClass("menu-nav")) {
	    	  loginEvent = false;
				$('.warn-modal-logInfo').css('display', 'block');
				$('.warn-modal-testInfo').css('display', 'none');
	    	  console.log("login event 제어변수 상태");
	    	  console.log(loginEvent);
			$.getJSON(serverRoot + '/auth/logout.json', function(ajaxResult) {
				console.log('/auth/logout.json 수행');
		    	$('.header-icon-power').css("display", "inline-block");
		    	$('.header-icon-user').css("display", "none");
		    	$('.header-icon-message').css("display", "none");
				  $(".user-menu").hide();
				  $(".message-menu").hide();
				  isopen_usermenu = false;
				  isopen_messagemenu = false;
				  console.log('/auth/logout.json.userInfo() 수행');
				  userInfo(); 
				  $('.mystuff .dashboard').addClass('animated fadeOut');
				  $('.likes .dashboard').addClass('animated fadeOut');
			      if($(".frame-area-center").hasClass("mystuff")) {
			          $(".seeds").switchClass("frame-area-left", "frame-area-center", 2000, "easeInOutBack",
			        		  function() {
			        	  		$('.mystuff .dashboard').removeClass('animated fadeOut');
			        	  		$('.likes .dashboard').removeClass('animated fadeOut');
			        	  		$('.mystuff .dashboard').remove();
			        	  		$('.likes .dashboard').remove();
			        		  });
			          $(".mystuff").switchClass("frame-area-center", "frame-area-right", 2000, "easeInOutBack");
			        } else if($(".frame-area-center").hasClass("likes")) {
			          $(".likes").switchClass("frame-area-center", "frame-area-right", 2000, "easeInOutBack");
			          $(".mystuff").switchClass("frame-area-left", "frame-area-right", 2000, "easeInOutBack");
			          $(".seeds").switchClass("frame-area-left", "frame-area-center", 2000, "easeInOutBack",
			        		  function() {
			        	  		$('.dashboard').removeClass('animated fadeOut');
			        	  		$('.dashboard').remove();
			        	  		});
			        }
			});
	      }
	    }
	  });
	/*   /header toggle menu event   */
	
	/*   Cookie 관리 스크립트   */
	function getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	function setCookie(cname, cvalue, exdays, path) {
		if (path == undefined) {
			path = "/";
		}
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
	}
	/*   /Cookie 관리 스크립트   */
	
	/*   window 사이즈 구하기   */
	$(window).ready(function() {
		var windowWidth = $(window).width();
		var windowHeigth = $(window).height();
		
		$(window).resize(function() {
			windowWidth = $(window).width();
			windowHeigth = $(window).height();
			
			/*$(".main-frame").css("height", windowHeigth + "px");*/
		});
			
		/*$(".main-frame").css("height", windowHeigth + "px");*/
	});
	/*   /window 사이즈 구하기   */
});


//<!-- eventControll -->
function eventControll() {
	console.log('eventControll.start');
  if(memberInfo != null) {
  console.log('event controll 제어 조건자 상태');
  console.log(loginEvent, testEvent, memberInfo);
   loginEvent = true; 
   $('.warn-modal-logInfo').css('display', 'none');
   $('.warn-modal-testInfo').css('display', 'block');
	      if (memberInfo.resultNo >= '1') {
	        testEvent = true;
	      } else {
	    	  testEvent = false;
	      }
         console.log('test event 제어변수 상태');
         console.log(testEvent);
  }
}
//<!-- /eventControll -->