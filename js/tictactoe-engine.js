/* A tictactoe object */

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
    this.new_game();
  }

  /**
   * 
   * @returns 
   */
  new_game() {
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

    var res = {
      game_over: false,
      accepted: false,
      row: row,
      col: col,
      current: this.turn,
      winner: empty,
      msg: ''
    };

    if (this.winner_player != empty) {
      res['game_over'] = true;
      res['accepted'] = false;
      return res;
    }
    if (this.board[row][col] != empty) {
      res['msg'] = "cell not empty";   // just ignore
      res['accepted'] = false;
      return res;
    }

    this.board[row][col] = this.turn;
    res['accepted'] = true;
    res['row'] = row;
    res['col'] = col;

    if (this.victory(row, col, this.turn)) {
      this.winner_player = this.turn;
      res['winner'] = this.turn;
      res['game_over'] = true;
      res['msg'] = "game over, the winner is " + this.turn;
    }
    this.turn = (this.turn == circle) ? cross : circle;
    res['next'] = this.turn;
    this.move++;

    return res;
  }

  /**
   * 
   * @returns Check if the current player has won
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

  // ============================================================================
  // Computer moves
  // ============================================================================

  /**
   * 
   * @param {*} row 
   * @param {*} col 
   * @param {*} color 
   * @returns 
   */
  win_move(row, col, color) {
    var row_sum = 0;
    var col_sum = 0;
    var diag1_sum = 0;
    var diag2_sum = 0;
    var winner = false;

    for (var i = 0; i < 3; i++) {

      if (this.board[row][(col + i) % 3] == color) row_sum++;
      if (this.board[(row + i) % 3][col] == color) col_sum++;

      if (row == col) {
        if (this.board[(row + i) % 3][(col + i) % 3] == color) diag1_sum++;
      }

      if (row == (2 - col)) {
        var r = (row + i) % 3;
        var c = 2 - r;
        if (this.board[r][c] == color) diag2_sum++;
      }
    }

    if ((row_sum == 2) || (col_sum == 2) || (diag1_sum == 2) || (diag2_sum == 2)) {
      winner = true;
    }
    return winner;
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

    // Is the move valid ?
    if (this.board[row][col] != empty) {
      return -1;
    }

    // Is it a win move ?
    var win_points = 0;
    if (this.win_move(row, col, color)) win_points = 100; 

    // Is it a move to block to avoid the oponent to win
    var oponent = (color == cross) ? circle : cross;
    if (this.win_move(row, col, oponent)) win_points = 50; 

    // board position points
    var position_points = 0;
    if ((row == 1) && (col == 1)) {
      position_points = 4;
    } else if ((row == col) || (row == (2 - col))) {
      position_points = 3;
    } else {
      position_points = 2;
    }
    var total = position_points + win_points;
    return total;
  }

  /**
   * Look for the best move
   * @param {*} color 
   */
  best_move(color) {
    var best_score = -1;
    var best_cell = undefined;
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
    var res = {
      game_over: false,
      accepted: false,
      current: this.turn,
      winner: empty,
      msg: ''
    };

    var move = this.best_move(this.turn);
    if (move) {
      res = this.play(move.row, move.col);
    } else {
      res['msg'] = "No valid move";
    }

    return res;
  }

} // end TicTacToeEngine

/**
 * @returns an instance of TicTacToe engine
 */
function test_instance() {
  var instance = new TicTacToeEngine("game_board");
  return instance;
}

// Just a workaround so the browaser does not complain about node.js export
if (typeof exports == 'undefined') {
  var exports = this['module'] = {};
}

module.exports = { test_instance }
