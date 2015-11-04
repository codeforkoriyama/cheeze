/*******************************************************************************
 * Copyright (c) 2015. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @date: 2015/2/3
 ******************************************************************************/
// indexOfが使えない環境でも使えるようにする
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var n;
    if (fromIndex === undefined) fromIndex = 0;
    if (fromIndex < 0) fromIndex += this.length;
    if (fromIndex < 0) fromIndex = 0;
    n = this.length;
    while (fromIndex < n) {
      if (fromIndex in this && this[fromIndex] === searchElement) return fromIndex;
      fromIndex++;
    }
    return -1;
  };
}

var Frame = {
  /**
   * ブラウザのスクロール位置を取得
   * @returns {scrollTop|any|*|number|Function}
   */
  getScrollTop: function(){
    return document.documentElement.scrollTop || document.body.scrollTop;
  },

  /**
   * ブラウザの横幅を取得
   * @returns {number|*}
   */
  getBrowserWidth: function(){
    return (document.all) ? document.documentElement.clientWidth : window.innerWidth;
  },

  /**
   * ブラウザの高さを取得
   * @returns {number|*}
   */
  getBrowserHeight: function(){
    return (document.all) ? document.documentElement.clientHeight : window.innerHeight;
  },

  /**
   * URLパラメーターを取得
   * @returns {{}}
   */
  getParameters: function(){
    var search = window.location.search,
      len = search.length,
      results = {};

    // パラメータが存在する場合
    if(len > 1){
      var query = search.substring(1),    // 最初の?を除去
        params = query.split('&') ;

      for(var i = 0, l = query.length; i < l; i++){
        var elem = params[i].split('='),
          name = decodeURIComponent(elem[0]),
          val = decodeURIComponent(elem[1]);

        results[name] = val;
      }
    }

    return results;
  },

  /**
   * 小数点第n位以下切り捨て
   * @param num 数値
   * @param dig 桁
   * @returns {number}
   */
  deciFloor: function(num, dig){
    var pow = Math.pow(10, dig),
      _n = num * pow >> 0;

    return _n / pow;
  },

  /**
   * 片方の要素がtrueだった場合はtrueを返す
   * @param obj
   * @returns {boolean}
   */
  checkBoolean: function(obj){
    for(var key in obj){
      if(obj[key] === true){
        return true;
      }
    }
    return false;
  },

  /**
   * スクロール中はイベントを発生させない
   *
   * @param className
   * @param returnSpeed
   */
  noScrollEvent: function(className, returnSpeed){
    if(className === void 0) className = 'disable';
    if(returnSpeed === void 0) returnSpeed = 300;

    var scrollTimer = 0;

    $(window).on('scroll.noEvent', function(){
      clearTimeout(scrollTimer);

      var bd = $('body'),
        is = bd.hasClass(className);

      if(!is) bd.addClass(className);

      scrollTimer = setTimeout(function(){
        bd.removeClass(className);
      }, returnSpeed);
    });
  }
};






