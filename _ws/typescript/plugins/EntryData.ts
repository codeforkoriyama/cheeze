/*******************************************************************************
 * Entry Data
 *
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @version: 1.0
 ******************************************************************************/
///<reference path="../../dts/libs/jquery.d.ts" />
///<reference path="../../dts/libs/custom.d.ts" />
///<reference path="../assets/Cmn.ts"/>
///<reference path="../../dts/libs/mustache.d.ts"/>
///<reference path="../assets/Events.ts"/>

class EntryData {
  private elem:any;
  private team = [];
  private filtering:string = '';

  private offset:number = 0;

  private listTemplate:string = Cmn.dir + '/mus/filterResult.mustache';
  private filterTemplate:string = Cmn.dir + '/mus/filterTeam.mustache';

  private target = {
    select: '#teamFilter',
    result: '#landscape-result'
  };

  private flg = {
    start: false
  };

  constructor(){
    var _t = this;

    // 初期データの取得
    _t.getEntryData();

    // データの更新(10秒ごと)
    setInterval(()=>{
      if(_t.flg.start === false) return false;

      _t.flg.start = false;
      _t.getEntryData();
    }, 10000);    // 1000ms * 10s = 10000

    // 日付の更新(30秒毎)
    setInterval(()=>{
      if(_t.elem === void 0 || _t.flg.start === false) return false;

      for (var i = 0, iLen = _t.elem.length; i < iLen; i++) {
        var obj = $(_t.elem[i]),
          create = obj.data('created'),
          time = _t.getTimeDiff(create);

        obj.find('.filterResult-date').text(time);
      }
    }, 30000);   // 1000ms * 30s = 30000

    // チームフィルタリング
    $(document).on('change', _t.target.select, function(){
      _t.elem.removeClass('hidden');

      var selected = $(this).val();

      if(selected === '0'){
        _t.filtering = '';
      }else{
        _t.filtering = selected;

        _t.elem.filter(function(index){
          var self = $(this),
            team = self.data('team');

          if(team !== selected) self.addClass('hidden');
        });
      }
    });

    // 削除データが有る場合はremove(10分毎)
    setInterval(()=>{
      $.ajax({
        url: Cmn.dir + '/deleteData',
        dataType: 'json',
        type: 'GET',
        success: (data)=>{
          if(data.status === 'success'){
            _t.elem.filter(function(index){
              var self = $(this),
                data_id = String(self.data('id')),
                isRemove = data.list.indexOf(data_id);

              if(isRemove > -1){
                // 削除データが存在する場合
                self.remove();
                _t.elem.splice(index, 1);
              }
            });
          }
        },
        error: ()=>{},
        complete: ()=>{}
      });
    }, 600000);    // 1000ms * 60s * 10min = 600000
  }


  /**
   * 登録データの取得
   */
  getEntryData(){
    $.ajax({
      url: Cmn.dir + '/allData?offset=' + this.offset,
      dataType: 'json',
      type: 'GET',
      success: (data)=>{
        switch(data.status){
          case 'success':
            this.setDataList(data.data);
            this.setTeam(data.data);
            this.offset = data.count;
            break;
        }
        this.flg.start = true;
      },
      error: ()=>{},
      complete: ()=>{}
    });
  }

  /**
   * チームデータの整形と出力
   * @param data
   */
  setDataList(data){
    var elem = '';

    $.get(this.listTemplate, (template)=>{
      for (var i = (data.length - 1); i >= 0; i--) {
        var obj = data[i];

        obj.uploads = Cmn.dir + '/uploads';
        obj.time = this.getTimeDiff(obj.created_at);
        if(this.filtering === obj.team) obj.hidden = ' hidden';
        elem += Mustache.render(template, obj);
      }

      $(this.target.result).prepend(elem);
      this.elem = $('.filterResult');
    });
  }

  /**
   * チーム選択リストの整形
   * @param data
   */
  setTeam(data){
    $.get(this.filterTemplate, (template)=>{
      var elem = '';
      for (var i = 0, iLen = data.length; i < iLen; i++) {
        var obj = data[i],
          isArr = this.team.indexOf(obj.team);

        if(isArr > -1) continue;

        this.team.push(obj.team);
        elem += Mustache.render(template, obj);
      }

      $(this.target.select).append(elem);
    });
  }

  /**
   * 登録日付が今からどれくらい前か
   * @param times
   * @returns {string}
   */
  getTimeDiff(times){
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
      return timeData + '日前';
    }

    // 365日で割る
    timeData = timeData / 365 >> 0;
    return timeData + '年以上前';
  }
}

new EntryData();
