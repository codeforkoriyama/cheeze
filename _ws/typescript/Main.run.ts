/*******************************************************************************
 * Main Run
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
///<reference path="../dts/libs/jquery.d.ts" />
///<reference path="../dts/libs/custom.d.ts" />
///<reference path="assets/Cmn.ts"/>

/** 向き検知 */
var isLandScape = function(){
  var orient = Math.abs(window.orientation);

  if(orient === 90){
    // Landscape
    $('.portrait').addClass('hide');
    $('.landscape').removeClass('hide');
  }else{
    // Portrait
    $('.portrait').removeClass('hide');
    $('.landscape').addClass('hide');
  }
};


jQuery(function($){
  if(Cmn.device.pc === false) {
    isLandScape();

    $(window).on('resize orientationchange', ()=> {
      isLandScape();
    });
  }
});


