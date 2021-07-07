/* eslint-disable array-callback-return */
import { configParam } from '../config/fetch/config';
import { normalizeDataKeys } from './normalizeDataObject';
import keInObject from './keyInObject';
import buildRegilarAlgorithm from './buildRegilarAlgorithm';

var convert = require('xml-js');

// arr.includes(elem);

// if (typeof obj['key'] === "undefined") {
//     //ключа нет
//     } else {
//     //ключ есть
//     }

// const objQueryParam = Object.entries(configParam.query)

const buildingStringFetch = (obj, toggle = '', config) => {
    let arr = Object.entries(obj.query);
    let requestString = 'SessionID=' + config.SessionID + '&Analytics=' + obj.Algorithm + '&';
    arr.filter(([key, value]) => {
        if (keInObject(value, 'formElementProps')) return [key, value];
    })
        .filter(([key, value]) => {
            if (keInObject(value.formElementProps, 'default')) return [key, value];
        })
        .forEach(([key, value]) => {
            if (keInObject(value.formElementProps, 'Algorithm')) {
                requestString = requestString + buildRegilarAlgorithm(obj.Algorithm, key) + '=' + config.fetch[toggle][key] + '&';
            } else {
                if (keInObject(value.formElementProps, 'active') && value.formElementProps.active.includes(toggle)) {
                    requestString = requestString + key + '=' + config.fetch[toggle][key] + '&';
                } 
                if (!keInObject(value.formElementProps, 'active')) {
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