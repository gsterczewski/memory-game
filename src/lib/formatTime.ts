export default function formatTime(time: number): string {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  const prependZeroIfLessThan10 = (n: number): string =>
    n < 10 ? `0${n}` : `${n}`;
  return `${minutes}:${prependZeroIfLessThan10(seconds)}`;
}
