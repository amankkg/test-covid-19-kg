import React from 'react'

import logo from './logo.svg'

export const Thumbnail = ({className}: {className: string}) => (
  <div className={className}>
    <img src={logo} alt="" />
    <h1>COVID-19 Page Statistics</h1>
  </div>
)
