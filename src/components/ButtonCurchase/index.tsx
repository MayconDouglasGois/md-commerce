import React from 'react'
import style from './style.module.scss'
import {BsFillBagPlusFill} from 'react-icons/bs'
import { useSession, signIn } from "next-auth/react";
import { api } from '../../services/api';
import { getStripesJs } from '../../services/stripe-js';

interface IPriceId{
  priceId: string
}

const ButtonCurchase = ({priceId}: IPriceId) => {
  const { data: session } = useSession();

 async function handleCurchase(){
    if(!session){
      signIn("google")
      return;
    }
    try{
      const reponse = await api.post('/payments',{priceId: priceId})

      const {sessionId} = reponse.data
      const stripe = await getStripesJs()
        await stripe?.redirectToCheckout({sessionId})
    }catch (err) {
      alert(err)
    }
  }


  return (
   <button onClick={()=>{handleCurchase()}} className={style.container}>
     <BsFillBagPlusFill/>
      <span>Comprar</span>
   </button>
  )
}

export default ButtonCurchase