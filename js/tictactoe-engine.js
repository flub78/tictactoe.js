/* A tictactoe object with no user interface */

// cell content coding
const empty  = '.';
const cross  = 'X';
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
    this.winner = empty;
    return 42;
  }

  current_board() {
      return this.board;
  }

  play(row, col) {
      this.board [row][col] = this.turn;
      this.turn = (this.turn == circle) ? cross : circle;
      this.move++;
  }
}

function test_instance() {
    var msg = 'Generating a test instance';  
    console.log(msg);
    var instance = new TicTacToeEngine("game_board");
    return instance;
  }
  
  // Hust a workaround so the browaser does not complain about node.js export
  if(typeof exports == 'undefined'){
    var exports = this['module'] = {};
  }
  module.exports = {test_instance}
  