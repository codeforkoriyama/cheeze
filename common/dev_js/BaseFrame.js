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
var BaseFrame = (function () {
    function BaseFrame() {
        this.debugMode = true;
        // indexOfが使えない環境でも使えるようにする
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement, fromIndex) {
                var n;
                if (fromIndex === undefined)
                    fromIndex = 0;
                if (fromIndex < 0)
                    fromIndex += this.length;
                if (fromIndex < 0)
                    fromIndex = 0;
                n = this.length;
                while (fromIndex < n) {
                    if (fromIndex in this && this[fromIndex] === searchElement)
                        return fromIndex;
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
    BaseFrame.prototype.getScrollTop = function () {
        return document.documentElement.scrollTop || document.body.scrollTop;
    };
    /**
     * ブラウザの横幅取得
     * @returns {number}
     */
    BaseFrame.prototype.getBrowserWidth = function () {
        return (document.all) ? document.documentElement.clientWidth : window.innerWidth;
    };
    /**
     * ブラウザの縦幅取得
     * @returns {number}
     */
    BaseFrame.prototype.getBrowserHeight = function () {
        return (document.all) ? document.documentElement.clientHeight : window.innerHeight;
    };
    /**
     * パラメータの取得
     * @returns {Object}
     */
    BaseFrame.prototype.getParameters = function () {
        var search = window.location.search, len = search.length, results = {};
        // パラメータが存在する場合
        if (len > 1) {
            var query = search.substring(1), params = query.split('&');
            for (var i = 0, l = query.length; i < l; i++) {
                var elem = params[i].split('='), name = decodeURIComponent(elem[0]), val = decodeURIComponent(elem[1]);
                results[name] = val;
            }
        }
        return results;
    };
    /**
     * 小数点第n位以下を切り捨て
     * @param num 数値
     * @param dig 桁
     * @returns {number}
     */
    BaseFrame.prototype.deciFloor = function (num, dig) {
        var pow = Math.pow(10, dig), _n = num * pow >> 0;
        return _n / pow;
    };
    /**
     * 片方の要素がtrueだった場合はtrueを返す
     *
     * @param obj
     * @returns {boolean}
     */
    BaseFrame.prototype.checkBoolean = function (obj) {
        for (var key in obj) {
            if (obj[key] === true) {
                return true;
            }
        }
        return false;
    };
    /**
     * ログ出力
     *
     * @param obj {Object}
     */
    BaseFrame.prototype.log = function (obj) {
        if (this.debugMode && window.console && typeof window.console === 'function')
            console.log(obj);
    };
    /**
     * オブジェクトのプロパティと値を一覧で出力します
     *
     * @param obj {Object}
     */
    BaseFrame.prototype.dir = function (obj) {
        if (this.debugMode && window.console && typeof window.console === 'function')
            console.dir(obj);
    };
    /**
     * 記録した場所を何回通ったかを出力
     *
     * @param str {String} ラベル名
     */
    BaseFrame.prototype.count = function (str) {
        if (this.debugMode && window.console && typeof window.console === 'function')
            console.count(str);
    };
    /**
     * エラーメッセージを任意の場所で出力
     *
     * @param mes {String} メッセージ
     */
    BaseFrame.prototype.error = function (mes) {
        if (this.debugMode && window.console && typeof window.console === 'function')
            console.error(mes);
    };
    /**
     * 現在実行中の関数の状態を出力
     */
    BaseFrame.prototype.trace = function () {
        if (this.debugMode && window.console && typeof window.console === 'function')
            console.trace();
    };
    /**
     * スクロール中はイベントが発火しないようにする
     * @param className
     * @param returnSpeed
     */
    BaseFrame.prototype.noScrollEvent = function (className, returnSpeed) {
        if (className === void 0) { className = 'disable'; }
        if (returnSpeed === void 0) { returnSpeed = 300; }
        var scrollTimer = 0, bd = $('body');
        $(window).on('scroll.noEvent', function () {
            clearTimeout(scrollTimer);
            var bd = $('body'), is = bd.hasClass(className);
            if (!is)
                bd.addClass(className);
            scrollTimer = setTimeout(function () {
                bd.removeClass(className);
            }, returnSpeed);
        });
    };
    return BaseFrame;
})();
var Frame = new BaseFrame();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyYW1ld29ya3MvQmFzZUZyYW1lLnRzIl0sIm5hbWVzIjpbIkJhc2VGcmFtZSIsIkJhc2VGcmFtZS5jb25zdHJ1Y3RvciIsIkJhc2VGcmFtZS5nZXRTY3JvbGxUb3AiLCJCYXNlRnJhbWUuZ2V0QnJvd3NlcldpZHRoIiwiQmFzZUZyYW1lLmdldEJyb3dzZXJIZWlnaHQiLCJCYXNlRnJhbWUuZ2V0UGFyYW1ldGVycyIsIkJhc2VGcmFtZS5kZWNpRmxvb3IiLCJCYXNlRnJhbWUuY2hlY2tCb29sZWFuIiwiQmFzZUZyYW1lLmxvZyIsIkJhc2VGcmFtZS5kaXIiLCJCYXNlRnJhbWUuY291bnQiLCJCYXNlRnJhbWUuZXJyb3IiLCJCYXNlRnJhbWUudHJhY2UiLCJCYXNlRnJhbWUubm9TY3JvbGxFdmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O2dGQVFnRjtBQUNoRixtREFBbUQ7QUFFbkQsSUFBTSxTQUFTO0lBR2JBLFNBSElBLFNBQVNBO1FBSVhDLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBO1FBRXRCQSxBQUNBQSwyQkFEMkJBO1FBQzNCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFBQSxDQUFDQTtZQUM1QkEsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsR0FBR0EsVUFBU0EsYUFBaUJBLEVBQUVBLFNBQWdCQTtnQkFDcEUsSUFBSSxDQUFRLENBQUM7Z0JBQ2IsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQztvQkFBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUM1QyxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pDLENBQUMs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QUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0lBQ2xHQSxDQUFDQTtJQUVEVjs7OztPQUlHQTtJQUNIQSx5QkFBS0EsR0FBTEEsVUFBTUEsR0FBR0E7UUFDUFcsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsTUFBTUEsQ0FBQ0EsT0FBT0EsSUFBSUEsT0FBT0EsTUFBTUEsQ0FBQ0EsT0FBT0EsS0FBS0EsVUFBVUEsQ0FBQ0E7WUFBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7SUFDbEdBLENBQUNBO0lBRURYOztPQUVHQTtJQUNIQSx5QkFBS0EsR0FBTEE7UUFDRVksRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsTUFBTUEsQ0FBQ0EsT0FBT0EsSUFBSUEsT0FBT0EsTUFBTUEsQ0FBQ0EsT0FBT0EsS0FBS0EsVUFBVUEsQ0FBQ0E7WUFBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7SUFDL0ZBLENBQUNBO0lBRURaOzs7O09BSUdBO0lBQ0hBLGlDQUFhQSxHQUFiQSxVQUFjQSxTQUE0QkEsRUFBRUEsV0FBd0JBO1FBQXREYSx5QkFBNEJBLEdBQTVCQSxxQkFBNEJBO1FBQUVBLDJCQUF3QkEsR0FBeEJBLGlCQUF3QkE7UUFDbEVBLElBQUlBLFdBQVdBLEdBQUdBLENBQUNBLEVBQ2ZBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBRW5CQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxnQkFBZ0JBLEVBQUVBO1lBQzdCLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUxQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQ2QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFaEMsRUFBRSxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUvQixXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUN2QixFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0lBQ0hiLGdCQUFDQTtBQUFEQSxDQXZLQSxBQXVLQ0EsSUFBQTtBQUVELElBQUksS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMiLCJmaWxlIjoiQmFzZUZyYW1lLmpzIiwic291cmNlUm9vdCI6Ii4uL193cy90eXBlc2NyaXB0LyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF19