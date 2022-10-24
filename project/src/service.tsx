import axios from "axios";
import { IOrders } from "./models/IOrders";
import { IProduct } from "./models/IProduct";
import { IUser } from "./models/IUser";
import { userLoginControl } from "./util";

let baseURL= 'https://www.jsonbulut.com/json/'
let ref = 'd1becef32825e5c8b0fc1b096230400b'

baseURL= process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : baseURL
ref = process.env.REACT_APP_REF ? process.env.REACT_APP_REF : ref 

const config= axios.create({
    baseURL: baseURL,
    timeout:15000,
    params: {ref : ref }
    //headers: {'Authorization' : 'Bearer' + jwt}    
})

//user Login
export const userLogin = (email:string , password :string )=>
{
 const sendParams = { 
    userEmail: email,
    userPass : password,
    face: 'no'
 }   
 return config.get<IUser>('userLogin.php', {params : sendParams})
}

//all product
export const allProduct = ()=>{
    const sendParams = {
        start : 0
    }
    return config.get<IProduct>('product.php',{params:sendParams})
}

//addBasket
export const addBasket =(productId:string) =>
{
    const user = userLoginControl()
    if(user){
        const sendParams = {
            customerId : user.faceID,
            productId : productId,
            html :productId
        }
        return config.get('order.php', {params: sendParams})
    }
    return null
}

//orders
//https://www.jsonbulut.com/json/orderList.php?ref=d1becef32825e5c8b0fc1b096230400b&musterilerID=3056
export const order = () =>{
    const user = userLoginControl()
    if(user){
        const sendParams ={
            MusterilerID:user.userId
        }
        return config.get<IOrders>('order.php',{params: sendParams})
    
    }
    return null

}