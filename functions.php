<?php
/**
 * 独自関数ファイル
 *
 * @author: Nobuyuki Kondo
 * @uri: http://art-p.com/
 * @version: 1.0
 */
date_default_timezone_set('Asia/Tokyo');

// ドキュメントルートの取得
define('_PATH_', dirname(__FILE__));
define('_DIR_', '/' . basename(__DIR__));
define('_TIME_', time());

// インクルードパスの設定
set_include_path(get_include_path() . PATH_SEPARATOR . _PATH_);

// 個別ディレクトリパス定数定義
//defined('xxx_PATH') || define('UPLOADE_PATH', realpath(dirname(__FILE__).'/../xxx'));

// 必要ファイルの読み込み
setRequire('application/assets');
setRequire('application/model');
setRequire('application/controller');

// Chrome用ロガーの読み込み
//require_once "ChromePhp.php";


// 設定JSONの読み込み
global $_ini;
$j = @file_get_contents('data/settings.json');
$_ini = json_decode($j);


// メッセージJSONの読み込み
global $_message;
$m = @file_get_contents('data/message.json');
$_message = json_decode($m);

// カテゴリーJSONの読み込み
global $_category;
$c = @file_get_contents('data/category.json');
$_category = (array)json_decode($c);



/**
 * modelファイルの自動読み込み(ディレクトリ単位)
 * @param $str
 */
function setRequire($str)
{
  $dir = $str . '/';
  $full_path = _PATH_ . '/' . $dir;

  if(is_dir($full_path)){
    if($dh = opendir($full_path)){
      while(($file = readdir($dh)) !== false){
        if($file !== '.' && $file !== '..') require_once $full_path . $file;
      }
      closedir($dh);
    }
  }
}


/**
 * 改行の置換
 * @param $data
 * @return mixed
 */
function replaceBr($data)
{
  return str_replace(array("\r\n", "\r", "\n"), '', $data);
}

/**
 * 実体参照への変換
 *
 * @param $data
 * @return string
 */
function setHtmlChars($data)
{
  return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

/**
 * ランダムなアクセストークンの発行
 * @param int $length
 * @return string
 */
function setAccessToken($length = 8)
{
  static $token = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';

  $str = '';
  for($i = 0; $i < $length; $i++){
    $str .= $token[mt_rand(0, 61)];
  }

  return $str;
}
