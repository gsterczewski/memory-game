export default function delayed(fn: (...args: any) => any, delay: number) {
  setTimeout(fn, delay);
}
