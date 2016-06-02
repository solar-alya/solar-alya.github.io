jQuery(document).ready(function($){ 
	new UISearch( document.getElementById( 'sb-search' ) );


var owl = $("#owl-demo");

      owl.owlCarousel({

      items : 6, //10 items above 1000px browser width
      itemsDesktop : [1180,6], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // 3 items betweem 900px and 601px
      itemsTablet: [600,4],
      itemsTablet: [500,4], //2 items between 600 and 0;
      itemsMobile : [440,3] // itemsMobile disabled - inherit from itemsTablet option

      });

      // Custom Navigation Events
      $(".next").click(function(){
        owl.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl.trigger('owl.prev');
      })
      $(".play").click(function(){
        owl.trigger('owl.play',1000);
      })
      $(".stop").click(function(){
        owl.trigger('owl.stop');
      })
/**/
$('body').append('<div id="blackout"></div>');
     
    var boxWidth = 500;

    function centerBox() {
     
    /* определяем нужные данные */
    var winWidth = $(window).width();
    var winHeight = $(document).height();
    var scrollPos = $(window).scrollTop();
     
    /* Вычисляем позицию */
     
    var disWidth = (winWidth - boxWidth) / 2
    var disHeight = scrollPos + 150;
     
    /* Добавляем стили к блокам */
    $('.popup-box').css({'width' : boxWidth+'px', 'left' : disWidth+'px', 'top' : disHeight+'px'});
    $('#blackout').css({'width' : winWidth+'px', 'height' : winHeight+'px'});
     
    return false;       
}
$(window).resize(centerBox);
$(window).scroll(centerBox);
centerBox();  
$('[class*=popup-link]').click(function(e) {
     
        /* Предотвращаем действия по умолчанию */
        e.preventDefault();
        e.stopPropagation();
         
        /* Получаем id (последний номер в имени класса ссылки) */
        var name = $(this).attr('class');
        var id = name[name.length - 1];
        var scrollPos = $(window).scrollTop();
         
        /* Корректный вывод popup окна, накрытие тенью, предотвращение скроллинга */
        $('#popup-box-'+id).show();
        $('#blackout').show();
        $('html,body').css('overflow', 'hidden');
         
        /* Убираем баг в Firefox */
        $('html').scrollTop(scrollPos);
    });
     
    $('[class*=popup-box]').click(function(e) { 
        /* Предотвращаем работу ссылки, если она являеться нашим popup окном */
        e.stopPropagation(); 
    });
    $('html').click(function() { 
        var scrollPos = $(window).scrollTop();
        /* Скрыть окно, когда кликаем вне его области */
        $('[id^=popup-box-]').hide(); 
        $('#blackout').hide(); 
        $("html,body").css("overflow","auto");
        $('html').scrollTop(scrollPos);
    });
    $('.close').click(function() { 
        var scrollPos = $(window).scrollTop();
        /* Скрываем тень и окно, когда пользователь кликнул по X */
        $('[id^=popup-box-]').hide(); 
        $('#blackout').hide(); 
        $("html,body").css("overflow","auto");
        $('html').scrollTop(scrollPos);
    });

    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
      });
      $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
      });


  var touch   = $('#touch-menu');
  var menu  = $('.menu');

  $(touch).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle();
  });
  
  $(window).resize(function(){
    var w = $(window).width();
    if(w > 767 && menu.is(':hidden')) {
      menu.removeAttr('style');
    }
  });


}); // document.ready