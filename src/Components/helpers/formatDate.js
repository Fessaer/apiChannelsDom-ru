export default function formatLocaleDate(str) {
  const g = str.substr(0, 4);
  const m = str.substr(5, 2);
  const d = str.substr(8, 5);
  return `${d}.${m}.${g}`;
}
