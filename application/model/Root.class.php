<?php
namespace App\Controller;
use Cmn;

class Root
{
  private $app;
  private $xml;
  private $time;

  public function __construct()
  {
    global $app, $_ini;

    $this->app = $app;
    $this->xml = _PATH_ . '/data/' . $_ini->root_file;
    $this->time = date('Y-m-d H:i:s', time());

    // チーム名が存在してなければトップへ遷移
//    Cmn\Ini::checkCookie();
  }

  /**
   * ルートの記録
   */
  public function rec()
  {
    global $_ini;

    $data = $_POST;
    $xml = @simplexml_load_file($this->xml);

    try{
      if($xml === false) throw new \Exception(READ_ERR);

      $nodeData = $xml->addChild('rec');
      $nodeData->addChild(R_ADMIN, $_ini->code);
      $nodeData->addChild(R_NAME, $data['team']);
      $nodeData->addChild(R_LAT, $data['lat']);
      $nodeData->addChild(R_LNG, $data['lng']);
      $nodeData->addChild(R_CREATE, $this->time);

      $xml->asXML($this->xml);
      self::result('success');
    }catch (\Exception $e){
      // TODO:読み込み失敗処理
      self::result('error');
    }
  }

  /**
   * JSONで吐き出し
   * @param $mes
   */
  private function result($mes)
  {
    $json = json_encode($mes);
    header('Content-Type: text/javascript; charset=utf-8');
    echo $json;
  }
}
