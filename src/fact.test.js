// const md = require('./fact.js');
const { fact, sub, add} = require('./fact.js');

test('fact(7) == 5040', () => {
  expect(fact(7)).toBe(5040);
});

test('fact(0) == 1', () => {
  expect(fact(0)).toBe(1);
});

test('add(2, 4)) == 6', () => {
  expect(add(2, 4)).toBe(6);
});

test('sub(4, 2)) == 2', () => {
  expect(sub(6, 4)).toBe(2);
});
