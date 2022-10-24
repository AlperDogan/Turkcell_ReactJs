import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProBilgiler } from './models/IProduct'
import { addBasket, order } from './service'
import { useDispatch } from 'react-redux'
import { OrderAction } from './useRedux/actions/OrderAction'
import { OrderType } from './useRedux/types/OrderType'

function ProductDetail() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [item, setItem] = useState<ProBilgiler>()
    const [bigImage, setBigImage] = useState('')
    useEffect(() => {
        if (state) {
            try {
                const proBilgi = state as ProBilgiler
                setBigImage(proBilgi.images[0].normal)
                setItem(proBilgi)
            }
            catch {
                navigate('/dashboard')
            }
        }
        else {
            navigate('/dashboard')
        }

    }, [])

    const dispatch = useDispatch()
    const fncAddBasket = ()=>{
        const basket = addBasket (item!.productId)
        if(basket)
        {
            basket.then(res => {
                console.log(res)
                const status = res.data.order[0]
                if(status)
                {
                    toast.success('Add Basket Success')
                    const orderService = order()
                    if( orderService ){
                        orderService.then( res => {
                            const order = res.data.orderList
                            if(typeof order !== 'boolean'){
                                const orderAction: OrderAction = {
                                    type:OrderType.ORDER_LIST,
                                    payload: order
                                }
                                dispatch(orderAction)
                            }

                        })
                    }
                    //window.location.reload()
                }
                else{
                    toast.error('Basket Fail')
                }
            })
        }
        
    }

    return (
        <>
            {
                item &&
                <>
                    <h2>{item?.productName}</h2>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <img src={bigImage} className='fluid'></img>
                            {
                                item.images.map((itm, index) =>
                                    <img onClick={(evt) => setBigImage(itm.normal)} role='button' key={index} src={itm.thumb}></img>

                                )
                            }
                        </div>
                    </div>

                    <div className='col-sm-6'>
                        <h2><span className='badge bg-danger'>{item.price}</span></h2>
                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                        <button className='btn btn-warning'><i className="bi bi-cart-check"></i>Add Basket</button>
                    </div>
                </>
            }
        </>


    )

}
export default ProductDetail
