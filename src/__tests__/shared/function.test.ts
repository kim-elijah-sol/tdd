import {
  sum,
  isNumber,
  temperature,
  returnZeroPromise,
  returnError,
} from "../../shared/function";

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

// .each(table)(name, fn, timeout) : 동일한 테스트를 서로 다른 데이터로 테스트 할 때 사용할 수 있습니다.
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
])(
  "🎠@function/sum.each [describe] For Array #%# : (%i, %i) => %i",
  (a, b, expected) => {
    test(`@sum.each/(${a}, ${b}) => ${expected}`, () => {
      expect(sum(a, b)).toBe(expected);
    });
  }
);

// describe.each.table Object
describe.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 2, expected: 4 },
])(
  "🎠@function/sum.each [describe] For Object #$# : ($a, $b) => $expected",
  ({ a, b, expected }) => {
    test(`@sum.each/(${a}, ${b}) => ${expected}`, () => {
      expect(sum(a, b)).toBe(expected);
    });
  }
);

test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 2, 4],
])(
  "🎠@function/sum.each [test] For Array #%# : (%i, %i) => %i",
  (a, b, expected) => {
    expect(sum(a, b)).toBe(expected);
  }
);

// test.each.table Object
test.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 2, expected: 4 },
])(
  "🎠@function/sum.each [test] For Object #$# : ($a, $b) => $expected",
  ({ a, b, expected }) => {
    expect(sum(a, b)).toBe(expected);
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

// expect : "검증 대상"을 인자로 넘기면 "기대 값"과 매칭할 수 있는 "matcher"를 제공합니다.

// matcher.toBe(x) : String , Number와 같은 기본형 값의 "매칭"을 확인할 때 사용합니다.
test("@function/sum", () => {
  expect(sum(3, 5)).toBe(8);
});

// matcher.toBeTruthy() : "matcher"의 "검증 대상" 값이 True인지 확인할 때 사용합니다.
//                        if 문이 true로 통과하는 모든 값을 허용합니다.
test("@function/isNumber : Truthy", () => {
  expect(isNumber("13.25")).toBeTruthy();
  expect("true").toBeTruthy();
  expect(1).toBeTruthy();
});

// matcher.not : "검증 대상"과 "기대 값"의 matching을 부정합니다.
test("@function/isNumber.not : Truthy", () => {
  expect(isNumber("abs")).not.toBeTruthy();
});

// matcher.toBeFalsy() : "matcher"의 "검증 대상" 값이 False인지 확인할 때 사용합니다.
//                        if 문이 false로 통과하는 모든 값을 허용합니다.
test("@function/isNumber : Falsy", () => {
  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(0).toBeFalsy();
  expect(isNumber("abs")).toBeFalsy();
});

test("@function/isNumber.not : Falsy", () => {
  expect(isNumber(13.25)).not.toBeFalsy();
});

// matcher.toContain(item) : "matcher"의 "검증 대상" 내 "기대 값" 포함되어 있는지 확인할 때 사용합니다.
//                           값 존재 여부는 === (strict equality check) 를 사용하여 타입 매칭도 확인합니다.
//                           Array.prototype.includes 와 동일한 검사입니다.
test("@jest/toContain", () => {
  expect(["a", "b", "c"]).toContain("a");
  expect(["1", "b", "c"]).not.toContain(1);
  expect("a b c").toContain("a");
});

// matcher.toEqual(value) : "matcher"의 "검증 대상" 과 "기대 값"의 Deep Equality checking 을 통해
//                          두 Object가 완벽히 일치하는지 검사합니다.
//                          Object.is 보다 더 엄격한 검사입니다.
test.only("@jest/toEqual", () => {
  expect("1").toEqual("1");
  expect(1).not.toEqual("1");
  expect([1, 2, 3]).toEqual([1, 2, 3]);
  expect([1, 2, 3]).not.toEqual([1, 2, "3"]);
  expect([1, 2, 3]).not.toEqual([1, 3, 2]);
  expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
  expect({ a: 1, b: 2 }).not.toEqual({ a: 1, b: "2" });
  expect({ a: 1, b: 2 }).toEqual({ b: 2, a: 1 });
});

// matcher.resolves : "검증 대상"의 결과 값이 Promise 형태라면 이를 기다립니다.
// 만약 resolve되지 않고 reject되었다면 해당 테스트는 실패합니다.
test("@function/returnZeroPromise", async () => {
  await expect(returnZeroPromise()).resolves.toBe(0);
});

// matcher.rejects : "검증 대상"의 결과 값이 Reject된 Promise 형태라면 이를 기다립니다.
// 만약 reject되지 않고 resolve되었다면 해당 테스트는 실패합니다.
// matcher.toThrow(error?) : "검증 대상"이 Error를 반환하였는지 확인합니다.
// error? : 인자를 넘겨주게 되면 throw 된 Error 데이터의 "매칭" 또한 검증합니다.
test("@function/returnError", async () => {
  await expect(returnError()).rejects.toThrow();
});

test("@function/returnError", async () => {
  await expect(returnError()).rejects.toThrow("error");
});

test("@function/returnError", async () => {
  await expect(returnError()).rejects.not.toThrow("success");
});

// test.todo
// 테스트 작성 중 다음 계획을 작성할 때 사용됩니다.
// 해당 테스트는 요약 출력에서 "강조 표시"되어 출력됩니다.
test.todo("#10 , toHaveBeenCalled()");
