
import {DataType, DefaultSizeType, PriceType} from "../type";

export const takeDefaultPrice = (data: PriceType[]) => {
    return data?.filter((e: PriceType) => e.currency.label.toUpperCase().includes("USD"))
        .map((el: any) => (el.amount))
}

export const totalPrice = (data:DataType[] ) => {
   return  data?.reduce((acc: any, a:DataType) => {
        return acc += a.price * a.qty
    },0).toFixed(2)
}

export const addOrderList = (data: DataType, initialValue: DefaultSizeType, price: number) =>{
    const orderCart = {
        id: data?.id,
        brand: data?.brand,
        name: data?.name,
        allDefaultSizes: initialValue,
        defaultItems: data?.attributes,
        image: data?.gallery,
        price: price
    }
    return orderCart
}