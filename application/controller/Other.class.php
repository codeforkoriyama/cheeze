<?php
namespace App\Controller;
use Cmn;


class Other
{
  private $app;
  public function __construct()
  {
    global $app;
    $this->app = $app;
  }

  public function info()
  {
    phpinfo();
  }

  public function qr()
  {
    $ini = Cmn\Ini::setInfo();

    $this->app->render('front/qr.twig', array(
      INI=>$ini
    ));
  }


}
