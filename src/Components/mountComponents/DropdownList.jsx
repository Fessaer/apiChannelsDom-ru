import React, { useContext } from 'react';
import { Context } from '../Store';
import allSelect from '../helpers/allSelect';

// import 'bootstrap/dist/css/bootstrap.min.css';
//DropdownList name={'ClassID'} items={[{1:'Голова'}, {2: 'Туловище'}, {3: 'Ноги'}]} labelName={'класс объекта'}

export default function DropdownList(props) {
  let { name, items, labelName } = props
  const [globalState, inSetState] = useContext(Context);
  
  if (items === undefined) console.log('не все параметры переданны для dropdown(items)');
  if (name === undefined) console.log('не все параметры переданны для dropdown(name)');
  const changeHandle = (e) => {
       inSetState({...globalState, [name]: e.target.value})   //настраиваем в ручную, куда в СТОРЕ отправлять данные
  }

  return (
    <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
      <label>{labelName}</label>
      <select className="form-select form-select-sm" aria-label="Default select example" onChange={changeHandle}>
        {items.map((item) => {
            const key = Object.keys(item).join()
            const value = Object.values(item).join()
            console.log(key)
            if (value === 'Всё') return <option key={key} selected>{value}</option>
            return (
              <option key={key} value={allSelect(key, value)}>{value}</option>
            )
        })}
      </select>
    </div>
  )
}
