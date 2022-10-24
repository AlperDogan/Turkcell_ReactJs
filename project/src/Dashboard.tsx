import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './inc/ProductItem';
import { ProBilgiler } from './models/IProduct';
import { allProduct } from './service';
import { SearchAction } from './useRedux/actions/SearchAction';
import { StateType } from './useRedux/store';
import { SearchType } from './useRedux/types/SearchType';

function Dashboard() {


  const searchSelector = useSelector((item: StateType) => item.SearchReducer)
  const dispactch = useDispatch()

  const [proArr, setProArr] = useState<ProBilgiler[]>([])
  const [oldProArr, setOldProArr] = useState<ProBilgiler[]>([])

  useEffect(() => {
    console.log("useEffect -1");
    const SearchAction:SearchAction={
      type:SearchType.SEARCH_CHANGE,
      payload:''

    }
    dispactch(SearchAction)

    allProduct().then(res => {
      const arr = res.data.Products[0].bilgiler
      setProArr(arr)
      setOldProArr(arr)
    })
  }, [])

  useEffect(() => {
    console.log("useEffect -2");
    const search =searchSelector.toLowerCase()
    const searchArr =oldProArr.filter((item)=>item.productName.toLowerCase().includes(search))
    setProArr(searchArr)
  },[searchSelector])

  return (
    <>
    <h2>Products</h2>
      <div className='row'>
        {proArr.map((item, index) =>
          <ProductItem data={item} key={index} />
        )}
      </div>
    </>
  )

}

export default Dashboard