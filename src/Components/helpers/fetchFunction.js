import { configName, configParam, configFetch } from '../config/fetch/config';
var convert = require('xml-js');


const fetchFunction = async (config, e = false) => {
    let arrResponseElements = []
    let noRenderPagination = true;
    if (e !== false) {
        const newOffSet = (e - 1) * 20;
        config.fetch.offset = newOffSet;
    }

    let bodyfetch = 
    configName.SessionID + encodeURIComponent(config.SessionID) +
    configName.changePasswordAtNextLogin + encodeURIComponent(config.ChangePasswordAtNextLogin)
    + configName.analytics + encodeURIComponent(config.fetch.algorithm)
    
    if (config.toggleActivePage === 'report') {
        let cameraID = configName.cameraID + encodeURIComponent(config.fetch.report.CameraID === undefined ? "" : config.fetch.report.CameraID)
        let offset = configName.offset + encodeURIComponent(config.fetch.offset)
        let from = configName.from + encodeURIComponent(config.fetch.report.searchStartDateReport)
        let to = configName.to + encodeURIComponent(config.fetch.report.searchEndDateReport)
        let limit = configName.limit + encodeURIComponent(configParam.limit)
        let classID = configName.cameraID + encodeURIComponent(config.fetch.report.ClassID === undefined ? "" : config.fetch.report.ClassID)
        let eventSubjectID = configName.eventSubjectID + 
            encodeURIComponent(config.fetch.report.eventSubjectID === undefined ? 
            configParam.eventSubjectIDdefault : config.fetch.report.eventSubjectID)
        bodyfetch = bodyfetch + cameraID + offset + from + to + limit + classID + eventSubjectID
    }

    if (config.toggleActivePage === 'chart') {
        let cameraID = configName.cameraID + encodeURIComponent(config.fetch.chart.CameraID === undefined ? "" : config.fetch.report.CameraID)
        let from = configName.from + encodeURIComponent(config.fetch.chart.searchStartDateChart)
        let to = configName.to + encodeURIComponent(config.fetch.chart.searchEndDateChart)
        let chartOffset = configName.offset + encodeURIComponent(0)
        let countBy = configName.countBy + encodeURIComponent(configParam.countBy)
        let classID = configName.classID + encodeURIComponent(config.fetch.chart.ClassID === undefined ? "" : config.fetch.chart.ClassID)
        let eventSubjectID = configName.eventSubjectID + encodeURIComponent(config.fetch.chart.eventSubjectID)
        bodyfetch = bodyfetch + cameraID + chartOffset + from + to  + countBy + classID + eventSubjectID
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