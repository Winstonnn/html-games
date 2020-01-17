// 16进制转换成RGB
String.prototype.colorRgb = function () {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  var color = this.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return "rgb(" + colorChange.join(", ") + ")";
  }
  else {
    return color;
  }
}


function sleep(n) {
    var start = new Date().getTime();
    while (true) {
        if (new Date().getTime() - start > n) {
            break;
        }
    }
}


function dropAnimation(elemId) {

}

function dropCoin() {
  elemId = event.toElement.id;
  var coordinate = getCoordinate(elemId);
  var x = coordinate[0];
  var y = coordinate[1];
  // console.log($('#' + String(1) + '-' + y).css('background-color'));
  for (var i=5; i >= 1; i--) {
    if ($('#' + i + '-' + y).css('background-color') == 'rgb(178, 178, 178)') {
      // $(selector).animate({params},speed,callback);
      for (var j=1; j <=i; j++) {
        /* Drop animation */
        if (j > 1) {
          $('#' + (j - 1) + '-' + y).animate({'background-color': '#B2B2B2'}, 5000);
        }
        $('#' + j + '-' + y).animate({'background-color': '#F7819F'}, 5000);
        /* Drop animation */
      }

      currCount = Number($('#counter').text());
      if (currCount % 2 == 0) {
        newColor = '#FF0000';
      }
      else {
        newColor = '#0000FF';
      }
      $('#counter').text(String(currCount + 1));
      $('#' + String(i) + '-' + y).css('background-color', newColor);
      var hasWon = isWinning(newColor, String(i), y);
      // console.log('result is:' + hasWon);
      if (hasWon) {
        if (newColor == '#FF0000') {
          var winner = 'RED';
        }
        else {
          var winner = 'BLUE';
        }

        $('#game-hint').text(winner + " Has Won!!!");
        $('.game-btn-top').prop('disabled', true);
        $('#reset-btn').css('visibility', 'visible');
      }
      break;
    }
  }
}

function clearCoins() {
  $('.game-btn').css('background-color', '#B2B2B2');
  $('.game-btn-top').css('background-color', '#B2B2B2');
  $('.game-btn-top').prop('disabled', false);
  $('#reset-btn').css('visibility', 'hidden');
  $('#game-hint').text('Please enter the name of the players and get started!');
}

function isWinning(currColor, x, y) {
  // horizontal
  var count = 0;
  console.log(currColor.colorRgb());
  for (var i=1; i<=7; i++) {
    // console.log($('#' + x + '-' + String(i)).css('background-color'));
    if ($('#' + x + '-' + String(i)).css('background-color') == currColor.colorRgb()) {
      count++;
      // console.log("count is:" + count);
      if (count == 4) {
        return true;
      }
    }
    else {
      // console.log("count has been cleared");
      count = 0;
    }
  }
  // vertial
  for (var i=1; i<=5; i++) {
    if ($('#' + String(i) + '-' + y).css('background-color') == currColor.colorRgb()) {
      count++;
      if (count == 4) {
        return true;
      }
    }
    else {
      count = 0;
    }
  }

  // leftDiagonal
  var xCurr = x;
  var yCurr = y;
  while (xCurr <= 5 && yCurr >= 1) {
    xCurr++;
    yCurr--;
  }
  while (xCurr >= 1 && yCurr <= 7) {
    if ($('#' + xCurr + '-' + yCurr).css('background-color') == currColor.colorRgb()) {
      count++;
      if (count == 4) {
        return true;
      }
    }
    else {
      count = 0;
    }

    xCurr--;
    yCurr++;
  }

  // rightDiagonal
  xCurr = x;
  yCurr = y;
  while (xCurr <= 5 && yCurr <= 7) {
    xCurr++;
    yCurr++;
  }
  while (xCurr >= 1 && yCurr >= 1) {
    if ($('#' + xCurr + '-' + yCurr).css('background-color') == currColor.colorRgb()) {
      count++;
      if (count == 4) {
        return true;
      }
    }
    else {
      count = 0;
    }
    xCurr--;
    yCurr--;
  }
  return false;
}

function getCoordinate(elemId) {
  return elemId.split('-');
}


$(".game-btn-top").click(dropCoin);
$("#reset-btn").click(clearCoins);
