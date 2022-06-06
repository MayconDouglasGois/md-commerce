import React from 'react'
import style from './style.module.scss'
import { BsFillCartPlusFill, BsFillCartCheckFill} from "react-icons/bs";

interface IcheckCurchase {
  keyItem: string
}
interface Icart {
  keyItem: string
}

const ButtonCart = ({keyItem}: IcheckCurchase) => {

  const [cart, setCart] = React.useState<Icart>({} as Icart)
  const [status, setStatus] = React.useState(false)
  

  React.useEffect(()=>{
   const VerifyLocalStorage = localStorage.getItem(keyItem)

   if(VerifyLocalStorage){
    setCart(JSON.parse(VerifyLocalStorage))
    setStatus(true)
  }else {
    setCart({
      keyItem: "",
   })
   setStatus(false)
  }
  },[])
  

 
 function addLocalStorage ()  {
   localStorage.setItem(keyItem,JSON.stringify(
     {
      keyItem: keyItem
    }
   ))

   setStatus(!status)
 }

 function removeLocalStorage (){
   localStorage.removeItem(keyItem)

   setStatus(!status)
 }

  return(

    <button
    onClick={()=>{

      if(status){
        removeLocalStorage()
    }else{
        addLocalStorage ()
    }
    
  }} 
    className={style.container}>

       {status?<BsFillCartCheckFill color="var(--blue-500)"/>:<BsFillCartPlusFill/>}

       </button>
  )
}

export default ButtonCart