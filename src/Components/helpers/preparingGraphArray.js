import formatDateToLocale from './functionFormatReplaceDate';

const preparingGraphArray = (arr, toggleSoloChart) => arr.map((item) => {
    const d = item['DateTime'];
    const count = item['Count'];
    const date = formatDateToLocale(new Date(d), 'dd.mm.yyyy');
    const count1 = item['Count1'];
    const count2 = item['Count2'];
    const count3 = item['Count3'];
    if (toggleSoloChart === '0') return { dateTime: date, 'Все объекты': count, 'Каска': count1, 'Куртка': count2, 'Штаны': count3 };
    else return { dateTime: date, 'Все объекты': 0, 'Каска': count1, 'Куртка': count2, 'Штаны': count3 };
});
export default preparingGraphArray;