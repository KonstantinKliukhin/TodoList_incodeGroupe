export default function getStarsNumberText(num: number): string | number {
  if (num === 0) return 0;

  if (num % 1000 === 0) {
    return `${num / 1000} K`;
  }

  if (num > 1000 && num % 1000 !== 0 && num < 10000) {
    return `${Math.floor(num / 1000)},${Math.round(num / 100) % 10} K`;
  }

  if (num > 10000) {
    return `${Math.round(num / 1000)} K`;
  }

  return num;
}
