/*******************************************************************************
 * Copyright (c) 2015. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @date: 2015/2/3
 ******************************************************************************/
var JUDGE = {
  touch: typeof window.ontouchstart !== "undefined"
};


var EVENTS = {
  animation: {
    start: 'webkitAnimationStart animationstart webkitTransitionStart transitionstart',   // アニメーションスタート
    end: 'webkitAnimationEnd animationend webkitTransitionEnd transitionend'   // アニメーション終了
  },
  click: JUDGE.touch ? 'touchend' : 'click',
  mousedown: JUDGE.touch ? 'touchend' : 'mousedown',
  mouseup: JUDGE.touch ? 'touchstart' : 'mouseup'
};
