/* A tictactoe object displayed on an iframe */

// board padding
const padding = 75;

// cell content coding
const empty = 0;
const cross = 1;
const circle = 2;

// size of the symbols
const size = 40;

/**
 * A tic-tac-toe game inside an iframe
 *
 * Cells on the board are identified 
 */
class TicTacToe {

  /**
   * Contructor
   * 
   * @param iframe_id HTML id of the iframe
   */
  constructor(iframe_id) {
    this.iframe_id = iframe_id;
    this.iframe = document.getElementById(iframe_id);
    this.ctx = this.iframe.getContext("2d");

    console.log("building TicTacToe on " + iframe_id);

    this.frame_width = this.iframe.clientWidth;
    this.frame_height = this.iframe.clientHeight;

    console.log("with = " + this.frame_width);
    console.log("height = " + this.frame_height);
    this.cell_width = (this.frame_width - 2 * padding) / 3;
    this.cell_height = (this.frame_height - 2 * padding) / 3;

    this.left_x = padding + this.cell_width;
    this.right_x = padding + 2 * this.cell_width;
    this.top_y = padding + this.cell_height;
    this.bottom_y = padding + 2 * this.cell_height;
    /*
        console.log("left_x = " + this.left_x);
        console.log("right_x = " + this.right_x);
        console.log("top_y = " + this.top_y);
        console.log("bottom_y = " + this.bottom_y);
    */
    // this.install_handler();
    this.new_game();
  }

  /**
   * Draw a line between two points
   * @param x1 origin
   * @param y1 origin
   * @param x2 destination point
   * @param y2 destination point
   */
  line(x1, y1, x2, y2) {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  /**
   * Draw the game board
   */
  draw_board() {
    console.log("drawing game board");
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = 'darkBlue';

    this.ctx.beginPath();

    this.ctx.clearRect(0, 0, this.frame_width, this.frame_height);

    this.line(padding, this.top_y, this.frame_width - padding, this.top_y);
    this.line(padding, this.bottom_y, this.frame_width - padding, this.bottom_y);
    this.line(this.left_x, padding, this.left_x, this.frame_height - padding);
    this.line(this.right_x, padding, this.right_x, this.frame_height - padding);
    this.ctx.stroke();
  }

  /**
   * Handle click on the iframe
   */
  click(x, y) {

    var col;
    var row;
    if (x < this.left_x) {
      col = 0;
    } else if (x < this.right_x) {
      col = 1;
    } else {
      col = 2;
    }

    if (y < this.top_y) {
      row = 0;
    } else if (y < this.bottom_y) {
      row = 1;
    } else {
      row = 2;
    }
    this.play(row, col);
  }

  /** 
   * play a move
   */
  play(row, col) {

    // Is it a valid move ?
    if (this.board[row][col] != empty) {
      console.log('invalid move for ' + this.turn);
      return;
    }

    if (this.winner != empty) {
      console.log('game over');
      return;
    }

    // Valid move
    console.log('playing: row = ' + row + ', col = ' + col);
    console.log('valid move for ' + this.turn);

    this.board[row][col] = this.turn;
    this.draw_cell(row, col, this.turn);

    if (this.victory(row, col, this.turn)) {
      next_player = document.getElementById('next_player');
      next_player.innerText = 'THE WINNER IS ';

      if (this.turn == circle) {
        console.log('Victory for circle');
      } else {
        console.log('Victory for cross');
      }
    } else {

      if (this.turn == circle)
        this.set_next(cross);
      else
        this.set_next(circle);
    }
  }

  /**
   * Set the next player
   * @param {*} color 
   */
  set_next(color) {
    this.turn = color;
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

  /*
   * Draw the content of a cell
   */
  draw_cell(row, col, color) {
    var x = padding + this.cell_width * (0.5 + col);
    var y = padding + this.cell_height * (0.5 + row);

    // console.log("center = (" + x + ', ' + y + ')');

    if (color == circle) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'black';
      this.ctx.arc(x, y, size, 0, 2 * Math.PI, false);
      this.ctx.lineWidth = 5;
      // this.ctx.strokeStyle = '#003300';
      this.ctx.stroke();
    } else if (color == cross) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'red';
      this.line(x - size, y - size, x + size, y + size);
      this.line(x - size, y + size, x + size, y - size);
      this.ctx.stroke();
    } else {
      //this.ctx.clearRect(x - size/2, y - size/2, x + size/2, y + size/2);
    }
  }

  /* 
   * Check the victory
   *
   * col and row are used because only a line which has just been completed can trigger the victory
   * 
   * This function just count the number or elements of the right color in each row, col or diagonal to which belong
   * the cell.
   */
  victory(row, col, turn) {

    var row_sum = 0;
    var col_sum = 0;
    var diag_1_sum = 0;
    var diag_2_sum = 0;

    for (var i = 0; i < 3; i++) {

      if (this.board[row][i] == turn) row_sum++;    // same row
      if (this.board[i][col] == turn) col_sum++;    // same col

      if (row == col) {
        // first diagonal
        if (this.board[i][i] == turn) diag_1_sum++;
      }

      if ((row + col) == 2) {
        // The other diagonal
        if (this.board[i][2 - i] == turn) diag_2_sum++;
      }
    }

    if ((row_sum > 2) || (col_sum > 2) || (diag_1_sum > 2) || (diag_2_sum > 2)) {
      this.winner = turn;
      return true;
    }

    return false;
  }

  new_game() {
    console.log('new game');

    this.turn = cross;

    this.board = [
      [empty, empty, empty],
      [empty, empty, empty],
      [empty, empty, empty]
    ];
    this.winner = empty;

    this.set_next(cross);
    this.draw_board();
    next_player = document.getElementById('next_player');
    next_player.innerText = 'Next player ';
  }

  /* 
   * Look for a winner move
   *
   */
  winner_move(turn) {
    const row0 = [[0, 0], [0, 1], [0, 2]];
    const row1 = [[1, 0], [1, 1], [1, 2]];
    const row2 = [[2, 0], [2, 1], [2, 2]];

    const col0 = [[0, 0], [1, 0], [2, 0]];
    const col1 = [[0, 1], [1, 1], [2, 1]];
    const col2 = [[0, 2], [1, 2], [2, 2]];

    const diag0 = [[0, 0], [1, 1], [2,2]];
    const diag1 = [[0, 2], [1, 1], [2,0]];

    const lines = {row0: row0, row1 : row1, row2 : row2, col0 : col0, col1 : col1, col2 : col2, diag0 : diag0, diag1 : diag1};
   
    var player = turn;
    var oponent = (player == circle) ? cross : circle;

    for (let key in lines) {
      console.log(key);
      var line = lines[key];
      var nb_empty = 0;
      var nb_player = 0;
      var nb_oponent = 0;
      
      for (let x of line) {
        console.log(x[0], x[1]);
        if (this.board[x[0]][x[1]] == empty) nb_empty++;
        if (this.board[x[0]][x[1]] == player) nb_player++;
        if (this.board[x[0]][x[1]] == oponent) nb_oponent++;
      }

      if ((nb_player == 2) && (nb_empty == 1)) {
        console.log("there is a winner move");
        return {};
      } 
    }
    console.log('no winner move');
    return {};
  }

  /**
   * Evaluate the value of a move for a color
   * 
   * from -1 (forbiden move to x)
   * 
   * There are 3 rows, 3 cols and two diagonals
   * a cell belong to 2, 3 or 4 lines depending if it is on 0, 1 or 2 diagonals
   * 
   * @param row
   * @param col
   * @param {*} color 
   * @returns 
   */
  score_of(row, col, color) {

    // Is there a winner move for the oponent to block
    // A move to block is two cells of the oponent color and an empty spot

    // Look for a move that belong to the maximal number of winnable lines

    // There are 3 rows, 3 cols and two diagonals
    // a cell belong to 2, 3 or 4 lines depending if it is on 0, 1 or 2 diagonals

    // At the beginning of the game a player should play the cell belonging to the highest number of line


    if (this.board[row][col] != empty) {
      return -1;
    }

    // Is it a win move ?

    // position points
    var position_points = 0;
    if ((row == 1) && (col == 1)) {
      position_points = 4;
    } else if ((row == col) || (row == (2 - col))) {
      position_points = 3;
    } else {
      position_points = 2;
    }
    var total = position_points;
    console.log("evaluation (" + row + ', ' + col + ') = ' + total)
    return total;
  }

  /**
   * Look for the best move
   * @param {*} color 
   */
  best_move(color) {
    var best_score = -1;
    var best_cell = {};
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        var score = this.score_of(row, col, this.turn);
        if (score > best_score) {
          best_score = score;
          best_cell = { row: row, col: col };
        }
      }
    }
    return best_cell;
  }


  /**
   * Computer move
   */
  computer_move() {
    var move = this.best_move(this.turn);
    if (move) this.play(move.row, move.col);
  }

  /*
  internal_click(e) {
    console.log('internal_click');
    // compute relative coordinate
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    console.log("Left : " + x + " ; Top : " + y + ".");

    //
    console.log(this);
  }
  */

  /* 
   * Instal click handler
  install_handler() {
    var ttt = this;
    this.iframe.addEventListener('click', function(ttt) {
      console.log(ttt.frame_width);
    });
  }
   */

}

function test_instance(iframe) {
  var msg = 'Generating a test instance for ' + iframe;  
  console.log(msg);
  var instance = new TicTacToe("game_board");
  return msg;
}

// Hust a workaround so the browaser does not complain about node.js export
if(typeof exports == 'undefined'){
  var exports = this['module'] = {};
}
module.exports = {test_instance}



