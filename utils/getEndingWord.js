export default function getEndingWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'объявление';
  }
  if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14)) {
    return 'объявления';
  }
  return 'объявлений';
}