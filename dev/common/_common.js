module.exports = {
  setWindowWidth : function(MYAPP) {
    MYAPP.isMobile = (MYAPP.w.innerWidth < 768) ? true : false;
  },
  setUA : function(MYAPP) {
    MYAPP.ua.name      = MYAPP.w.navigator.userAgent.toLowerCase();
    MYAPP.ua.isIE      = (MYAPP.ua.name.indexOf('msie') >= 0 || MYAPP.ua.name.indexOf('trident') >= 0);
    MYAPP.ua.isiPhone  = MYAPP.ua.name.indexOf('iphone') >= 0;
    MYAPP.ua.isiPod    = MYAPP.ua.name.indexOf('ipod') >= 0;
    MYAPP.ua.isiPad    = MYAPP.ua.name.indexOf('ipad') >= 0;
    MYAPP.ua.isiOS     = (MYAPP.ua.isiPhone || MYAPP.ua.isiPod || MYAPP.ua.isiPad);
    MYAPP.ua.isAndroid = MYAPP.ua.name.indexOf('android') >= 0;
    MYAPP.ua.isTablet  = (MYAPP.ua.isiPad || (MYAPP.ua.isAndroid && MYAPP.ua.name.indexOf('mobile') < 0));
    MYAPP.isPortrait = (MYAPP.w.innerHeight > MYAPP.w.innerWidth) ? true : false;

    if (MYAPP.ua.isIE) { MYAPP.$body.addClass('ie'); }
    if (MYAPP.ua.isTablet && MYAPP.isPortrait) {
      MYAPP.$body.addClass('tabPortrait');
    } else {
      MYAPP.$body.removeClass('tabPortrait');
    }
  },
  setViewport : function (MYAPP,width) {
    var w = width || 1200;
    if (MYAPP.ua.isTablet) {
      $('meta[name=viewport]', $('head')).attr('content','width='+w);
    }else{
      $('meta[name=viewport]', $('head')).attr('content','width=device-width, initial-scale=1');
    }
  },
  setAnchor : function (MYAPP,offset) {
    var speed = 500;
    var offset = offset || 0;
    var trg,trgpos;
    var url = $(location).attr('href');
    $('a[href^="#"]').each(function() {
      $(this).on('click',function(e) {
        e.preventDefault();
        trg = $(this).attr('href');
        trgpos = trg != '#pagetop' && $(trg).offset().top;
        if (trg == '#pagetop') { $('html,body').animate({scrollTop: 0}, speed); }
        if (trg.indexOf('faq') > 0) { return; }
        if (trg.indexOf('lineup') > 0) { return; }
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
  }
};
