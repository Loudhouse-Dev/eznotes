import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { type NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { NoteEditor } from '../components/NoteEditor';
import { NoteCard } from '../components/NoteCard';

import { api, type RouterOutputs } from "../utils/api";



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

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const { data: subjects, refetch: refetchSubjects } = api.subject.getAll.useQuery(
    undefined,
     {
        enabled: sessionData?.user !== undefined,
        onSuccess: (data) => {
          setSelectedSubject(selectedSubject ?? data[0] ?? null);
        }
     }
  );  

  const createSubject = api.subject.create.useMutation({
    onSuccess: () => {
      void refetchSubjects();
    },
  });

  //object containing data for the notes
  //We fetch the notes only if the user is logged in and a subject is selected
  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    { 
      subjectId: selectedSubject?.id ?? "",
  },
  {
    enabled: sessionData?.user !== undefined && selectedSubject !== null,
  }
  );

  //Use the useMutation hook to create a new note and refetch the notes
  //we need void here because refetchNotes returns a promise and we aren't awaiting it
  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
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
                setSelectedSubject(subject);
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
      <div className="col-span-3">
        <div className="note-container">
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              <NoteCard
                note={note}
                onDelete={() => void deleteNote.mutate({ id: note.id })}
              />
            </div>
            ))}
          </div>
        <NoteEditor 
          onSave={({ title, content }) => {
            void createNote.mutate({
              title,
              content,
              subjectId: selectedSubject?.id ?? "", 
          });
        }}
        />
      </div>
    </div>
  )
};
