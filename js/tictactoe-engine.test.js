const { test_instance } = require('./tictactoe-engine.js');

test('true == true', () => {
    expect(true).toBe(true);
});

test('test instance', () => {
    expect(test_instance).toBeDefined();
    var ti = test_instance();
    expect(ti).toBeDefined();

    var res = ti.new_game();
    expect(res).toBe(42);
});