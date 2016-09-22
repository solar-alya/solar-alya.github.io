function Menu() {
    $(".menu__item").click(function() {
        var ItemData = $(this).data("menu_item");
        $(".section").hide()
        $("#"+ItemData).fadeIn("slow");
        $(".menu__item").removeClass("activ__item");
        $(this).addClass("activ__item");
    });
}





$(document).ready(function() {

  $("#slider").owlCarousel({
      pagination : true,
      items : 3,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,1],

  });

Menu();

});
