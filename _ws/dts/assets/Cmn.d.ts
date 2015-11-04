/// <reference path="../frameworks/BaseFrame.d.ts" />
/*******************************************************************************
 * 共通変数ファイル
 *
 * Copyright (c) 2014. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @version: 2.0
 ******************************************************************************/
declare var Cmn: {
    ua: string;
    apv: string;
    browser: {
        chrome: boolean;
        safari: boolean;
        firefox: boolean;
        opera: boolean;
        ie: {
            v6: boolean;
            v7: boolean;
            v8: boolean;
            v9: boolean;
            v10: boolean;
            v11: boolean;
        };
    };
    ie: {
        ie: boolean;
        ie8_lte: boolean;
        ie9_lte: boolean;
    };
    engine: {
        webkit: boolean;
        gecko: boolean;
        presto: boolean;
    };
    tablet: {
        iPad: boolean;
        android: boolean;
    };
    smartPhone: {
        iPhone: boolean;
        iPod: boolean;
        android: boolean;
        winPhone: boolean;
        blackBerry: boolean;
    };
    device: {
        pc: boolean;
        tab: boolean;
        sp: boolean;
    };
    information: {
        w: number;
        h: number;
    };
    os: {
        windows: boolean;
        osx: boolean;
        iOS7: boolean;
        iOS8: boolean;
        iOS: boolean;
    };
};
declare var _os7: boolean, _os8: boolean;
