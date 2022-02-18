export const Reducers = (state:any, action: any) => {
    switch (action.type) {
        case "ADD_ORDER":
            const product = action.payload
            const exist = state.cart.find((x: any) => x.id === product.id)
            if (!exist) {
                const oldProduct = action.payload
                return {...state, cart: [...state.cart, {...oldProduct, qty: 1}]}
            }
            if (exist) {
                return {
                    ...state, cart: state.cart.map((e: any) => e.id === product.id ? {...product, qty: e.qty + 1} : e)
                }
            }
            return
        case "DELETE_ITEM":
            console.log('action.payload',action.payload)
            const newCart = state.cart.filter((e: any) => e.id !== action.payload)

            return {
                ...state, cart: newCart
            }
        case "CURRENCY_TYPE":
            return {
                ...state, currency:  state.currency = action.payload
            }
        case "MINUS_CART":
            return {
                ...state, cart: state.cart.map((e: any) => e.id === action.payload.id ? {...action.payload, qty: e.qty - 1} : e)
            }
        case "CART_UPDATE_VALUE":
            const {id, name, value} = action.payload
            const updateValue = state.cart?.map((e: any) => {
                if (e.id === id) {
                    e.allDefaultSizes.map((el: any) => {
                        if (el.name === name) {
                            el.name = name
                            el.id = value
                        }
                        return el
                    })
                }
                return e
            })
            return {
                ...state, cart: updateValue
            }
        default:
            return state
    }
}