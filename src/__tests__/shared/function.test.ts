import { sum, isNumber, temperature } from "../../shared/function";

// 호출 시점의 날짜를 반환해주는 함수
function getDate() {
  const d = new Date();

  return `${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
}

// 해당 파일의 모든 테스트가 종료된 후 실행될 함수 입니다.
function afterAllCallback() {
  console.log("AFTER_ALL : ", getDate());
}

// 각 테스트가 종료될 때마다 실행될 함수 입니다.
function afterEachCallback() {
  console.log("AFTER_EACH : ", getDate());
}

// 해당 파일의 테스트가 실행되기 전 실행될 함수입니다.
async function beforeAllCallbackPromise(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null), t);
  });
}

// 각 테스트가 시작되기 전 실행될 함수입니다.
function beforeEachCallback() {
  console.log("BEFORE_EACH : ", getDate());
}

/**
 * Jest LifeCycle
 */
// 만약, 내부 함수가 Promise를 return하는 경우에는
// Jest는 테스트 실행하기 전 해당 Promise가 Resolve될 때까지 기다립니다.
// 2번째 인자로는 timeout (ms)를 받습니다. ( default : 5000ms )

// 해당 파일의 모든 테스트가 종료된 후 내부에 선언된 함수를 실행합니다.
afterAll(() => {
  afterAllCallback();
});

// 각 테스트가 종료될 때마다 내부에 선언된 함수를 실행합니다.
//
afterEach(() => {
  afterEachCallback();
});

// 해당 파일의 테스트가 실행되기 전 내부에 선언된 함수를 실행합니다.
beforeAll(() => {
  return beforeAllCallbackPromise(1000);
}, 3000);

// 각 테스트가 실행되기 전 내부에 선언된 함수를 실행합니다.
beforeEach(() => {
  beforeEachCallback();
});

/**
 * TEST CASES
 * expect : "검증 대상"을 인자로 넘기면 "기대 값"과 매칭할 수 있는 "matcher"를 제공합니다.
 */

// matcher.toBe(x) : String , Number와 같은 기본형 값의 "매칭"을 확인할 때 사용합니다.
test("@function/sum", () => {
  expect(sum(3, 5)).toBe(8);
});

// matcher.toBeTruthy() : "matcher"의 "검증 대상" 값이 True인지 확인할 때 사용합니다.
test("@function/isNumber", () => {
  expect(isNumber("13.25")).toBeTruthy();
});

// describe : 여러 테스트를 그룹화하는 "Block"을 생성합니다.
// describe 내부에 테스트 계층이 존재하는 경우 중첩으로도 사용 가능합니다.
describe("📁@function/temperature", () => {
  test("@temperature/getC", () => {
    expect(temperature.getC(1)).toBe(-17);
  });

  test("@temperature/getF", () => {
    expect(temperature.getF(30)).toBe(86);
  });

  test("@temperature/equalFandC", () => {
    expect(temperature.equalFandC(86, 30)).toBeTruthy();
  });
});

// describe.each(table)(name, fn, timeout) : 동일한 테스트를 서로 다른 데이터로 테스트 할 때 사용할 수 있습니다.
// table : 각 행마다 함수로 전달된 인수들의 배열입니다.
/* name : 테스트의 제목을 입력할 수 있고 , C언어의 printf 함수처럼 매개변수를 제목에 삽입 가능합니다.
 *        %p : Pretty Format
 *        %s : String Format
 *        %d : Number Format
 *        %i : Int Format
 *        %f : Float Format
 *        %j : Json Format
 *        %o : Object Format
 *        %# : 현재 테스트 행의 index
 *        %% : '%'
 *        $variable : 테스트 케이스 객체의 속성을 사용할 수 있습니다.
 *        $# : 현재 테스트 행의 index
 */
describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 2, 4],
])("🎠@function/sum.each For Array #%# : (%i, %i) => %i", (a, b, expected) => {
  test(`@sum.each/(${a}, ${b}) => ${expected}`, () => {
    expect(sum(a, b)).toBe(expected);
  });
});

// describe.each.table Object
describe.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 2, expected: 4 },
])(
  "🎠@function/sum.each For Object #$# : ($a, $b) => $expected",
  ({ a, b, expected }) => {
    test(`@sum.each/(${a}, ${b}) => ${expected}`, () => {
      expect(sum(a, b)).toBe(expected);
    });
  }
);

// .only
// 모든 테스트 케이스를 테스트하던 중 하나의 테스트 케이스에서 문제가 생긴 경우
// describe.only 혹은 test.only 를 사용해주면 해당 테스트 케이스만 테스트해줍니다.
// .only가 여러 개 쓰인 경우 .only가 붙은 모든 함수를 실행시킵니다.

/* ===========

   ONLY COMMENTED OUT

describe.only("📁@function/sum.only", () => {
  test("@sum.only : (1, 2) => 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("@sum.only : (2, 3) => 4", () => {
    expect(sum(2, 3)).toBe(4);
  });
});

test.only("@function/sum.only : (2, 3) => 4", () => {
  expect(sum(2, 3)).toBe(4);
});

*/

// .skip
// .skip은 .only와 반대로 동작합니다.
// .skip이 붙은 describe 혹은 test는 jest에서 제외하고 테스트를 실행시킵니다.
describe.skip("📁@function/sum.skip", () => {
  test("@sum.skip : (1, 1) => 2", () => {
    expect(sum(1, 1)).toBe(2);
  });

  test("@sum.skip : (2, 2) => 4", () => {
    expect(sum(2, 2)).toBe(4);
  });
});

test.skip("@function/sum.skip : (2, 3) => 5", () => {
  expect(sum(2, 3)).toBe(5);
});
