import { configName, configParam, configFetch } from '../config/fetch/config';
var convert = require('xml-js');


const fetchFunction = async (config, e = false) => {
    let arrResponseElements = []
    let noRenderPagination = true;
    const { toggleActivePage } = config;

    if (e !== false) {
        const newOffSet = (e - 1) * 20;
        config.fetch[toggleActivePage].Offset = newOffSet;
    }
    
    let bodyfetch = 
    configName.SessionID + encodeURIComponent(config.SessionID) +
    configName.ChangePasswordAtNextLogin + encodeURIComponent(config.ChangePasswordAtNextLogin)
    + configName.Analytics + encodeURIComponent(config.fetch.Algorithm)
        let cameraID = configName.CameraID + encodeURIComponent(config.fetch[toggleActivePage].CameraID === undefined ? "" : config.fetch[toggleActivePage].CameraID)
        let offset = configName.Offset + encodeURIComponent(config.fetch[toggleActivePage].Offset)
        let from = configName.From + encodeURIComponent(config.fetch[toggleActivePage].From)
        let to = configName.To + encodeURIComponent(config.fetch[toggleActivePage].To)
        let limit = configName.Limit + encodeURIComponent(configParam[toggleActivePage].Limit)
        let countBy = configName.CountBy + encodeURIComponent(configParam[toggleActivePage].CountBy)
        let classID = configName.ClassID + encodeURIComponent(config.fetch[toggleActivePage].ClassID === undefined ? "" : config.fetch[toggleActivePage].ClassID)
        let eventSubjectID = configName.EventSubjectID + 
            encodeURIComponent(config.fetch[toggleActivePage].EventSubjectID === undefined ? 
            configParam.EventSubjectIDdefault : config.fetch[toggleActivePage].EventSubjectID)
        bodyfetch = bodyfetch + cameraID + offset + from + to
        if (toggleActivePage === 'report') {
            bodyfetch = bodyfetch + limit + classID + eventSubjectID
        }
        if (toggleActivePage === 'chart') {
            bodyfetch = bodyfetch + countBy + classID + eventSubjectID
        }

    let promise = new Promise(function(resolve,reject) {
        let http =  new XMLHttpRequest();
        http.open(configFetch.requestMethod, configParam.urlAPI, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onload = function() {
            let response = http.responseText;
            resolve(response)
    }
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
                arrResponseElements = [...arrElements]
                    return { arr: arrResponseElements, noRenderPagination: noRenderPagination }
    }).catch(() =>{
        arrResponseElements = [];
        noRenderPagination = true;
        return { arr: arrResponseElements, noRenderPagination: noRenderPagination }
    });
    
}

export default fetchFunction;