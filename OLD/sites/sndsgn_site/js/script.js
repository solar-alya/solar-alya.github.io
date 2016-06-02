/*=============================GALERY===============================================*/



jQuery(document).ready(function($){


$("[data-toggle]").click(function() {
  var toggle_el = $(this).data("toggle");
  $(toggle_el).toggleClass("open-sidebar");
});
$(".swipe-area").swipe({
    swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
            if (phase=="move" && direction =="right") {
                 $(".container_sidebar").addClass("open-sidebar");
                 return false;
            }
            if (phase=="move" && direction =="left") {
                 $(".container").removeClass("open-sidebar");
                 return false;
            }
        }
}); 
              
function lightboxPhoto() {
  
  jQuery("a[rel^='prettyPhoto']").prettyPhoto({
      animationSpeed:'fast',
      slideshow:5000,
      theme:'light_rounded',
      show_title:false,
      overlay_gallery: false
    });
  
  }
  
  if(jQuery().prettyPhoto) {
  
    lightboxPhoto(); 
      
  }
  
  
if (jQuery().quicksand) {

  // Clone applications to get a second collection
  var $data = $(".portfolio-area").clone();
  
  //NOTE: Only filter on the main portfolio page, not on the subcategory pages
  $('.portfolio-categ li').click(function(e) {
    $(".filter li").removeClass("active");  
    // Use the last category class as the category to filter by. This means that multiple categories are not supported (yet)
    var filterClass=$(this).attr('class').split(' ').slice(-1)[0];
    
    if (filterClass == 'all') {
      var $filteredData = $data.find('.portfolio-item2');
    } else {
      var $filteredData = $data.find('.portfolio-item2[data-type=' + filterClass + ']');
    }
    $(".portfolio-area").quicksand($filteredData, {
      duration: 600,
      adjustHeight: 'auto'
    }, function () {

        lightboxPhoto();
            });   
    $(this).addClass("active");       
    return false;
  });
  
}//if quicksand

$('#textarea_wrapper').on( 'change keyup keydown paste cut', 'textarea', function (){
    $(this).height(0).height(this.scrollHeight);
}).find( 'textarea' ).change();

$("#owl-demo").owlCarousel({
  navigation : false,
  slideSpeed : 300,
  paginationSpeed : 400,
  singleItem : true

  // "singleItem:true" is a shortcut for:
  // items : 1, 
  // itemsDesktop : false,
  // itemsDesktopSmall : false,
  // itemsTablet: false,
  // itemsMobile : false
});

}); // document.ready
