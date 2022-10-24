import { SearchAction } from "../actions/SearchAction";
import { SearchType } from "../types/SearchType";

export const SearchReducer = (state: string='', action: SearchAction)=>{

    switch(action.type)
    {
        case SearchType.SEARCH_CHANGE:
            return action.payload

        default:
            return state

    }

}