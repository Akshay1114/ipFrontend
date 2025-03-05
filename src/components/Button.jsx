import React from 'react'

function Button(props) {
  return (
   <button className={`commonBtn ${props.classname}`} onClick={props.onclick}>
    {props.children}
   </button>
  )
}

export default Button
