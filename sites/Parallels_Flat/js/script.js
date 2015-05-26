jQuery(document).ready(function($){
$(document).ready(function() {
      $("#owl-demo").owlCarousel({

      navigation : true,
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
    });
new UISearch( document.getElementById( 'sb-search' ) );

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
  var $data = $(".portfolio_demo").clone();
  
  //NOTE: Only filter on the main portfolio page, not on the subcategory pages
  $('.filter li').click(function(e) {
    $(".filter li").removeClass("active"); 
    // Use the last category class as the category to filter by. This means that multiple categories are not supported (yet)
    var filterClass=$(this).attr('class').split(' ').slice(-1)[0];
    
    if (filterClass == 'all') {
      var $filteredData = $data.find('.portfolio-item2');
    } else {
      var $filteredData = $data.find('.portfolio-item2[data-type=' + filterClass + ']');
    }
    $(".portfolio_demo").quicksand($filteredData, {
      duration: 600,
      adjustHeight: 'auto'
    }, function () {

        lightboxPhoto();
            });   
    $(this).addClass("active");       
    return false;
  });
  
}//if quicksand



}); // document.ready