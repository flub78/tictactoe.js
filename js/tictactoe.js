/* javascript for tictactoe */

var ttt;

var iframe_id = "game_board";
var iframe = document.getElementById(iframe_id);
var ctx = iframe.getContext("2d");

// size of the symbols
const size = 40;
const padding = 75;

const frame_width = iframe.clientWidth;
const frame_height = iframe.clientHeight;

console.log("with = " + frame_width);
console.log("height = " + frame_height);
const cell_width = (frame_width - 2 * padding) / 3;
const cell_height = (frame_height - 2 * padding) / 3;

const left_x = padding + cell_width;
const right_x = padding + 2 * cell_width;
const top_y = padding + cell_height;
const bottom_y = padding + 2 * cell_height;

/**
 * Draw a line between two points
 * @param x1 origin
 * @param y1 origin
 * @param x2 destination point
 * @param y2 destination point
 */
function line(x1, y1, x2, y2) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/**
 * Draw the game frame
 */
function draw_board() {
  console.log("drawing game board");
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'darkBlue';

  ctx.beginPath();

  ctx.clearRect(0, 0, frame_width, frame_height);

  line(padding, top_y, frame_width - padding, top_y);
  line(padding, bottom_y, frame_width - padding, bottom_y);
  line(left_x, padding, left_x, frame_height - padding);
  line(right_x, padding, right_x, frame_height - padding);
  ctx.stroke();
  set_status("Next player : ");
}

/*
 * Draw the content of a cell
 */
function draw_cell(row, col, color) {
  var x = padding + cell_width * (0.5 + col);
  var y = padding + cell_height * (0.5 + row);

  // console.log("center = (" + x + ', ' + y + ')');

  if (color == circle) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    ctx.lineWidth = 5;
    // ctx.strokeStyle = '#003300';
    ctx.stroke();
  } else if (color == cross) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    line(x - size, y - size, x + size, y + size);
    line(x - size, y + size, x + size, y - size);
    ctx.stroke();
  } else {
    //ctx.clearRect(x - size/2, y - size/2, x + size/2, y + size/2);
  }
}

 /**
   * Set the next player
   * @param {*} color 
   */
  function set_next(color) {
    // change the next player image
    next = document.getElementById('next');
    if (color == circle) {
      next.src = "./images/circle.png";
      next.alt = "circle image";
    } else {
      next.src = "./images/cross.png";
      next.alt = "cross image";
    }
  }

  /**
   * Set the message status
   * @param {} msg 
   */
  function set_status(msg) {
    next_player = document.getElementById('next_player');
    next_player.innerText = msg;
  }

// =================================================================================================

window.onload = function () {
  ttt = new TicTacToeEngine();
  draw_board();
};

document.getElementById('game_board').addEventListener('click', game_clicked);

// Events Handlers
// ===============

/**
 * Click on board event handler
 */
function game_clicked(e) {
  // compute relative coordinate
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top;  //y position within the element.
  console.log("Left? : " + x + " ; Top? : " + y + ".");

  var col;
  var row;
  if (x < left_x) {
    col = 0;
  } else if (x < right_x) {
    col = 1;
  } else {
    col = 2;
  }

  if (y < top_y) {
    row = 0;
  } else if (y < bottom_y) {
    row = 1;
  } else {
    row = 2;
  }
  console.log('playing', row, col)

  var result = ttt.play(row, col);
  console.log(result);

  if (result.accepted) {
    draw_cell(result.row, result.col, result.current);
    set_next(result.next); 
  }
  if (result.msg) {
    set_status(result.msg);
  }
}

/**
 * New game button click event handler
 */
function new_game() {
  ttt.new_game();
  draw_board();
  set_next(ttt.turn);
}

/**
 * Computer move button click event handler
 */
function computer_move() {
  var turn = ttt.turn;
  var move = ttt.computer_move();
  console.log("computer move = ", move);
  if (move) {
    draw_cell(move.row, move.col, turn);
    set_next(ttt.turn);  
  }
}

/**
 * Test button click event handler
 */
function test() {
  console.log("testing ...");
}