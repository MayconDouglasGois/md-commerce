import React from 'react'
import style from './style.module.scss'
import {BsFillBagPlusFill} from 'react-icons/bs'

const ButtonCurchase = () => {
  return (
   <button className={style.container}>
     <BsFillBagPlusFill/>
      <span>Comprar</span>
   </button>
  )
}

export default ButtonCurchase