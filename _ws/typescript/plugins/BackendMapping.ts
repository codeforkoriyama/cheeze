/*******************************************************************************
 * Backend Google Map & ResultList
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
  ///<reference path="../../dts/libs/mustache.d.ts"/>
  ///<reference path="../assets/Cmn.ts"/>
  ///<reference path="../assets/Events.ts"/>

class BGMapping {
  private viewTeam:string = '';
  private isData:boolean = false;

  private offset:number = 0;

  // マップ関連
  private areaMap:any;
  private markerBounds:any;
  private marker:any = [];
  private mapOption = {
    zoom             : 16,
    center           : new google.maps.LatLng(37.397983, 140.388412),    // 郡山駅
    mapTypeId        : google.maps.MapTypeId.ROADMAP,
    scrollwheel      : true,
    scaleControl     : true,
    panControl       : true,
    zoomControl      : true,
    mapTypeControl   : true,
    streetViewControl: true,
    draggable        : true
  };

  // チームに関するデータ
  private teamSetting:any = [];
  private teamData:any = [];
  private teamMarker:any = [];
  private teamRoot:any = [];

  // テンプレート
  private template = {
    filterTeam: Cmn.dir + '/mus/filterTeam.mustache',
    fukudashi : Cmn.dir + '/mus/fukidashi.mustache',
    list: Cmn.dir + '/mus/backendList.mustache'
  };

  private category:any;

  private resultList:any;

  // ターゲット
  private target = {
    table: '#resultListBody',
    result: '.resultList'
  };

  constructor() {
    var _t = this,
      div = $('#resultMap').get(0);
    _t.areaMap = new google.maps.Map(div, _t.mapOption);

    // カテゴリーデータの取得
    $.ajax({
      url: Cmn.dir + '/data/category.json',
      dataType: 'json',
      type: 'GET',
      async: false,
      success: (data)=>{
        this.category = data;
      }
    });

    this.markerBounds = new google.maps.LatLngBounds();

    _t.getEntryData();


    // 画像クリック
    $(document).on('click', '.jsClick-ModalImage', function(e){
      e.preventDefault();
      var file = $(this).data('image'),
        w = Frame.getBrowserWidth(),
        h = Frame.getBrowserHeight(),
        tag = '<img src="' + Cmn.dir + '/uploads/' + file + '" alt="">';

      // TODO: ブラウザサイズに応じて画像表示領域を変更
      $('#modal-contents').html(tag);
      $('#modal').removeClass('hide');
    });

    // モーダルクローズ
    $('#modal-bg').on('click', ()=>{
      $('#modal').addClass('hide');
      $('#modal-contents').html('');
    });

    // チームフィルタリング
    $(document).on('change', '#filter-team', function(){
      _t.resultList.removeClass('hide');

      var selected = $(this).val();

      if(selected === '0'){
        // すべてを表示
        _t.viewTeam = '';

        for (var i = 0, iLen = _t.marker.length; i < iLen; i++) {
          var obj = _t.marker[i];

          obj.setVisible(true);
        }
      }else{
        _t.viewTeam = selected;

        // 一致しないチームリストを非表示にする
        _t.resultList.filter(function(index){
          var self = $(this),
            team = self.data('team');

          if(team !== selected) self.addClass('hide');
        });

        // 一致しないチームのピンを非表示にする
        for (var i = 0, iLen = _t.marker.length; i < iLen; i++) {
          var obj = _t.marker[i],
            team = obj.team;

          if(team === selected){
            obj.setVisible(true);
          }else{
            obj.setVisible(false);
          }
        }
      }
    });

    // 各チームのトータル件数表示ボタン
    $('#entryTotal-btn').on('click', (e)=>{
      e.preventDefault();

      $('#entryTotal-data').toggleClass('show');
    });

    $(document).on('click', '.jsClick-Move', function(e){
      var self = $(this),
        lat = self.data('lat'),
        lng = self.data('lng'),
        pos = new google.maps.LatLng(lat, lng);

      _t.areaMap.setCenter(pos);
      _t.areaMap.setZoom(18);
    });

    // 1分ごとにデータを取得(1000ms * 60s = 60000ms
    setInterval(()=> {
      _t.getEntryData();
    }, 60000);

    // 30秒毎に時間を更新(1000ms * 10s = 10000ms
    setInterval(()=>{
      if(this.isData === false) return false;
      for (var i = 0, iLen = this.resultList.length; i < iLen; i++) {
        var obj = $(this.resultList[i]),
          created = obj.find('.created'),
          __c = created.data('created'),
          _c = this.getTimeDiff(__c);

        created.text(_c);
      }
    }, 10000);

    // 5分毎に削除データの取得(1000ms * 60s * 5min = 300000ms
    setInterval(()=>{
      $.ajax({
        url: Cmn.dir + '/deleteData',
        dataType: 'json',
        type: 'GET',
        success: (data)=>{
          if(data.status === 'success'){
            _t.resultList.filter(function(index){
              var self = $(this),
                data_id = String(self.data('id')),
                isRemove = data.list.indexOf(data_id);

              if(isRemove > -1){
                // 削除データが存在する場合
                self.remove();
                _t.resultList.splice(index, 1);
                _t.marker[index].setMap(null);
              }
            });
          }
        },
        error: ()=>{},
        complete: ()=>{}
      });
    }, 300000); //300000

    // 各チームの登録件数
    setInterval(()=>{
      // 一度トータル件数を削除
      for (var i = 0, iLen = this.teamSetting.length; i < iLen; i++) {
        var obj = this.teamSetting[i];
        obj.total = 0;
      }

      // 件数を計算
      for (var n = 0, nLen = this.teamData.length; n < nLen; n++) {
        var obj1 = this.teamData[n],
          isArr = this.teamSetting.filter((elem, index, arr)=>{
          return (elem.name === obj1.team)
        });

        isArr[0].total++;
      }

      // トータル件数をセット
      var elem = '';
      for (var j = 0, jLen = this.teamSetting.length; j < jLen; j++) {
        var obj2 = this.teamSetting[j];

        elem += '<li>' + obj2.name + ' : ' + obj2.total + '件</li>';
      }

      $('#entryTotal-data').html(elem);
    }, 10000);
  }

  /**
   * 登録されたデータをオフセットで取得
   */
  getEntryData() {
    $.ajax({
      url     : Cmn.dir + '/allData?offset=' + this.offset,
      dataType: 'json',
      type    : 'GET',
      success : (data)=> {
        switch (data.status) {
          case 'success':
            this.isData = true;
            this.offset = data.count;
            this.setTeamList(data.data);
            break;
          default:
            break;
        }
      },
      error   : ()=> {
      },
      complete: ()=> {
      }
    });
  }

  /**
   * チームデータの格納
   * @param data
   */
  setTeamList(data) {
    var elem = '',
      count = data.length;

    $.get(this.template.filterTeam, (template)=> {
      for (var i = 0, iLen = data.length; i < iLen; i++) {
        var obj = data[i],
          data_id = 0,
          isArr = this.teamSetting.filter((elem, index, arr)=> {    // 配列内にデータが存在するかチェック
            return (elem.name === obj.team)
          });

        // 該当するチームデータが存在しない場合はチーム情報をセット
        if (isArr.length === 0) {
          var len = this.teamSetting.length,
            //color_code = Math.floor(Math.random() * 16777215).toString(16),
            color_code = this.getRandomColor(this.teamSetting),
            team = {
              name : obj.team,
              color: color_code,
              id   : len,
              total: 0
            };

          this.teamSetting.push(team);
          data_id = len;

          // <select>タグに挿入
          elem += Mustache.render(template, obj);
        } else {
          data_id = isArr[0].id;
        }

        obj.team_id = data_id;

        this.teamData.push(obj);
      }

      $('#filter-team').append(elem);
      this.setMarker(count);
      this.setList(count);
    });
  }

  /**
   * 登録データの表示
   * @param count
   */
  setList(count){
    var diff = this.teamData.length - count;    // 追加データの個数を返却

    $.get(this.template.list, (template)=>{
      var elem = '';
      for (var i = this.teamData.length - 1; i >= diff; i--) {
        var obj = this.teamData[i],
          visible = (this.viewTeam === obj.team || this.viewTeam === '') ? '' : ' hide';

        obj.color = this.teamSetting[obj.team_id].color;
        obj.category = this.category[obj.cat];
        obj.cls = visible;
        obj.created = this.getTimeDiff(obj.created_at);
        elem += Mustache.render(template, obj);
      }

      $(this.target.table).prepend(elem);

      this.resultList = $(this.target.result);
    });
  }

  /**
   * マーカーの描写
   * @param count
   */
  setMarker(count) {
    var diff = this.teamData.length - count;   // データ個数の返却

    for (var i = diff, iLen = this.teamData.length; i < iLen; i++) {
      var obj = this.teamData[i];

      if (!obj.lat || !obj.lng) continue;

      var pos = new google.maps.LatLng(obj.lat, obj.lng),
        visible = obj.team === this.viewTeam || this.viewTeam === '',
        //context = Mustache.render(template, obj),
        color = this.teamSetting[obj.team_id].color,
        icon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_bubble_text_small&chld=bb|"+ obj.data_id +"|"+color+"|000000"),
        marker:any = new google.maps.Marker({
          position: pos,
          icon: icon,
          map     : this.areaMap,
          team    : obj.team,
          visible: visible
        });

      this.marker.push(marker);
      this.markerBounds.extend(pos);
    }

    this.areaMap.fitBounds(this.markerBounds);

    //$.get(this.template.fukudashi, (template)=> {
    //
    //});
  }



  /**
   * ランダムカラーの生成
   * @param obj
   * @returns {string}
   */
  getRandomColor(obj = []){
    var color = _generait();

    /// TODO:色の重複除去処理

    return color;

    function _generait(){
      var h = (Math.random() * 0xFFFFFF|0).toString(16);
      return ('000000' + h).slice(-6);
    }
  }


  getTimeDiff(times){
    if(times === '') return '';
    var now = new Date().getTime(),
      setTime = times.replace(/-/g, '/'),   // iOS対応。まさかハイフンサポートしてないとか・・・
      timestamp = new Date(setTime).getTime(),
      diffTime = now - timestamp,
      timeData = diffTime / 1000 >> 0;   // 1000ミリ秒で割る

    if(timeData < 60){
      return timeData + '秒前';
    }

    // 60秒で割る
    timeData = timeData / 60 >> 0;
    if(timeData < 60){
      return timeData + '分前';
    }

    // 60分で割る
    timeData = timeData / 60 >> 0;
    if(timeData < 24){
      return timeData + '時間前';
    }




    // 24時間で割る
    timeData = timeData / 24 >> 0;
    if(timeData < 365){
      return times;
      //return timeData + '日前';
    }
    //
    //// 365日で割る
    //timeData = timeData / 365 >> 0;
    //return timeData + '年以上前';
  }
}

new BGMapping();
