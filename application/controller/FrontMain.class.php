<?php
namespace App\Controller;
use Cmn;

class FrontMain
{
  private $app;
  public function __construct()
  {
    global $app;
    $this->app = $app;

    // チーム名が存在してなければトップへ遷移
    Cmn\Ini::checkCookie();
  }



  public function main()
  {
    global $_ini, $_category;
    //session_start();

    $ini = Cmn\Ini::setInfo();

    $this->app->render('front/main.twig', array(
      INI=>$ini,
      'category'=>$_category,
      'admin_code'=>$_ini->code
    ));
  }
}
