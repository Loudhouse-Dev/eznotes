import { NextComponentType, NextPage, NextPageContext } from 'next';
import { LayoutKeys } from '../layouts/Layouts';
import { AppProps } from 'next/app';
import { type Session } from 'next-auth';

export type MyPage<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys;
};

export type MyAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
    session: Session;
  };
};

export type Errors = {
  email?: string;
  password?: string;
  username?: string;
  message?: string;
  cpassword?: string;
};
