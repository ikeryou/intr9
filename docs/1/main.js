
// 動かす要素
tg = $('.js-tg');

// アニメーションで使う
param = {
  rate:0,
  cnt:0,
  rotate:0,
  offset:0 // 隠し味的な
};

// 初期設定
init();
function init() {

  TweenMax.to(param, 2, {
    rate:1,
    repeat:-1,
    yoyo:false,
    ease:Power3.easeInOut,
    onRepeat: function() {
      param.cnt++
    }
  })

  update();
}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  var per = (param.rate * 100) + '%'
  var color1;
  var color2;
  var bgColor;
  if(param.cnt % 2 == 0) {
    color1 = chroma.mix(0x000000, 0xffffff, param.rate).css();
    color2 = 'transparent';
    bgColor = chroma.mix(0xffffff, 0x000000, param.rate).css();
  } else {
    color1 = 'transparent';
    color2 = chroma.mix(0xffffff, 0x000000, param.rate).css();
    bgColor = chroma.mix(0x000000, 0xffffff, param.rate).css();
  }

  param.rotate = param.rate * 360 + param.offset;
  param.offset += 1;

  // conic-gradient()部分
  var grad = 'conic-gradient(';
  grad += 'from ' + param.rotate + 'deg, ';
  grad += color1 + ' 0,';
  grad += color1 + ' ' + per + ',';
  grad += color2 + ' ' + per + ',';
  grad += color2 + '';
  grad += ')';

  tg.css({
    backgroundImage:grad
  });

  $('body').css({
    backgroundColor:bgColor
  });

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
