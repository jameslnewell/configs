export function add(a, b, c) {
  return a + b + c;
}

export const total = [1, 2, 3].reduce(
  (sum, value, index) => sum + value * index,
  0,
);
