import { Bilgiler } from "./models/IUser";
import * as CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : '12345'
export const encrypt =( plainText : string )=>
{
    const cipherText = CryptoJS.AES.encrypt(plainText,secretKey).toString()
    return cipherText
}

export const decrypt = (cipherText:string )=> {
    const bytes = CryptoJS.AES.decrypt(cipherText,secretKey)
    const plaintext = bytes.toString(CryptoJS.enc.Utf8)
    return plaintext
}


export const userLoginControl= ()=>{
    
    const localString = localStorage.getItem('user')
    if ( localString ) {
        sessionStorage.setItem('user', localString)
    }

    const stBilgiler = sessionStorage.getItem('user')
    if(stBilgiler)
    {
        try {
            const bilgiler = JSON.parse(stBilgiler) as Bilgiler
            return bilgiler
        } catch (error) {
            sessionStorage.removeItem('user')
            return null
        }
    }
    else{
        return null;
    }
}