// Masonry
//------------------------------
module.exports.setMasonry = () => {
  'use strict';
  let cmnMasonry;
  const triggerMasonry = () => {
    if ( !cmnMasonry ) { return; }
    const items = cmnMasonry.getItemElements();
    cmnMasonry.layout();
  };
  docReady(()=>{
    cmnMasonry = new Masonry('.cmn-Masonry',{
      itemSelector: '.cmn-Masonry_Block',
      columnWidth: '.cmn-MansorySizer',
      // gutter: '.cmn-GutterSizer',
      percentPosition: true,
      horizontalOrder: true,
      transitionDuration: '0.2s',
      initLayout: false
    });
  });
  Typekit.load({
    active: triggerMasonry,
    inactive: triggerMasonry
  });
};
