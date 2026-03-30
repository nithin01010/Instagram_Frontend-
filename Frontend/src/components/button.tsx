import React from 'react'
interface ButtonProps{
    text: string;
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
    type?: "submit" | "button" | "reset";
}
const Button = ({text,onClick,type="submit"}:ButtonProps) => {
  return (
    <button type={type} className='bg-blue-400 hover:bg-blue-600 active:bg-blue-800 text-white px-8 py-2 rounded ' onClick={onClick}>{text}</button>
  )
}

export default Button