/*******************************************************************************
 * Copyright (c) 2015. dmp Inc. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://www.dmp.co.jp/
 * @date: 2015/2/3
 ******************************************************************************/
var Cmn = {
  ua: window.navigator.userAgent.toLowerCase(),       // ユーザーエージェント取得
  apv: window.navigator.appVersion.toLowerCase(),      // アプリバージョン取得
  browser: {
    chrome: false,
    safari: false,
    firefox: false,
    opera: false,
    ie: {
      v6: false,
      v7: false,
      v8: false,
      v9: false,
      v10: false,
      v11: false
    }
  },
  ie: {
    ie: false,
    ie8_lte: false,
    ie9_lte: false
  },
  engine: {
    webkit: false,
    gecko: false,
    presto: false
  },
  tablet: {
    iPad: false,
    android: false
  },
  smartPhone: {
    iPhone: false,
    iPod: false,
    android: false,
    winPhone: false,
    blackBerry: false
  },
  device: {
    pc: false,
    tab: false,
    sp: false
  },
  information: {
    w: Frame.getBrowserWidth(),
    h: Frame.getBrowserHeight()
  },
  os: {
    windows: false,
    osx: false,
    iOS7: false,
    iOS8: false,
    iOS: false
  }
};

// 各ブラウザ判定
Cmn.browser.chrome = Cmn.ua.indexOf('chrome') > 0 && Cmn.ua.indexOf('safari') > 0;
Cmn.browser.safari = Cmn.ua.indexOf('chrome') === -1 && Cmn.ua.indexOf('safari') > 0;
Cmn.browser.firefox = Cmn.ua.indexOf('firefox') > 0;
Cmn.browser.opera = Cmn.ua.indexOf('opera') > 0;
Cmn.browser.ie.v6 = Cmn.ua.indexOf('msie 6.') > 0;
Cmn.browser.ie.v7 = Cmn.ua.indexOf('msie 7.') > 0;
Cmn.browser.ie.v8 = Cmn.ua.indexOf('msie 8.') > 0;
Cmn.browser.ie.v9 = Cmn.ua.indexOf('msie 9.') > 0;
Cmn.browser.ie.v10 = Cmn.ua.indexOf('msie 10.') > 0;
Cmn.browser.ie.v11 = Cmn.ua.indexOf('trident/7') > 0;

// IE判定
Cmn.ie.ie8_lte = Cmn.browser.ie.v6 || Cmn.browser.ie.v7 || Cmn.browser.ie.v8;
Cmn.ie.ie9_lte = Cmn.ie.ie8_lte || Cmn.browser.ie.v9;
Cmn.ie.ie = Frame.checkBoolean(Cmn.browser.ie);


// ブラウザエンジン
Cmn.engine.webkit = Cmn.ua.indexOf('webkit/') > 0;    // Safari, Chrome系
Cmn.engine.gecko = Cmn.ua.indexOf('gecko/') > 0;      // Firefox系
Cmn.engine.presto = Cmn.ua.indexOf('Presto/') > 0;    // Opera系

// 各タブレットブラウザ
Cmn.tablet.iPad = Cmn.ua.indexOf('iPad') > 0 || Cmn.ua.indexOf('ipad') > 0;
Cmn.tablet.android = (Cmn.ua.indexOf('android') > 0 && Cmn.ua.indexOf('mobile') === -1) || Cmn.ua.indexOf('A1_07') > 0 || Cmn.ua.indexOf('SC-01C') > 0;    // A1_07とSC-01CはタブレットにもかかわらずMobileのUAが付与される(2013/02現在)

// 各スマホ
Cmn.smartPhone.iPhone = Cmn.ua.indexOf('iPhone') > 0 || Cmn.ua.indexOf('iphone') > 0;
Cmn.smartPhone.iPod = Cmn.ua.indexOf('iPod') > 0 || Cmn.ua.indexOf('ipod') > 0;
Cmn.smartPhone.android = Cmn.ua.indexOf('android') > 0 && Cmn.ua.indexOf('mobile') > 0;
Cmn.smartPhone.winPhone = Cmn.ua.indexOf('Windows Phone') > 0;
Cmn.smartPhone.blackBerry = Cmn.ua.indexOf('Blackberry') > 0;


// デバイス判定
Cmn.device.tab = Frame.checkBoolean(Cmn.tablet);
Cmn.device.sp = Frame.checkBoolean(Cmn.smartPhone);
Cmn.device.pc = Cmn.device.tab === false && Cmn.device.sp === false;

// OS判定
var _os7 = Cmn.ua.indexOf('os 7_') > 0 && Cmn.ua.indexOf('like mac os x') > 0,
  _os8 = Cmn.ua.indexOf('os 8_') > 0 && Cmn.ua.indexOf('like mac os x') > 0;

Cmn.os.windows = Cmn.ua.indexOf('windows') > 0;
Cmn.os.osx = Cmn.ua.indexOf('intel mac os x') > 0;
Cmn.os.iOS7 = _os7;
Cmn.os.iOS8 = _os8;
Cmn.os.iOS = _os7 === true || _os8 === true;

// CSS3 transition対応可否
// Modernizr使え：http://modernizr.com/

