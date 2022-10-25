import React from 'react'
import { Navigate } from 'react-router-dom'
import Footer from './inc/Footer'
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
    <NavBar user={user} /> {item.component} <Footer />
    </>
  )
}

export default Security