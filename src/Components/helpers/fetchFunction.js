import { configParam, configFetch, defaultParam } from '../config/fetch/config';
import { normalizeDataKeys } from './normalizeDataObject';
var convert = require('xml-js');

const fetchFunction = async (config, e = false) => {
    let arrResponseElements = []
    let noRenderPagination = true;
    const { toggleActivePage } = config;

    if (e !== false) {
        const newOffSet = (e - 1) * 20;
        config.fetch[toggleActivePage].Offset = newOffSet;
    }
    
    const forBuildingFetch = () => {
        let bodyfetch = ''
        const buildParam = Object.entries(configParam).forEach(([key, value]) => {
            if (key === 'ClassID') return bodyfetch = bodyfetch + `${configFetch.Algorithm}[${key}]=${encodeURIComponent(config.fetch[toggleActivePage][key] === undefined ? "" : config.fetch[toggleActivePage][key])}&`;
            if (key === 'EventSubjectID') return bodyfetch = bodyfetch + `${configFetch.Algorithm}[${key}]=${encodeURIComponent(config.fetch[toggleActivePage][key] === undefined ? "" : config.fetch[toggleActivePage][key])}&`;
            if (key === 'CountBy') return bodyfetch = bodyfetch + ((() => toggleActivePage === 'chart' ? `${key}=${encodeURIComponent(defaultParam[toggleActivePage][key])}&` : '')());
            if (key === 'Limit') return bodyfetch = bodyfetch + ((() => toggleActivePage !== 'chart' ? `${key}=${encodeURIComponent(config.fetch[toggleActivePage][key] === undefined ? "" : config.fetch[toggleActivePage][key])}&` : '')());
            if (key === 'SessionID' || key === 'ChangePasswordAtNextLogin'|| key === 'Analytics') return bodyfetch = bodyfetch + `${key}=${encodeURIComponent(config[key])}&`;
            return bodyfetch = bodyfetch + `${key}=${encodeURIComponent(config.fetch[toggleActivePage][key] === undefined ? "" : config.fetch[toggleActivePage][key])}&`;
        });
        return bodyfetch;
    }
    let bodyfetch = forBuildingFetch();

    let promise = new Promise(function(resolve, reject) {
        let http =  new XMLHttpRequest();
        http.open(configFetch.requestMethod, configFetch.urlAPI, true);
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
    }).catch(() =>{
        arrResponseElements = [];
        noRenderPagination = true;
        return { arr: arrResponseElements, noRenderPagination: noRenderPagination };
    });
    
}

export default fetchFunction;