/// <reference path="../../dts/libs/jquery.d.ts" />
/// <reference path="../../dts/libs/googlemap.d.ts" />
/// <reference path="../../dts/libs/custom.d.ts" />
/// <reference path="../../dts/libs/mustache.d.ts" />
/// <reference path="../assets/Cmn.d.ts" />
/// <reference path="../assets/Events.d.ts" />
/*******************************************************************************
 * Backend Google Map & ResultList
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
declare class BGMapping {
    private viewTeam;
    private isData;
    private offset;
    private areaMap;
    private markerBounds;
    private marker;
    private mapOption;
    private teamSetting;
    private teamData;
    private teamMarker;
    private teamRoot;
    private template;
    private category;
    private resultList;
    private target;
    constructor();
    /**
     * 登録されたデータをオフセットで取得
     */
    getEntryData(): void;
    /**
     * チームデータの格納
     * @param data
     */
    setTeamList(data: any): void;
    /**
     * 登録データの表示
     * @param count
     */
    setList(count: any): void;
    /**
     * マーカーの描写
     * @param count
     */
    setMarker(count: any): void;
    /**
     * ランダムカラーの生成
     * @param obj
     * @returns {string}
     */
    getRandomColor(obj?: any[]): string;
    getTimeDiff(times: any): any;
}
