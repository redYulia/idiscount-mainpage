  //размер бэкграунда под экран
function heightDetect(){
    $(".first-page-container").css("height", $(window).height());
    var centerContent = $(".first-page-container").find(".void-space");
    centerContent.css("height", $(window).height() / 3.8);
  };
heightDetect()
$(window).resize(function(){
      heightDetect();
  }); 
/*якорь вниз*/
$(document).ready(function() {
    $("a.to-bottom").click(function () {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1000);
        return false;
    });
});
/*анимация выезда*/

$(document).ready(function() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

    if(!isMobile) {
    $('.landing-rows').find('.left-col').addClass('anim-left');
    $('.landing-rows').find('.right-col').addClass('anim-right');

    $('.anim-right').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInRightSmall',
         offset: 300
    });
    $('.anim-left').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInLeftSmall',
        offset: 300
    });
    }
    if(isMobile) {
        $('.landing-rows').find('.left-col').removeClass('hidden');
        $('.landing-rows').find('.right-col').removeClass('hidden');
    }

    (function(){
        var totalHeight = -100;
        $('.path-watch').viewportChecker({
            offset: 300,
            classToAdd: 'passed',
            repeat: true,
            callbackFunction: function(element){
                var add = 275;
                if (element.attr('class') == 'first') {
                    add = 240;
                }
                totalHeight = element.offset().top - $(".first").offset().top + add;
                $('#path-line').css("min-height", totalHeight);
            }
        });
    }());
});

/*контактная форма*/
$(document).ready(function() {
    $('.input_onkeyup').each(function(){
        if ($(this).val().length > 0){
            $(this).parent().find("label").addClass('active');
        }
    });
    $('.input_onkeyup').focus(function(){
        $(this).parent().find("label").addClass('active');
    });
    $('.input_onkeyup').focusout(function(){
        if ($(this).val().length == 0){
            $(this).parent().find("label").removeClass('active');
        }
    });
});

function send_form() {
    $.ajax({
        type:'POST',
        url:window.location.href,
        data:"parametr=feedback&value=add&"+$('#contact_form').serialize(),
        dataType:'json',
        success:function(msg){
            $('.error').hide();
            $('fieldset').removeClass('fiedset_error');
            if(msg['status']=='success') {
                document.getElementById('contact_form').reset();
                $('.input_onkeyup').focusout();
                $('.error').text('');
                show_ok();
            }
            else if(msg['status']=='error'){
                if(msg['errors']) {
                    for(field in msg['errors']){
                        var p=$('#'+field).parent();
                        $(p).addClass('fiedset_error');
                        p=$(p).next();
                        $(p).text(msg['errors'][field]);
                        $(p).show();
                    }
                }
                else{
                    $('.error').fadeOut('fast');
                    $('.error').text('');
                }
            }
        },
        error:function(msg){
            console.log(msg.responseText);
        }
    });
}
function show_ok() {
    $('#ok').css('width', $('#contact_form').width());
    $('#ok').css('height', $('#contact_form').height()-30);
    $('#ok').show();
    setTimeout(function(){$('#ok').fadeOut('fast')},5000);
}


/*hover для IE
$(".hov-opacity").hover(
    function(){
        $(this).animate({opacity: 1}, 200);
    }, 
    function() {
    $(this).animate({opacity: 0.5}, 200);
});*/