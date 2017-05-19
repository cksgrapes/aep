var picturefill = require('picturefill');

picturefill();

// var cmn    = require('./common/_common.js');

// var AEP = AEP || {
//   d        : document,
//   w        : window,
//   $window  : $(window),
//   $body    : $('body'),
//   isMobile : true,
//   ua       : {},
//   scroll   : 0
// };

// (function(common){
//   'use strict';

//   common.init = function() {
//     cmn.setWindowWidth(AEP);
//     cmn.setUA(AEP);
//     cmn.setViewport(AEP);

//     AEP.$window.on('load', function(){
//       cmn.setAnchor(AEP,60);
//     });
//   };

//   common.resize = function() {
//     AEP.$window.on('resize', function(){
//       cmn.setWindowWidth(AEP);
//       cmn.setUA(AEP);
//       cmn.setViewport(AEP);
//     });
//   };

//   common.scroll = function() {
//     AEP.$window.on('scroll', function(){
//       AEP.scroll = $(this).scrollTop();
//     });
//   };

//   common.gallery = function() {
//   };

// }(AEP.common = AEP.common || {}));

// AEP.common.init();
// AEP.common.resize();
// AEP.common.scroll();
