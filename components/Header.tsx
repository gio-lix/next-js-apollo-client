import {useCallback, useContext, useEffect, useRef, useState} from "react"
import Link from 'next/link'
import Image from "next/image";
import usa from '../public/usa.svg'
import vector from '../public/vector.svg'
import shopIcon from '../public/shop.svg'
import logo from '../public/Group_logo.svg'
import {useQuery} from "@apollo/client";
import {GET_CATEGORIES, GET_CURRENCY} from "../lib/queries";
import {useRouter} from "next/router";
import {createStore} from "../context/storeProvider";
import Cart from "./Cart";
import {totalPrice} from "../helper";



const Header = () => {
    const {query} = useRouter()
    const router = useRouter()
    const [currency, setCurrency] = useState<boolean>(false);
    const [openCart, setOpenCart] = useState<boolean>(false);
    const currencyBox = useRef<HTMLDivElement>(null);
    const {state, dispatch} = useContext(createStore);

    const cartPath = router.pathname === '/order'

    const {data,loading,error} = useQuery(GET_CATEGORIES)
    const {data: currencyData,loading: isLoading,error: isError} = useQuery(GET_CURRENCY)

    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
    }, [])
    const unlockScroll = useCallback(() => {
        document.body.style.overflow = '';
    }, [])

    const handleCurrencyClick = (item: string) => {
        dispatch({type: 'CURRENCY_TYPE', payload: item})
        setCurrency(false)
    }


    useEffect(() => {
        window.addEventListener('click', handleClickCurrency)
        return () => window.removeEventListener('click', handleClickCurrency)
    })
    const handleClickCurrency = (e: any): void => {
        if (!e.path.includes(currencyBox.current)) {
            setCurrency(false)
            setOpenCart(false)
        }
    }
    useEffect(() => {
        if (openCart && !cartPath) {
            lockScroll()
        } else {
            unlockScroll()
        }
    }, [openCart]);


    const handleCurrencyOpen = () => {
        setCurrency(!currency)
        setOpenCart(false)
    }
    const handleCartOpen = () => {
        setOpenCart(!openCart)
        setCurrency(false)
    }
    return (
        <header className='relative h-[80px]  flex  items-center'>
            {(loading || isLoading) && (
                <div className='h-screen flex items-center justify-center'>
                    <h1>Loading...</h1>
                </div>
            )}
            { error || isError && (
                <div className='flex justify-center items-center '>
                    <h4 className='text-red-600 font-bold text-3xl'>Error</h4>
                </div>
            )}
            <div className='absolute z-10 w-full flex items-center  justify-between'>
                <nav className='flex items-center h-[78px]'>
                    <ul className='flex items-center font-semibold font-raleway text-base uppercase  h-full'>
                        {!loading && data?.categories?.map((item: {name: string} , i: number)=> (
                            <li key={i} className='relative h-full flex items-center px-4'>
                                <Link href={`/category/${item.name}`} >
                                    <a className={`${query.slug === item.name && 'text-green'}`}>{item.name}</a>
                                </Link>
                                <span className={`${query.slug === item.name && 'bg-green'} absolute bottom-0 left-0 h-[2px] w-full `}> </span>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div ref={currencyBox} className=' flex items-center '>
                    {/* open currency box */}
                    <span onClick={handleCurrencyOpen} className='flex items-center cursor-pointer'>
                        <img src={usa.src} alt="dollar" className='	 font-raleway  text-lg'/>
                        <img src={vector.src} alt="vector" className={` w-2 ml-[10px] mt-2 ${currency && 'rotate-180'} `}/>
                    </span>
                    {/* open cart box */}
                    <button onClick={handleCartOpen} className='relative w-[25px] h-[25px] ml-[22px]'>
                        <Image src={shopIcon.src} width={20} height={25} alt="vector" className=''/>
                        {state?.cart?.length > 0 && (
                            <div className='absolute -top-2 -right-2 w-[20px] h-[20px] rounded-full bg-black text-white '><p className='text-roboto font-bold -translate-y-[3.0px] '>{state?.cart?.length}</p></div>
                        )}
                    </button>
                    <div>
                        {/* currency box */}
                        {currency && (
                            <section className='absolute -right-5 top-14 w-[114px] h-auto shadow-xl bg-white'>
                                {!isLoading && currencyData?.currencies?.map((el: {symbol: string,label: string}) => (
                                    <span onClick={() => handleCurrencyClick(el.symbol)} className='flex  flex-cols items-center justify-center px-5 my-[21px] text-currency_text cursor-pointer' key={el.symbol}>
                                        <p className='font-raleway font-semibold text-lg'>{el.label}</p>
                                    </span>
                                ))}
                            </section>
                        )}
                        {/* cart box */}
                        {(openCart && !cartPath) && (
                            <div className={`relative top-0 left-0 z-20  w-full h-full flex justify-center items-center `}>
                                {/* overlay */}
                                <span onClick={() => setOpenCart(false)}
                                     className='fixed bg-black bg-opacity-20 top-[80px] left-0 bottom-0 z-30 w-full h-full'>
                                </span>

                                {/* cart  */}
                                <div
                                    className='absolute z-40 -right-5 top-[38px] w-80 h-[540px]  px-4 pb-5 pt-2 flex flex-col justify-between  bg-white'>
                                    <section className='flex space-x-1 leading-relaxed'>
                                        <h4 className='font-bold font-raleway  '>My Bag,</h4>
                                        {state?.cart.length > 0 && <p>{state?.cart.length} items</p>}

                                    </section>
                                    <div className=' h-full w-full overflow-y-auto scrollbar-hide '>
                                        <Cart />
                                    </div>
                                    <section className='h-[168px] '>
                                        <span  className='flex justify-between  font-bold font-raleway text-base leading-relaxed pb-9'>
                                            <h4>Total</h4>
                                            <p>${totalPrice(state?.cart)}</p>
                                        </span>
                                       <span className='flex justify-between 	'>
                                           <button onClick={() => router.push('/order')} className='w-[140px] h-[43px] border border-black uppercase font-semibold font-raleway text-sm'> view bag </button>
                                           <button className='w-[140px] h-[43px]  bg-green text-white uppercase font-semibold font-raleway text-sm'> check out </button>
                                       </span>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='absolute w-full flex items-center justify-center'>
                <Image src={logo.src} width={32} height={30} alt='logo' />
            </div>
        </header>
    )
}
export default Header