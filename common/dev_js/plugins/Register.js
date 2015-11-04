/*******************************************************************************
 * Copyright (c) 2015. Code for KORIYAMA. All Rights Reserved.
 *
 * @author: Nobuyuki Kondo
 * @uri: http://koriyama.io/
 * @date: 2015/5/3
 ******************************************************************************/
var Register = {
  target: {
    form: '#postForm',
    btn : '.submit-link',
    mesArea: '#message',
    mesText: '#message-text',
    input: '.jsChange-Edit'
  },
  btn   : {
    write : 'new',
    update: 'update',
    del   : 'delete'
  },
  init  : function () {
    var _t = this,
      form = $(_t.target.form),
      btnType = '';

    $(_t.target.btn).on('click', function (e) {
      e.preventDefault();
      btnType = $(this).data('submit');

      _t.process(form, btnType);
      //form.submit();
      return false;
    });

    $(document).on('keydown', function(e){
      // Enterキーを無効
      switch(e.keyCode){
        case 13:
          return false;
          break;
      }
    });

    form.on('submit', function (e) {
      return false;
    });

    // 登録画像削除
    $(document).on('click', '#upLoads-delete', function(e){
      e.preventDefault();

      var conf = confirm(Cmn.message.conf.image_delete);

      if(conf === false) return false;

      $('#photoThumb').fadeOut(400, function(){
        $(this).html('');
        $('#areaForm-photoFile').val('');
      });
    });
  },

  /**
   * データ処理
   * @param form
   * @param btnType
   * @returns {boolean}
   */
  process: function(form, btnType){
    var _t = this,
      status = '',
      message = '',
      f = $('#postForm'),
      d = new FormData(f[0]),
      name_id = $('#areaForm-formName'),
      name = name_id.val();

    if(name === ''){
      name_id.addClass('error');
      return false;
    }

    $(_t.target.mesText).text(Cmn.message.write.process).addClass('process');
    $(_t.target.mesArea).addClass('show');


    d.append('btnType', btnType);
    $.ajax({
      type: 'POST',
      url: Cmn.dir + '/register',
      dataType: 'json',
      data: d,
      processData: false,
      contentType: false,
      success: function(res){
        status = res.result;
        message = res.message;
      },
      error: function(data){
        status = 'error';
        message = Cmn.message.write.error
      },
      complete: function(){
        _t.displayMessage(message, status);
      }
    });
  },

  /**
   * メッセージの表示
   * @param message
   * @param status
   */
  displayMessage: function(message, status){
    var _t = this;
    $(_t.target.mesText).removeClass('process').text(message).addClass(status);
    $(_t.target.mesArea).addClass('show');

    Maps.closeBtn();

    setTimeout(function(){
      $(_t.target.mesArea)
        .removeClass('show')
        .on(EVENTS.animation.end, function(){
          $(this).off(EVENTS.animation.end);
          $(_t.target.mesText).text('').removeClass(status);
        });
    }, 3000);
  },

  /**
   * 登録データの削除処理
   * @param id
   * @param _d
   */
  deleteData:function(id, _d){
    var _t = this,
      d = new FormData();

    d.append('btnType', 'delete');
    d.append('data_id', id);

    $.ajax({
      type: 'POST',
      url: Cmn.dir + '/register',
      dataType: 'json',
      data: d,
      processData: false,
      contentType: false,
      success: function(res){
        switch(res.result){
          case 'success':
            _d.remove();
            break;
          case 'error':
            $(_t.target.mesText).text(res.message).addClass(res.result);
            $(_t.target.mesArea).addClass('show');

            setTimeout(function(){
              $(_t.target.mesArea).removeClass('show');
            }, 3000);

            _d.fadeIn(300);
            break;
        }
        //status = res.result;
        //message = res.message;
      },
      error: function(data){},
      complete: function(){
        //_t.displayMessage(message, status);
      }
    });
  },

  /**
   * 入力フォームの内容をリセット
   */
  removeForm: function(){
    $('input, select, textarea').blur();
    $(this.target.input).val('');
    $('#areaForm-formCategory').val('0');
    $('#areaForm-formName').removeClass('error');
    $('#photoThumb').attr('style', '').html('');
    $('#mapGeo').val('false');
  }
};

Register.init();



