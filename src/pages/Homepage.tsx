import React from 'react';
import HomeHeader from '../components/ui/HomeHeader';
import PastJournals from '../components/ui/PastJournals';
import { User } from '@junobuild/core';
import { useState } from 'react';
import Loading from '../components/utils/Loading';
import JournalModal from '../components/utils/JournalModal';
import { signOut } from '@junobuild/core';

type Props = {
  user: User | null | undefined;
};

function Homepage({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {showModal ? (
        <JournalModal
          showModal={showModal}
          setShowModal={setShowModal}
          user={user}
        />
      ) : null}
      <HomeHeader
        user={user}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="flex justify-center items-center mx-4 mt-12">
        <PastJournals user={user} />
      </div>
      <div className="flex items-center justify-center mt-12">
        <button
          className="block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-white border-[1px] border-black hover:text-black ease-in duration-150 shadow-md"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Homepage;
