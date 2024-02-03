$(window).scroll(function() {
  var header = $('#header');
  var stickyNavTop = 5 * 16; 
  var scrollTop = $(window).scrollTop();

  if (scrollTop > stickyNavTop) {
      header.removeClass('sticky');
      header.addClass('sticky1');
  }
  else {
      header.removeClass('sticky1');
      header.addClass('sticky');
  }
});