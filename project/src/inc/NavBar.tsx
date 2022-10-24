import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Bilgiler } from '../models/IUser'
import { order } from '../service'
import { OrderAction } from '../useRedux/actions/OrderAction'
import { SearchAction } from '../useRedux/actions/SearchAction'
import { StateType } from '../useRedux/store'
import { OrderType } from '../useRedux/types/OrderType'
import { SearchType } from '../useRedux/types/SearchType'

function NavBar(item: { user: Bilgiler }) {

  const orderSelector = useSelector((item: StateType) => item.OrderReducer)
  const searchSelector = useSelector( (item:StateType) => item.SearchReducer )
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.pathname)

  const logout = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    navigate('/')
    window.location.href='/'

  }

  //all Orders
  useEffect (()=>{
    const orderService = order()
    if(orderService)
    {
      orderService.then (res=> {
        const arr = res.data.orderList
        if(typeof arr !== 'boolean'){
          const sendAction:OrderAction= {
            type: OrderType.ORDER_LIST,
            payload: arr
          }
          dispatch(sendAction)
        }
      })
    }
  })

  const fncSearch = (txt: string) => {
    const sendAction:SearchAction = {
      type: SearchType.SEARCH_CHANGE,
      payload: txt
    }
    dispatch( sendAction )
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to='/dashboard' className='nav-link'>Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/users' className='nav-link'>Users</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" role='button' onClick={logout} >Logout</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">{item.user.userName} {item.user.userSurname} ({orderSelector.length})</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input value={searchSelector} onChange={(evt) => fncSearch(evt.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

function userSelector(arg0: (item: StateType) => any) {
  throw new Error('Function not implemented.')
}
