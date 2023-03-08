import { type NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const Home: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>EZ Notes</title>
        <meta
          name="description"
          content="A simple app for takin notes in Markdown"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <LoginForm />
      </main>
    </>
  );
};

export default Home;
