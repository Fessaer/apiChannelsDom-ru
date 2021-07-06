import { defaultFrom, defaultTo } from '../../helpers/getDefaultDay'

export const configFetch = {
  urlAPI: 'http://va.fpst.ru:8080/api/exportreport',
  requestMethod: 'POST',
  Algorithm: 'TPlusCoveralls',
}

export const configParam = {
  SessionID: '',
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
export const parameters = {
  
}

export const configParamTest = {
  query: {
    From: {
      formElementType: 'datePicker',
      formElementProps: {
        default: defaultFrom,
        label: 'Дата и время (от)'
      }
    },
    To: {
      formElementType: 'datePicker',
      formElementProps: {
        label:'Дата и время (до)',
        default: defaultTo,
      }
    },
    CameraID: {
      formElementType: 'dropdown',
      formElementProps: {
        default: 0,
        label: 'Камера',
        items: [{ ID: 0, Name: 'Все камеры' }, { ID: '650', Name: 'Помещение 107' }, { ID: '697', Name:'Спецодежда VLC stream' }],
        
      },
    },
    ClassID: {
      formElementType: 'dropdown',
      formElementProps: {
        label: 'Объект',
        default: 0,
        items: [{ 4: 'Все объекты' }, { 1: 'Каска' }, { 2: 'Куртка' }, { 3: 'Штаны' }]
        }
      },
    EventSubjectID: {
      formElementType: 'dropdown',
      formElementProps: {
        default: '552',
        defaultValue: 'Нестандартная спецодежда',
        items: [{ '552': 'Нестандартная спецодежда' }, { '553': 'Стандартная спецодежда' }]
      },
    },
    CountBy: {
      default: 'day',
      active:['chart']
    },
    Offset: {
      default: '0',
      active:['report']
    },
    Limit: {
      default: '21',
      active:['report']
    },
    
    SessionID: {
      default: '',
    }
  },
  urlAPI: 'http://va.fpst.ru:8080/api/exportreport',
  requestMethod: 'POST',
  Algorithm: 'TPlusCoveralls',
}
