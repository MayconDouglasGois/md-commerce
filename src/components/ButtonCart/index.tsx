import React from 'react'
import style from './style.module.scss'
import { BsFillCartPlusFill, BsFillCartCheckFill} from "react-icons/bs";

interface IcheckCurchase {
  checkCurchase: boolean
}

const ButtonCart = ({checkCurchase}: IcheckCurchase) => {
  if (checkCurchase){
    return (
      <button className={style.container}>
        <BsFillCartCheckFill/>
      </button>
    )
  }else{
    return (
      <button className={style.container}>
        <BsFillCartPlusFill/>
      </button>
    )
  }
}

export default ButtonCart