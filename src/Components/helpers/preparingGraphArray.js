import formatDateToLocale from './functionFormatReplaceDate';
import { configParam } from '../config/fetch/config';

const preparingGraphArray = (arr, toggleSoloChart, config = configParam) => {
  return arr.map((item) => {
    const arrConfig = config.query.ClassID.formElementProps.items;
    const d = item['DateTime'];
    const count = item['Count'];
    const date = formatDateToLocale(new Date(d), 'dd.mm.yyyy');
    const count1 = item['Count1'];
    const count2 = item['Count2'];
    const count3 = item['Count3'];
    if (toggleSoloChart === '0') {
      return {
        dateTime: date,
        [arrConfig[0]['Name']]: count,
        [arrConfig[1]['Name']]: count1,
        [arrConfig[2]['Name']]: count2,
        [arrConfig[3]['Name']]: count3,
      };
    } else {
      return {
        dateTime: date,
        [arrConfig[0]['Name']]: 0,
        [arrConfig[1]['Name']]: count1,
        [arrConfig[2]['Name']]: count2,
        [arrConfig[3]['Name']]: count3,
      };
    }
  });
};
export default preparingGraphArray;
