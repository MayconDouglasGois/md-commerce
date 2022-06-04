import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import style from './style.module.scss'
import React from 'react'

interface Idescription {
    descriptins: string
}


const DescriptinComponent = ({descriptins}: Idescription) => {
    const [actdescription, setActdescription] = React.useState(true)
    if(actdescription){
        return (
            <>
            <span className={style.description}>{descriptins}</span>
            <button onClick={()=>setActdescription(!actdescription)}><AiFillCaretUp/></button>
            </>
          )
    }else{
        return(
            <button onClick={()=>setActdescription(!actdescription)}><AiFillCaretDown/></button>
        )
    }
}

export default DescriptinComponent



