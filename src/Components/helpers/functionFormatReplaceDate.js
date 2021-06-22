/* eslint-disable no-extend-native */
const format = (date, format = 'yyyy-mm-dd hh:MM:ss', localDate = 0) => {
    const replaces = {
        'yyyy': date.getFullYear(),
        'mm': ('0' + (date.getMonth() + 1)).slice(-2),
        'dd': ('0' + date.getDate()).slice(-2),
        'hh': ('0' + (Number(date.getHours()) + Number(localDate))).slice(-2),
        'MM': ('0' + date.getMinutes()).slice(-2),
        'ss': ('0' + date.getSeconds()).slice(-2)
    };
    let result = format;
    for (const replace in replaces) {
        result = result.replace(replace, replaces[replace]);
    }
    // console.log(result, 'result')
    return result;
};
export default format;


// console.log(format(new Date(),'MM'))