<?php
session_cache_limiter(false);
require_once "functions.php";
require_once 'vendor/autoload.php';

global $app, $_Browser;

$app = new \Slim\Slim(array(
  'mode' => 'development',
  'debug' => true,
  'view' => new \Slim\Views\Twig(),
  'cookies.lifetime' => 172800,
  'templates.path' => './templates'
));

$app->configureMode('production', function () use ($app){
  $app->config(array(
    'debug' => false
  ));
});


/** Router */
$app->map('/', '\App\Controller\FrontTop:login')->via('POST', 'GET');

$app->get('/main', '\App\Controller\FrontMain:main');

// 自分が記録したデータを取得
$app->get('/myData/:team', '\App\Controller\Read:myData');


// 登録
$app->post('/register', '\App\Controller\Register:process');


// ルート記録
$app->post('/root', '\App\Controller\Root:rec');

// 他チームデータの取得
$app->get('/allData', '\App\Controller\Read:allData');

// deleteデータの取得
$app->get('/deleteData', '\App\Controller\Read:deleteData');


// php info
$app->get('/info', function () use ($app){
  phpinfo();
});


/** Backend */
$app->get('/manage', '\App\Controller\Backend:index');
$app->post('/manage/main', '\App\Controller\Backend:main');
//$app->get('/manage/main', '\App\Controller\Backend:main');

$app->get('/qr', '\App\Controller\Other:qr');


$app->get('/hash', function()use($app){
  /*
  $pw = "c4kmanage";
  $md5 = MD5($pw);

  $pw2 = "password2".$md5;
  $hash = hash('sha256', $pw2);

  var_dump($md5);
  var_dump($hash);

   */
});

// 404 Not Found
$app->notFound(function () use ($app){
  echo 'error';
  $app->redirect(_DIR_, 404);
});

$app->run();
