/// <reference path="../../dts/libs/jquery.d.ts" />
/// <reference path="../../dts/libs/custom.d.ts" />
/// <reference path="../assets/Cmn.d.ts" />
/// <reference path="../../dts/libs/mustache.d.ts" />
/// <reference path="../assets/Events.d.ts" />
/// <reference path="Mapping.d.ts" />
/*******************************************************************************
 * Regist List
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
declare var Register: any;
declare class RegistList {
    private target;
    private easing;
    private cls;
    private flg;
    constructor();
    /**
     * 登録データ領域の表示
     */
    showList(): void;
    /**
     * 登録データ領域を閉じる
     */
    closeList(): void;
    /**
     * ローダーの非表示
     */
    hideLoading(): void;
    /**
     * 登録データの取得
     */
    getMyData(): void;
    /**
     * テンプレートに書き込んで表示
     * @param data
     */
    writeMus(data: any): void;
    /**
     * データがない場合
     * @param mes
     */
    noData(mes: any): void;
    /**
     * 編集 or 削除
     * @param process
     * @param _d
     */
    listProcess(process: any, _d: any): boolean;
}
