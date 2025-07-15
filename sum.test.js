const sum = require('./sum');

describe('Suma dos números', () => {
  test('suma 1 + 2 para igualar 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('suma -1 + 1 para igualar 0', () => {
    expect(sum(-1, 1)).toBe(0);
  });

  test('suma 0 + 0 para igualar 0', () => {
    expect(sum(0, 0)).toBe(0);
  });

  test('suma 10 + 15 para igualar 25', () => {
    expect(sum(10, 15)).toBe(25);
  });
});