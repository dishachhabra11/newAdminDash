import React from 'react'
import loading from './laoding.gif'

const spinner = () => {
  return (
    <div>
      <img src={loading} alt="Loading..." />
    </div>
  )
}

export default spinner
