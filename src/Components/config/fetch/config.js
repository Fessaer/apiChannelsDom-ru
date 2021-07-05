import { defaultFrom, defaultTo } from '../../helpers/getDefaultDay'


export const configFetch = {
  urlAPI: 'http://va.fpst.ru:8080/api/exportreport',
  requestMethod: 'POST',
  Algorithm: 'TPlusCoveralls',
}

export const configParam = {
  SessionID: '',
  ChangePasswordAtNextLogin: '',
  Analytics: "",
  CameraID: '',
  Offset: '0',
  From: defaultFrom,
  To: defaultTo,
  ClassID:  '',
  EventSubjectID: '552',
  CountBy: '',
  Limit: '',
}

export const defaultParam = {
    report: {
      CountBy: '',
      Limit: '21',
    },
    chart: {
      CountBy: 'day',
      Limit: ''
    }
  }
