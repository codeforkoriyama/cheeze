<?php
/**
 * ブラウザチェック
 *
 * @author: Nobuyuki Kondo
 * @uri: http://art-p.com/
 * @version: 1.0
 */

//namespace Cmn;

class Browser {
  protected $_ua = '';
  protected $self = array();

  public function __construct()
  {
    $this->_ua = $_SERVER['HTTP_USER_AGENT'];
    $this->checkBrowser();
    $this->checkSmartPhone();
    $this->checkTablet();
    $this->checkDevice();
    $this->checkOs();
  }

  /**
   * ブラウザ判定
   */
  private function checkBrowser()
  {
    $ua = $this->_ua;

    $browser = (object) array(
      'chrome'=>stripos($ua, 'chrome') !== false && stripos($ua, 'safari') !== false,
      'safari'=>stripos($ua, 'chrome') === false && stripos($ua, 'safari') !== false,
      'firefox'=>stripos($ua, 'firefox') !== false,
      'opera'=>stripos($ua, 'opera') !== false,
      'ie'=>(object) array(
          'v6'=>strpos($ua, 'MSIE 6.') !== false,
          'v7'=>strpos($ua, 'MSIE 7.') !== false,
          'v8'=>strpos($ua, 'MSIE 8.') !== false,
          'v9'=>strpos($ua, 'MSIE 9.') !== false,
          'v10'=>strpos($ua, 'MSIE 10.') !== false,
          'v11'=>strpos($ua, 'trident/7') !== false,
        )
    );

    $this->self['browser'] = $browser;
    $this->checkIE();
  }

  /**
   * IE判定
   */
  private function checkIE()
  {
    $temp = $this->browser->ie;
    $isIE = $this->isBoolean($temp);

    $ie = (object) array(
      'ie8Lte'=>$temp->v6 || $temp->v7 || $temp->v8,
      'ie9Lte'=>$temp->v6 || $temp->v7 || $temp->v8 || $temp->v9,
      'isIE'=>$isIE
    );

    $this->self['ie'] = $ie;
  }

  /**
   * スマートフォン判定
   */
  private function checkSmartPhone()
  {
    $ua = $this->_ua;

    $smartPhone = (object) array(
      'iPhone'=>stripos($ua, 'iPhone') !== false,
      'iPod'=>stripos($ua, 'iPod') !== false,
      'android'=>stripos($ua, 'android') !== false && stripos($ua, 'mobile') !== false,
      'windowsPhone'=>stripos($ua, 'Windows Phone') !== false,
      'blackberry'=>stripos($ua, 'Blackberry') !== false
    );

    $this->self['sp'] = $smartPhone;
  }

  /**
   * タブレット判定
   */
  private function checkTablet()
  {
    $ua = $this->_ua;

    $tablet = (object) array(
      'iPad'=>stripos($ua, 'iPad') !== false,
      'android'=>(stripos($ua, 'android') !== false && stripos($ua, 'mobile') === false) || stripos($ua, 'A1_07') !== false || stripos($ua, 'SC-01C') !== false
    );

    $this->self['tablet'] = $tablet;
  }

  /**
   * デバイス判定
   */
  private function checkDevice()
  {
    $isSp = $this->isBoolean($this->sp);
    $isTab = $this->isBoolean($this->tablet);

    $device = (object) array(
      'sp'=>$isSp,
      'tab'=>$isTab,
      'pc'=>$isSp === false && $isTab === false
    );

    $this->self['device'] = $device;
  }

  /**
   * OS判定
   */
  private function checkOs()
  {
    $ua = $this->_ua;

    $iOS7 = stripos($ua, 'OS 7') !== false && stripos($ua, 'like Mac OS X') !== false;
    $iOS8 = stripos($ua, 'OS 8') !== false && stripos($ua, 'like Mac OS X') !== false;

    $os = (object) array(
      'windows'=>stripos($ua, 'Windows') !== false,
      'osx'=>stripos($ua, 'Intel Mac OS X') !== false,
      'iOS7'=>$iOS7,
      'iOS8'=>$iOS8,
      'iOS'=>$iOS7 === true || $iOS8 === true
    );

    $this->self['os'] = $os;
  }

  /**
   * trueになった時点でtrueを返却
   *
   * @param $arr
   * @return bool
   */
  private function isBoolean($arr)
  {
    foreach($arr as $bool){
      if($bool === true) return true;
    }

    return false;
  }

  public function __get($name = null)
  {
    return $this->self[$name];
  }
}

global $_Browser;
$_Browser = new Browser();
