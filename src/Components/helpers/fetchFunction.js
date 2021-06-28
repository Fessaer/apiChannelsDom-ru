var convert = require('xml-js');

const fetchFunction = async (config, e = false) => {
    let arrResponseElements = []
    let noRenderPagination = true;
    if (e !== false) {
        const newOffSet = (e - 1) * 20;
        config.fetch.offset = newOffSet;
    }
    const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
    let bodyfetch = 
    'SessionID=' + encodeURIComponent(config.SessionID) +
    '&ChangePasswordAtNextLogin=' + encodeURIComponent(config.ChangePasswordAtNextLogin)
    + '&Analytics=' + encodeURIComponent(config.fetch.algorithm)
    
    if (config.toggleActivePage === 'report') {
        let reportCameraID = '&CameraID=' + encodeURIComponent(config.fetch.report.CameraID === undefined ? "" : config.fetch.report.CameraID)
        let reportOffset = '&Offset=' + encodeURIComponent(config.fetch.offset)
        let reportFrom = '&From=' + encodeURIComponent(config.fetch.report.searchStartDateReport)
        let reportTo = '&To=' + encodeURIComponent(config.fetch.report.searchEndDateReport)
        let reportLimit = '&Limit=' + encodeURIComponent(21)
        let reportTPlusCoverallsClassID = '&TPlusCoveralls[ClassID]=' + encodeURIComponent(config.fetch.report.ClassIdReport === undefined ? "" : config.fetch.report.ClassIdReport)
        let reportTPlusCoverallsEventSubjectID = '&TPlusCoveralls[EventSubjectID]=' + encodeURIComponent(config.fetch.report.eventSubjectID === undefined ? "552" : config.fetch.report.eventSubjectID)
        bodyfetch = bodyfetch + reportCameraID + reportOffset + reportFrom + reportTo + reportLimit + reportTPlusCoverallsClassID + reportTPlusCoverallsEventSubjectID
    }

    if (config.toggleActivePage === 'chart') {
        let chartCameraID = '&CameraID=' + encodeURIComponent(config.fetch.chart.CameraIdChart === undefined ? "" : config.fetch.report.CameraIdChart)
        let chartFrom = '&From=' + encodeURIComponent(config.fetch.chart.searchStartDateChart)
        let chartTo = '&To=' + encodeURIComponent(config.fetch.chart.searchEndDateChart)
        let chartOffset = '&Offset=' + encodeURIComponent(0)
        let chartCountBy = '&CountBy=' + encodeURIComponent('day')
        let chartTPlusCoverallsClassID = '&TPlusCoveralls[ClassID]=' + encodeURIComponent(config.fetch.chart.ClassIdChart === undefined ? "" : config.fetch.chart.ClassIdChart)
        let chartTPlusCoverallsEventSubjectID = '&TPlusCoveralls[EventSubjectID]=' + encodeURIComponent(config.fetch.chart.eventSubjectID)
        bodyfetch = bodyfetch + chartCameraID + chartOffset + chartFrom + chartTo  + chartCountBy + chartTPlusCoverallsClassID + chartTPlusCoverallsEventSubjectID
    }

    let promise = new Promise(function(resolve,reject) {
        let http =  new XMLHttpRequest();
        http.open('POST', apiUrlGetData, true);
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