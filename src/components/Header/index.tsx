import React from 'react'
import { BsFillCartFill,BsFillBagFill } from "react-icons/bs";
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
        <a href="#" className={style.active}>Home</a>
        <a href="#">
          <BsFillCartFill/>
          <span> Carrinho</span>
        </a>
        <a href="#">
          <BsFillBagFill/>
        <span> Pedidos</span>
        </a>
        </nav>


        </header>
    </div>
  )
}


export default Home