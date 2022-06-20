const { test_instance } = require('./tictactoe-engine.js');

var empty = '.';
var empty_board = [
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty]
];

test('true == true', () => {
    expect(true).toBe(true);
});

test('test instance', () => {


    // The game exists
    expect(test_instance).toBeDefined();
    var ti = test_instance();
    expect(ti).toBeDefined();

    // and is empty
    expect(ti.board).toStrictEqual(empty_board);

    // No more after a move
    ti.play(1, 1);
    expect(ti.board).not.toStrictEqual(empty_board);

    // but back after reset
    ti.new_game();
    expect(ti.board).toStrictEqual(empty_board);
});

test('test play', () => {
    var ttt = test_instance();
    expect(ttt).toBeDefined();

    ttt.new_game();
    ttt.play(0, 1);
    expect(ttt.board[0][1]).toBe('X');

    ttt.new_game();
    expect(ttt.board[0][1]).toBe(empty);
});

test('test play invalid move', () => {
    var ttt = test_instance();
    expect(ttt).toBeDefined();

    ttt.new_game();
    expect(() => {ttt.play(3, 1)}).toThrow("invalid coordinate");

    expect(() => {ttt.play("A", 1)}).toThrow("coordinates should be integer A, 1");

    // correct moves are played
    ttt.play(0, 1);         // X
    expect(ttt.board[0][1]).toBe('X');

    // correct moves are played
    ttt.play(0,0);          // O
    expect(ttt.board[0][0]).toBe('O');

    // correct moves are played
    ttt.play(1, 0);         // X
    expect(ttt.board[1][0]).toBe('X');

    // non empty moves are ignored
    ttt.play(1,0);          // O
    expect(ttt.board[1][0]).toBe('X');

});
