import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import PanelLayout from '../layouts/PanelLayout';
import { MyPage } from '../utils/types';

const Login: MyPage = () => {
  const [show, setShow] = useState(false);
  const { data: sessionData } = useSession();

  //Google Handler
  async function handleGoogleLogin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }

  return (
    <PanelLayout>
      <Head>
        <title>Login</title>
      </Head>
      <h1>Login to Your Account</h1>
    </PanelLayout>
  );
};
export default Login;
Login.Layout = 'Panel';
