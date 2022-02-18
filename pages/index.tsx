import type {NextPage} from 'next'
import Layout from "../components/Layout";
import {useQuery} from "@apollo/client";

const Home: NextPage = () => {
    return (
        <Layout>
            <div className='h-screen'>
                <h1>Hello</h1>
            </div>
        </Layout>
    )
}
export default Home
