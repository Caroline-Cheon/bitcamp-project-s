$(document).ready(function () {

;(function ($, window, document, undefined) {
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
  });

  $this.find('[checked="checked"]').closest('.mento-set-box').addClass('checked');

});
}
})(jQuery, window, document);
  /* fire cf */
  $('.mento-set-form').cf();
}); //end doc ready





//mento-set button~
$( function() {
	$(document.body).on('click', '.user-change', function() {
		console.log('.user-change 클릭이벤트 발생이요');
		$(".user-change-modal").removeClass("user-change-modal-hide");
	/*	console.log('#test1.clickEvent')
		userInfo(); // 세션 정보 획득 
		console.log(memberInfo); 
	if (memberInfo == undefined) {
	  $(".seeds").removeClass("seeds-call");
	  $(".seeds").load("seeds/json.mbti.html #container");
		*/
	});
});
 










