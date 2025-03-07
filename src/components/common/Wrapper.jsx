import React from 'react'

function Wrapper(props) {
  return (
    <div className={`wrapper ${props.classname}`}>
      {props.children}
    </div>
  )
}

export default Wrapper
