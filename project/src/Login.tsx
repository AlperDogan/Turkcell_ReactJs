import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { userLogin } from './service'
import { userLoginControl } from './util'

function Login() {

    const navigate = useNavigate()

    useEffect(()=>{
        const user = userLoginControl()
        if(user){
            //navigate('/dashboard')
            //window.location.href ='/dashboard'
            
        }
        console.log("useEffect -1");
        },[] )

    const [alertMessage, setAlertMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const sendForm = (evt: React.FormEvent) => {
        evt.preventDefault()
        setAlertMessage('')
        console.log(email, password)
        userLogin(email, password).then(res => {

            const user = res.data.user[0]
            const bilgi = user.bilgiler
            if (user.durum && bilgi) {
                const stBilgiler = JSON.stringify(bilgi)
                sessionStorage.setItem('user', stBilgiler)
                navigate('/dashboard')
            }
            else {
                setAlertMessage(user.mesaj)
            }
            console.log(user)
        }).catch(error => {
            console.log('error geldi')
            console.log(error.message)
        }
        ).finally(() => {
            console.log('finally line call')
        })
        console.log('this line call')
    }

    return (
        <>
        <Helmet>
            <title>Admin Login</title>
            <meta name='description' content='Page Admin Login Content'/>
        </Helmet>
            <div className='row'>
                <div className='col-sm-4'></div>
                <div className='col-sm-4'>
                    <h2>Admin Login</h2>
                    {
                        alertMessage !== '' &&
                        <div className="alert alert-danger" role="alert">
                            {alertMessage}
                        </div>}
                    <form onSubmit={sendForm}>
                        <div className='mb-3'>
                            <input onChange={(evt) => setEmail(evt.target.value)} required type='email' className='form-control' placeholder='E-mail' ></input>
                        </div>

                        <div className='mb-3'>
                            <input onChange={(evt) => setPassword(evt.target.value)} required type='password' className='form-control' placeholder='Password' ></input>
                        </div>

                        <div className='mb-3 form-check'>
                            <input onChange={(evt) => setRemember(!remember)} type='checkbox' className='form-check-input' id='remember'></input>
                            <label className='form-check-label' htmlFor='remember'>Remember</label>
                        </div>

                        <button type='submit' className='btn btn-success'>Login</button>
                    </form>
                </div>
                <div className='col-sm-4'></div>
            </div>
        </>

    )
}

export default Login
