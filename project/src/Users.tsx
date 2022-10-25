import React, { useContext, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { IPerson } from './models/IPerson'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { DataContext } from './DataContext'


function Users() {

  const nameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const [persons,setPersons] = useState<IPerson[]>([])
  const pullData = () => {
    const stringPull = localStorage.getItem('persons')
    if(stringPull) {
      const arr = JSON.parse(stringPull) as IPerson[]
      setPersons(arr)
    }
  }

  useEffect(()=>{
    pullData()
    
  },[])

  const deleteItem= (index: number)=>
  {
    const newArr = [...persons]
    newArr.splice(index,1)
    localStorage.setItem('persons', JSON.stringify(newArr))
    pullData()
  }


  const validationSchema = Yup.object({
    name: Yup.string().required('Name Required').min(2, 'Name min 2').max(30, 'Name max 30'),
    email: Yup.string().required('Email Required').email('Email Format Fail'),
    phone: Yup.number().required('Phone Required').typeError('Phone TypeError')
  })


  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log( values );
      const item: IPerson = {
        pid: Math.round(Math.random() * 100).toString(),
        name: values.name,
        email: values.email,
        phone: Number(values.phone)
      }
      const newArr = [ ...persons, item ]
      const stArr = JSON.stringify( newArr )
      localStorage.setItem('persons', stArr)
      pullData()
      values.name = ''
      values.email = ''
      values.phone = ''
      nameRef.current?.focus()
    }
  })

  const { getItem, setItem } = useContext(DataContext)
  setItem({
    title: 'Users',
    color: '#000000'
  })

  return (
    <>
    <Helmet>
        <title> All Person </title>
        <meta name='description' content='All User Page Content'></meta>
    </Helmet>
    <div className='row'>
        <div className='col-sm-6'>
          <h2>Person Add</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
            <input ref={nameRef} value={values.name} onChange={handleChange} name='name' className='form-control' placeholder='Name'></input>
              { errors.name && <div className='text-danger'> { errors.name } </div> }
            </div>
            <div className='mb-3'>
              <input value={values.email} onChange={handleChange} name='email' className='form-control' placeholder='E-Mail'></input>
              { errors.email && <div className='text-danger'> { errors.email } </div> }
            </div>
            <div className='mb-3'>
              <input value={values.phone} onChange={handleChange} name='phone' className='form-control' placeholder='Phone'></input>
              { errors.phone && <div className='text-danger'> { errors.phone } </div> }
            </div>
            <button type='submit' className='btn btn-success'>Send</button>
          </form>
        </div>
        <div className='col-sm-6'>
          <h2>Person List</h2>

          <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Pid</th>
              <th scope="col">Name</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Phone</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>

            { persons.map((item, index) => 
              <tr key={index}>
                <th scope="row"> { item.pid } </th>
                <td>{ item.name }</td>
                <td>{ item.email }</td>
                <td>{ item.phone }</td>
                <td>
                  <button onClick={(evt) => deleteItem(index)} className='btn btn-danger btn-sm'>Delete</button>
                </td>
              </tr>
            )}


          </tbody>
        </table>

        </div>
      </div>
  </>
  )
}

export default Users