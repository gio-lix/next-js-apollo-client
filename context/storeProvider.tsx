import {createContext, useReducer} from "react";
import {Reducers} from "./reducers/reducers";



export const createStore = createContext<any | null>(null)

const initialState: {cart: {}[], currency: string[]} = {
    currency: null,
    cart: []
}

const CreateStoreProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(Reducers, initialState);

    return (
        <createStore.Provider value={{dispatch, state}}>
                {children}
        </createStore.Provider>
    )
}
export default CreateStoreProvider


