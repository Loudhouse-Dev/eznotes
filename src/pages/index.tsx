import { type NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';


import { api, type RouterOutputs } from "../utils/api";
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
    
    return (
        <>
            <Head>
                <title>EZ Notes</title>
                <meta name="description" content="A simple app for takin notes in Markdown" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
              <Header />
              <Content />
            </main>
        </>
    );
};

export default Home;

type Subject = RouterOutputs["subject"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: subjects, refetch: refetchSubjects } = api.subject.getAll.useQuery(
    undefined,
     {
        enabled: sessionData?.user !== undefined,
     }
  );  

  const createSubject = api.subject.create.useMutation({
    onSuccess: () => {
      void refetchSubjects();
    }
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {subjects?.map((subject) => (
            <li key={subject.id}>
              <a href="#" 
              onClick={(evt) => {
                evt.preventDefault();
              }}
            >
              {subject.title}
            </a>
          </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="New Subject"
          className="input-bordered input input-med w-full"
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              createSubject.mutate({
                title: e.currentTarget.value,
              });
            }
          }}
          />
      </div>
      <div className="col-span-3"></div>
    </div>
  )
};
