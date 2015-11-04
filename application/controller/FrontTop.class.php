<?php
namespace App\Controller;
use Cmn;

class FrontTop
{
  private $app;
  public function __construct()
  {
    global $app;
    $this->app = $app;
  }

  /**
   * ログイン画面
   */
  public function login()
  {
    session_start();
    $error_class = null;

    if($this->app->request->getMethod() === 'POST'){
      if(empty($_POST[TEAM])){
        $this->app->flash(E_REQUIRE, true);
        setcookie(TEAM, '', time() - 1);
        $error_class = ' error';
      }else{
        $c = setHtmlChars($_POST[TEAM]);
        setcookie(TEAM, $c, DAYS_3);
        $this->app->redirect(_DIR_.'/main', 200);
        exit();
      }
    }

    $ini = Cmn\Ini::setInfo();

    $this->app->render('front/login.twig', array(
      INI=>$ini,
      'error_class'=>$error_class
    ));

  }
}
