var clearBtn = document.getElementById("b");
var gameCells = document.getElementsByTagName("td");

function generateCircle() {
  this.innerHTML = 'O';
  this.style.backgroundColor = '#FF0000';
}

function generateCross() {
  this.innerHTML = 'X';
  this.style.backgroundColor = '#0000FF';
}

function turnGrey() {
  if (this.style.backgroundColor == 'rgb(255, 255, 255)') {
    this.style.backgroundColor = '#DCDCDC';
  }
}

function turnWhite() {
  // console.log(Number(this.style.backgroundColor).toString(16));
  if (this.style.backgroundColor == 'rgb(220, 220, 220)') {
    this.style.backgroundColor = '#FFFFFF';
  }
}

function clearCells() {
  for (var i=0; i < gameCells.length; i++) {
    gameCells[i].innerHTML = '';
    gameCells[i].style.backgroundColor = '#FFFFFF';
  }
}

// init
clearCells()

clearBtn.addEventListener("click", clearCells);

for (var i=0; i < gameCells.length; i++) {
  gameCells[i].addEventListener("click", generateCircle);
  gameCells[i].addEventListener("dblclick", generateCross);
  gameCells[i].addEventListener("mouseover", turnGrey);
  gameCells[i].addEventListener("mouseout", turnWhite);
}
