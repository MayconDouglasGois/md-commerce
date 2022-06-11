import Head from 'next/head'
import React from "react"

import {GetServerSideProps} from "next"
import { stripe } from "../services/stripe"
import Stripe from "stripe"

import ButtonCart from "../components/ButtonCart"
import ButtonCurchase from "../components/ButtonCurchase"

import style from "../styles/Home.module.scss"




interface Iproduct {
  product: {
      id: string,
      image: string,
      name: string,
      descriptin:string,
      price: number,
    }[]
  }




const Home = ({product}:Iproduct)=> (
  <>
    <Head>
      <title>md-commerce | Home</title>
    </Head>
    <main>

      <section className={style.product}>
        <h1>PRODUTOS</h1>
        <div className={style.container}>


          {product.map((item) => {


            return (
              <div className={style.contant} key={item.id}>

                <img src={item.image} alt="digitando" className={style.img} />

                <div className={style.boxtext}>

                  <h2>{item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h2>
                  <h2>{item.name}</h2>
                  <div className={style.Curchase}>
                    <ButtonCurchase/>
                   
                    <ButtonCart keyItem={item.id}/>
                  </div>
                  
                  <span className={style.description}>{item.descriptin}</span>
              
                </div>
              </div>
            )
          })}

        </div>
      </section>
    </main>
  </>)






export const getServerSideProps:GetServerSideProps =async ()=> {

  const ObjectProduct = await stripe.prices.list({
    limit: 6,
    expand:["data.product",]
  });
    console.log(ObjectProduct)

    const product= ObjectProduct.data.map((item: Stripe.Price)=>{
      return (
        {
          id: item.id,
          image:(item.product as Stripe.Product).images,
          name:(item.product as Stripe.Product).name,
          descriptin:(item.product as Stripe.Product).description,
          price:(item.unit_amount as number) / 100,
    }
    )})
    return {
      props:{
        product,
      }
  }
}


export default Home
