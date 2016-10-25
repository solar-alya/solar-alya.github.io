var myScroll;

function loaded () {
    myScroll = new IScroll('.wrapper', {
        scrollbars: true,
        interactiveScrollbars: true,
        mouseWheel: true,
        fadeScrollbars: true,

    });

}

function LoadMore() {
    $("#loadMore").on('click', function (e){
        e.preventDefault();
        if ($(".group-card:hidden").length <= 4) {
            $("#loadMore").fadeOut('slow');
        }
         $(".group-card:hidden").slice(0, 4).slideDown();
         $("#to_top").fadeIn("slow");
         setTimeout(function () {
            myScroll.refresh();
        }, 500);

    });
}

function ToTop() {
    $('#to_top').click(function () {
        myScroll.scrollTo(0, 0, 1000);
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

    // $(".group-card").slice(0, 8).show();
    loaded ();
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
