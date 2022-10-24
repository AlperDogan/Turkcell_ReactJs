import React from 'react'
import { Navigate } from 'react-router-dom'
import NavBar from './inc/NavBar'
import { userLoginControl } from './util'

function Security(item: {component: JSX.Element}) {

    const user =userLoginControl()
  return (
    user === null
    ?
    <Navigate to='/'></Navigate>
    :
    <>
    <NavBar user ={user}></NavBar> {item.component}
    </>
  )
}

export default Security