/// <reference path="../../dts/libs/jquery.d.ts" />
/// <reference path="../../dts/libs/custom.d.ts" />
/// <reference path="../assets/Cmn.d.ts" />
/// <reference path="../../dts/libs/mustache.d.ts" />
/// <reference path="../assets/Events.d.ts" />
/*******************************************************************************
 * Entry Data
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
declare class EntryData {
    private elem;
    private team;
    private filtering;
    private offset;
    private listTemplate;
    private filterTemplate;
    private target;
    private flg;
    constructor();
    /**
     * 登録データの取得
     */
    getEntryData(): void;
    /**
     * チームデータの整形と出力
     * @param data
     */
    setDataList(data: any): void;
    /**
     * チーム選択リストの整形
     * @param data
     */
    setTeam(data: any): void;
    /**
     * 登録日付が今からどれくらい前か
     * @param times
     * @returns {string}
     */
    getTimeDiff(times: any): string;
}
