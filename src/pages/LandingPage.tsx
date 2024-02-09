import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { signIn } from '@junobuild/core';
function LandingPage() {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to Uzima Journal
              <strong className="font-extrabold text-red-700 sm:block">
                Keep Journaling
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              A simple health journaling app, to help you keep track of your
              health and wellness anyday anytime.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => signIn()}
                className="block w-full rounded bg-black px-12 py-3 text-sm font-bold text-white shadow hover:bg-white hover:text-black border-[1px] border-black ease-in duration-150 sm:w-auto"
              >
                Get Started
              </button>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-black shadow hover:text-black/50 focus:outline-none sm:w-auto"
                href="https://github.com/divin3circle"
              >
                <div className="flex gap-2 items-center justify-center">
                  <FaGithub size={21} />
                  <h1>Github</h1>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
