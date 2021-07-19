import keyInObject from '../keyInObject';
import buildRegilarAlgorithm from '../buildRegilarAlgorithm';
import { configParam } from '../../config/fetch/config';

const buildingStringReportAndChart = (toggle = '', config) => {
  let arr = Object.entries(configParam.query);
  let requestString =
    'SessionID=' +
    config.SessionID +
    '&Analytics=' +
    Object.keys(configParam.Algorithm)[0] +
    '&';
  arr
    .filter(([key, value]) => {
      if (keyInObject(value, 'formElementProps')) return [key, value];
    })
    .forEach(([key, value]) => {
      if (keyInObject(value.formElementProps, 'Algorithm')) {
        requestString =
          requestString +
          buildRegilarAlgorithm(Object.keys(configParam.Algorithm)[0], key) +
          '=' +
          config.fetch[toggle][key] +
          '&';
      } else {
        if (
          keyInObject(value.formElementProps, 'active') &&
          value.formElementProps.active.includes(toggle)
        ) {
          requestString =
            requestString + key + '=' + config.fetch[toggle][key] + '&';
        }
        if (!keyInObject(value.formElementProps, 'active')) {
          requestString =
            requestString + key + '=' + config.fetch[toggle][key] + '&';
        }
      }
    });
  return requestString;
};
export default buildingStringReportAndChart;
