import formatDateToLocale from './functionFormatReplaceDate';

let d = new Date(); // today!
d.setDate(d.getDate() - 7);
const period = "yyyy-mm-dd"
export const defaultFrom = formatDateToLocale(d, period) + ' 00:00:00'
export const defaultTo = formatDateToLocale(new Date(), period) + ' 00:00:00'
