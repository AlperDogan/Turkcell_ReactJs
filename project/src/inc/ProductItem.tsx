import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProBilgiler } from '../models/IProduct'

function ProductItem(item: {data: ProBilgiler}) {

    const navigate = useNavigate()
    const gotoDetail =()=>{

    }
  return (
    <><div className='car col-sm-4 mb-3'>
          <img src={item.data.images[0].normal} className='card-img-top'></img>
          <div className='card-body'>
              <h5 className='card-title'>{item.data.productName}</h5>
              <p className='card-text'>{item.data.brief}</p>
              <a onClick={gotoDetail} role='button' className='btn btn-primary' style={{position:'absolute' , bottom:5 ,right:5}}></a>
          </div>
      </div><div>ProductItem</div></>
  )
}

export default ProductItem