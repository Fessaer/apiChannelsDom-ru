import { defaultDateStart, defaultDateEnd } from '../../helpers/getDefaultDay'

export const configName = {
  SessionID: 'SessionID=',
  changePasswordAtNextLogin: '&ChangePasswordAtNextLogin=',
  analytics: "&Analytics=",
  cameraID: '&CameraID=',
  offset: '&Offset=',
  from: '&From=',
  to: '&To=',
  limit: '&Limit=',
  classID: '&TPlusCoveralls[ClassID]=',
  eventSubjectID: '&TPlusCoveralls[EventSubjectID]=',
  countBy: '&CountBy=',
  
}

export const configParam = {
  urlAPI: 'http://va.fpst.ru:8080/api/exportreport',
  limit: 21,
  eventSubjectIDdefault: '552',
  countBy: 'day',
  algorithm: 'TPlusCoveralls',
  classID: '',
  defaultDateStart: defaultDateStart,
  defaulrDateEnd: defaultDateEnd,
  offset: 0,
}

export const configFetch = {
  requestMethod: 'POST',
}