import React from 'react';
import { User } from '@junobuild/core';

type Props = {
  user: User | null | undefined;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

function HomeHeader({ user, showModal, setShowModal }: Props) {
  //   console.log(user);
  return (
    <div>
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back,{' '}
                <span
                  className="text-rose-500 font-bold cursor-pointer"
                  onClick={() => alert(`Owner: ${user?.owner}`)}
                >
                  {user?.owner?.substring(0, 7)}...
                </span>
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Let's get back to journaling 🧑‍⚕️.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <a className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 shadow-md">
                <span className="text-sm font-medium"> Github </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              <button
                className="block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-white border-[1px] border-black hover:text-black ease-in duration-150 shadow-md"
                onClick={() => setShowModal(true)}
              >
                Create New Journal
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HomeHeader;
