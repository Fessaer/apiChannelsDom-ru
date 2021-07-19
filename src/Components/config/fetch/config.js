import { defaultFrom, defaultTo } from '../../helpers/getDefaultDay';

export const configParam = {
  massage: {
    alerts: {
      attestations: {
        errors: '',
        success: {
          addAttestation: 'Аттестация добалена',
          customizeAttestation: 'Аттестация отредактирована',
        },
      },
    },
  },
  componentAttestations: {
    EntryFirstDate: {
      formElementType: 'datePicker',
      formElementProps: {
        type: 'EntryFirstDate',
        label: 'Дата и время (от)',
      },
    },
    EntryLastDate: {
      formElementType: 'datePicker',
      formElementProps: {
        type: 'EntryLastDate',
        label: 'Дата и время (до)',
      },
    },
  },
  query: {
    From: {
      formElementType: 'datePicker',
      formElementProps: {
        type: 'From',
        default: defaultFrom,
        label: 'Дата и время (от)',
        periodAgo: 7,
      },
    },
    To: {
      formElementType: 'datePicker',
      formElementProps: {
        type: 'To',
        label: 'Дата и время (до)',
        default: defaultTo,
        periodAgo: 0,
      },
    },
    CameraID: {
      formElementType: 'dropdown',
      formElementProps: {
        type: 'CameraID',
        default: '0',
        label: 'Камера',
        items: [
          { ID: '0', Name: 'Все камеры' },
          { ID: '650', Name: 'Помещение 107' },
          { ID: '697', Name: 'Спецодежда VLC stream' },
        ],
      },
    },
    ClassID: {
      formElementType: 'dropdown',
      formElementProps: {
        type: 'ClassID',
        Algorithm: true,
        label: 'Объект',
        default: '0',
        items: [
          { ID: '0', Name: 'Все объекты' },
          { ID: '1', Name: 'Каска' },
          { ID: '2', Name: 'Куртка' },
          { ID: '3', Name: 'Штаны' },
        ],
      },
    },
    EventSubjectID: {
      formElementType: 'dropdown',
      formElementProps: {
        type: 'EventSubjectID',
        label: 'Спецодежда',
        Algorithm: true,
        default: '552',
        items: [
          { ID: '552', Name: 'Нестандартная спецодежда' },
          { ID: '553', Name: 'Стандартная спецодежда' },
        ],
      },
    },
    CountBy: {
      formElementProps: {
        default: 'day',
        active: ['chart'],
      },
    },
    Offset: {
      formElementProps: {
        default: '0',
        active: ['report'],
      },
    },
    Limit: {
      formElementProps: {
        default: '21',
        active: ['report'],
      },
    },
  },
  urlAPI: 'http://va.fpst.ru:8080',
  requestMethod: 'POST',
  Algorithm: {
    TPlusCoveralls: {
      subclassList: {
        2: 'Голова в каске',
        3: 'Стандартная куртка',
        4: 'Стандартные штаны',
        5: 'Голова без каски',
        6: 'Нестандартная куртка',
        7: 'Нестандартные штаны',
      },
    },
  },
  SessionID: '',
  login: 'tplusfront',
  password: 'tplusfront00',
  api: {
    login: {
      auth: '/api/login',
    },
    report: {
      get: '/api/exportreport',
    },
    chart: {
      get: '/api/exportreport',
    },
    attestations: {
      setup: '/api/setupattestation',
      get: '/api/attestations',
      delete: '/api/deleteattestation',
    },
  },
};
