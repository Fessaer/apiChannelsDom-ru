/* eslint-disable array-callback-return */
import { configParam } from '../config/fetch/config';
import { normalizeDataKeys } from './normalizeDataObject';
import keyInObject from './keyInObject';
import buildRegilarAlgorithm from './buildRegilarAlgorithm';
var convert = require('xml-js');

const buildingStringFetch = (obj, toggle = '', config) => {
    let arr = Object.entries(obj.query);
    let requestString = 'SessionID=' + config.SessionID + '&Analytics=' + Object.keys(obj.Algorithm)[0] + '&';
    arr.filter(([key, value]) => {
        if (keyInObject(value, 'formElementProps')) return [key, value];
    })
        .forEach(([key, value]) => {
            if (keyInObject(value.formElementProps, 'Algorithm')) {
                requestString = requestString + buildRegilarAlgorithm(Object.keys(obj.Algorithm)[0], key) + '=' + config.fetch[toggle][key] + '&';
            } else {
                if (keyInObject(value.formElementProps, 'active') && value.formElementProps.active.includes(toggle)) {
                    requestString = requestString + key + '=' + config.fetch[toggle][key] + '&';
                } 
                if (!keyInObject(value.formElementProps, 'active')) {
                    requestString = requestString + key + '=' + config.fetch[toggle][key] + '&';
                }
            }
    });
    return requestString;
};

const fetchFunction = async (config, e = false) => {
    let arrResponseElements = [];
    let noRenderPagination = true;
    const { toggleActivePage } = config;

    if (e !== false) {
        const newOffSet = (e - 1) * 20;
        config.fetch[toggleActivePage].Offset = newOffSet;
    }
    
    let bodyfetch = buildingStringFetch(configParam, toggleActivePage, config);

    let promise = new Promise(function(resolve, reject) {
        let http =  new XMLHttpRequest();
        http.open(configParam.requestMethod, configParam.urlAPI, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onload = function() {
            let response = http.responseText;
            resolve(response);
    };
    http.onerror = function() {
        arrResponseElements = [];
        noRenderPagination = true;
    }
    http.send(bodyfetch);
})

return promise.then(function(response) {
        let result = convert.xml2json(response, { compact: false });
            let parseData = JSON.parse(result);
            let { elements } = parseData;
            let arrElements = elements[0]['elements'];
            noRenderPagination = false;
            arrResponseElements = [...arrElements];
                const newArrey = normalizeDataKeys(arrResponseElements);
                return { arr: newArrey, noRenderPagination: noRenderPagination };
    }).catch(() => {
        arrResponseElements = [];
        noRenderPagination = true;
        return { arr: arrResponseElements, noRenderPagination: noRenderPagination };
    });
    
}

export default fetchFunction;