import formatDateToLocale from './functionFormatReplaceDate';

let d = new Date(); // today!
d.setDate(d.getDate() - 7);
const period = "yyyy-mm-dd"
export const defaultDateStart = formatDateToLocale(d, period) + ' 00:00:00'
export const defaultDateEnd = formatDateToLocale(new Date(), period) + ' 00:00:00'
