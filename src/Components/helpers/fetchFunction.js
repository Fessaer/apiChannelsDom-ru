var convert = require('xml-js');

const fetchFunction = async(config, e = false) => {
    let arrResponseElements = []
    let noRenderPagination = false;
    if (e !== false) {
        const newOffSet = (e - 1) * 20;
        config.fetch.offset = newOffSet;
    }
    // var bodyfetch = 'Login=' + encodeURIComponent('tplusfront') +
    //   '&Password=' + encodeURIComponent('tplusfront00');
    //   console.log(bodyfetch.length)
    //   await fetch(urle, {
    //     method: 'POST',
    //     body: bodyfetch,
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    // console.log(config)
    // console.log(config, 'config')
    const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
    // let requestForm = new FormData()
    // requestForm.set('SessionID', config.SessionID)
    let bodyfetch = 
    'SessionID=' + encodeURIComponent(config.SessionID) +
    '&ChangePasswordAtNextLogin=' + encodeURIComponent(config.ChangePasswordAtNextLogin)
    + '&Analytics=' + encodeURIComponent(config.fetch.algorithm)
    //   '&Password=' + encodeURIComponent('tplusfront00');
    // console.log(bodyfetch, 'bodyfetch')
    // requestForm.set('ChangePasswordAtNextLogin', config.ChangePasswordAtNextLogin)
    // requestForm.set('Analytics', config.fetch.algorithm)
    
    if (config.toggleActivePage === 'report') {
        let reportCameraID = '&CameraID=' + encodeURIComponent(config.fetch.report.CameraIdReport === undefined ? "" : config.fetch.report.CameraIdReport)
        // requestForm.set('CameraID', config.fetch.report.CameraIdReport === undefined ? "" : config.fetch.report.CameraIdReport)
        let reportOffset = '&Offset=' + encodeURIComponent(config.fetch.offset)
        // requestForm.set('Offset', config.fetch.offset)
        let reportFrom = '&From=' + encodeURIComponent(config.fetch.report.searchStartDateReport)
        // requestForm.set('From', `${config.fetch.report.searchStartDateReport}`)
        let reportTo = '&To=' + encodeURIComponent(config.fetch.report.searchEndDateReport)
        // requestForm.set('To', `${config.fetch.report.searchEndDateReport}`)
        let reportLimit = '&Limit=' + encodeURIComponent(21)
        // requestForm.set('Limit', 21)
        let reportTPlusCoverallsClassID = '&TPlusCoveralls[ClassID]=' + encodeURIComponent(config.fetch.report.ClassIdReport === undefined ? "" : config.fetch.report.ClassIdReport)
        // requestForm.set('TPlusCoveralls[ClassID]', config.fetch.report.ClassIdReport === undefined ? "" : config.fetch.report.ClassIdReport)
        let reportTPlusCoverallsEventSubjectID = '&TPlusCoveralls[EventSubjectID]=' + encodeURIComponent(config.fetch.report.eventSubjectID === undefined ? "552" : config.fetch.report.eventSubjectID)
        // requestForm.set('TPlusCoveralls[EventSubjectID]', config.fetch.report.eventSubjectID === undefined ? "552" : config.fetch.report.eventSubjectID)
        bodyfetch = bodyfetch + reportCameraID + reportOffset + reportFrom + reportTo + reportLimit + reportTPlusCoverallsClassID + reportTPlusCoverallsEventSubjectID
    }
    if (config.toggleActivePage === 'chart') {
        let chartCameraID = '&CameraID=' + encodeURIComponent(config.fetch.chart.CameraIdChart === undefined ? "" : config.fetch.report.CameraIdChart)

        // requestForm.set('CameraID', config.CameraIdReport)
        let chartFrom = '&From=' + encodeURIComponent(config.fetch.chart.searchStartDateChart)
        // requestForm.set('From', `${config.fetch.chart.searchStartDateChart}`)
        let chartTo = '&To=' + encodeURIComponent(config.fetch.chart.searchEndDateChart)
        // requestForm.set('To', `${config.fetch.chart.searchEndDateChart}`)
        let chartOffset = '&Offset=' + encodeURIComponent(0)
        // requestForm.set('Offset', 0)
        let chartCountBy = '&CountBy=' + encodeURIComponent('day')
        // requestForm.set('CountBy', 'day')
        let chartTPlusCoverallsClassID = '&TPlusCoveralls[ClassID]=' + encodeURIComponent(config.fetch.chart.ClassIdChart === undefined ? "" : config.fetch.chart.ClassIdChart)
        // requestForm.set('TPlusCoveralls[ClassID]', config.fetch.chart.ClassIdChart === undefined ? "" : config.fetch.chart.ClassIdChart)
        let chartTPlusCoverallsEventSubjectID = '&TPlusCoveralls[EventSubjectID]=' + encodeURIComponent(config.fetch.chart.eventSubjectID)
        // requestForm.set('TPlusCoveralls[EventSubjectID]', config.fetch.chart.eventSubjectID)
        bodyfetch = bodyfetch + chartCameraID + chartOffset + chartFrom + chartTo  + chartCountBy + chartTPlusCoverallsClassID + chartTPlusCoverallsEventSubjectID
        // console.log(chartCountBy)
    }

    // if (config.toggleActivePage === 'chart') requestForm.set('CountBy', 'day')
    // console.log('...ЗАПРОС =>>>')
    
    await fetch(apiUrlGetData, {
        method: 'POST',
        body: bodyfetch,
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
    }).then((response) => {
        try {
            const dataResponseText = response.text();
            // console.log(dataResponseText, 'dataResponseText RenderTable');
            return dataResponseText;
        } catch (err) {
            console.log(err, 'err');
            arrResponseElements = [];
            noRenderPagination = true;
        }
    }).then((data) => {
        try {
            let result = convert.xml2json(data, { compact: false });
            let parseData = JSON.parse(result);
            const { elements } = parseData;
            const arrElements = elements[0].elements;
            noRenderPagination = false;
            // console.log(typeof arrElements === "undefined", `typeof arrElements === "undefined"`);
            arrResponseElements = [...arrElements]
                // console.log(arrResponseElements, 'return arrResponseElements');
        } catch (err) {
            // console.log(err, 'err2');
            arrResponseElements = [];
            noRenderPagination = true;
        }
    })
    return { arr: arrResponseElements, noRenderPagination: noRenderPagination }
}

export default fetchFunction;