import { supress, Result } from ".";

it("Should return an object with sum, number and mult of all entries", () => {
  const array = [1, 3, 5, 6];

  const result = supress(array);

  expect(result).toStrictEqual<Result>({
    sum: 1 + 3 + 5 + 6,
    number: 4,
    mult: 1 * 3 * 5 * 6,
  });
});
