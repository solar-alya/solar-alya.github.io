jQuery(document).ready(function($){ 

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







}); // document.ready