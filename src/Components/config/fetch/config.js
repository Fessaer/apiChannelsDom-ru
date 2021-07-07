import { defaultFrom, defaultTo } from '../../helpers/getDefaultDay'

// export const configFetch = {
//   urlAPI: 'http://va.fpst.ru:8080/api/exportreport',
//   requestMethod: 'POST',
//   Algorithm: 'TPlusCoveralls',
// }

// export const configParam = {
//   SessionID: '',
//   Analytics: "",
//   CameraID: '',
//   Offset: '0',
//   From: defaultFrom,
//   To: defaultTo,
//   ClassID:  '',
//   EventSubjectID: '552',
//   CountBy: '',
//   Limit: '',
// }

// export const defaultParam = {
//     report: {
//       CountBy: '',
//       Limit: '21',
//     },
//     chart: {
//       CountBy: 'day',
//       Limit: ''
//     }
//   }
// export const parameters = {
  
// }

export const configParam = {
  query: {
    From: {
      formElementType: 'datePicker',
      formElementProps: {
        type: 'From',
        default: defaultFrom,
        label: 'Дата и время (от)',
        periodAgo: 7,
      }
    },
    To: {
      formElementType: 'datePicker',
      formElementProps: {
        type: 'To',
        label:'Дата и время (до)',
        default: defaultTo,
        periodAgo: 0,
      }
    },
    CameraID: {
      formElementType: 'dropdown',
      formElementProps: {
        type: 'CameraID',
        default: '0',
        label: 'Камера',
        items: [{ ID: '0', Name: 'Все камеры' }, { ID: '650', Name: 'Помещение 107' }, { ID: '697', Name:'Спецодежда VLC stream' }],
      },
    },
    ClassID: {
      formElementType: 'dropdown',
      formElementProps: {
        type: 'ClassID',
        Algorithm: true,
        label: 'Объект',
        default: '0',
        items: [{ ID: '0', Name: 'Все объекты' }, { ID:'1', Name: 'Каска' }, { ID:'2', Name: 'Куртка' }, { ID:'3', Name: 'Штаны' }],
        
        }
      },
    EventSubjectID: {
      formElementType: 'dropdown',
      formElementProps: {
        type: 'EventSubjectID',
        label: 'Спецодежда',
        Algorithm: true,
        default: '552',
        items: [{ ID:'552', Name: 'Нестандартная спецодежда' }, { ID:'553', Name: 'Стандартная спецодежда' }],
      },
    },
    CountBy: {
      formElementProps: {
        default: 'day',
        active:['chart']
      }
    },
    Offset: {
      formElementProps: {
        default: '0',
        active:['report']
      },
    },
    Limit: {
      formElementProps: {
        default: '21',
        active:['report']
      }
    }
  },
  urlAPI: 'http://va.fpst.ru:8080/api/exportreport',
  requestMethod: 'POST',
  Algorithm: 'TPlusCoveralls',
  SessionID: ''
  
}
