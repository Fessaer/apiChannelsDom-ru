/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import { configParam } from '../config/fetch/config';
import { normalizeDataKeys } from './normalizeDataObject';
var convert = require('xml-js');

const IsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const fetchFunction = async (config, e = false, action, fnBuildBody) => {
  let arrResponseElements = [];
  let noRenderPagination = true;
  let errorsFetch = '';
  let statusDelete = '';
  const { toggleActivePage } = config;

  if (e !== false) {
    const newOffSet = (e - 1) * 20;
    config.fetch[toggleActivePage].Offset = newOffSet;
  }

  let bodyfetch = fnBuildBody(toggleActivePage, config);

  let promise = new Promise(function (resolve, reject) {
    let http = new XMLHttpRequest();
    http.open(
      configParam.requestMethod,
      (() =>
        config.url !== undefined
          ? config.url + configParam.api[toggleActivePage][action]
          : configParam.urlAPI + configParam.api[toggleActivePage][action])(),
      true
    );
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onload = function () {
      let response = http.responseText;
      resolve(response);
    };
    http.onerror = function () {
      arrResponseElements = [];
      noRenderPagination = true;
    };
    http.send(bodyfetch);
  });

  return promise
    .then(function (response) {
      if (IsJsonString(response)) {
        if (action === 'delete') {
          statusDelete = JSON.parse(response);
        }
        if (Array.isArray(JSON.parse(response))) {
          let array = JSON.parse(response);
          let newArray = array.map((item) => {
            if ('ErrorCode' in item) {
              errorsFetch = item['Error'];
            } else if ('ID' in item && !('CreationDate' in item)) {
              errorsFetch = 'неизвестная ошибка';
            } else if (
              !('ErrorCode' in item) &&
              !('ID' in item && !('CreationDate' in item))
            ) {
              return item;
            }
          });
          arrResponseElements = [...newArray];
        } else {
          const item = JSON.parse(response);
          if ('ErrorCode' in item) {
            errorsFetch = item['Error'];
          } else if ('ID' in item && !('CreationDate' in item)) {
            errorsFetch = 'неизвестная ошибка';
          } else {
            arrResponseElements = [JSON.parse(response)];
          }
        }
        return {
          statusDelete: statusDelete,
          success: (() => (errorsFetch === '' ? 'success' : 'failure'))(),
          arr: arrResponseElements,
          loadingRequest: false,
          err: errorsFetch,
        };
      } else {
        let result = convert.xml2json(response, { compact: false });
        let parseData = JSON.parse(result);
        let { elements } = parseData;
        let arrElements = elements[0]['elements'];
        noRenderPagination = false;
        arrResponseElements = [...arrElements];
        const newArrey = normalizeDataKeys(arrResponseElements);
        return { arr: newArrey, noRenderPagination: noRenderPagination };
      }
    })
    .catch(() => {
      arrResponseElements = [];
      noRenderPagination = true;
      return {
        arr: arrResponseElements,
        noRenderPagination: noRenderPagination,
      };
    });
};
export default fetchFunction;
