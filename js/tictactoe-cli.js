/**
 * The CLI interface for TicTacToe
 */

 const { test_instance } = require('./tictactoe-engine.js');
 var ttt = test_instance();

//const { help } = require('yargs');
const prompt = require('prompt-sync')();

/**
 * display online help
 */
function display_help() {
    help_msg = `TicTacToe game.

commands:
    quit or q:  exit the program
    help or h:  display this message
    new:        start a new game
    board:      display the board

    row col:    play a move, eg: A 0 or B 1
    `;

    console.log(help_msg);
}

/**
 *
 */
function display_board() {
    var row_id = 'A';
    console.log("    0   1   2");
    for (row of ttt.board) {
        var row_str = row_id + ' : ' + row[0] + ' | ' + row[1] + ' | ' + row[2];
        console.log(row_str);
        row_id = String.fromCharCode(row_id.charCodeAt(row_id.length - 1) + 1);
        if (row_id != 'D') {
            console.log('   -----------');
        }
    }
    console.log("\nnext : " + ttt.turn);
}

display_board();
while (true) {
    const input = prompt('>: ');

    if ((input == 'quit') || (input == 'q')) {
        break;
    }

    if ((input == 'help') || (input == 'h')) {
        display_help();
        continue;
    }

    if (input == 'new') {
        continue;
    }   

    if (input == 'board') {
        display_board();
        continue;
    }   

    var cmds = input.split(' ');
    var row = cmds[0];
    var col = cmds[1];
    console.log(col);
    if ((['A', 'B', 'C'].includes(row)) && (['0', '1', '2'].includes(col))) {
        console.log('playing ', row, col); 
 
        ttt.play(row.charCodeAt(0) - 65, parseInt(col));
        display_board();
        continue;
    }

    console.log('unknow command or bad coordinates');
}
