import { Order } from "../../models/IOrders";
import { OrderAction } from "../actions/OrderAction";
import { OrderType } from "../types/OrderType";

export const OrderReducer = (state: Order[]=[], action: OrderAction)=>
{
    switch(action.type)
    {
        case OrderType.ORDER_ADD:
            return action.payload
        
        case OrderType.ORDER_LIST:
            return action.payload
        
        default: 
            return state
    }

}