import formatDateToLocale from './functionFormatReplaceDate';

const preparingGraphArray = (arr) =>  arr.map((item) => {
    const d = item.elements[0].elements[0].text
    const count = item.elements[1].elements[0].text
    const date = formatDateToLocale(new Date(d), 'dd.mm.yyyy')
    const count1 = item.elements[2].elements[0].text
    const count2 = item.elements[3].elements[0].text
    const count3 = item.elements[4].elements[0].text
    console.log(date, count)
    return {dateTime: date, count: count, count1: count1, count2: count2, count3: count3}
  });
  export default preparingGraphArray;
