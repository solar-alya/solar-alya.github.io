function LoadMore() {
    $("#loadMore").on('click', function (e){
        e.preventDefault();
        if ($(".group-card:hidden").length <= 4) {
            $("#loadMore").fadeOut('slow');
        }
         $(".group-card:hidden").slice(0, 4).slideDown();
    });
}

function ToTop() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#to_top').fadeIn();
        } else {
            $('#to_top').fadeOut();
        }
    });
    $('#to_top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});
}
function MenuMobile() {
    $('.menu__icon').on('click', function() {
        $('.menu').toggleClass('menu__state');
        if($('.menu').hasClass( 'menu__state' )){
            $('.menu').fadeIn('slow');
            $('.menu__icon__burger').css('display','none');
            $('.menu__icon__close').css('display','block');
        } else {
            $('.menu__icon__burger').css('display','block');
            $('.menu__icon__close').css('display','none');
            $('.menu').fadeOut('slow');
        }
    });
}

$(document).ready(function(){

    var myScroll = new IScroll('body', {
        scrollbars: 'custom',
        // scrollbars: true
    });

    $(".group-card").slice(0, 8).show();

    LoadMore();
    ToTop();
    MenuMobile();

    $(window).resize(function (){
        var WindowWidth = $(window).width();
        if(WindowWidth>640) {
            $('.menu').css('display','flex');
        }else {
            $('.menu').css('display','none');
        }
    });

})
