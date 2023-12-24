import React from 'react'
interface Card{
    id:number,
    name:string,
    email:string
}


const CardComponent:React.FC<{card:Card}> = ({card}) => {
  return (
    <div className="flex justify-around gap-[10px] mb-[20px] flex-col capitalize"> 
        <div className="text-blue-400">{card.id}</div>
        <div>{card.name}</div>
        <div className=''>{card.email}</div>
    </div>
  )
}

export default CardComponent