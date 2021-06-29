import React, { useContext } from 'react';
import { Context } from '../Store';
import allSelect from '../helpers/allSelect';

export default function DropdownList(props) {
  let { name, items, labelName } = props
  const [globalState, inSetState] = useContext(Context);
  let { fetch, toggleActivePage } = globalState;
  let { chart, report } = globalState.fetch

  if (items === undefined) console.log('не все параметры переданны для dropdown(items)');
  if (name === undefined) console.log('не все параметры переданны для dropdown(name)');
  const changeHandle = (e) => {
    if (e.target.value === 'Все объекты' || e.target.value === 'Все камеры') {
      if (toggleActivePage === 'chart') {
        chart = { ...chart, [name]: '' }
        fetch = { ...fetch, chart }
        inSetState({ ...globalState, fetch })
      }
      if (toggleActivePage === 'report') {
        report = { ...report, [name]: '' }
        fetch = { ...fetch, report }
        inSetState({ ...globalState, fetch })
      }
    } else {
      if (toggleActivePage === 'chart') {
        chart = { ...chart, [name]: e.target.value }
        fetch = { ...fetch, chart }
        inSetState({ ...globalState, fetch })
      }
      if (toggleActivePage === 'report') {
        report = { ...report, [name]: e.target.value }
        fetch = { ...fetch, report }
        inSetState({ ...globalState, fetch })
      }
    }
  }

  return (
    <div className="col-sm-4 col-lg-3 col-xl-2 pb-3 button_max_width">
      <label className="pb-1">{labelName}</label>
      <select className="form-select form-select-sm" onChange={changeHandle}>
        {items.map((item) => {
          const key = Object.keys(item).join()
          const value = Object.values(item).join()
          if (value === 'Все объекты' || value === 'Все камеры') return <option key={key}>{value}</option>
          return (
            <option key={key} value={allSelect(key, value)}>{value}</option>
          )
        })}
      </select>
    </div>
  )
}
