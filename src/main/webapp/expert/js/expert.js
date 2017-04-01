$(function() {
	$.getJSON(serverRoot + '/expert/board.json',
		{
			'pageNo': 1,
			'pageSize': 6, 
			'eno': eno
		}, function(ajaxResult) {
			var status = ajaxResult.status;
			if (status != "success") return; 
			
			var list = ajaxResult.data.list; 
			
		      $.each(list, function(k, v) {
		    	  $.getJSON(serverRoot + '/message/menteeMessageCount.json', 
		    		{
		    		  "cono": v.contentsNo,
		    		  "mswr": memberInfo.memberNo
		    		}, function(ajaxResult) {
		  		      var status = ajaxResult.status;
				      if (ajaxResult.data == 0) {return};
				      var mteNewMsg = ajaxResult.data;
				      console.log(mteNewMsg);
				    	  list[k].newCount = mteNewMsg;

				      var board = $('.board');
				      var template = Handlebars.compile($('#boardTemp').html()); 
				      board.html(template({'list': list})); 
		    		});
		      }); // each 문
		      
	});
});
