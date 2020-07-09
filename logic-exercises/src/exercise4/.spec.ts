import { haveOnlyNumbers } from ".";

it("Should return false", () => {
  const arr = [1, "34", 2, 4];

  const result = haveOnlyNumbers(arr);

  expect(result).toBe(false);
});

it("Should return true", () => {
  const arr = [1, 5, 2, 4];

  const result = haveOnlyNumbers(arr);

  expect(result).toBe(true);
});
