/*******************************************************************************
 * Google Map
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
///<reference path="../../dts/libs/jquery.d.ts" />
///<reference path="../assets/Cmn.ts"/>

class SizeStretch {
  private w:number = 0;
  private h:number = 0;
  private mapH:number = 0;
  private editH:number = 0;

  // ターゲット
  private target = {
    areaMap: '#areaMap',
    areaEdit: '#areaEdit',
    btnEdit: '#btnEdit'
  };

  // クラス
  private cls = {
    edit: 'onEdit'
  };

  constructor(){
    var _t = this;
    _t.setup();

    window.addEventListener('resize', this.setup);

    // Editボタンを押す
    $(_t.target.btnEdit).on('touchend', function(e){
      console.log('a');
      e.preventDefault();
      var hasClose = $(this).hasClass(_t.cls.edit);

      $(this).toggleClass(_t.cls.edit);

      if(hasClose === false){
        $(_t.target.areaMap).css({
          height: _t.mapH
        });
      }else{
        $(_t.target.areaMap).css({
          height: _t.h
        });
      }
    });
  }

  setup(){
    var w = Frame.getBrowserWidth(),
      h = Frame.getBrowserHeight() - 40,    // ヘッダーの高さを引く
      target = document.getElementById('areaMap');

    this.w = w;
    this.h = h;

    this.mapH = h * 0.3;

    var __h = h - this.mapH;
    $(this.target.areaEdit).css({height:__h});

    target.style.width = w + 'px';
    target.style.height = h + 'px';
  }
}


jQuery(function($){
  new SizeStretch();
});


