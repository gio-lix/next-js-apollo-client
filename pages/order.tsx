import {FC} from "react"
import {NextPage} from "next";
import Cart from "../components/Cart";
import Layout from "../components/Layout";


const Order: NextPage = () => {
  return (
     <Layout>
         <div className='mt-20'>
             <h5 className='font-raleway font-bold text-4xl'>Cart</h5>
             <div className='mt-[59px]'>
                 <Cart />
             </div>
         </div>
     </Layout>
  )
}
export default Order