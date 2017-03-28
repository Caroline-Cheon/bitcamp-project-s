$(document.body).on( "click", ".side li", function() { 
	
	$(this).addClass('active')
	$(this).siblings().removeClass('active');
	
});

/*$( function() { 

		        // 좋아요 버튼 눌렀을 때
		        
		        $(document.body).on( "click", ".mento-like-list .buttonHolder", function() {// 좋아요 버튼 눌렀을 때
		        	 event.preventDefault();
		        	 var curNo = $(this).attr("data-no");
				        
		        	if($(this).children(".btn").hasClass("checked")) {
		        		$(this).children(".btn").removeClass("checked");
		        		$(this).children(".btn").css("color","black");
		                $.post(serverRoot + '/like/delete.json?curNo=' + curNo, function(ajaxResult) {
				        	  if (ajaxResult.status != "success") {
				    	          alert(ajaxResult.data);
				    	          return;
				    	      }
				        	  console.log("삭제했다.");
				          }, 'json');
		        	} else {
		        		$(this).children(".btn").addClass("checked");
		                $(this).children(".checked").css("color","#f94e66");
				          
		                $.post(serverRoot + '/like/add.json?curNo=' + curNo + '&sno=' + sno, function(ajaxResult) {
				        	  if (ajaxResult.status != "success") {
				    	          alert(ajaxResult.data);
				    	          return;
				    	      }
				        	  console.log("했다.");
				          }, 'json');
		                
		                
		        	}
		        })
		    	
		        
		
		      
		      $('.name-link').click(function(event) {
		        event.preventDefault();
		        location.href = 'view.html?memberNo=' + $(this).attr("data-no");
		      
		      
//		      preparePagingButton(ajaxResult.data.totalCount);
		  });  */
	



function mtHover() { // 설계도 hover 시 bottom 그라디언트 띄우기.
	
$(".mt-list").hover(function(){
    $(this).css("cursor","pointer");
	   $(this).children(".mt-btm").css({"background": "linear-gradient(90deg, rgba(105, 183, 235, 0.35), #b3dbd3, rgba(244, 214, 219, 0.55)"});
	   $(this).children(".mt-btm").children(".mt-name").css("display", "inline-block");
	   $(this).children(".mt-btm").children(".like-mt-photo").css("top", "-50px");
 
})

$(".mt-list").mouseleave(
	    function () {
	     $(this).children(".mt-btm").css("background", "transparent");
 	 $(this).children(".mt-btm").children(".mt-name").css("display", "none");
        $(this).children(".mt-btm").children(".like-mt-photo").css("top", "-15px");
	    }
	  );
}


   
    $(document.body).on( "click", ".rec-btn", function() { // 추천목록 눌렀을 때
    	 
    	$("#rec-list").css("border-bottom", "2px solid blue");
    	$("#like-list").css("border-bottom", "none");
	    	$(".rec-btn").css("text-decoration", "none");
	    $("#all-rec-list").css("display", "block");
        $("#all-like-list").css("display", "none");
//        $(".all-rec-model, .job-all, .all-rec-mento, video-all").css("display", "inline-block");
       
    });

    $(document.body).on( "click", ".like-btn", function() {// 좋아요 목록 눌렀을 때
    	
    	$("#like-list").css("border-bottom", "2px solid blue");
    	$("#rec-list").css("border-bottom", "none");
    	$(".like-btn").css("text-decoration", "none");
	    $("#all-like-list").css("display", "block");
        $("#all-rec-list").css("display", "none");
//        $(".all-rec-model, .job-all, .all-rec-mento, video-all").css("display", "inline-block");
   
    });
    

    $(".hover").mouseleave(
    	    function () {
    	      $(this).removeClass("hover");
    	    }
    	  );
    
    $(".video").hover(function() { // 비디오 hover효과
    	
    	$(".video").css("background-color", "rgba(240, 128, 128, 0.27)");
    	
    })
    
    $(".video").mouseleave(
    	    function () {
    	      $(".video").css("background-color", "transparent");
    	    }
    	  );
    //
    
    
    
    //  추천영상 bottom 허버시 이벤트
    
    $(".videoBox").hover(function(){
    	$(this).children(".video-box").css({"height":"20px", "width":"20px"});
    })
        $(".videoBox").mouseleave(
    	    function () {
    	    	$(this).children(".video-box").css({"height":"0px", "width":"0px"});
    	    }
    	  );
    
    $(".video-box").hover(function(){
    	$(this).css({"height":"50px", "width":"50px"});
    })
        $(".video-box").mouseleave(
    	    function () {
    	      $(this).css({"height":"20px", "width":"20px"});
    	    }
    	  );
    
    
    $(".jobBox").hover(function(){
    	$(this).children(".job-box").css({"height":"20px", "width":"20px"});
    })
        $(".jobBox").mouseleave(
    	    function () {
    	    	$(this).children(".job-box").css({"height":"0px", "width":"0px"});
    	    }
    	  );
    
    $(".job-box").hover(function(){
    	$(this).css({"height":"50px", "width":"50px"});
    })
        $(".job-box").mouseleave(
    	    function () {
    	      $(this).css({"height":"20px", "width":"20px"});
    	    });

    
    

	