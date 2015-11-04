<?php

namespace Cmn;

class Ini {
  /**
   * 基本情報のセットアップ
   * @param array $data
   * @return array
   */
  public static function setInfo($data=array())
  {
    global $_ini, $app;

    $ini = array();

    $ini['title'] = (empty($data[TITLE])) ? $_ini->title : $data[TITLE] . ' | ' . $_ini->title;
    $ini['description'] = (empty($data[DESCRIPTION])) ? $_ini->description : $data[DESCRIPTION];

    $ini['team_name'] = $app->getCookie(TEAM);

    // 環境によって出力ディレクトリをわける
    switch(APP_ENV){
      case ENV_DEV:
        $dir_js = 'dev_js';
        break;
      case ENV_PRO:
      default:
        $dir_js = 'js';
        break;
    }

    $ini['dir_js'] = $dir_js;

    return $ini;
  }

  /**
   * フラッシュメッセージの取得
   * @return null
   */
  public static function getFlashMessage()
  {
    return (!empty($_SESSION['slim.flash'])) ? $_SESSION['slim.flash'] : null;
  }

  /**
   * チーム名が存在しない場合はトップへ遷移
   */
  public static function checkCookie()
  {
    global $app;
    $team = $app->getCookie(TEAM);

    if(empty($team)){
      $app->redirect(_DIR_, 302);
    }
  }
}
