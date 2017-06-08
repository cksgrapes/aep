// Page Top
//------------------------------
module.exports.setPagetop = () => {
  $(window).scroll(function(){
    const $el = $('.ft-PageTop');
    let _scroll = $(document).scrollTop();
    if (_scroll > 100) {
      $el.fadeIn();
    } else {
      $el.fadeOut();
    }
  });
};
