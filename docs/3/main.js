
// 動かす要素
tg = $('.js-tg');

updateCnt = 0;

// マウス座標
mouse = {
  x:0,
  y:0
};

// 初期設定
init();
function init() {

  $(window).on('mousemove', _eMouseMove).on('mousedown', _eMouseDown).on('mouseup', _eMouseUp);

  update();

}

// ----------------------------------------
// イベント マウス動いた
// ----------------------------------------
function _eMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}


// ----------------------------------------
// イベント マウス押した
// ----------------------------------------
function _eMouseDown(e) {
}


// ----------------------------------------
// イベント マウス離した
// ----------------------------------------
function _eMouseUp(e) {
}


// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  var sw = window.innerWidth;
  var sh = window.innerHeight;

  // conic-gradient()作成
  var grad = 'repeating-conic-gradient(';

  // 線の色
  var color = '#000000';

  var per1 = map(mouse.x, 1, 25, 0, sw);
  var per2 = per1 + map(mouse.y, 1, 25, 0, sh);

  grad += 'transparent 0,';
  grad += 'transparent ' + per1 + '%,';
  grad += color + ' ' + per1 + '%,';
  grad += color + ' ' + per2 + '%';
  grad += ')';

  var sizeW = map(mouse.x, 50, sw, 0, sw);
  var sizeH = map(mouse.y, 50, sh, 0, sh);

  tg.css({
    backgroundImage:grad,
    backgroundSize: sizeW + 'px ' + sizeH + 'px'
  });

  updateCnt++;

  window.requestAnimationFrame(update);
}





// ########################################
// ユーティリティ系 ↓
// ########################################

// ----------------------------------------
// minからmaxまでランダム
// ----------------------------------------
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ----------------------------------------
// minからmaxまでランダム int
// ----------------------------------------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----------------------------------------
// minからmaxまでランダム 半分の確率で-をつける
// ----------------------------------------
function random2(min, max) {
  var val = Math.random() * (max - min) + min;
  if(Math.random() > 0.5) {
    val *= -1;
  }
  return val;
}

// ----------------------------------------
// -valからvalまでランダム
// ----------------------------------------
function range(val) {
  return random(-val, val);
}

// ----------------------------------------
// 配列の中ランダム
// ----------------------------------------
function randomArr(arr) {
  return arr[randomInt(0, arr.length - 1)]
}

// 1 / rangeの確率でtrueを取得
// -----------------------------------
// @range : 2以上の分母(int)
// return : true or false(boolean)
// -----------------------------------
function hit(range) {
  return (randomInt(0, range - 1) == 0)
}

// ----------------------------------------
// 度からラジアンに変換
// @val : 度
// ----------------------------------------
function radian(val) {
  return val * Math.PI / 180;
}

// ----------------------------------------
// ラジアンから度に変換
// @val : ラジアン
// ----------------------------------------
function degree(val) {
  return val * 180 / Math.PI;
}


// ----------------------------------------
// 範囲変換
// @val     : 変換したい値
// @toMin   : 変換後の最小値
// @toMax   : 変換後の最大値
// @fromMin : 変換前の最小値
// @fromMax : 変換前の最大値
// ----------------------------------------
function map(val, toMin, toMax, fromMin, fromMax) {
  if(val <= fromMin) {
    return toMin;
  }
  if(val >= fromMax) {
    return toMax;
  }
  p = (toMax - toMin) / (fromMax - fromMin);
  return ((val - fromMin) * p) + toMin;
}

// 配列内のパラメータを比較してソート
// -----------------------------------
// @arr  : 配列
// @para : パラメーター名
// @desc : 降順かどうか(boolean)
// -----------------------------------
function sort(arr, para, desc) {

  if(desc) {
    arr.sort(function(a, b) {
        return b[para] - a[para];
      }
    )
  } else {
    arr.sort(function(a, b) {
        return a[para] - b[para];
      }
    )
  }

}
