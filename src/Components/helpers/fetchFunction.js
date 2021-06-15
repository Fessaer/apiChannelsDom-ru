var convert = require('xml-js');

const fetchFunction = async(config, e = false) => {
  let arrResponseElements = []
  let noRenderPagination = false;
  if (e !== false) {
    const newOffSet = (e - 1) * 20;
    config.offset = newOffSet;
  }
  
  
  // console.log(config, 'config')
  const apiUrlGetData = 'http://va.fpst.ru:8080/api/exportreport';
  const requestForm = new FormData()
  requestForm.set('SessionID', config.SessionID)
  requestForm.set('ChangePasswordAtNextLogin', config.ChangePasswordAtNextLogin)
  requestForm.set('Analytics', config.algorithm)
  requestForm.set('From', `${config.searchStartDate}`)
  requestForm.set('To', `${config.searchEndDate}`)
  if (config.toggleActivePage ==='paging') { 
    requestForm.set('Offset', config.offset) 
  } else {
    requestForm.set('Offset', 0) 
  }
  if (config.toggleActivePage !== 'chart') requestForm.set('Limit', 21)
  if (config.toggleActivePage !== 'chart') requestForm.set('TPlusCoveralls[ClassID]', config.ClassID)
  if (config.toggleActivePage !== 'chart') requestForm.set('TPlusCoveralls[EventSubjectID]', config.eventSubjectID)
  if (config.toggleActivePage === 'chart') requestForm.set('CountBy', 'day')
      console.log('...ЗАПРОС =>>>')
      await fetch(apiUrlGetData, {
      method: 'POST',
        body: requestForm
      }).then((response) => {
        try {
          const dataResponseText = response.text();
          console.log(dataResponseText, 'dataResponseText RenderTable')
          return dataResponseText;
      } catch (err) {
          console.log(err, 'err')
          arrResponseElements = []
          noRenderPagination = true
      }
      }).then((data) => {
        try {
          let result = convert.xml2json(data, {compact: false});
          let parseData = JSON.parse(result)
          const { elements } = parseData
          const arrElements = elements[0].elements
          noRenderPagination = false
          console.log(typeof arrElements === "undefined", `typeof arrElements === "undefined"`)
          arrResponseElements = [...arrElements]
          console.log(arrResponseElements, 'return arrResponseElements')
        } catch (err) {
            console.log(err, 'err2')
            arrResponseElements = []
            noRenderPagination = true
      }})
  return { arr: arrResponseElements, noRenderPagination: noRenderPagination }
}

export default fetchFunction;