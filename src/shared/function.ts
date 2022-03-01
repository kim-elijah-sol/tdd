export function sum(a: number, b: number): number {
  return a + b;
}

export function isNumber(e: any): boolean {
  return !!!isNaN(e);
}

export const geoMeterBridge = {
  lngToMeter: (lng: number) => {
    return 111.32 * Math.cos(lng) * 1000;
  },
  latToMeter: (lng: number) => {
    return 110.574 * lng * 1000;
  },
  meterToLng: (meter: number) => {
    return Math.acos(meter / 1000 / 111.32);
  },
  meterToLat: (meter: number) => {
    return meter / 110.574 / 1000;
  },
};

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
