import React, { useContext } from 'react';
import { Context } from '../Store';
//DropdownListCameras name={'test cameras group'} items={['camera 1', 'camera 2', 'camera 3']}

export default function DropdownList(props = {name: 'не определено'}) {
  let { name, items } = props
  const [inState, inSetState] = useContext(Context);
  // console.log(items, name, 'props')
  if (items === undefined) items = ['нету активных камер'];
  if (name === undefined) name = ['не определено'];
  const changeCamera = (e) => {
    console.log(e.target.value)
    inSetState({...inState, cameraName: e.target.value})   //настраиваем в ручную куда отправлять данные
  }

  return (
    <div className="col-lg-2 col-sm-4 pb-3 button_max_width">
        <label>{name}</label>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={changeCamera}>
          {/* <option selected>Open this select menu</option> */}
          {items.map((el) => {
            return (
              <option key={el} value={el}>{el}</option>
            )
          })}
          {/* <option value="1">Спецодежда VLC stream</option> */}
        </select>
      </div>
  )
}
