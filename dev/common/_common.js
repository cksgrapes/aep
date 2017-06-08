// Masonry
//------------------------------
module.exports.setMasonry = () => {
  'use strict';
  let cmnMasonry;
  const triggerMasonry = () => {
    if ( !cmnMasonry ) { return; }
    imagesLoaded( document.querySelector('main'), function() {
      cmnMasonry.layout();
    });
  };
  docReady(()=>{
    if ($('.cmn-Masonry').length < 1) { return; }
    cmnMasonry = new Masonry('.cmn-Masonry',{
      itemSelector: '.cmn-Masonry_Block',
      columnWidth: '.cmn-MasonrySizer',
      gutter: '.cmn-GutterSizer',
      percentPosition: true,
      horizontalOrder: true,
      transitionDuration: '0.2s',
      initLayout: false
    });
  });
  triggerMasonry();
  Typekit.load({
    active: triggerMasonry,
    inactive: triggerMasonry
  });
};

// Anchor
//------------------------------
module.exports.setAnchor = (offset = 0, speed = 300) => {
  let trg,trgpos;
  const url = $(location).attr('href');
  $('a[href^="#"]').each(function() {
    $(this).on('click',function(e) {
      e.preventDefault();
      trg = $(this).attr('href');
      trgpos = trg != '#pagetop' && $(trg).offset().top;
      if (trg == '#pagetop') { $('html,body').animate({scrollTop: 0}, speed); }
      $('html,body').animate({scrollTop: (trgpos - offset)}, speed);
    });
  });
  if(url.indexOf("?id=") != -1){
      var id = url.split("?id=");
      var $target = $('#' + id[id.length - 1]);
      if($target.length){
          var pos = $target.offset().top;
          $("html, body").animate({scrollTop:pos - offset}, speed);
      }
  }
};
