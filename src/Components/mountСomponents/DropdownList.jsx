import React, { useContext } from 'react';
import { Context } from '../Store';
//DropdownList name={'ClassID'} items={[{1:'Голова'}, {2: 'Туловище'}, {3: 'Ноги'}]} labelName={'класс объекта'}

export default function DropdownList(props) {
  let { name, items, labelName } = props
  const [inState, inSetState] = useContext(Context);
  // let { storeValue } = inState
  // console.log(items, name, 'props')
  if (items === undefined) console.log('не все параметры переданны для dropdown(items)');
  if (name === undefined) console.log('не все параметры переданны для dropdown(name)');
  // if (storeValue === undefined) storeValue = [];
  const changeHandler = (e) => {
    console.log(e.target.value)
    inSetState({...inState, [name]: e.target.value})   //настраиваем в ручную, куда в СТОРЕ отправлять данные
  }

  return (
    <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>{labelName}</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={changeHandler}>
          {/* <option selected>Open this select menu</option> */}
          {items.map((item) => {
            const key = Object.keys(item).join()
            const value = Object.values(item)

            return (
              <option key={key} value={key}>{value}</option>
            )
          })}
          {/* <option value="1">Спецодежда VLC stream</option> */}
        </select>
      </div>
  )
}
