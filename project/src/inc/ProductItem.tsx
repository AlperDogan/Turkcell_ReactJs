import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProBilgiler } from '../models/IProduct'

import styled, { keyframes } from 'styled-components';
import { slideInUp } from 'react-animations';


const animationStyle = keyframes`${slideInUp}`;
const AnimationDiv = styled.div`
  animation: 1s ${animationStyle};
`;


function ProductItem(item: {data: ProBilgiler}) {

    const navigate = useNavigate()
    const gotoDetail =()=>{

    }
  return (
    <><div className='car col-sm-4 mb-3'>
         <AnimationDiv><img src={item.data.images[0].normal} className="card-img-top p-3" /></AnimationDiv>
      <div className="card-body">
          <h5 className="card-title"> { item.data.productName } </h5>
          <p className="card-text"> { item.data.brief } </p>
          <h4 style={{ position:'absolute', right: 5, top: 5 }} ><span className="badge bg-warning text-ligh">{item.data.price}₺</span></h4>
          <a onClick={ gotoDetail } role='button' className="btn btn-primary" style={{ position: 'absolute', bottom: 5, right: 5,  }}><i className="bi bi-arrow-right"></i> Detail</a>
      </div>
      </div><div>ProductItem</div></>
  )
}

export default ProductItem