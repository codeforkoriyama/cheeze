<?php
namespace App\Controller;
use Cmn;

class Backend
{
  private $app;

  public function __construct()
  {
    global $app;
    $this->app = $app;
  }

  public function index()
  {
    /** ここからログイン処理 */
    session_start();

    $flash = \Cmn\Ini::getFlashMessage();
    $error_status = (!empty($flash['error_status'])) ? $flash['error_status'] : false;
    /** ここまで */

    $_access_token = setAccessToken(16);
    $_SESSION['token'] = $_access_token;
    $this->app->flash('token', $_access_token);
    $this->app->flashKeep();

    $ini = Cmn\Ini::setInfo();

    $this->app->render('back/login.twig', array(
      INI=>$ini,
      'token'=>$_access_token,
      'error_flg'=>$error_status
    ));
  }

  public function main()
  {
    /** ここからログイン処理 */
    session_start();

    $this->app->flashKeep();


    $token = (!empty($_SESSION['token'])) ? $_SESSION['token'] : null;
//    TODO: セッション破棄をすぐに行うとリロードするとエラーになるので要検討
//    unset($_SESSION['token']);

    $params = $this->app->request->params();

    // アクセストークンが一致しているか？
    if($params['manage_token'] !== $token){
      self::redirectManage();
      exit();
    }

    // 管理DBの呼び出して妥当性のチェック
    $admin_data = new \Adm\Management();
    $result = $admin_data->checkInputData($params['manage_user'], $params['manage_password']);

    if($result === false){
      self::redirectManage();
      exit();
    }
    /** ここまで */

    $ini = Cmn\Ini::setInfo();

    $this->app->render('back/main.twig', array(
      INI=>$ini
    ));
  }

  /**
   * 条件を満たしていない場合はリダイレクト
   */
  private function redirectManage()
  {
//    var_dump('error');
    $this->app->flash('error_status', 'error');
    $this->app->redirect(_DIR_.'/manage', 302);
  }
}
