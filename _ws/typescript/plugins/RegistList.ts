/*******************************************************************************
 * Regist List
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
///<reference path="Mapping.ts"/>

var Register:any;

class RegistList {
  private target = {
    area     : '#areaList',
    container: '#areaList-container',
    contents : '#areaList-contents',
    loader   : '#areaList-loading',
    menuBtn  : '#header-listMenu',
    link     : '.jsClick-Process',
    swipeDelete: '.jsSwipe-Delete',
    returnItem: '.jsClick-Return'
  };

  private easing = {
    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'
  };

  private cls = {
    no_data: 'no_data'
  };

  private flg = {
    touch: false
  };

  constructor() {
    var _t = this,
      h = Frame.getBrowserHeight() - 40;

    $(_t.target.area).css({height: h});


    $(_t.target.menuBtn).on('touchend', function (e) {
      e.preventDefault();
      var isFlg = $(this).hasClass('show'),
        isBtn = $('#btnEdit').hasClass('onEdit');

      if (isBtn === true) Maps.closeBtn();

      if (isFlg === false) {
        _t.showList();
      } else {
        _t.closeList();
      }
    });

    // Edit or Delete
    $(document).on('click', _t.target.link, function (e) {
      e.preventDefault();

      _t.flg.touch = false;

      var self = $(this),
        process = self.data('process'),
        _d = self.parents('.registData');

      _t.listProcess(process, _d);
    });


    // Swipe Delete
    $(document).on({
      'touchstart.swipe': function(e){
        if(_t.flg.touch === false) return false;

        var touch = e.originalEvent.touches;
        this.start_x = touch[0].pageX;
        this.start_y = touch[0].pageY;
        this.start_time = e.timeStamp;
      },
      'touchmove.swipe': function(e){
        if(_t.flg.touch === false) return false;

        var touch = e.originalEvent.touches;
        this.end_time = e.timeStamp;

        this.move_x = touch[0].pageX - this.start_x;
        this.move_y = touch[0].pageY - this.start_y;


        if(this.move_x < 0) {
          $(this).css({
            '-webkit-transform' : 'translate3d(' + this.move_x + 'px, 0, 0)',
            'transform'         : 'translate3d(' + this.move_x + 'px, 0, 0)',
            '-webkit-transition': 'none',
            'transition'        : 'none'
          });
        }
      },
      'touchend.swipe': function(e){
        if(_t.flg.touch === false) return false;

        var move_diff = this.start_x - this.move_x,
          time_diff = this.end_time - this.start_time,
          end_x = 0,
          speed = '0.3s',
          easing = _t.easing.easeOutBack;    // ease out back

        if(move_diff >= 350){
          end_x = -100;
          speed = '0.3s';
          easing = 'ease';
        }

        $(this).css({
          'webkit-transform': 'translate3d(' + end_x + '%, 0, 0)',
          'transform': 'translate3d(' + end_x + '%, 0, 0)',
          '-webkit-transition': '-webkit-transform ' + speed + ' '+ easing,
          'transition': 'transform ' + speed + ' '+ easing
        }).on(EVENTS.animation.end, function(){
          var _self = $(this),
            _data = _self.parents('.registData'),
            timer = 0,
            flg = true;

          _self.off(EVENTS.animation.end);

          if(end_x === -100) {
            setTimeout(()=> {

              // 削除処理
              if (flg === true) {
                _data.addClass('delete').on(EVENTS.animation.end, function () {
                  $(this).off(EVENTS.animation.end).remove();
                });

                var _id = _data.data('id');
                Register.deleteData(_id, _data);
              }
            }, 3000);


            // 削除取り消し
            _data.find(_t.target.returnItem).on('touchend', function (e) {
              e.preventDefault();
              var speed = '0.3s';

              clearTimeout(timer);
              flg = false;

              $(this).parents('.registData').find('.registData-show').css({
                'webkit-transform'  : 'translate3d(0, 0, 0)',
                'transform'         : 'translate3d(0, 0, 0)',
                '-webkit-transition': '-webkit-transform ' + speed + ' ' + _t.easing.easeOutBack,
                'transition'        : 'transform ' + speed + ' ' + _t.easing.easeOutBack
              })
            });
          }
        });
      }
    }, _t.target.swipeDelete);




  }

  /**
   * 登録データ領域の表示
   */
  showList() {
    var _t = this;

    $(_t.target.menuBtn).addClass('show');
    $('body').addClass('noScroll');
    $(_t.target.area).addClass('show').on(EVENTS.animation.end, function () {
      $(this).off(EVENTS.animation.end);
      // 登録リストのデータ取得
      _t.getMyData();

      _t.flg.touch = true;
    });
  }

  /**
   * 登録データ領域を閉じる
   */
  closeList() {
    var _t = this;

    _t.flg.touch = false;

    $(_t.target.menuBtn).removeClass('show');
    $('body').removeClass('noScroll');
    $(_t.target.area).removeClass('show').on(EVENTS.animation.end, function () {
      $(this).off(EVENTS.animation.end);
      // 登録リストの削除
      $(_t.target.loader).removeClass('hide');
      $(_t.target.container).removeClass('show');
      $(_t.target.contents).html('');
    });
  }


  /**
   * ローダーの非表示
   */
  hideLoading() {
    $(this.target.loader).addClass('hide');
    $(this.target.container).addClass('show');
  }

  /**
   * 登録データの取得
   */
  getMyData() {
    var _t = this,
      team = $('#form_team').val();

    if (team !== '') {
      var url = Cmn.dir + '/myData/' + encodeURI(team);

      $.ajax({
        type         : 'GET',
        url          : url,
        scriptCharset: 'utf-8',
        dataType     : 'json',
        data         : null,
        processData  : false,
        contentType  : false,
        success      : (res)=> {
          switch (res.status) {
            case 'no_data':
              _t.noData(res.message);
              break;
            case 'success':
              _t.writeMus(res.data);
              break;
          }
        },
        error        : (req, status, thr)=> {
          console.log('error:', status);
        },
        complete     : ()=> {
        }
      });


      _t.hideLoading();
    } else {
      // チーム名がない場合
      //_t.hideLoading();
    }
  }

  /**
   * テンプレートに書き込んで表示
   * @param data
   */
  writeMus(data) {
    var template = Cmn.dir + '/mus/registList.mustache',
      elem = '';

    $.get(template, (temp)=> {
      for (var i = data.length - 1; i >= 0; i--) {
        var obj = data[i];

        obj.dir = Cmn.dir;
        elem += Mustache.render(temp, obj);
      }

      // '<p id="registInfo">text</p>' +

      var _h = '<ol id="registListData">' + elem + '</ol>';

      $(this.target.contents).removeClass(this.cls.no_data).html(_h);
    });


  }

  /**
   * データがない場合
   * @param mes
   */
  noData(mes) {
    var html = '<p class="noData">' + mes + '</p>';

    $(this.target.contents).addClass(this.cls.no_data).html(html);
  }

  /**
   * 編集 or 削除
   * @param process
   * @param _d
   */
  listProcess(process, _d) {
    var regist = {
        id     : _d.data('id'),
        name   : _d.data('name'),
        map    : _d.data('map'),
        cat    : _d.data('cat'),
        lat    : _d.data('lat'),
        lng    : _d.data('lng'),
        file   : _d.data('file'),
        thumb: '',
        geo    : _d.data('mapGep'),
        created: _d.data('created'),
        updated: _d.data('updated'),
        dir    : Cmn.dir
      },
      template = Cmn.dir + '/mus/thumbImage.mustache';

    // 処理方法でワケル
    switch (process) {
      case 'edit':
        regist.thumb = regist.file + '_middle';

        var geo = (regist.geo !== '') ? regist.geo : false;

        // データをセット
        $('#areaForm-formName').val(regist.name);
        $('#areaForm-formMapNumber').val(regist.map);
        $('#areaForm-formCategory').val(regist.cat);
        $('#map-lat').val(regist.lat);
        $('#map-lng').val(regist.lng);
        $('#areaForm-dataID').val(regist.id);
        $('#areaForm-photoFile').val(regist.file);
        $('#mapGeo').val(geo);

        $('#areaForm').removeClass('newWrite').addClass('editWrite');

        $.get(template, (temp)=> {
          var elem = Mustache.render(temp, regist);

          $('#photoThumb').html(elem);
        });

        Maps.openBtn([regist.lat, regist.lng]);
        this.closeList();
        break;
      case 'delete':
        var conf = confirm(Cmn.message.conf.data_delete);

        if (conf === false) return false;

        _d.fadeOut(400, function () {
          Register.deleteData(regist.id, _d);
        });
        break;
    }
  }
}

new RegistList();
