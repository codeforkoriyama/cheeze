<?php
namespace App\Controller;
use Cmn;

class Register
{
  const RES = 'result';
  const MES = 'message';

  private $app;
  private $xml;
  private $time;

  private $size;

  public function __construct()
  {
    global $app, $_ini;

    $this->app = $app;
    $this->xml = _PATH_ . '/data/' . $_ini->write_file;
    $this->time = date('Y-m-d H:i:s', time());

    // 画像サイズ
    $this->size = array(
      'thumbnail'=>array(
        'w'=>100,
        'h'=>100
      ),
      'middle'=>'1024'
    );

    // チーム名が存在してなければトップへ遷移
//    Cmn\Ini::checkCookie();
  }

  /**
   * 種別判断
   */
  public function process()
  {
    $data = $_POST;
    $file = (!empty($_FILES['photo_image'])) ? $_FILES['photo_image']: null;

    switch($data['btnType']){
      case 'new':
      case 'update':
        self::postEntry($data, $file);
        break;
      case 'delete':
        self::deleteXML($data['data_id']);
        break;
    }
  }

  /**
   * 新規 or 編集
   * @param $data
   * @param $file
   */
  private function postEntry($data, $file)
  {
    global $_message;

    $mes = array();
    $uploads_dir = _PATH_ . '/uploads/';
    $file_name = (!empty($data[R_FILE_NAME])) ? $data[R_FILE_NAME] : null;


    // アップロード画像が存在する場合のみ処理
    if(!empty($file['name']) || !empty($file['tmp_name'])){
      // 画像ファイル名
      if($file_name === null) $file_name = time();

      if($file['error'] === 0){
        // エラーが存在しない
        if(!empty($file['tmp_name'])){
          $origin_path = $uploads_dir.$file_name;

          // オリジナルのアップロード
          $img_origin = $origin_path.'.jpg';
          $upload_result = move_uploaded_file($file['tmp_name'], $img_origin);

          // アップロードに失敗した場合
          if($upload_result === false){
            $mes[self::RES] = ERROR;
            $mes[self::MES] = 4;
            self::result($mes);
            exit();
          }

          // 元画像ファイルの読み込みとExifの修正
          $_in = imagecreatefromjpeg($img_origin);
          $_exif = exif_read_data($img_origin);
          $temp = null;

          if(!empty($_exif['Orientation'])){
            // 値が存在する場合
            switch($_exif['Orientation']){
              case 2:
                // 左右反転
                $temp = self::imageFlop($_in);
                break;
              case 3:
                // 180度回転
                $temp = self::imageRotate($_in, 180, 0);
                break;
              case 4:
                // 上下反転
                $temp = self::imageFlip($_in);
                break;
              case 5:
                // 反時計回りに90度回転&上下反転
                $_t = self::imageRotate($_in, 90, 0);
                $temp = self::imageFlip($_t);
                break;
              case 6:
                // 時計回りに90度回転
                $temp = self::imageRotate($_in, 270, 0);
                break;
              case 7:
                // 時計回りに90度回転&上下反転
                $_t = self::imageRotate($_in, 270, 0);
                $temp = self::imageFlip($_t);
                break;
              case 8:
                // 反時計回りに90度回転
                $temp = self::imageRotate($_in, 90, 0);
                break;
              default:
                $temp = $_in;
                break;
            }
          }

          // そのまま保存(フルサイズ)
          $temp_dest = $origin_path.'_full.jpg';
          imagejpeg($temp, $temp_dest);

          // 生成後の画像サイズ
          $_size = array(
            'w'=>imagesx($temp),
            'h'=>imagesy($temp)
          );

          // サムネイルの生成
          $size_thumb = $this->size['thumbnail'];
          self::updateImage($temp, $origin_path, 'thumb', $size_thumb, $_size);

          // ミドルサイズの生成
          $size_middle = self::createImageSize($_size, $this->size['middle']);
          self::updateImage($temp, $origin_path, 'middle', $size_middle, $_size);


        }
      }else{
        // エラーの場合
        $mes[self::RES] = ERROR;
        $mes[self::MES] = $_message->upload->{$file['error']};
        self::result($mes);
        exit();
      }
    }

    $data[R_FILE_NAME] = $file_name;
    $xml = @simplexml_load_file($this->xml);

    // XML処理
    try{
      if($xml === false) throw new \Exception(READ_ERR);

      switch($data['btnType']){
        case 'new':
          self::newXML($data, $xml);
          break;
        case 'update':
          self::updateXML($data, $xml);
          break;
      }
    }catch (\Exception $e){
      $mes[self::RES] = ERROR;
      $mes[self::MES] = $_message->xml->{$e->getMessage()};
      self::result($mes);
      exit();
    }
  }

  /**
   * 新規XMLデータ作成
   * @param $data
   * @param $xml
   */
  private function newXML($data, $xml)
  {
    global $_message;

    $num = count($xml);   // XMLの個数を調べる

    $nodeData = $xml->addChild('data');
    $nodeData[R_ID] = $num;

    $nodeData->addChild(R_ADMIN, $data[R_ADMIN]);
    $nodeData->addChild(R_TEAM, $data[R_TEAM]);
    $nodeData->addChild(R_NAME, setHtmlChars(replaceBr($data[R_NAME])));
    $nodeData->addChild(R_MAP, setHtmlChars(replaceBr($data[R_MAP])));
    $nodeData->addChild(R_CAT, $data[R_CAT]);
    $nodeData->addChild(R_LAT, $data[R_LAT]);
    $nodeData->addChild(R_LNG, $data[R_LNG]);
    $nodeData->addChild(R_FILE_NAME, $data[R_FILE_NAME]);
    $nodeData->addChild(R_MAP_GEO, $data[R_MAP_GEO]);
    $nodeData->addChild(R_CREATE, $this->time);
    $nodeData->addChild(R_UPDATE, null);
    $nodeData->addChild(R_DELETE, null);
    $nodeData->addChild(R_IS_DEL, 0);

    $xml->asXML($this->xml);

    self::result(array(
      self::RES=>SUCCESS,
      self::MES=>$_message->write->success
    ));
  }

  /**
   * 該当データを更新
   * @param $data
   * @param $xml
   */
  private function updateXML($data, $xml)
  {
    global $_message;

    $update_data = $xml->data[(int)$data[R_ID]];

    // 見つからなかった場合はエラー
    if($update_data === null){
      $mes[self::RES] = ERROR;
      $mes[self::MES] = $_message->not_found;
      self::result($mes);
      exit();
    }

    $update_data->{R_NAME} = setHtmlChars(replaceBr($data[R_NAME]));
    $update_data->{R_MAP} = setHtmlChars(replaceBr($data[R_MAP]));
    $update_data->{R_CAT} = $data[R_CAT];
    $update_data->{R_LAT} = $data[R_LAT];
    $update_data->{R_LNG} = $data[R_LNG];
    $update_data->{R_FILE_NAME} = $data[R_FILE_NAME];
    $update_data->{R_MAP_GEO} = $data[R_MAP_GEO];
    $update_data->{R_UPDATE} = $this->time;

    $xml->asXML($this->xml);

    self::result(array(
      self::RES=>SUCCESS,
      self::MES=>$_message->xml->success_update
    ));
  }

  /**
   * 該当データを論理削除
   * @param $id
   */
  private function deleteXML($id)
  {
    global $_message;
    $xml = @simplexml_load_file($this->xml);

    // XML処理
    try{
      if($xml === false) throw new \Exception(READ_ERR);

      $delete_data = $xml->data[(int)$id];   // 該当データを取得

      // 見つからなかった場合はエラー
      if($delete_data === null){
        $mes[self::RES] = ERROR;
        $mes[self::MES] = $_message->not_found;
        self::result($mes);
        exit();
      }

      $delete_data->{R_IS_DEL} = 1;
      $delete_data->{R_DELETE} = $this->time;

      $xml->asXML($this->xml);

      $mes[self::RES] = SUCCESS;
      $mes[self::MES] = $_message->xml->success_delete;
      self::result($mes);

    }catch (\Exception $e){
      $mes[self::RES] = ERROR;
      $mes[self::MES] = $_message->xml->{$e->getMessage()};
      self::result($mes);
      exit();
    }

  }

  /**
   * 基準サイズから生成後のサイズを算出
   * @param $img
   * @param $base_size
   * @return array
   */
  private function createImageSize($img, $base_size)
  {
    $ratio_w = $img['w'] / $img['h'];
    $ratio_h = $img['h'] / $img['w'];

    switch(true){
      // 横長
      case ($ratio_w > $ratio_h):
        $w = $base_size;
        $h = floor($base_size * $ratio_h);
        break;

      // 縦長
      case ($ratio_h > $ratio_w):
        $h = $base_size;
        $w = floor($base_size * $ratio_w);
        break;

      // 正方形
      default:
        $w = $base_size;
        $h = $base_size;
        break;
    }

    return array(
      'w'=>$w,
      'h'=>$h
    );
  }

  /**
   * 画像を左右回転
   * @param $image
   * @return resource
   */
  private function imageFlop($image)
  {
    $w = imagesx($image);
    $h = imagesy($image);

    $dest = imagecreatetruecolor($w, $h);

    // 逆順で色を取得
    for($i = ($w - 1); $i >= 0; $i--){
      for($j = 0; $j < $h; $j++){
        $color_index = imagecolorat($image, $i, $j);
        $color = imagecolorsforindex($image, $color_index);
        $x = abs($i - $w + 1);
        $c = imagecolorallocate($dest, $color['red'], $color['green'], $color['blue']);
        imagesetpixel($image, $x, $j, $c);
      }
    }

    return $dest;
  }

  /**
   * 画像を上下反転
   * @param $image
   * @return resource
   */
  private function imageFlip($image)
  {
    $w = imagesx($image);
    $h = imagesy($image);

    $dest = imagecreatetruecolor($w, $h);

    // 逆順で色を取得
    for($i = 0; $i < $w; $i++){
      for($j = ($h - 1); $j >= 0; $j--){
        $color_index = imagecolorat($image, $i, $j);
        $color = imagecolorsforindex($image, $color_index);
        $y = abs($j - $h + 1);
        $c = imagecolorallocate($dest, $color['red'], $color['green'], $color['blue']);
        imagesetpixel($image, $i, $y, $c);
      }
    }

    return $dest;
  }

  /**
   * 画像回転
   * @param $image
   * @param $angle
   * @param $bgd
   * @return resource
   */
  private function imageRotate($image, $angle, $bgd)
  {
    return imagerotate($image, $angle, $bgd, 0);
  }



  /**
   * 画像の変形とアップロード
   *
   * @param $target {元画像}
   * @param $dest {出力先}
   * @param $name {識別子}
   * @param $size {出力後のサイズ}
   * @param $original {オリジナルのサイズ}
   */
  private function updateImage($target, $dest, $name, $size, $original)
  {
    $temp = imagecreatetruecolor($size['w'], $size['h']);
    imagecopyresized($temp, $target, 0, 0, 0, 0, $size['w'], $size['h'], $original['w'], $original['h']);
    imagejpeg($temp, $dest.'_'.$name.'.jpg');
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
