import { type AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { MyAppProps } from '../utils/types';
import { Layouts } from '../layouts/Layouts';
import { api } from '../utils/api';

import '../styles/globals.css';
import { NextPage } from 'next';
import PanelLayout from '../layouts/PanelLayout';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) => {
  const Layout = Layouts[Component.Layout] ?? ((page: NextPage) => page);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
