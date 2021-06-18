import formatDateToLocale from './functionFormatReplaceDate';

const preparingGraphArray = (arr, toggleSoloChart) => arr.map((item) => {
    const d = item.elements[0].elements[0].text
    const count = item.elements[1].elements[0].text
    const date = formatDateToLocale(new Date(d), 'dd.mm.yyyy')
    const count1 = item.elements[2].elements[0].text
    const count2 = item.elements[3].elements[0].text
    const count3 = item.elements[4].elements[0].text
        // console.log(date, count)
    if (toggleSoloChart === "" || toggleSoloChart === undefined) return { dateTime: date, 'Все объекты': count, 'Каска': count1, 'Куртка': count2, 'Штаны': count3 }
    else return { dateTime: date, 'Все объекты': 0, 'Каска': count1, 'Куртка': count2, 'Штаны': count3 }
});
export default preparingGraphArray;