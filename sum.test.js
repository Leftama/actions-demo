const sum = require('./sum');

test('Suma dos numeros', () => {
    expect(sum(1, 2)).toBe(3);
});