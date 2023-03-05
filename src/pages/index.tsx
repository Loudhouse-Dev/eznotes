import { type NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';


import { api } from '../utils/api';

const Home: NextPage = () => {
    
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="A simple app for takin notes in Markdown" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
              <Header />
            </main>
        </>
    );
};

export default Home;
