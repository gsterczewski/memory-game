type VariadicCallback = (...args: any[]) => any;
export function delay(cb: VariadicCallback, seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cb()), seconds * 1000);
  });
}
