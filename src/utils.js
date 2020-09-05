export function indexToCoordinates(width, index) {
  return {
    row: Math.floor(index / width),
    column: index % width,
  };
}

export function coordinatesToIndex(width, row, column) {
  return row * width + column;
}

export const unfold = (func, initialState) =>
  func(
    (value, nextValue) => [value, ...unfold(func, nextValue)],
    () => [],
    initialState
  );
