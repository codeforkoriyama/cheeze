<?php
/**
 * 定数定義ファイル
 *
 * @author: Nobuyuki Kondo
 * @version: 1.0
 */
// 環境
define('ENV_DEV', 'development');
define('ENV_PRO', 'production');

// .htaccessの環境モードを取得
defined('APP_ENV')
|| define('APP_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : ENV_PRO));

//define('APP_ENV', ENV_DEV);

// 共通
define('INI', 'ini');
define('TITLE', 'title');
define('DESCRIPTION', 'description');
define('HEADER', 'header');
define('FOOTER', 'footer');

define('TEAM', 'team_name');
define('CLS', 'class');
define('CAT', 'category');

// エラーキー
define('E_REQUIRE', 'require');

// ステータス
define('SUCCESS', 'success');
define('ERROR', 'error');
define('TIMEOUT', 'timeout');
define('READ_ERR', 'read_error');
define('NO_DATA', 'no_data');


// 時間
define('DAYS_2', _TIME_ + 60 * 60 * 24 * 2);    // 2日間
define('DAYS_3', _TIME_ + 60 * 60 * 24 * 3);

// 登録関連
define('R_ID', 'data_id');
define('R_ADMIN', 'admin_code');
define('R_TEAM', 'team');
define('R_NAME', 'name');
define('R_MAP', 'map_number');
define('R_CAT', 'cat');
define('R_LAT', 'lat');
define('R_LNG', 'lng');
define('R_FILE_NAME', 'photo_file');
define('R_CREATE', 'created_at');
define('R_UPDATE', 'updated_at');
define('R_DELETE', 'deleted_at');
define('R_IS_DEL', 'is_deleted');
define('R_PHOTO', 'photo_image');
define('R_MAP_GEO', 'google_map_geo');







