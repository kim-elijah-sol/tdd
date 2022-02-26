import { sum } from "../shared/function";

test("@function/sum", () => {
  expect(sum(3, 5)).toBe(8);
});
