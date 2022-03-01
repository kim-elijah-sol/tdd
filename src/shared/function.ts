export function sum(a: number, b: number): number {
  return a + b;
}

export function isNumber(e: any): boolean {
  return !!!isNaN(e);
}

export const temperature = {
  getF: function (c: number) {
    return parseInt(((c * 9) / 5 + 32).toString());
  },
  getC: function (f: number) {
    return parseInt((((f - 32) * 5) / 9).toString());
  },
  equalFandC: function (f: number, c: number) {
    return temperature.getC(f) === c && temperature.getF(c) === f;
  },
};

export async function returnZeroPromise() {
  return await Promise.resolve(0);
}

export async function returnError() {
  return await Promise.reject(new Error("error"));
}
