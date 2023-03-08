import Image from 'next/image';
import { signIn } from 'next-auth/react';

const GoogleButton = () => {
  // Google Handler function
  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }

  <div className="input-button">
    <button
      type="button"
      onClick={() =>
        void signIn('google', { callbackUrl: 'http://localhost:3000' })
      }
      className="hover:bg-gray flex w-full justify-center gap-2 border py-3"
    >
      Sign In with Google{' '}
      <Image
        src={'/public/google.svg'}
        alt="Google Sign In Button"
        width="20"
        height={20}
      ></Image>
    </button>
  </div>;
};
