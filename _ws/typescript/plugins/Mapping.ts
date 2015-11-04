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
///<reference path="../../dts/libs/googlemap.d.ts"/>
///<reference path="../../dts/libs/custom.d.ts"/>
///<reference path="../assets/Cmn.ts"/>
///<reference path="../assets/Events.ts"/>

var Register:any;

class Mapping {
  // 領域
  private h:number = 0;
  private area = {
    mapH : 0,
    editH: 0
  };

  // マップ関連
  private areaMap:any;
  private myGeo:any;
  private myPosition:any;
  private myMarker:any;
  private myDiffCircle:any;
  private mapOption = {
    zoom             : 18,
    center           : new google.maps.LatLng(37.397983, 140.388412),    // 郡山駅
    mapTypeId        : google.maps.MapTypeId.ROADMAP,
    scrollwheel      : true,
    scaleControl     : true,
    panControl       : true,
    zoomControl      : false,
    mapTypeControl   : false,
    streetViewControl: true,
    draggable        : true
  };

  private editMarker:any;

  // ターゲット
  private target = {
    areaMap : '#areaMap',
    areaEdit: '.jsLoad-EditArea',
    btnEdit : '#btnEdit',
    form    : '#areaForm'
  };

  // フラグ
  private flg = {
    edit: false,
    drag: true,
    root: true
  };

  // クラス名
  private cls = {
    edit: 'onEdit'
  };

  // Form
  private form = {
    val: '.jsChange-Edit',
    lat: '#map-lat',
    lng: '#map-lng',
    geoFlg: '#mapGeo'
  };

  // その他
  private settings:any;

  constructor() {
    var _t = this;

    _t.h = Frame.getBrowserHeight();
    _t.area.mapH = _t.h * 0.3;
    _t.area.editH = _t.h - _t.area.mapH;

    $(_t.target.areaMap).css({height: _t.h});
    $(_t.target.areaEdit).css({height: _t.area.editH});

    $.getJSON(Cmn.dir + '/data/settings.json', (json)=> {
      _t.settings = json;
    }).done(()=> {
      // マップの描写
      var div = $(_t.target.areaMap).get(0);
      _t.areaMap = new google.maps.Map(div, _t.mapOption);

      // 現在地の取得
      _t.getMyPosition('load');
    });


    // Editボタン押下
    $(_t.target.btnEdit).on('touchend', function (e) {
      e.preventDefault();
      var isClose = $(this).hasClass(_t.cls.edit);

      $(_t.target.form).removeClass('editWrite').addClass('newWrite');

      if (isClose === false) {
        _t.openBtn();
      } else {
        _t.closeBtn();
      }
    });

  }

  /**
   * 現在地の観測
   */
  getMyPosition(mode = null):void {

    var _t = this,
      errorCount = 0;

    _t.myPosition = window.navigator.geolocation.watchPosition(positionSuccess, positionError, {
      enableHighAccuracy: true,
      maximumAge        : 30000,
      timeout           : 27000
    });

    /**
     * 位置情報の成功
     * @param geo
     */
    function positionSuccess(geo:any):void {
      errorCount = 0;
      _t.myGeo = geo;

      // マーカーのセット
      var currentPosition = new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude),
        icon = {
          path         : google.maps.SymbolPath.CIRCLE,
          scale        : 6,
          fillColor    : _t.settings.subColor,
          fillOpacity  : 1,
          strokeColor  : '#ffffff',
          strokeOpacity: 1,
          strokeWeight : 1
        };

      if (_t.myMarker === void 0) {
        _t.myMarker = new google.maps.Marker({
          icon: icon,
          map : _t.areaMap
        });
      }

      // 誤差サークルのセット
      if (_t.myDiffCircle === void 0) {
        _t.myDiffCircle = new google.maps.Circle({
          center       : currentPosition,
          radius       : geo.coords.accuracy,
          strokeColor  : _t.settings.mainColor,
          strokeOpacity: 0.8,
          strokeWeight : 1,
          fillColor    : _t.settings.mainColor,
          fillOpacity  : 0.2,
          map          : _t.areaMap
        });
      } else {
        _t.myDiffCircle.setCenter(currentPosition);
        _t.myDiffCircle.setRadius(geo.coords.accuracy);
      }

      _t.myMarker.setPosition(currentPosition);

      var isM = _t.myMarker.getVisible(),
        isC = _t.myDiffCircle.getVisible();

      if (isM === false) _t.myMarker.setVisible(true);
      if (isC === false) _t.myDiffCircle.setVisible(true);

      if (_t.flg.edit === true) {
        _t.myMarker.setVisible(false);
        _t.myDiffCircle.setVisible(false);
      } else {
        _t.areaMap.panTo(currentPosition);
      }


      if(mode === 'load'){
        $('#message').removeClass('show');
        $('#mesage-text').html('');
      }

      // 3分毎に現在地をDBに格納
      if (_t.flg.root === true) {
        _t.flg.root = false;
        setTimeout(()=> {
          _t.flg.root = true;
          var team = $('#form_team').val(),
            lat = _t.myGeo.coords.latitude,
            lng = _t.myGeo.coords.longitude;

          $.ajax({
            url     : Cmn.dir + '/root',
            type    : 'POST',
            dataType: 'json',
            data    : {
              team: team,
              lat : lat,
              lng : lng
            },
            success : (res)=> {
            },
            error   : ()=> {
            },
            complete: ()=> {
            }
          });
        }, 180000); // 1000ms * 60sec * 3分 = 180000
      }

    }

    /**
     * 取得エラー(3回連続の場合画面ロック)
     * @param error
     */
    function positionError(error:any):void {
      errorCount++;
      console.log(error, errorCount);
      _t.flg.drag = false;

      switch (true) {
        case (errorCount > 3):
          // TODO: 使えない旨
          break;
        default:
          // 規定エラー回数以内の場合は再度取得にチャレンジ
          _t.getMyPosition();
          break;
      }
    }

  }

  /**
   * 観測を停止
   */
  clearPosition():void {
    navigator.geolocation.clearWatch(this.myPosition);

    this.myMarker.setVisible(false);
    this.myDiffCircle.setVisible(false);
  }

  /**
   * 登録・編集画面を表示
   * @param ltln
   */
  openBtn(ltln = []):void {
    $(this.target.areaMap).css({height: this.area.mapH});

    this.clearPosition();

    // フォームエリアの時はフラグを立てる
    this.flg.edit = true;
    this.flg.drag = false;

    $(this.target.btnEdit).addClass(this.cls.edit);
    this.editMapping(ltln);
  }

  /**
   * 登録・編集画面を非表示
   */
  closeBtn():void {
    $(this.target.areaMap).css({height: this.h});
    $(this.target.btnEdit).removeClass(this.cls.edit);
    Register.removeForm();

    // マーカー削除
    if (this.editMarker !== void 0) {
      google.maps.event.clearListeners(this.editMarker, 'dragend');
      this.editMarker.setMap(null);
    }

    // フラグのセット
    this.flg.edit = false;
    this.flg.drag = true;

    // 再描写
    var latlng = this.getLatLng();
    this.resizeMap(latlng);
    this.getMyPosition();
  }

  /**
   * アニメーションが終了したらマップの位置を調整
   * @param latlng
   */
  resizeMap(latlng):void {
    $(this.target.areaMap).on(EVENTS.animation.end, ()=> {
      google.maps.event.trigger(this.areaMap, 'resize');
      this.areaMap.setCenter(latlng.pos);
      $(this.target.areaMap).off(EVENTS.animation.end);
    });
  }


  /**
   * 位置情報を返す
   * @param ltln
   * @returns {google.maps.LatLng}
   */
  getLatLng(ltln = []) {
    var lat = (ltln[0] === void 0) ? this.myGeo.coords.latitude : ltln[0],
      lng = (ltln[1] === void 0) ? this.myGeo.coords.longitude : ltln[1];

    return {
      lat: lat,
      lng: lng,
      pos: new google.maps.LatLng(lat, lng)
    };
  }

  /**
   * 登録・編集画面でのピン位置
   * @param ltln
   */
  editMapping(ltln):void {
    var latlng = this.getLatLng(ltln);

    this.editMarker = new google.maps.Marker({
      position : latlng.pos,
      draggable: true,
      map      : this.areaMap
    });


    // マーカーを動かした場合は座標をセット
    google.maps.event.addListener(this.editMarker, 'dragend', (evt)=> {
      var lat = evt.latLng.lat(),
        lng = evt.latLng.lng();

      $(this.form.lat).val(lat);
      $(this.form.lng).val(lng);
      $(this.form.geoFlg).val('true');
    });

    //this.areaMap.panTo(latlng.pos);
    this.resizeMap(latlng);

    $(this.form.lat).val(latlng.lat);
    $(this.form.lng).val(latlng.lng);
  }
}

var Maps;
jQuery(function ($) {
  Maps = new Mapping();
});

