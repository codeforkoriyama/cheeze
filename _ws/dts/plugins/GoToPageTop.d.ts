/// <reference path="../../dts/libs/custom.d.ts" />
/// <reference path="../../dts/libs/jquery.d.ts" />
/// <reference path="../frameworks/BaseFrame.d.ts" />
/// <reference path="../assets/Cmn.d.ts" />
/// <reference path="../assets/Events.d.ts" />
/*******************************************************************************
 * ページトップスクロールイベント
 *
 * Copyright (c) 2014. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @version: 1.0
 ******************************************************************************/
declare class GoToPageTop {
    private EVENT;
    private DEFS;
    private clickFlg;
    private Obj;
    private w;
    private h;
    constructor();
    init(options: any): void;
    complete(Ops: any): void;
    run(Ops: any): void;
    /**
     * 出現位置をセット
     *
     * @param Ops
     * @returns {boolean}
     */
    setPosition(Ops: any): boolean;
    setAnimate(Ops: any, move: number): boolean;
    resize(): void;
    finalize(): void;
}
declare var $pageTop: GoToPageTop;
