import sumOfTwoNumber from './sumOfTwoNumbers';

test('should add two numbers', () => {
  const sum = sumOfTwoNumber(3, 4);
  expect(sum).toBe(7);
});

test('should add two numbers whit undefined value', () => {
  const sum = sumOfTwoNumber(undefined, 4);
  expect(sum).toBe(0);
});