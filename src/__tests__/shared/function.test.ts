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

// .toBe(x) : String , Number와 같은 기본형 값의 "매칭"을 확인할 때 사용합니다.
test("@function/sum", () => {
  expect(sum(3, 5)).toBe(8);
});

// .toBeTruthy() : "matcher"의 "검증 대상" 값이 True인지 확인할 때 사용합니다.
test("@function/isNumber", () => {
  expect(isNumber("13.25")).toBeTruthy();
});

// describe : 여러 테스트를 그룹화하는 "Block"을 생성합니다.
describe("  @function/temperature", () => {
  test("@temperature/getC", () => {
    expect(temperature.getC(1)).toBe(-17);
  });

  test("temperature/getF", () => {
    expect(temperature.getF(30)).toBe(86);
  });

  test("temperature/equalFandC", () => {
    expect(temperature.equalFandC(86, 30)).toBeTruthy();
  });
});
