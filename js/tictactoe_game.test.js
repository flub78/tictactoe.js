/**
 * @jest-environment jsdom
 */


const { test_instance } = require('./tictactoe_game.js');

test('true == true', () => {
    expect(true).toBe(true);
});

test('test instance', () => {

    // configure le body du document
    document.body.innerHTML =
`
<h1>Tic-Tac-Toe</h1>
<p id="next_player">Next player</p>
<img src="./cross.png" alt="cross image"  id="next"/>

<div id="div_board">
 
    <canvas id="game_board" width="600" height="500" style="border:1px solid #000000;" >
        Your browser does not support the HTML canvas tag.
    </canvas>
</div>
<div class="button" id="new_game_button" onclick="new_game()">NEW GAME</div>
<div class="button" id="computer_move" onclick="computer_move()">COMPUTER MOVE</div>
<div class="button" id="test_button" onclick="test()">Test</div>

`;

    tinstance = test_instance('game_board');
    expect(tinstance).toBe("Generating a test instance for game_board");
});

