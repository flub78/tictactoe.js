/* A tictactoe object with no user interface */

// cell content coding
const empty = '.';
const cross = 'X';
const circle = 'O';

/**
 * A tic-tac-toe game
 *
 * Cells on the board are identified by row and col 
 */
class TicTacToeEngine {

  /**
   * Contructor
   * 
   * @param iframe_id HTML id of the iframe
   */
  constructor() {
    console.log("building TicTacToe engine ");

    this.new_game();
  }

  /**
   * 
   * @returns 
   */
  new_game() {
    console.log('new game');

    this.turn = cross;
    this.move = 0;

    this.board = [
      [empty, empty, empty],
      [empty, empty, empty],
      [empty, empty, empty]
    ];
    this.winner_player = empty;
    return 42;
  }

  current_board() {
    return this.board;
  }

  /**
   * Play the move for the current player
   * @param {*} row 
   * @param {*} col 
   * @returns 
   */
  play(row, col) {
    /*
     * The beauty of javascript, with an untyped, unsafe language the programmer has to take risks or work more ...
     */
    if (row < 0 || row > 2 || col < 0 || col > 2) throw ("invalid coordinate " + row + ', ' + col);
    if (!Number.isInteger(row) || !Number.isInteger(row)) throw ("coordinates should be integer " + row + ', ' + col);

    if (this.board[row][col] != empty) return "cell not empty";   // just ignore
    if (this.winner_player != empty) return "game over"; 

    this.board[row][col] = this.turn;
    if (this.victory(row, col, this.turn)) {
      this.winner_player = this.turn;
      return "game over, the winner is " + this.turn;
    }
    this.turn = (this.turn == circle) ? cross : circle;
    this.move++;
    return "";
  }

  /**
   * 
   * @returns Check if the current player has won
   */
  victory (row, col, turn) {

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
}

/**
 * @returns an instance of TicTacToe engine
 */
function test_instance() {
  var msg = 'Generating a test instance';
  console.log(msg);
  var instance = new TicTacToeEngine("game_board");
  return instance;
}

// Just a workaround so the browaser does not complain about node.js export
if (typeof exports == 'undefined') {
  var exports = this['module'] = {};
}

module.exports = { test_instance }
