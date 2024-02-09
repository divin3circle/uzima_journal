import React from 'react';
import { useState } from 'react';
import Loading from './Loading';
import { backend } from '../../declarations/backend';
import { User } from '@junobuild/core';
import { Journal } from '../../declarations/backend/backend.did';
import toast from 'react-hot-toast';

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  user: User | null | undefined;
};
function JournalModal({ showModal, setShowModal, user }: Props) {
  const userKey = user?.key.substring(0, 7);
  const [journal, setJournal] = useState({
    id: BigInt(0),
    title: '',
    body: '',
    time: '',
  });
  const [journalTitle, setJournalTitle] = useState('');
  const [journalTime, setJournalTime] = useState('');
  const [journalId, setJournalId] = useState(0);
  const [journalMessage, setJournalMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSavedJournal = async () => {
    if (
      journalTitle.length > 1 &&
      journalTime.length > 1 &&
      journalMessage.length > 5 &&
      userKey !== undefined
    ) {
      try {
        // console.log('Saving Journal');
        setLoading(true);
        const userJournal: Journal = {
          id: BigInt(journalId),
          title: journalTitle,
          body: journalMessage,
          time: journalTime,
        };
        await backend.createJournal(
          userKey,
          BigInt(journalId),
          journalTitle,
          journalMessage,
          journalTime,
        );
        // console.log(userJournal);
        toast.success(
          'Journal saved successfully. Relod page to see changes♻️',
        );
        // console.log('Journal saved successfully');
        setLoading(false);
      } catch (error) {
        // console.log(error);
        toast.error('Error saving journal');
      }
    }
    setShowModal(false);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Create a <span className="text-rose-600">Journal</span>
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}

              <div className="rounded-lg bg-white p-8 lg:col-span-3 lg:p-12">
                <div className="space-y-4">
                  <div className="border-[1px] border-black rounded-md">
                    <label className="sr-only" htmlFor="title">
                      Title
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm focus:outline-none"
                      onChange={(e) => setJournalTitle(e.target.value)}
                      placeholder="Title of Journal"
                      type="text"
                      id="title"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="border-[1px] border-black rounded-md">
                      <label className="sr-only" htmlFor="time">
                        Time
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm focus:outline-none"
                        onChange={(e) => setJournalTime(e.target.value)}
                        placeholder="Journal Time"
                        type="text"
                        id="time"
                      />
                    </div>

                    <div className="border-[1px] border-black rounded-md">
                      <label className="sr-only" htmlFor="journal-id">
                        Journal ID
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm focus:outline-none"
                        onChange={(e) => setJournalId(Number(e.target.value))}
                        placeholder="Journal ID"
                        type="number"
                        id="journal-id"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="Morning"
                        className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                        tabIndex={0}
                      >
                        <input
                          className="sr-only"
                          id="Morning"
                          type="radio"
                          tabIndex={-1}
                          name="option"
                        />

                        <span className="text-sm">Morning</span>
                      </label>
                    </div>

                    <div>
                      <label
                        htmlFor="Afternoon"
                        className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                        tabIndex={0}
                      >
                        <input
                          className="sr-only"
                          id="Afternoon"
                          type="radio"
                          tabIndex={-1}
                          name="option"
                        />

                        <span className="text-sm">Afternoon</span>
                      </label>
                    </div>

                    <div>
                      <label
                        htmlFor="Evening"
                        className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                        tabIndex={0}
                      >
                        <input
                          className="sr-only"
                          id="Evening"
                          type="radio"
                          tabIndex={-1}
                          name="option"
                        />

                        <span className="text-sm">Evening</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-[1px] border-black rounded-md">
                    <label className="sr-only" htmlFor="message">
                      Message
                    </label>

                    <textarea
                      className="w-full rounded-lg border-gray-200 p-3 text-sm focus:outline-none"
                      onChange={(e) => setJournalMessage(e.target.value)}
                      placeholder="Message"
                      rows={8}
                      id="message"
                    ></textarea>
                  </div>

                  <div className="mt-4"></div>
                </div>
              </div>

              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 cursor-pointer background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-rose-500 cursor-pointer text-white active:bg-rose-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSavedJournal}
                >
                  Publish Journal
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
}

export default JournalModal;
