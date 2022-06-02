import {GetServerSideProps} from "next"
import Head from 'next/head'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"
import { stripe } from "../services/stripe"

import style from "../styles/Home.module.scss"

interface Iproduct {
  product: {
      id: string,
      image: string,
      name: string,
      descriptin:string,
    }[]
  }


const Home = ({product}:Iproduct)=> {

  return (
   <>
    <Head>
      <title>md-commerce | Home</title>
    </Head>
    <main>
    
    <section className={style.product}>
      <h1>PRODUTOS</h1>
      <div className={style.container}>
 

      {product.map((item)=>{
   return(
        <div className={style.contant} key={item.id}>
          <img src={item.image} alt="digitando" />
            <div className={style.boxtext}>
              <h2>{item.name}</h2>
              <span>{item.descriptin}</span>
            </div>
        </div>
   )
 })}

      </div> 
    </section>
    </main>
   </>)
}
export const getServerSideProps:GetServerSideProps =async ()=> {

const ObjectProduct = await stripe.products.list({
  limit: 6,
});


  const product = ObjectProduct.data.map((item)=>{
    return ({
    id: item.id,
    image: item.images,
    name: item.name,
    descriptin: item.description,
  })})
  return {
  props:{
    product,
  }
}
}


export default Home
