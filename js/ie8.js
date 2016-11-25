$(".hov-opacity").hover(
    function(){
        $(this).animate({opacity: 1}, 200);
    }, 
    function() {
    $(this).animate({opacity: 0.5}, 200);
});

if($("header").length) {
  // exists
}
else {
    document.createElement('header');
}

      
    /*  document.createElement('nav');
      document.createElement('section');
      document.createElement('article');
      document.createElement('aside');
      document.createElement('footer');*/
