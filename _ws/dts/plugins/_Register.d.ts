/// <reference path="../../dts/libs/jquery.d.ts" />
/// <reference path="../../dts/libs/custom.d.ts" />
/// <reference path="../assets/Cmn.d.ts" />
/// <reference path="../assets/Events.d.ts" />
/*******************************************************************************
 * データの登録・編集・削除
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
declare class Register {
    private target;
    private btn;
    constructor();
    process(form: any, btnType: any): void;
}
