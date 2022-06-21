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

test('test instance', function () {

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
        expect(ti.new_game()).toBe(42);
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

test('winner', () => {
    var ttt = test_instance();
    expect(ttt).toBeDefined();

    ttt.new_game();

    ttt.board = [
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty]
    ];
    expect(ttt.victory(0, 0, 'X')).toBe(false);

    ttt.board = [
        ['X', 'O', '.'],
        ['X', '.', '.'],
        ['X', '.', 'O']
    ];
    expect(ttt.victory(0, 0, 'X')).toBe(true);
    expect(ttt.victory(0, 1, 'O')).toBe(false);
    
    ttt.board = [
        ['X', 'O', '.'],
        ['.', 'O', '.'],
        ['X', 'O', 'X']
    ];
    expect(ttt.victory(0, 1, 'O')).toBe(true);

    ttt.board = [
        ['O', 'X', '.'],
        ['.', 'O', '.'],
        ['X', '.', 'O']
    ];
    expect(ttt.victory(2, 2, 'O')).toBe(true);

    ttt.board = [
        ['O', 'O', 'X'],
        ['X', 'X', '.'],
        ['X', '.', 'O']
    ];
    expect(ttt.victory(1, 1, 'X')).toBe(true);

    ttt.board = [
        ['X', 'O', '.'],
        ['O', '.', '.'],
        ['X', '.', 'O']
    ];
    expect(ttt.victory(0, 0, 'X')).toBe(false);

    ttt.board = [
        ['X', 'O', '.'],
        ['X', '.', '.'],
        ['O', 'O', 'O']
    ];
    expect(ttt.victory(2, 1, 'O')).toBe(true);

    ttt.board = [
        ['O', 'O', '.'],
        ['X', '.', '.'],
        ['X', '.', 'O']
    ];
    expect(ttt.victory(1, 0, 'O')).toBe(false);
});

test('score_of', () => {
    var ttt = test_instance();
    expect(ttt).toBeDefined();

    ttt.new_game();

    ttt.board = [
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty]
    ];
    expect(ttt.score_of(1, 1, 'X')).toBe(4);
    expect(ttt.score_of(0, 0, 'X')).toBe(3);
    expect(ttt.score_of(0, 1, 'O')).toBe(2);

    ttt.board = [
        ['X', 'O', '.'],
        ['X', '.', '.'],
        ['.', '.', 'O']
    ];
    expect(ttt.score_of(2, 0, 'X')).toBe(103);
    expect(ttt.score_of(0, 0, 'X')).toBe(-1);
    expect(ttt.score_of(0, 0, 'O')).toBe(-1);

    ttt.board = [
        ['X', 'O', '.'],
        ['O', '.', '.'],
        ['.', '.', 'X']
    ];
    expect(ttt.score_of(1, 1, 'X')).toBe(104);
    expect(ttt.score_of(0, 0, 'X')).toBe(-1);

    ttt.board = [
        ['O', 'O', '.'],
        ['X', '.', '.'],
        ['.', '.', 'X']
    ];
    expect(ttt.score_of(0, 2, 'O')).toBe(103);
    expect(ttt.score_of(0, 0, 'X')).toBe(-1);

    ttt.board = [
        ['O', 'X', '.'],
        ['X', 'O', '.'],
        ['O', '.', 'X']
    ];
    expect(ttt.score_of(0, 2, 'O')).toBe(103);

    ttt.board = [
        ['O', 'X', 'O'],
        ['X', '.', '.'],
        ['O', '.', 'X']
    ];
    expect(ttt.score_of(1, 1, 'O')).toBe(104);

});
