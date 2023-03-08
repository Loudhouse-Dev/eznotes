import Image from 'next/image';
import { signIn } from 'next-auth/react';

const GithubButton = () => {
  // Github Handler function
  async function handleGithubSignin() {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
  }

  <div className="input-button">
    <button
      type="button"
      onClick={handleGithubSignin}
      className="hover:bg-gray flex w-full justify-center gap-2 border py-3"
    >
      Sign In with Google{' '}
      <Image
        src={'/public/github.svg'}
        alt="Github Sign In Button"
        width="20"
        height={20}
      ></Image>
    </button>
  </div>;
};
