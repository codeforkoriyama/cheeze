<?php
namespace Adm;
//use Cmn;

class Management
{
  private $xml;
  private $hashKey;

  public function __construct()
  {
    $path = _PATH_ . '/data/backend.xml';
    $xml = @simplexml_load_file($path);

    $this->xml = $xml;
    $this->hashKey = 'password2';
  }

  /**
   * ユーザー名とパスワードが一致しているか確認
   * パスワードはソルトアンドペッパー
   * @param $user
   * @param $pass
   * @return bool
   */
  public function checkInputData($user, $pass)
  {
    try {
      if($this->xml === false) throw new \Exception('error');

      foreach($this->xml->user as $d){
        if((string)$d['name'] !== $user) continue;

        $md5 = MD5($pass);
        $str = $this->hashKey.$md5;
        $hash = hash('sha256', $str);

        if($hash === (string)$d->password){
          return true;
        }
      }

      return false;
    }catch (\Exception $e){
      // TODO: 読み込みエラー
      return false;
    }


  }
}
