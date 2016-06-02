 $(document).ready(function() {
$('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })


$('ul.tabs2 li').click(function(){
    var tab2_id = $(this).attr('data-tab');

    $('ul.tabs2 li').removeClass('current2');
    $('.tab-content2').removeClass('current2');

    $(this).addClass('current2');
    $("#"+tab2_id).addClass('current2');
  })

  

    $(".tabs2").niceScroll();

  

});