/*******************************************************************************
 * 基本フレームワーク
 *
 * Copyright (c) 2014. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @version: 2.0
 ******************************************************************************/
/// <reference path="../../dts/libs/jquery.d.ts" />

class BaseFrame {
  private debugMode: boolean;

  constructor(){
    this.debugMode = true;

    // indexOfが使えない環境でも使えるようにする
    if (!Array.prototype.indexOf){
      Array.prototype.indexOf = function(searchElement:any, fromIndex:number){
        var n:number;
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
  }

  /**
   * ブラウザのスクロール位置を取得
   * @returns {number}
   */
  getScrollTop(){
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  /**
   * ブラウザの横幅取得
   * @returns {number}
   */
  getBrowserWidth(){
    return (document.all) ? document.documentElement.clientWidth : window.innerWidth;
  }

  /**
   * ブラウザの縦幅取得
   * @returns {number}
   */
  getBrowserHeight(){
    return (document.all) ? document.documentElement.clientHeight : window.innerHeight;
  }

  /**
   * パラメータの取得
   * @returns {Object}
   */
  getParameters(){
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
  }

  /**
   * 小数点第n位以下を切り捨て
   * @param num 数値
   * @param dig 桁
   * @returns {number}
   */
  deciFloor(num:number, dig:number){
    var pow = Math.pow(10, dig),
        _n = num * pow >> 0;

    return _n / pow;
  }

  /**
   * 片方の要素がtrueだった場合はtrueを返す
   *
   * @param obj
   * @returns {boolean}
   */
  checkBoolean(obj){
    for(var key in obj){
      if(obj[key] === true){
        return true;
      }
    }
    return false;
  }

  /**
   * ログ出力
   *
   * @param obj {Object}
   */
  log(obj){
    if(this.debugMode && window.console && typeof window.console === 'function') console.log(obj);
  }


  /**
   * オブジェクトのプロパティと値を一覧で出力します
   *
   * @param obj {Object}
   */
  dir(obj){
    if(this.debugMode && window.console && typeof window.console === 'function') console.dir(obj);
  }

  /**
   * 記録した場所を何回通ったかを出力
   *
   * @param str {String} ラベル名
   */
  count(str){
    if(this.debugMode && window.console && typeof window.console === 'function') console.count(str);
  }

  /**
   * エラーメッセージを任意の場所で出力
   *
   * @param mes {String} メッセージ
   */
  error(mes){
    if(this.debugMode && window.console && typeof window.console === 'function') console.error(mes);
  }

  /**
   * 現在実行中の関数の状態を出力
   */
  trace(){
    if(this.debugMode && window.console && typeof window.console === 'function') console.trace();
  }

  /**
   * スクロール中はイベントが発火しないようにする
   * @param className
   * @param returnSpeed
   */
  noScrollEvent(className:string = 'disable', returnSpeed:number = 300){
    var scrollTimer = 0,
        bd = $('body');

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
}

var Frame = new BaseFrame();
