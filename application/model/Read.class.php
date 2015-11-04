<?php
namespace App\Controller;
use Cmn;

class Read
{
  const STS = 'status';
  const MES = 'message';

  private $app;
  private $xml;

  public function __construct()
  {
    global $app, $_ini;

    $this->app = $app;
    $this->xml = _PATH_ . '/data/' . $_ini->write_file;

    // チーム名が存在してなければトップへ遷移
//    Cmn\Ini::checkCookie();
  }

  /**
   * チーム名をキーにデータを取得
   * @param $team
   */
  public function myData($team)
  {
    global $_message;

    $data = array();
    $xml = @simplexml_load_file($this->xml);


    try{
      if($xml === false) throw new \Exception(READ_ERR);

      foreach($xml->data as $d){
        if((string)$d->{R_TEAM} !== $team) continue;
        if((int)$d->{R_IS_DEL} === 1) continue;

        $temp = self::setTemp($d);

        $data[] = $temp;
      }

      if(count($data) > 0){
        self::result(array(
          self::STS=>SUCCESS,
          'data'=>$data
        ));
      }else{
        // 一つもない時
        self::result(array(
          self::STS=>NO_DATA,
          self::MES=>$_message->xml->no_data
        ));
      }
    }catch (\Exception $e){
      self::result(array(
        self::STS=>ERROR,
        self::MES=>$_message->xml->{$e->getMessage()}
      ));
    }

  }

  /**
   * 全チームのデータを取得
   */
  public function allData()
  {
    global $_message;

    $offset = (empty($_GET['offset'])) ? 0 : $_GET['offset'];

    $data = array();
    $xml = @simplexml_load_file($this->xml);

    try{
      if($xml === false) throw new \Exception(READ_ERR);

      $count = count($xml);   // 件数取得

      for($i = $offset; $i < $count; $i++){
        $d = $xml->data[(int)$i];
        if((int)$d->{R_IS_DEL} === 1) continue;

        $temp = self::setTemp($d);
        $data[] = $temp;
      }

      $num = count($data);

      if($num > 0){
        self::result(array(
          self::STS=>SUCCESS,
          'data'=>$data,
          'count'=>$count,
          'num'=>$num
        ));
      }else{
        // 一つもない時
        self::result(array(
          self::STS=>NO_DATA,
          self::MES=>$_message->xml->no_data
        ));
      }
    }catch (\Exception $e){
      self::result(array(
        self::STS=>ERROR,
        self::MES=>$_message->xml->{$e->getMessage()}
      ));
    }
  }

  /**
   * 削除データのIDのみ取得
   */
  public function deleteData()
  {
    global $_message;

    $data = array();
    $xml = @simplexml_load_file($this->xml);

    try{
      if($xml === false) throw new \Exception(READ_ERR);

      foreach($xml->data as $d){
        if((int)$d->{R_IS_DEL} !== 1) continue;


        $data[] = (string)$d[R_ID];
      }

      if(count($data) > 0){
        self::result(array(
          self::STS=>SUCCESS,
          'list'=>$data
        ));
      }else{
        // 一つもない時
        self::result(array(
          self::STS=>NO_DATA,
          self::MES=>$_message->xml->no_data
        ));
      }
    }catch (\Exception $e){
      self::result(array(
        self::STS=>ERROR,
        self::MES=>$_message->xml->{$e->getMessage()}
      ));
    }
  }

  /**
   * 取得データの整形
   * @param $d
   * @return array
   */
  private function setTemp($d)
  {
    return array(
      R_ID=>(string)$d[R_ID],
      R_TEAM=>(string)$d->{R_TEAM},
      R_NAME=>(string)$d->{R_NAME},
      R_MAP=>(string)$d->{R_MAP},
      R_CAT=>(string)$d->{R_CAT},
      R_LAT=>(string)$d->{R_LAT},
      R_LNG=>(string)$d->{R_LNG},
      R_FILE_NAME=>(string)$d->{R_FILE_NAME},
      R_MAP_GEO=>(boolean)$d->{R_MAP_GEO},
      R_CREATE=>(string)$d->{R_CREATE},
      R_UPDATE=>(string)$d->{R_UPDATE}
    );
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
