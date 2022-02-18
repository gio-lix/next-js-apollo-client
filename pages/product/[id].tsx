import {FC, useContext, useEffect, useState} from "react"
import Layout from "../../components/Layout";
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS_BY_ID} from "../../lib/queries";
import {useRouter} from "next/router";
import {createStore} from "../../context/storeProvider";
import {NextPage} from "next";
import {addOrderList, takeDefaultPrice} from "../../helper";
import {sanitize} from "../../helper/sanitaize";
import {DefaultSizeType, IdNameType} from "../../type";

const ProductDetails: NextPage = () => {
    const {query} = useRouter()
    const {dispatch} = useContext(createStore);
    const {data, error, loading} = useQuery(GET_PRODUCTS_BY_ID, {variables: {"productId": query.id}})
    const [imageGallery, setImageGallery] = useState<number>(0);
    const [isMounted, setMount] = useState(false);
    const [takeSize, setTakeSize] = useState<any>([]);
    const initial = data?.product?.attributes.map((e: DefaultSizeType) => ({name: e?.name, id: e?.items[0].value}))



    useEffect(() => {
        setMount(true);
    }, []);
    useEffect(() => {
        setTakeSize(initial)
    }, [data]);



    const handler = (name: string, id: string) => {
        const find = takeSize?.find((e: IdNameType) => e.name === name)
        if (find) {
            const update = takeSize?.map((el: any) => {
                if (el.name === name) {
                    el.name = name
                    el.id = id
                }
                return el
            })
            setTakeSize(update)
            return
        }
        setTakeSize((searches: IdNameType[]) => searches?.concat({name: name, id: id}))
    }

    const takePrice: any = takeDefaultPrice(data?.product?.prices)

    // select  product for add to the order cart
    const orderCart = addOrderList(data?.product, takeSize, takePrice)


    const handleClickCart = () => {
        if (!data?.product?.inStock) return
        dispatch({type: 'ADD_ORDER', payload: orderCart })
    }


    return (
        <Layout title={data?.product?.brand}>
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

            <div className='flex items-start mt-[80px]  '>
                <div className='flex  '>
                    <section className='flex flex-col '>
                        {data?.product?.gallery?.map((item: string, i: number) => (
                            <button onClick={() => setImageGallery(i)} key={i}
                                    className='w-[79px] min-h-[80px] mb-[32px] '>
                                <img src={item} alt="img"/>
                            </button>
                        ))}
                    </section>
                    <div className='relative w-[610px]  ml-[40px]  '>
                        <img src={data?.product?.gallery[imageGallery]} alt="img"/>
                        {data?.product?.inStock === false && (
                            <span
                                className='absolute top-0 bg-gray-200 bg-opacity-20 absolute  h-full w-full flex items-center justify-center '>
                             <p className='uppercase font-raleway font-normal text-2xl text-[#8D8F9A]'>out of stock</p>
                            </span>
                        )}
                    </div>
                </div>
                <div className='h-full ml-[100px] '>
                    <div className='font-raleway'>
                        <h5 className='font-semibold text-3xl'>{data?.product?.brand}</h5>
                        <h4 className='font-normal text-3xl mt-4'>{data?.product?.name}</h4>
                        <div className='mt-[43px] '>
                            <div className='flex flex-col items-start '>
                                {data?.product?.attributes?.map((el: DefaultSizeType, i: number) => {
                                    return (
                                        <div key={i}>
                                            <p className='uppercase font-roboto_condensed font-bold mt-[40px] mb-[8px]'>{el.name && `${el.name}:`}</p>
                                            <div className='flex '>
                                                {el.items?.map((e: any, i: number) => {
                                                    const index = takeSize?.findIndex((element: any) => element.name === el.name && (element.id === e.id || element.id === e.value));

                                                    if (el.name === 'Color') {
                                                        return (
                                                            <button onClick={() => handler(el.name, e?.id)} key={i}
                                                                    style={{backgroundColor: e.value}}
                                                                    className={`${(index >= 0) && 'scale-125'}   w-[63px] h-[45px] mr-[12px] flex justify-center items-center border border-bor_gray`}>
                                                            </button>
                                                        )
                                                    }
                                                    return (
                                                        <button onClick={() => handler(el.name, e?.id)} key={i}
                                                                className={`${(index >= 0) && 'bg-black text-white'} w-[63px] h-[45px] mr-[12px] flex justify-center items-center border border-bor_gray`}>
                                                                <span className='font-source_sans_pro text-base'>
                                                                    {e?.value}
                                                                </span>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <h4 className='font-roboto_condensed font-bold text-lg	mt-10'>price</h4>
                            <span
                                className='font-bold font-raleway text-2xl mt-2.5'>${data?.product?.prices[0]?.amount} </span>
                        </div>
                        <button onClick={handleClickCart} className='w-[292px] h-[52px] bg-green mt-5'>
                            <p className='uppercase font-raleway font-semibold	text-base text-white '>add to cart</p>
                        </button>
                        {isMounted ? (
                                <article className='prose prose-neutral'>
                                    <div dangerouslySetInnerHTML={{ __html: sanitize( data?.product?.description ?? '' ) }}/>
                                </article>
                        ) : null}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ProductDetails