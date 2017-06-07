// Global Navigation
//------------------------------
module.exports.setGlobalNav = () => {
  'use strict';

  class ToggleDisplay {
    constructor(element,openedCls = 'opened') {
      this._element   = element;
      this._openedCls = openedCls;
    }
    setToggle() {
      const _openedCls = this._openedCls;
      $(this._element).off().on('click',function(){
        const $this = $(this);
        const $next = $this.next();
        if ($this.hasClass(_openedCls)) {
          $this.removeClass(_openedCls);
          $next.slideUp(200);
        } else {
          $this.addClass(_openedCls);
          $next.slideDown(200);
        }
      });
    }
  }

  class ToggleClass extends ToggleDisplay {
    constructor(element,openedCls) {
      super(element,openedCls);
    }
    setToggle() {
      const _openedCls = this._openedCls;
      $(this._element).off().on('click',function(){
        const $this = $(this);
        if ($this.hasClass(_openedCls)) {
          $this.removeClass(_openedCls);
        } else {
          $this.siblings().removeClass(_openedCls);
          $this.addClass(_openedCls);
        }
      });
    }
  }

  const search = new ToggleClass('.hd-Search_Button');
  search.setToggle();

  const navFirstLevel = new ToggleDisplay('.hd-GlobalNav_Heading');
  navFirstLevel.setToggle();

  const navSecondLevel = new ToggleClass('.hd-GlobalNav_Toggle');
  navSecondLevel.setToggle();

  // const isUnderWidth = (size) => {
  //   return ( window.innerWidth < size) ? true : false;
  // };

  // const pageHeight = () => {
  //   return Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] );
  // }

  // const fixedHeader = () => {
  //   const _$body = $('body'),
  //         _scroll =  window.pageYOffset,
  //         _headerHeight = (isUnderWidth(768)) ? 40 : 50,
  //         _preHeight = _headerHeight * 3;
  //   if (_scroll > _headerHeight && _scroll < _preHeight) {
  //     _$body.addClass('preFixedHeader');
  //   } else {
  //     _$body.removeClass('preFixedHeader');
  //   }
  //   if (_scroll > _preHeight) {
  //     _$body.addClass('fixedHeader');
  //   } else {
  //     _$body.removeClass('fixedHeader');
  //   }
  // }

  // window.addEventListener('scroll', () => {
  //   fixedHeader();
  // });
};
