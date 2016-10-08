function Menu() {
    $(".menu__item").click(function() {
        var ItemData = $(this).data("menu_item");
        $(".section").hide()
        $("#"+ItemData).fadeIn("slow");
        $(".menu__item").removeClass("activ__item");
        $(this).addClass("activ__item");
        var windowWidth = $(window).width();
        if(windowWidth <= 700) {
            $('.menu__wrapper').toggleClass('menu__state');
            $('.section').toggleClass('blur');
            $('.menu__icon__burger').css('display','block');
            $('.menu__icon__close').css('display','none');
        }
    });
}


function sequentialEffects(elems, index) {
  index = index || 0;
  if (!elems[index]) return;
  elems.eq(index).fadeIn("slow", function () {
      sequentialEffects(elems, index + 1);
    }
  );
}


function MenuMobile() {
    $('.menu__icon').on('click', function() {
        $('.menu__wrapper').toggleClass('menu__state');
        if($('.menu__wrapper').hasClass( 'menu__state' )){
            $('.menu__icon__burger').css('display','none');
            $('.menu__icon__close').css('display','block');
        } else {
            $('.menu__icon__burger').css('display','block');
            $('.menu__icon__close').css('display','none');
        }
        $('.section').toggleClass('blur');

        sequentialEffects($('.menu__item'));





    });
}


$(document).ready(function() {

  $("#slider").owlCarousel({
      pagination : true,
      items : 3,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,1],
      itemsTablet: [980,1],
      itemsTabletSmall: [980,1],
      itemsMobile:	[479,1]

  });

Menu();
MenuMobile();

});
