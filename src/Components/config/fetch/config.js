import { defaultFrom, defaultTo } from '../../helpers/getDefaultDay'


export const configName = {
  SessionID: 'SessionID=',
  ChangePasswordAtNextLogin: '&ChangePasswordAtNextLogin=',
  Analytics: "&Analytics=",
  CameraID: '&CameraID=',
  Offset: '&Offset=',
  From: '&From=',
  To: '&To=',
  Limit: '&Limit=',
  ClassID: '&TPlusCoveralls[ClassID]=',
  EventSubjectID: '&TPlusCoveralls[EventSubjectID]=',
  CountBy: '&CountBy=',
  
}

export const configParam = {
  urlAPI: 'http://va.fpst.ru:8080/api/exportreport',
  EventSubjectIDdefault: '552',
  Algorithm: 'TPlusCoveralls',
  ClassID: '',
  defaultFrom: defaultFrom,
  defaultTo: defaultTo,
  Offset: 0,
  report: {
    CountBy: '',
    Limit: 21,
  },
  chart: {
    CountBy: 'day',
    Limit: 0,
  }
}

export const configFetch = {
  requestMethod: 'POST',
}