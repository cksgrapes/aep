// Masonry
//------------------------------
module.exports.setMasonry = () => {
  'use strict';
  console.log((document.getElementsByClassName('cmn-Masonry') == false));
  let cmnMasonry;
  const triggerMasonry = () => {
    if ( !cmnMasonry ) { return; }
    const items = cmnMasonry.getItemElements();
    cmnMasonry.layout();
  };
  docReady(()=>{
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
  Typekit.load({
    active: triggerMasonry,
    inactive: triggerMasonry
  });
};
