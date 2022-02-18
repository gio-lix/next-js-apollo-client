import {NextPage} from "next";
import Layout from "../../components/Layout";
import {useQuery} from "@apollo/client";
import {GET_CATEGORIES_BY_SLUG} from "../../lib/queries";
import {useRouter} from "next/router";
import shoppingSvgCart from '../../public/shopcart.svg'
import Image from "next/image";
import {useContext} from "react";
import {createStore} from "../../context/storeProvider";
import {addOrderList, takeDefaultPrice} from "../../helper";
import {PriceType} from "../../type";

const CategoriesPage: NextPage = () => {
    const router = useRouter()
    const {data, loading, error} = useQuery(GET_CATEGORIES_BY_SLUG, {variables: {"input": {title: router.query.slug}}})
    const {state, dispatch} = useContext(createStore);




    const handleClickAddProduct = (items:any) => {
        if (!items?.inStock)   return

        const initial = items?.attributes?.map((e: any) => ({name: e?.name, id: e?.items[0].value}))

        const price = takeDefaultPrice(items?.prices)

        const orderCart = addOrderList(items, initial, Number(price))

        dispatch({type: 'ADD_ORDER', payload: orderCart})
    }



    return (
        <Layout >
            {error && (
                <div className='flex justify-center items-center '>
                    <h4 className='text-red-600 font-bold text-3xl'>Error</h4>
                </div>
            )}
            {loading && (
                <div className='h-screen flex items-center justify-center'>
                    <h1>Loading...</h1>
                </div>
            )}
            <h1 className='font-raleway font-normal	text-4xl my-[80px]'>{router.query.slug}</h1>
            <section className='grid grid-cols-3 gap-4 place-items-stretch  '>
                {data?.category?.products?.map((items: any) => {

                    const newCurrency = items?.prices?.filter((e: PriceType) => e.currency.symbol === (state.currency || '$'))
                    return (
                        <main key={items.id}  className='relative h-[444px] p-[16px] group  col-span-1 hover:shadow-xl '>
                            <div className='flex flex-col justify-between   h-full w-full'>
                             <span className={` w-full flex justify-center `}>
                                <img src={items.gallery[0]} className={` h-[330px]`} alt="img"  />
                                 {items.inStock === false && (
                                     <span className=' bg-gray-200 bg-opacity-20 absolute  h-[330px] w-full flex items-center justify-center '>
                                         <p className='uppercase font-raleway font-normal text-2xl text-[#8D8F9A]'>out of stock</p>
                                      </span>
                                 )}
                             </span>
                                <button onClick={() => handleClickAddProduct(items)} className='absolute right-[31px] bottom-[72px] hidden group-hover:inline-flex '>
                                    <Image src={shoppingSvgCart?.src} width={52} height={52} className='' alt="img"/>
                                </button>
                                <div>
                                    <button onClick={() => router.push(`/product/${items.id}`)}  className={`${items.inStock === false && 'text-inStock-text'} font-raleway font-light text-lg`}>{items.name} </button>
                                </div>
                                <div className='flex font-raleway'>
                                    <h3 className={`${items.inStock === false && 'text-inStock-text'} font-medium text-lg`}>{newCurrency[0]?.currency?.symbol}</h3>
                                    <p className={`${items.inStock === false && 'text-inStock-text'} font-medium text-lg`}>{newCurrency[0]?.amount}</p>
                                </div>
                            </div>

                        </main>
                    )
                })}
            </section>
        </Layout>
    )
}
export default CategoriesPage
