panelWidth = 50;
panelHeight = 50;

// 获得当前时间 2019-02-02 14:06:08
function getNowTime() {
    // 加0
    function add_10(num) {
        if (num < 10) {
            num = '0' + num
        }
        return num;
    }
    var myDate = new Date();
    // myDate.getYear(); //获取当前年份(2位)
    // myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    // myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    // myDate.getDate(); //获取当前日(1-31)
    // myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    // myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
    // myDate.getHours(); //获取当前小时数(0-23)
    // myDate.getMinutes(); //获取当前分钟数(0-59)
    // myDate.getSeconds(); //获取当前秒数(0-59)
    // myDate.getMilliseconds(); //获取当前毫秒数(0-999)
    // myDate.toLocaleDateString(); //获取当前日期
    var nowTime = myDate.getFullYear() + '-' + add_10(myDate.getMonth() + 1) + '-' + (myDate.getDate() + 1) + ' ' + add_10(myDate.getHours()) + ':' + add_10(myDate.getMinutes()) + ':' + add_10(myDate.getSeconds());
    return nowTime;
}

var Direction = {
  up: 0,
  down: 1,
  left: 2,
  right: 3
}

var Speed = {
  sslow: 500,
  slow: 400,
  normal: 300,
  fast: 200,
  sfast: 100,
  insane: 50
}

function Snake(color, speed) {
  this.color = color;
  this.speed = speed;
  this.body = [
    {x: 0, y: 0}, // Snake Tail
    {x: 0, y: 1},
    {x: 0, y: 2} // Snake Head
  ];
  this.direction = Direction.right;

  // 转向
  this.pivot = function(newDirection) {
    if (!((this.direction == Direction.up && newDirection == Direction.down) ||
    (this.direction == Direction.down && newDirection == Direction.up) ||
    (this.direction == Direction.left && newDirection == Direction.right) ||
    (this.direction == Direction.right && newDirection == Direction.left))) {
            this.direction = newDirection;
      }
  }

  this.move = function() {
    // 删除蛇尾，在指定方向添加蛇头
    var head = this.body[this.body.length - 1];
    var tail = {x: this.body[0].x, y: this.body[0].y};
    this.body.shift();
    switch (this.direction) {
      case Direction.up:
        this.body.push({x: head.x - 1, y: head.y});
        break;
      case Direction.down:
        this.body.push({x: head.x + 1, y: head.y});
        break;
      case Direction.left:
        this.body.push({x: head.x, y: head.y - 1});
        break;
      case Direction.right:
        this.body.push({x: head.x, y: head.y + 1});
        break;
    }
    // 删除蛇尾
    $('#' + tail.x + '-' + tail.y).css('background-color', '#FFFFFF');
    // 添加蛇头
    $('#' + this.body[this.body.length - 2].x + '-' + this.body[this.body.length - 2].y).css('background-color', '#FF0000');
    $('#' + this.body[this.body.length - 1].x + '-' + this.body[this.body.length - 1].y).css('background-color', '#FFD700');
  }

}

function Food(initX, initY, color) {
  this.position = {x: initX, y: initY};
  this.color = color;
  // this.duration = ...
  // this.blink = function() {
  //
  // }
}

function Controller(panelWidth, panelHeight) {
  this.panelWidth = panelWidth;
  this.panelHeight = panelHeight;
  this.snake = new Snake("#FF0000", Speed[$('#speed').val()]);
  this.food = new Food(Math.floor(Math.random() * this.panelHeight + 1), Math.floor(Math.random() * this.panelWidth + 3), "#0000FF");

  // this.magicFood = new Food(Math.floor(Math.random() * this.panelHeight + 1), Math.floor(Math.random() * this.panelWidth + 3), "#0000FF");

  this.generateTable = function() {
    var table = ["<table class='game-table'>"];
    for (i=0; i<this.panelHeight; i++) {
      table.push("<tr>");
      for (j=0; j<this.panelWidth; j++) {
        cellId = i + '-' + j;
        table.push("<td id=" + "'" + cellId + "'" + "class='game-cell'></td>");
      }
      table.push("</tr>");
    }
    table.push("</table>");
    $('#pannel').html(table.join(""));
  }

  this.changeSnakeSpeed = function() {
    this.snake.speed = Speed[$('#speed').val()];
    // console.log(this.snake.speed);
  }

  this.renderSnake = function() {
    for (var i=0; i<this.snake.body.length - 1; i++) {
      $('#' + this.snake.body[i].x + '-' + this.snake.body[i].y).css('background-color', this.snake.color);
    }
    // snake head
    $('#' + this.snake.body[this.snake.body.length - 1].x +
    '-' + this.snake.body[this.snake.body.length - 1].y).css('background-color', '#FFD700');
  }

  this.renderFood = function() {
    // $('#' + this.food.position.x + '-' + this.food.position.y).css('background-color', '#FFFFFF'); // wipe the old food
    while (true) {
      var newX = Math.floor(Math.random() * this.panelHeight - 1) + 1;
      var newY = Math.floor(Math.random() * this.panelWidth - 1) + 1;
      var i = 0;
      while (i < this.snake.body.length) {
        // console.log('i is:' + i);
        if (this.snake.body[i].x == newX && this.snake.body[i].y == newY) {
          i = 0;
          break;
        }
        i++;
      }
      if (i == this.snake.body.length)
        break;
    }
    this.food.position.x = newX;
    this.food.position.y = newY;
    $('#' + this.food.position.x + '-' + this.food.position.y).css('background-color', this.food.color);
  }

  this.refreshScore = function(score) {
    $('#user-score').html(Number($('#user-score').html()) + score);
  }

  this.moveSnake = function() {
    this.snake.move();
    // 如果蛇头遇到了食物
    if (this.snake.body[this.snake.body.length - 1].x == this.food.position.x &&
      this.snake.body[this.snake.body.length - 1].y == this.food.position.y) {
        this.snake.body.push({x: this.food.position.x, y: this.food.position.y});
        this.renderFood();
        this.refreshScore(1);
      }
    // 如果蛇头遇到了高级食物
  }

  this.turnSnake = function() {
    //console.log(event.key);
    var keyPressed = event.key;
    switch (keyPressed) {
      case 'w':
        var newDirection = Direction.up;
        break;
      case 's':
        var newDirection = Direction.down;
        break;
      case 'a':
        var newDirection = Direction.left;
        break;
      case 'd':
        var newDirection = Direction.right;
        break;
    }
    // console.log(this);
    this.snake.pivot(newDirection);
  }


  this.initGame = function() {
    this.refreshLocalRecord();
    this.generateTable();
    this.renderSnake();
    this.renderFood();
  }

  this.refreshLocalRecord = function() {
    var localRecord = JSON.parse(localStorage.getItem('localRecord'));
    var scoreRows = [];
    if (localRecord != null) {
      //console.log('Local record length is: ' + localRecord.length);
      for (var i=0; i<localRecord.length; i++) {
        scoreRows.push('<tr>' + '<td>' + localRecord[i].ranking + '</td>'
        + '<td>' + localRecord[i].player + '</td>'
         + '<td>' + localRecord[i].score + '</td>'
         + '<td>' + localRecord[i].date + '</td>' + '</tr>');
      }
      // console.log(scoreRows.join(''));

      $('#local-record-ranking').html(scoreRows.join(''));
    }
  }

  this.storeLocalRecord = function(currentScore) {
    var localRecord = JSON.parse(localStorage.getItem('localRecord'));
    var newRecord = {'ranking': 1, 'player': 'localuser', 'score': currentScore, 'date': getNowTime()};
    if (localRecord != null) {
      if (localRecord.length < 10 || currentScore > localRecord[localRecord.length - 1]['score']) {
        localRecord.push(newRecord);
        localRecord = localRecord.sort(function(a, b) {
          return b['score'] - a['score'];
        })
      }
      else {
        return;
      }
    }
    else {
      localRecord = [newRecord];
    }
    for (var i=0; i < localRecord.length; i++) {
      localRecord[i].ranking = i + 1;
    }

    // write the 10 best record back to local storage
    localStorage.setItem('localRecord', JSON.stringify(localRecord.slice(0, 10)));
  }

  this.resetGame = function() {
    $('.game-cell').css('background-color', '#FFFFFF');
    this.snake.body = [
      {x: 0, y: 0}, // Snake Tail
      {x: 0, y: 1},
      {x: 0, y: 2} // Snake Head
    ];
    this.snake.direction = Direction.right;
    $('#user-score').html(0)
    this.renderSnake();
    this.renderFood();
  }

  this.runGame = function() {
    this.moveSnake();
    if (this.isDead() == 1) {
      // console.log("dead!! score is" + $('#user-score').html());
      this.storeLocalRecord($('#user-score').html());
      this.refreshLocalRecord();
      this.terminateGame();
    }
  }

  this.isDead = function() {
    var head = this.snake.body[this.snake.body.length - 1];
    if (head.x > this.panelHeight - 1 || head.x < 0 || head.y > this.panelWidth - 1 || head.y < 0)
      return 1;
    for(var i=this.snake.body.length - 3; i > 0; i--) {
      if (this.snake.body[i].x == head.x && this.snake.body[i].y == head.y) {
        for (var index=0; index < this.snake.body.length; index++)
        return 1;
      }
    }
    return 0;
  }

  this.terminateGame = function() {
    alert("GAME OVER");
    clearInterval(timer);
  }
}

// console.log($('#panel-size'));
var panelWidth = $('#panel-size').val().split('*')[0];
var panelHeight = $('#panel-size').val().split('*')[1];
var controller = new Controller(panelWidth, panelHeight);

controller.initGame();
$('#reset').click(function() {
  controller.resetGame();
})

$('#start').click(function() {
  // timer = setInterval("controller.runGame()", controller.snake.speed);
  timer = setInterval("controller.runGame()", 50);
})

$('body').keypress(function() {
  console.log(event.key);
  controller.turnSnake();
}); // 控制转向

$('#panel-size').change(function() {
  var panelWidth = $('#panel-size').val().split('*')[0];
  var panelHeight = $('#panel-size').val().split('*')[1];
  //console.log('panel size:' + panelWidth + ' ' + panelHeight);
  controller.generateTable();
})

$('#speed').change(function() {
    // console.log(timer);
    controller.changeSnakeSpeed();
});
