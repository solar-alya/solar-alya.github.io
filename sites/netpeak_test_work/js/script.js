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

$(document).ready(function(){
    $(".group-card").slice(0, 4).show();

    LoadMore();
    ToTop();
})
