/* javascript for tictactoe */

/*
 * To do:
 *    + Make sure that corrdinates are relative to the iframe
 *    + Try to install the click event listener inside the object (encapsulation)
 *    + determine which cell have been clicked from the coordinates
 *    + a method to draw a blue cross, a red circle or erase a cell
 *    + a schema to identify rows and columns
 *    + detection of a winner
 *    + a method to get the rows and columns of a cell
 *    + a method to count cross or circle in a raw or column
 *    + a reset button
 *    + a method for the computer to play
 *    - a unit test
 */

var ttt;

window.onload = function() {
  ttt = new TicTacToe("game_board");
};

document.getElementById('game_board').addEventListener('click', game_clicked);

function game_clicked(e) {
      // compute relative coordinate
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top;  //y position within the element.
      console.log("Left? : " + x + " ; Top? : " + y + ".");

      ttt.click(x, y);
}

function new_game() {
  ttt.new_game();
}

function computer_move() {
  ttt.computer_move();
}

function test() {
  console.log("testing ...");
  console.log('turn = ', ttt.turn);
  console.log('winner move ', ttt.winner_move(ttt.turn));
}