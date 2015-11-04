/// <reference path="../../dts/libs/jquery.d.ts" />
/// <reference path="../../dts/libs/googlemap.d.ts" />
/// <reference path="../../dts/libs/custom.d.ts" />
/// <reference path="../assets/Cmn.d.ts" />
/// <reference path="../assets/Events.d.ts" />
/*******************************************************************************
 * Google Map
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
declare var Register: any;
declare class Mapping {
    private h;
    private area;
    private areaMap;
    private myGeo;
    private myPosition;
    private myMarker;
    private myDiffCircle;
    private mapOption;
    private editMarker;
    private target;
    private flg;
    private cls;
    private form;
    private settings;
    constructor();
    /**
     * 現在地の観測
     */
    getMyPosition(mode?: any): void;
    /**
     * 観測を停止
     */
    clearPosition(): void;
    /**
     * 登録・編集画面を表示
     * @param ltln
     */
    openBtn(ltln?: any[]): void;
    /**
     * 登録・編集画面を非表示
     */
    closeBtn(): void;
    /**
     * アニメーションが終了したらマップの位置を調整
     * @param latlng
     */
    resizeMap(latlng: any): void;
    /**
     * 位置情報を返す
     * @param ltln
     * @returns {google.maps.LatLng}
     */
    getLatLng(ltln?: any[]): {
        lat: any;
        lng: any;
        pos: google.maps.LatLng;
    };
    /**
     * 登録・編集画面でのピン位置
     * @param ltln
     */
    editMapping(ltln: any): void;
}
declare var Maps: any;
