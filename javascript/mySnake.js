panelWidth = 50;
panelHeight = 50;

var Direction = {
  up: 0,
  down: 1,
  left: 2,
  right: 3
}

function Snake(color) {
  this.color = color;
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
    var tail = this.body[0];
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
    $('#' + tail.x + '-' + tail.y).css('background-color', '#FFFFFF');
    $('#' + this.body[this.body.length - 1].x + '-' + this.body[this.body.length - 1].y).css('background-color', '#FF0000');
  }

}

function Food(initX, initY, color) {
  this.position = {x: initX, y: initY};
  this.color = color;
}

function Controller(panelWidth, panelHeight) {
  this.panelWidth = panelWidth;
  this.panelHeight = panelHeight;
  this.snake = new Snake("#FF0000");
  this.food = new Food(Math.floor(Math.random() * this.panelHeight + 1), Math.floor(Math.random() * this.panelWidth + 3), "#0000FF");
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

  this.renderSnake = function() {
    for (var i=0; i<this.snake.body.length; i++) {
      $('#' + this.snake.body[i].x + '-' + this.snake.body[i].y).css('background-color', this.snake.color);
    }
  }

  this.renderFood = function() {
    // $('#' + this.food.position.x + '-' + this.food.position.y).css('background-color', '#FFFFFF'); // wipe the old food
    while (true) {
      var newX = Math.floor(Math.random() * this.panelHeight);
      var newY = Math.floor(Math.random() * this.panelWidth);
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

  this.moveSnake = function() {
    this.snake.move();
    // 如果蛇头遇到了食物
    if (this.snake.body[this.snake.body.length - 1].x == this.food.position.x &&
      this.snake.body[this.snake.body.length - 1].y == this.food.position.y) {
        // $('#' + this.food.position.x + '-' + this.food.position.y).css('background-color', '#FFFFFF'); // wipe the old food
        // var newHead = this.food.position;
        this.snake.body.push({x: this.food.position.x, y: this.food.position.y});
        this.renderFood();
      }
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
    this.generateTable();
    this.renderSnake();
    this.renderFood();
  }

  this.resetGame = function() {
    $('.game-cell').css('background-color', '#FFFFFF');
    this.snake.body = [
      {x: 0, y: 0}, // Snake Tail
      {x: 0, y: 1},
      {x: 0, y: 2} // Snake Head
    ];
    this.renderSnake();
    this.renderFood();
  }

  this.runGame = function() {
    this.moveSnake();
    if (this.isDead() == 1)
      this.terminateGame();
  }

  this.isDead = function() {
    this.snake.head
    // if this
    var head = this.snake.body[this.snake.body.length - 1];
    if (head.x > this.panelHeight - 1 || head.x < 0 || head.y > this.panelWidth - 1 || head.y < 0)
      return 1;
    for(var i=2; i < this.snake.body.length - 1; i++) {
      if (this.snake.body[i].x == head.x && this.snake.body[i].y == head.y)
        return 1;
    }
    return 0;
  }

  this.terminateGame = function() {
    alert("GAME OVER");
    clearInterval(timer);
  }
}


var controller = new Controller(panelWidth, panelHeight);
controller.initGame();
// console.log(controller.snake);
$('#reset').click(function() {
  controller.resetGame();
  timer = setInterval("controller.runGame()", 50);
})

$('body').keypress(function() {
  controller.turnSnake();
}); // 控制转向
timer = setInterval("controller.runGame()", 50);
