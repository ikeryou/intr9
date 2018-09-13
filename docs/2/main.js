
// 動かす要素
tg = $('.js-tg');

updateCnt = 0;

// 初期設定
init();
function init() {
  update();
}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  var angles = [];
  var num = 50; // 集中線の数
  for(var i = 0; i < num; i++) {
    var angle = random(0, 360);
    angles.push({
      val:angle
    });
  }

  // 角度少ない順にソート
  sort(angles, 'val', false);

  // 線の大きさ
  var width = random(1, 2);

  // 中心動かす
  var sw = window.innerWidth;
  var sh = window.innerHeight;
  var x = sw * 0.5 + Math.sin(updateCnt * 0.01) * sw * 0.05;
  var y = sh * 0.5 + Math.cos(updateCnt * 0.012) * sh * 0.05;

  // conic-gradient()作成
  var grad = 'conic-gradient(';

  // 中心位置
  grad += 'at ' + x + 'px ' + y + 'px, ';

  // 線の色
  var color = '#ffffff';

  var bufPer = 0;
  var len = angles.length;
  for(var i = 0; i < len; i++) {

    var base = angles[i].val;
    var per1 = (base - width * 0.5) / 360 * 100;
    var per2 = (base + width * 0.5) / 360 * 100;

    grad += 'transparent ' + bufPer + '%,';
    grad += 'transparent ' + per1 + '%,';
    grad += color + ' ' + per1 + '%,';
    grad += color + ' ' + per2 + '%,';
    grad += 'transparent ' + per2 + '%';

    bufPer = per2;

    if(i != len - 1) {
      grad += ',';
    }

  }

  grad += ')';

  tg.css({
    backgroundImage:grad
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
