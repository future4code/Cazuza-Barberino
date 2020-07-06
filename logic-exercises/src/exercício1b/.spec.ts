import { minmax, Result } from ".";

it("Should return an object with the min and max values", () => {
  const array = [1, 3, 5, 6];

  const result = minmax(array);

  expect(result).toStrictEqual<Result>({
    max: 6,
    min: 1,
  });
});
