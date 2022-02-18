export type IdNameType = {
    id?: string,
    name?: string
}
export type ItemsType = {
    displayValue?: string
    id?: string
    value?: string
}
export type DefaultSizeType = {
    items?: ItemsType[]
    type?: string
} & IdNameType

export type PriceType = {
    amount: number
    currency?: {
        label?: string
        symbol?: string
    }
}

export type DataType = {
    brand?: string
    description?: string
    gallery?: string[] | string | any,
    attributes?: DefaultSizeType[]
    price?: number
    qty?: number
    inStock?: boolean
    prices?: PriceType[]
} & IdNameType

export type CartType = {
    allDefaultSizes: IdNameType[]
    defaultItems: DefaultSizeType[]
    image: string[]
    brand: string
    price: number
    qty: number
} & IdNameType

