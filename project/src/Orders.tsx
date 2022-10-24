import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Order } from './models/IOrders'
import { order } from './service'

function Orders() {

    const orderSelector = useSelector ((item:StateType)=>item.OrderReducer)

    /*const [proArr, setProArr] = useState<Order[]>([])
    useEffect(() => {
        const orderPromise = order()
        if ( orderPromise ) {
            orderPromise.then( res => {
                const arr = res.data.orderList
                if ( typeof arr !== 'boolean'  ) {
                    console.log( arr );
                    setProArr( arr )
                }
            })
        }
    }, [])*/
    
  return (
    <>
        
        <table className="table table-hover">
        <thead>
            <tr>
            <th scope="col">Pid</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Biref</th>
            </tr>
        </thead>
        <tbody>

        {orderSelector.map( ( item, index ) => 
            <tr key ={index}>
            <th scope="row">{item.urun_id }</th>
            <td > <img src ={item.thumb} className='img-thumbnail'></img></td>
            <td>{item.urun_adi}</td>
            <td>{item.fiyat}</td>
            <td>{item.kisa_aciklama}</td>
            </tr>
        )}
            
        </tbody>
        </table>
    </>
  )

}

export default Orders