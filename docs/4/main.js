
// 動かす要素
tg = $('.js-tg');

updateCnt = 0;

// マウス座標
mouse = {
  x:0,
  y:0
};

param = {
  rate:0,
  show:0,
  total:0,
  tg:[]
};

// 初期設定
init();
function init() {

  param.total = tg.length;

  // TweenMax.to(param, 2, {
  //   rate:1,
  //   repeat:-1,
  //   yoyo:true,
  //   ease:Power3.easeInOut
  //   // onComplete:_eLoaded
  // })

  tg.each(function(i,e) {
    param.tg.push({
      el:$(e),
      rate:0,
      colorH:random(0, 360),
      hSpeed:random(-10, 10) * 0.1
    })

    TweenMax.to(param.tg[i], 1, {
      rate:1,
      repeat:-1,
      delay:i * 0.25,
      yoyo:true,
      ease:Power3.easeInOut
    })
  });

  $(window).on('mousemove', _eMouseMove).on('mousedown', _eMouseDown).on('mouseup', _eMouseUp);

  update();

}


// ----------------------------------------
//
// ----------------------------------------
function _eLoaded(e) {

  TweenMax.to(param, 2, {
    show:1,
    ease:Power3.easeInOut
  })

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

  var len = param.tg.length;
  for(var i = 0; i < len; i++) {

    var p = param.tg[i];

    // conic-gradient()作成
    var grad = 'conic-gradient(';

    // 線の色
    // var color1 = chroma.mix(0x00ff00, 0x0000ff, (1 / (param.total - 1)) * i).css();
    // var color2 = '#ff0000';
    //
    // color1 = p.color;

    var color = chroma.hsv(p.colorH % 360, 0.9, 1).css();
    p.colorH += p.hSpeed;

    var per1 = 0;
    // var per2 = map(mouse.x, 75, 25, 0, sw);
    // var per2 = map(p.rate, 0, 75, 0, 1);
    var per2 = 50;
    var per3 = 100;
    // var per3 = 100;

    var x = sw * ((1 / param.total) * 0.5 + (1 / param.total) * i);
    // var x = sw * 0.5;
    var y = sh * p.rate;

    grad += 'at ' + x + 'px ' + y + 'px, ';

    grad += 'transparent ' + per1 + '%,';
    // grad += color1 + ' ' + per2 + '%,';
    grad += color + ' ' + per2 + '%,';
    grad += 'transparent ' + per3 + '%';
    // grad += 'transparent ' + per2 + '%,';
    // grad += 'transparent ' + per3 + '%';
    grad += ')';

    if(updateCnt % 2 == 0) {
      p.el.css({
        backgroundImage:grad
      });
    }
  }



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
