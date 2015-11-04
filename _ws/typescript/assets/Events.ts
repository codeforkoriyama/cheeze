/*******************************************************************************
 * イベント定義
 *
 * Copyright (c) 2014. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @version: 1.0
 ******************************************************************************/
/// <reference path="../../dts/libs/custom.d.ts" />
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
