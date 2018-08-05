
import TabBar from '@common/TabBar'
import React from 'react'

export default function Home(props) {

  return (
    <div className='page'>
      
      <div className='container-fluid'>
        <h1>Home</h1>
        {props.children}
      </div>
      <TabBar/>
    </div>
  )
}
