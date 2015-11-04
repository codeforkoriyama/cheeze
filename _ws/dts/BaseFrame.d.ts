/// <reference path="../../dts/libs/jquery.d.ts" />
/*******************************************************************************
 * 基本フレームワーク
 *
 * Copyright (c) 2014. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @version: 2.0
 ******************************************************************************/
declare class BaseFrame {
    private debugMode;
    constructor();
    /**
     * ブラウザのスクロール位置を取得
     * @returns {number}
     */
    getScrollTop(): number;
    /**
     * ブラウザの横幅取得
     * @returns {number}
     */
    getBrowserWidth(): number;
    /**
     * ブラウザの縦幅取得
     * @returns {number}
     */
    getBrowserHeight(): number;
    /**
     * パラメータの取得
     * @returns {Object}
     */
    getParameters(): {};
    /**
     * 小数点第n位以下を切り捨て
     * @param num 数値
     * @param dig 桁
     * @returns {number}
     */
    deciFloor(num: number, dig: number): number;
    /**
     * 片方の要素がtrueだった場合はtrueを返す
     *
     * @param obj
     * @returns {boolean}
     */
    checkBoolean(obj: any): boolean;
    /**
     * ログ出力
     *
     * @param obj {Object}
     */
    log(obj: any): void;
    /**
     * オブジェクトのプロパティと値を一覧で出力します
     *
     * @param obj {Object}
     */
    dir(obj: any): void;
    /**
     * 記録した場所を何回通ったかを出力
     *
     * @param str {String} ラベル名
     */
    count(str: any): void;
    /**
     * エラーメッセージを任意の場所で出力
     *
     * @param mes {String} メッセージ
     */
    error(mes: any): void;
    /**
     * 現在実行中の関数の状態を出力
     */
    trace(): void;
    /**
     * スクロール中はイベントが発火しないようにする
     * @param className
     * @param returnSpeed
     */
    noScrollEvent(className?: string, returnSpeed?: number): void;
}
declare var Frame: BaseFrame;
