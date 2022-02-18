import {FC} from "react"
import Head from 'next/head'
import Header from "./Header";

interface ILayout {
    title?: string
    keywords?: string
    description?: string
}

const Layout: FC<ILayout> = ({title, keywords, description, children}) => {

    return (
        <div  className='max-w-[1440px] max-h-[1513px] mx-auto px-28'>
            <Head>
                <title>{title}</title>
                <meta name='keywords' content={keywords}/>
                <meta name='description' content={description}/>
            </Head>
            <Header  />
            <div>
                {children}
            </div>
        </div>
    )
}
export default Layout
Layout.defaultProps = {
    title: 'Scandiweb',
    keywords: 'Scandiweb',
    description: 'Scandiweb Is Awesome.'
}