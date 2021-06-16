var convert = require('xml-js');

const fetchFunction = async(config, e = false) => {
  let arrResponseElements = []
  let noRenderPagination = false;
  if (e !== false) {
    const newOffSet = (e - 1) * 20;
    config.offset = newOffSet;
  }
  
  // console.log(config)
  // console.log(config, 'config')
  const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
  const requestForm = new FormData()
  requestForm.set('SessionID', config.SessionID)
  requestForm.set('ChangePasswordAtNextLogin', config.ChangePasswordAtNextLogin)
  requestForm.set('Analytics', config.algorithm)
  
  if (config.toggleActivePage ==='report') { 
    requestForm.set('CameraID', config.CameraIdReport)
    requestForm.set('Offset', config.offset)
    requestForm.set('From', `${config.fetch.report.searchStartDateReport}`)
    requestForm.set('To', `${config.fetch.report.searchEndDateReport}`)
    requestForm.set('Limit', 21)
    requestForm.set('TPlusCoveralls[ClassID]', config.ClassID)
    requestForm.set('TPlusCoveralls[EventSubjectID]', config.eventSubjectID) 
  } 
  if (config.toggleActivePage ==='chart') {
    requestForm.set('CameraID', "config.CameraIdChart")
    requestForm.set('From', `${config.fetch.chart.searchStartDateChart}`)
    requestForm.set('To', `${config.fetch.chart.searchEndDateChart}`) 
    requestForm.set('Offset', 0)
    requestForm.set('CountBy', 'day')
    requestForm.set('TPlusCoveralls[ClassID]', config.fetch.chart.ClassIdChart === undefined ? "" : config.fetch.chart.ClassIdChart)
    requestForm.set('TPlusCoveralls[EventSubjectID]', "553") 
  }
  
  // if (config.toggleActivePage === 'chart') requestForm.set('CountBy', 'day')
      // console.log('...ЗАПРОС =>>>')
      await fetch(apiUrlGetData, {
      method: 'POST',
        body: requestForm
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
          let result = convert.xml2json(data, {compact: false});
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
      }})
  return { arr: arrResponseElements, noRenderPagination: noRenderPagination }
}

export default fetchFunction;