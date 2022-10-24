import { Order } from "../../models/IOrders"
import { OrderType } from "../types/OrderType"

export interface OrderAction {
    type: OrderType
    payload: Order[]

}