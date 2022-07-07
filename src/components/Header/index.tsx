import React from 'react'
import { BsFillCartFill} from "react-icons/bs";
import {GiTShirt} from "react-icons/gi"
import SingInButton from '../SingInButton';
import style from './style.module.scss'



const Home = () => {
  return (
    <div className={style.container}>
        <header className={style.contain}>
        <img
        src="logo.svg"
        alt='Logo Marca'
        />

        <nav>
        <a href="#" className={style.active}>
          <GiTShirt/>
          Home
          </a>
        <a href="#">
          <BsFillCartFill/>
          <span> Carrinho</span>
        </a>
        </nav>
        <nav><SingInButton/></nav>
        </header>
    </div>
  )
}


export default Home