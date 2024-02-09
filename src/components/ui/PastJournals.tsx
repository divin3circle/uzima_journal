import React from 'react';
import JournalCard from '../utils/JournalCard';
import { User } from '@junobuild/core';
import { Journal } from '../../declarations/backend/backend.did';
import { useState, useEffect } from 'react';
import { backend } from '../../declarations/backend';

type Props = {
  user: User | null | undefined;
};

function PastJournals({ user }: Props) {
  const [userKey, setUserKey] = useState<string>('');
  const [journals, setJournals] = useState<Journal[]>([
    {
      id: BigInt(0),
      title: 'Markup',
      body: 'Markup for the first journal',
      time: '2022-01-01 8AM',
    },
    {
      id: BigInt(1),
      title: 'My first journal',
      body: 'This is my first journal',
      time: '2022-01-01',
    },
  ]);
  const [fetchedJournals, setFetchedJournals] = useState([]);
  useEffect(() => {
    if (user !== undefined && user !== null) {
      setUserKey(user.key.substring(0, 7));
    }
  }, [user]);

  //Fetch journals from the current user
  const fetchUser = async () => {
    if (userKey) {
      const backendUser = await backend.getUser(userKey);
      setFetchedJournals(backendUser[0].journals);
      // console.log(backendUser);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userKey]);

  // console.log(fetchedJournals);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {fetchedJournals?.length > 0 ? (
        fetchedJournals.map((journal, index) => (
          <div key={index} className="m-4 p-2">
            <JournalCard
              title={journal.title}
              body={journal.body}
              time={journal.time}
              id={journal.id}
            />
          </div>
        ))
      ) : (
        <p className="text-2xl font-bold flex items-center justify-center text-center">
          Oh-oh🫣No Journals found. Create some🆕
        </p>
      )}
    </div>
  );
}

export default PastJournals;
