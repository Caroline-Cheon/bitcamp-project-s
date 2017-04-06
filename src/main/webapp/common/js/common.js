	      // 멘티 메인 페이지 뱃지에 넣을 새로 올라온 답변 카운트
 function newMessageCount() {
	 $.getJSON(serverRoot + '/message/count.json', // 새로 올라온 멘토들의 답변 리스트
			 {
		 "sno": memberInfo.memberNo
			 }, 
			 function(ajaxResult) {
				 var status = ajaxResult.status;
				 if (status != "success") {
					 console.log("카운트 없음.");
					 return;
				 }
				 console.log(ajaxResult.data);
				 if (ajaxResult.data == 0) {
					 return;
				 }
				 else {
					 console.log("들어와랏");
					 $('.new-count').css('display','block');
					 $('.new-count').text(ajaxResult.data);
				 }
			 })
 } // newMessageCount() 	

$(function() { 
	userInfo();
	setTimeout(function() {
		if (memberInfo != undefined) loadContorl();
	}, 3500);
});
	
function loadContorl() {
	console.log('loadContorl 시작');
	console.log(memberInfo);
	if (memsType != undefined && memsType == 'mentee') {
		checkTestResult();
		pageLoad('mystuff'); 
	}
	if (hasLike == 'has') pageLoad('mento-like'); 

}
$(document.body).on("click", ".video-box .fpc_page-tip", function() {
	pageLoad('video');
});
$(document.body).on("click", ".video-detail-btn", function() {
	pageLoad('videoDetail');
});
$(document.body).on("click", ".mento-box .fpc_page-tip", function() {
	console.log("plan클릭");
	pageLoad('plan');
});
$(document.body).on("click", ".mento-detail-btn", function() {
	console.log("plan클릭");
	pageLoad('planDetail');
});
$(document.body).on( "click", "#likes-btn, .mento-like-btn", function() {
	pageLoad('mento-like');
});
$(document.body).on( "click", ".video-like-btn", function() {
	pageLoad('video-like');
});
$(document.body).on( "click", "#mystuff-btn", function() {
	pageLoad('mystuff');
});

/*   pgbtn click events   */
$(document.body).on('click', '.prevPgBtn', function() {
	if (currPageNo > 1) {
		currPageNo = --currPageNo;
		if (pageSize == '4') {
			if ($('frame-area-center').hasClass('mystuff')) loadVideoList();
			if ($('frame-area-center').hasClass('likes')) likeMentoList();
		} else if (pageSize == '15') {
			if ($('frame-area-center').hasClass('mystuff')) loadVideoList();
			if ($('frame-area-center').hasClass('likes')) likeMentoList();
		}
	}
});
$(document.body).on('click', '.nextPgBtn', function() {
	currPageNo = ++currPageNo;
	if (pageSize == '4') {
		if ($('frame-area-center').hasClass('mystuff')) loadVideoList();
		if ($('frame-area-center').hasClass('likes')) likeMentoList();
	} else if (pageSize == '15') {
		if ($('frame-area-center').hasClass('mystuff')) loadVideoList();
		if ($('frame-area-center').hasClass('likes')) likeMentoList();
	}
});
/*   /pgbtn click events   */
function initPgBtn(choose, totalCount) {
	if (choose == 'plan' || choose == 'person') {
		currPageNo = 1;
		pageSize = 4;
		maxPageNo = parseInt(totalCount / pageSize);
	} else if (choose == 'video') {
		currPageNo = 1;
		pageSize = 15;
		maxPageNo = parseInt(totalCount / pageSize);
	}
	console.log('initPgBtn', 'choose', choose);
	console.log('currPageNo', currPageNo, 'pageSize', pageSize, 'maxPageNo', maxPageNo);
}
function prepPgBtn(totalCount) {
	if (currPageNo <= 1) {
		$('#prevPgBtn').attr('disabled', true);
	} else {
		$('#prevPgBtn').attr('disabled', false);
	}
	maxPageNo = parseInt(totalCount / pageSize);
	if ((totalCount % pageSize) > 0) {
		maxPageNo++;
	}
	if (currPageNo >= maxPageNo) {
		$('#nextPgBtn').attr('disabled', true); 
	} else {
		$('#nextPgBtn').attr('disabled', false);
	}
	$('#pageNo').text(currPageNo);
}
function loadPlanList() {
	console.log("loadPlanList CALL");
	console.log(memberInfo.memberNo);
	console.log(currPageNo, pageSize);
	$.getJSON(serverRoot + '/planDetail/list.json',
		{
		"pageNo": currPageNo,
		"pageSize": pageSize,
		"sno": memberInfo.memberNo
		}, function(ajaxResult) {
				var status = ajaxResult.status;
				if (status != "success") return;
				console.log(ajaxResult.data.totalCount);
				var list = ajaxResult.data.list;
				console.log(list);
				$.each(list, function(k, v) {
					$.getJSON(serverRoot + '/video/isLike.json', 
						{
						"cono": v.contentsNo,
						"sno": sno
						}, function(ajaxResult) {
								var status = ajaxResult.status;
								if (status != "success") return;
								var isLike = ajaxResult.data.isLike;
								if (isLike == 1) {
									list[k].isLike = true;
								} else {
									list[k].isLike = false;
								}
								var section = $('.mento-detail-list');
								var template = Handlebars.compile($('#mentoDetail').html());
								section.html(template({"list": list}));
								prepPgBtn(ajaxResult.data.totalCount);
								mtDetailHover();
							});
				});
			});
}
function loadVideoList() {
	console.log("loadVideoList CALL");
	console.log(memberInfo.memberNo);
	console.log(currPageNo, pageSize);
	$.getJSON(serverRoot + '/videoDetail/list.json', 
		{
		"pageNo": currPageNo,
		"pageSize": pageSize,
		"sno": sno
		}, function(ajaxResult) {
				var status = ajaxResult.status;
				if (status != "success") return;
				var list = ajaxResult.data.list;
				$.each(list, function(k, v) {
					 $.getJSON(serverRoot + '/video/isLike.json', 
						{
						"cono": v.contentsNo,
						"sno": sno
						}, function(ajaxResult) {
								var status = ajaxResult.status;
								if (status != "success") return;
								var isLike = ajaxResult.data.isLike;
								if (isLike == 1) {
									list[k].isLike = true;
								} else {
									list[k].isLike = false;
								}
								var section = $('.video-detail-list');
								var template = Handlebars.compile($('#videoDetail').html());
								section.html(template({"list": list}));
								prepPgBtn(ajaxResult.data.totalCount);
							});
				});
			});
}
function likeMentoList() {
	console.log("likeMentoList CALL");
	console.log(memberInfo.memberNo);
	console.log(currPageNo, pageSize);
	$.getJSON(serverRoot + '/mentoLike/list.json', 
		{
		"pageNo": currPageNo,
		"pageSize": pageSize,
		"sno": memberInfo.memberNo
		}, function(ajaxResult) {
			console.log(ajaxResult);
			var status = ajaxResult.status;
			if (status != "success") return;
			var list = ajaxResult.data.list;
			console.log(list);
			var section = $('.mento-like-list');
			var template = Handlebars.compile($('#mentoLike').html());
			section.html(template({"list": list}));
			mtHover(); // bottom gradient? 
			prepPgBtn(ajaxResult.data.totalCount);
		});
}
function likeVideoList() {
	console.log("likeVideoList CALL");
	console.log(memberInfo.memberNo);
	console.log(currPageNo, pageSize);
	$.getJSON(serverRoot + '/videoLike/list.json',
		{
		"pageNo": currPageNo,
		"pageSize": pageSize,
		"sno": memberInfo.memberNo
		}, function(ajaxResult) {
			console.log(ajaxResult);
			var status = ajaxResult.status;
			if (status != "success") return;
			var list = ajaxResult.data.list;
			console.log(list);
			var section = $('.video-like-list');
			var template = Handlebars.compile($('#videoLike').html());
			section.html(template({"list": list}));
			prepPgBtn(ajaxResult.data.totalCount);
		});
}
function loadPersonList() {
	$.getJSON(serverRoot + '/person/list.json', 
		{
			"pageNo": currPageNo,
			"pageSize": pageSize,
			"sno": sno
		}, function(ajaxResult) {
				var status = ajaxResult.status;
				if (status != "success") return;
				console.log("person");
				var list = ajaxResult.data.list;
				console.log(list);
				var section = $('.persons');
				var template = Handlebars.compile($('#personDetail').html());
				section.html(template({"list": list}));

				/***
				 * 적절한 타임아웃 필요. 페이지 로드 전 함수 호출 시 예기치 않은 오류 발생 
				 */
				setTimeout(function() {
					listPlay();
				},5000);
		});
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
			// 멘토 슬라이드 
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
				      console.log(list);
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
		
	} else if (choose == 'seeds') {
		$(".seeds").load("seeds/seeds-temp.html .seeds-call");
		
	} else if (choose == 'plan') {
		console.log('pageload/plan', memberInfo.memberNo);
		$.getJSON(serverRoot + '/planDetail/Count.json', {"sno": memberInfo.memberNo}, 
				function(ajaxResult) {
			if (ajaxResult.status == 'success') {
				console.log('/planDetail/Count.json');
				initPgBtn('plan', ajaxResult.data.totalCount); 
				$('.mystuff').switchClass('frame-area-center', 'frame-area-out', 2000, 'easeInOutBack');
				setTimeout(function() {
					$('.contents').append("<div class='detail-contents animated fadeInLeft'></div>");
					$(".detail-contents").load("mystuff/detail/mento-detail.html .dashboard", function() {
						loadPlanList();
					});
				}, 1200);
			}
		});
		
	} else if (choose == 'planDetail') {
	    console.log('pageload/video', memberInfo.memberNo);
	    $.getJSON(serverRoot + '/planDetail/Count.json', {"sno": memberInfo.memberNo}, 
	        function(ajaxResult) {
	          if (ajaxResult.status == 'success') {
	            console.log('/planDetail/Count.json');
	            initPgBtn('plan', ajaxResult.data.totalCount);
	            $(".detail-contents").load("mystuff/detail/mento-detail.html .dashboard", function() {
	              loadPlanList();
	            });
	          }
	    });
	
      }	else if (choose == 'video') {
		console.log('pageload/video', memberInfo.memberNo);
		$.getJSON(serverRoot + '/videoDetail/Count.json', {"sno": memberInfo.memberNo}, 
				function(ajaxResult) {
			if (ajaxResult.status == 'success') {
				console.log('/videoDetail/Count.json');
				initPgBtn('video', ajaxResult.data.totalCount); 
				$('.mystuff').switchClass('frame-area-center', 'frame-area-out', 2000, 'easeInOutBack');
				setTimeout(function() {
					$('.contents').append("<div class='detail-contents animated fadeInLeft'></div>");
					$(".detail-contents").load("mystuff/detail/video-detail.html .dashboard", function() {
						loadVideoList();
					});
				}, 1200);
			}
		});
		

	} else if (choose == 'videoDetail') {
		    console.log('pageload/video', memberInfo.memberNo);
		    $.getJSON(serverRoot + '/videoDetail/Count.json', {"sno": memberInfo.memberNo}, 
		        function(ajaxResult) {
		          if (ajaxResult.status == 'success') {
		            console.log('/videoDetail/Count.json');
		            initPgBtn('video', ajaxResult.data.totalCount); 
		            $(".detail-contents").load("mystuff/detail/video-detail.html .dashboard", function() {
		              loadVideoList();
		            });
		          }
		    });
		    
		
	} else if (choose == 'person') {
		console.log('pageload/person', memberInfo.memberNo);
		$.getJSON(serverRoot + '/person/count.json', {"sno": memberInfo.memberNo}, 
				function(ajaxResult) {
					if (ajaxResult.status == 'success') {
						console.log('/person/count.json');
						initPgBtn('person', ajaxResult.data.totalCount); 
						$(".mystuff").load("likes/person.html .dashboard", function() {
							loadPersonList();
						});
					}
		});
		
	} else if (choose == 'likes' || choose == 'mento-like') {
		console.log('pageload/mento-like', memberInfo.memberNo);
		$.getJSON(serverRoot + '/mentoLike/Count.json', {"sno": memberInfo.memberNo}, 
				function(ajaxResult) {
					if (ajaxResult.status == 'success') {
						console.log('/mentoLike/Count.json');
						initPgBtn('plan', ajaxResult.data.totalCount); 
						$(".likes").load("likes/mento-like.html .dashboard", function() {
							likeMentoList();
						});
					}
		});

	} else if (choose == 'video-like') {
		console.log('pageload/video-like', memberInfo.memberNo);
		$.getJSON(serverRoot + '/videoLike/Count.json', {"sno": memberInfo.memberNo}, function(ajaxResult) {
			if (ajaxResult.status == 'success') {
				console.log('/videoLike/Count.json');
				initPgBtn('video', ajaxResult.data.totalCount); 
				$(".likes").load("likes/video-like.html .dashboard", function() {
					likeVideoList();
				});
			}
		});
		
	}
}

/*   user session 정보 받아오는 함수   */
function userInfo() {
	console.log('userInfo().start');
	  $.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
		  if (ajaxResult.status != 'success') {return;}
			memberInfo = ajaxResult.data.topic;
			topicName = ajaxResult.data.topicName;
			hasLike = ajaxResult.data.hasLike;
			memsType = ajaxResult.data.memsType;
			console.log(memsType)
			if (memsType == 'mentee') 
				sno = ajaxResult.data.topic.memberNo;
			if (memsType == 'mento') 
				expertNo = ajaxResult.data.topic.memberNo;
			console.log('세션 획득 정보');
			console.log("memberInfo", memberInfo);
			console.log("topicName", topicName);
			console.log("hasLike(has/none)", hasLike);
			console.log("memsType(tee/to)", memsType);
			console.log("sno", sno);
			eventControll();
			setTimeout(function() {
				loadContorl();
			}, 3500);
			if(memberInfo != undefined) {
				console.log('memberInfo != undefined', memberInfo.name);
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
						console.log(hasLike);
						eventControll();
						if (memsType == 'mentee') {
							console.log("mentee")
						$('.header-icon-user').css("display", "inline-block");
						$('.header-icon-message').css("display", "inline-block");
						newMessageCount();
					    }
					     else if (memsType == 'mento'){ // 접속자 멘토일 때
						$('.header-icon-user').css("display", "inline-block");
						$('.mentee-service').css('display', 'none');

						}
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
//				console.log(topicName.length);
				
				if (topicName != undefined) {
				$('.recommand-info .one').text(topicName[0]);
				$('.recommand-info .two').text(topicName[1]);
				$('.recommand-info .three').text(topicName[2]);
				}
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
/*						    	
						    	refresh();
						    	function refresh() {
						  		$.ajax({
						              type: 'POST',
						              url: 'http://localhost:8080/bitcamp-project-s/main.html', 
						              success: function(msg) {
						              	$('.profile-img').removeAttr('src').attr('src', clientRoot + '/mystuff/img/' + photoPath);
						              }
						          });
						  		}
*/	

							    	
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
	      $(".mento-menu").hide();
	      $(".message-menu").hide();
		  isopen_usermenu = false;
		  isopen_messagemenu = false;
	    } else {
	      if (target.hasClass("header-icon-user")) { // 사용자 정보 창
	        if (!isopen_usermenu) {
	        	if (memsType == 'mentee') {
		        $(".message-menu").hide();
		        $(".user-menu").show(); // 사용자 정보 창 div
		        isopen_usermenu = true;
	            isopen_messagemenu = false;
	        	} // 멘티라면
	        	else {
	        		$(".message-menu").hide();
			        $(".mento-menu").show(); // 멘토 정보 창 div
			        userInfo();
			        console.log(expertNo);
			        $.getJSON(serverRoot + '/expert/getMentoInfo.json', 
				    		{
				    		  "eno": expertNo
				    		}, function(ajaxResult) {
			        	if (ajaxResult.status =="fail") return;
			        	var areaList = ajaxResult.data;
			        	console.log(areaList);
			        	for (var i in areaList) {
			        		$('.area-info').append("<div class='mto-area ui btns color"+i+"'>"+areaList[i]+"</div>");
			        	}
				    		
			        });
			        isopen_usermenu = true;
		            isopen_messagemenu = false;
	        	}
		      } else {
	    		  $(".user-menu").hide();
	    		  $(".mento-menu").hide();
	    		  isopen_usermenu = false;
	          }
	      }
	      
	      var count = 0;
	      
	      if (target.hasClass("header-icon-message")) { // 멘토 답변 업데이트 알림 아이콘.
	        if (!isopen_messagemenu) {
//	        	 newMessageCount();
	        $(".user-menu").hide();
	        $(".mento-menu").hide();
	        $('.message-menu').load('common/header.html .message-info', function() {
	        $(".message-menu").css("display","block");
				$.getJSON(serverRoot + '/message/mento-list.json', // 새로 올라온 멘토들의 답변 리스트
						{
					"sno": memberInfo.memberNo
						}, 
						function(ajaxResult) {
							var status = ajaxResult.status;
							if (status != "success") {
					             console.log("이게뭐람");
								return;
							}
							
							
	             console.log(ajaxResult.data);
	             
	             var list = ajaxResult.data;
	             
	             
			      $.each(list, function(k, v) {
			    	  console.log(list,k,v);
			    	  $.getJSON(serverRoot + '/message/isMsg.json', 
			    		{
			    		  "cono": v.contentsNo,
			    		  "sno": memberInfo.memberNo
			    		}, function(ajaxResult) {
			  		      var status = ajaxResult.status;
					      if (status == "fail") {
					    	  console.log("최신 답변 없엉");
					    	  return;
					      }
					      else {
					    	  count++
					    	  $('.nothing-message').hide();
					    	  console.log(ajaxResult.data);
					    	  
					    	  $('.message-info').append('<li> <img class="profile-img" src="localhost:8080/bitcamp-project-s/mystuff/img/' + ajaxResult.data.photoPath +'"/>' + '<span class="job-sort" data-no="'+ajaxResult.data.contentsNo+'">' + ajaxResult.data.specialArea +'</span> <span class="message-context"> <h3 class="name">'+ ajaxResult.data.name +'</h3>님의 메세지 <div class="new-message"><blink>NEW</blink></div> </span> </li>');
					    	 
					      }

			    		}); // isMsg 콜백함수
			      });
	             
     
	        
	}); // 새로 올라온 멘토들의 답변 리스트
	        
	        isopen_messagemenu = true;
	        isopen_usermenu = false;
	         }) // message-menu 로드 이벤트
	         
	        } else {
	            $(".message-menu").hide();
	            isopen_messagemenu = false;
	        }
	      } // 멘토 답변 업데이트 알림 아이콘 클릭 이벤트
	      
	      
	      
	      $(document.body).on( "click", ".message-info li", function() { // 메세지 info에서 해당 new 메세지 눌렀을 때 이벤트
	    	
	    	  console.log($(this));
	    	 var cono = $(this).children('.job-sort').attr('data-no');
	    	
	    	 
				$.getJSON(serverRoot + '/message/list.json', 
						{
					"cono": cono,
					"sno": memberInfo.memberNo,
					"mno": memberInfo.memberNo
						}, 
						function(ajaxResult) {
							var status = ajaxResult.status;
							if (status != "success") {
								return;
							}
							
							console.log("common-modal 멘토와의 채팅");
							
							console.log(ajaxResult.data.list);
							console.log(ajaxResult.data.mento);
							    var list = ajaxResult.data.list;
							    eno = ajaxResult.data.mento.mentoNo;
								var mteName = ajaxResult.data.mento.name;
								var mtePhoto = serverRoot + '/mystuff/img/' + ajaxResult.data.mento.photoPath;
								console.log(mteName);
								console.log(mtePhoto);
								
							 $('.common-modal').load('mystuff/plan-modal.html .plan-modal', function() {
									
							        $('#mystuff-messenger').submit(function () {
									   return false;
									  });
									  $("#mystuff-chat-msg").attr("autocomplete", "off");
								
							        $.each(list, function(k, v) {
								          var text   = list[k].message;
								          var writer = list[k].writerNo;
								          if (writer == memberInfo.memberNo) {
								        	  console.log("본인이 쓴것")
								              $('.mystuff-chatwindow').append('<div class="right">' + text + '</div>');
								          } else {
								        	  console.log("상대방이 쓴것")
								              $('.mystuff-chatwindow').append('<div class="left bye">' + text + '</div>');
								          }

								        }); // 메세지 리스트 div 영역으로 나타내기
							        $(".mystuff-chatwindow").scrollTop($(".mystuff-chatwindow")[0].scrollHeight);
								 
                                  console.log("모달창 들어왔다.")
                                  
                                  $('.mystuff-chat-bot h3').text(mteName);
                                  $('.mystuff-chat-bot img').attr('src',mtePhoto);
								 
							 }) // mystuff-modal 창에 로드 시키기.
				
			  }) // messageList getJson
	    	 
	    	 
	      }) // 메세지 info에서 해당 new 메세지 눌렀을 때 이벤트
	      
	      
	
						
						
	      
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
				  $(".mento-menu").hide();
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
			        } else if ($(".frame-area-center").hasClass("board") || $(".frame-area-center").hasClass("across")) {
			        	location.href = serverRoot + '/main.html';
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

/*<!--   modal contector   -->*/
function modalConnector() {
	if (!loginEvent) {
		console.log('modalConnector.loginEvent');
		console.log(!loginEvent);
		warnModalStart('log-off');
	} else if (loginEvent && !testEvent) {
	    console.log('modalConnector.login.testEvent');
	    console.log(loginEvent, !testEvent);
			warnModalStart('test-none');
	}
}
/*<!--   /modal contector   -->
<!--   warn modal function   -->*/
function warnModalStart(comn) {
	console.log('warnModalStart(comn)');
	console.log(comn);
	if (comn == 'log-off') {
		$('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
		$('.warn-modal-comment').append("<h3>로그인하셔야 진로를<br> 추천해드릴 수 있어요.</h3>"
				+ "<div class='modal-confirm-btn'>확인</div>");
	} else if (comn == 'test-none') {
		$('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
		$('.warn-modal-comment').append("<h3>추천 진로는 테스트 완료 후<br> 안내드릴 수 있어요.</h3>"
				+ "<div class='modal-confirm-btn'>확인</div>");
	} else if (comn == 'confirm') {
	    $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
	    $('.warn-modal-comment').append("<h3>가입 전 테스트 결과가 있어요.<br>저장하시겠습니까?</h3>"
	        + "<div class='modal-confirm-yes-btn'>저장하기</div>"
	        + "<div class='modal-confirm-no-btn'>아니오</div>");
	} else if (comn == 'save-success') {
	    $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
	    $('.warn-modal-comment').append("<h3>저장 완료!</h3>"
	        + "<div class='modal-confirm-success-btn'>확인</div>");
	} else if (comn == 'save-fail') {
	      $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
	      $('.warn-modal-comment').append("<h3>저장 실패...</h3>"
	          + "<div class='modal-confirm-btn'>확인</div>");
	} else if (comn == 'email-check') {
	      $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
	      $('.warn-modal-comment').append("<h3>이미 가입된 이메일이에요!</h3>"
	          + "<div class='modal-confirm-btn'>확인</div>");
	} else if (comn == 'password-check') {
	      $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
	      $('.warn-modal-comment').append("<h3>비밀번호가 서로 달라요.</h3>"
	          + "<div class='modal-confirm-btn'>확인</div>");
	} else if (comn == 'specialArea-check') {
		  console.log("main 콘솔 몇번");
        $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
        $('.warn-modal-comment').append("<h3>전문분야를 선택해주세요.</h3>"
            + "<div class='modal-confirm-btn'>확인</div>");
  } else if (comn == 'alreadyMento-check') {
      console.log("main 콘솔 몇번");
      $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
      $('.warn-modal-comment').append("<h3>이미 멘토전환을 하였습니다.</h3>"
          + "<div class='modal-confirm-btn'>확인</div>");
  } else if (comn == 'info-about-mentoSet') {
    $('.warn-modal-content').append("<div class='warn-modal-comment mentoset-comment'></div>");
    $('.warn-modal-comment').append("<h3>멘토로 한번 전환을 하면 멘티가 될 수 없습니다.<br>전환하시겠습니까?</h3>"
    		+ "<div class='okay-mentoset'>전환하기</div>"
        + "<div class='cancel-mentoset'>취소하기</div>");
} else if (comn == 'plan-save') {
    $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
    $('.warn-modal-comment').append("<h3>저장하시겠습니까?</h3>"
		+ "<div class='save-plan'>저장하기</div>"
        + "<div class='cancel-plan'>아니오</div>");
} else if (comn == 'plan-close') {
    $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
    $('.warn-modal-comment').append("<h3>저장하지 않고<br> 작업을 종료합니다.</h3>"
		+ "<div class='close-plan'>네</div>"
        + "<div class='cancel-plan'>아니오</div>");
} else if (comn == 'plan-name') {
    $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
    $('.warn-modal-comment').append("<h3>설계도 제목을 입력하세요.</h3>"
        + "<div class='enter-plan'>확인</div>");
} else if (comn == 'plan-writer') {
    $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
    $('.warn-modal-comment').append("<h3>작성자 정보가 없습니다.</h3>"
        + "<div class='enter-plan'>확인</div>");
} else if (comn == 'success-plan') {
    $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
    $('.warn-modal-comment').append("<h3>저장 완료!</h3>");
} else if (comn == 'fail-plan') {
    $('.warn-modal-content').append("<div class='warn-modal-comment'></div>");
    $('.warn-modal-comment').append("<h3>저장 실패...</h3>"
            + "<div class='enter-plan'>확인</div>");
}
    $('.warn-modal').addClass('animated fadeInRight');
    $('.warn-modal-page-wrapper').addClass('warn-modal-blur-it');
    $('.warn-modal-wrapper').addClass('warn-modal-open');
}
function warnModalEnd() {
    $('.warn-modal').addClass('animated fadeOutRight');
    setTimeout(function() {
      $('.warn-modal').removeClass('animated fadeOutRight');
      $('.warn-modal-wrapper').removeClass('warn-modal-open');
      $('.warn-modal').removeClass('animated fadeInRight');
      $('.warn-modal-page-wrapper').removeClass('warn-modal-blur-it');
      $('.warn-modal-comment').remove();
      colorSet();
    }, 1000);
  }
/*<!--   /warn modal function   -->*/


function jcarousels() {
    $('.jcarousel').jcarousel();

    $('.jcarousel-control-prev')
        .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .jcarouselPagination();
};