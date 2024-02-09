import { useEffect, useState } from 'react';
import { backend } from './declarations/backend';
import LandingPage from './pages/LandingPage';
import { initJuno, authSubscribe, User, Unsubscribe } from '@junobuild/core';
import Homepage from './pages/Homepage';
import Loading from './components/utils/Loading';
import { Toaster } from 'react-hot-toast';

function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await initJuno({
        satelliteId: 't7krz-bqaaa-aaaal-adr4a-cai',
      });
    })();
    const sub: Unsubscribe = authSubscribe((user: User | null): void =>
      setUser(user),
    );
    const createUser = async () => {
      if (user !== undefined && user !== null) {
        const currUser = await backend.getUser(user.key.substring(0, 7));
        if (currUser.length === 0) {
          const tempUser = await backend.createUser(
            user.key.substring(0, 7),
            user.key.substring(0, 7),
          );
          console.log(tempUser);
        }
      }
    };
    createUser();
    setLoading(false);
  }, [user]);
  // console.log(user);

  // Create a user
  // const fetchCount = async () => {
  //   try {
  //     setLoading(true);
  //     const count = await backend.get();
  //     setCount(+count.toString()); // Convert BigInt to number
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const increment = async () => {
  //   if (loading) return; // Cancel if waiting for a new count
  //   try {
  //     setLoading(true);
  //     await backend.inc(); // Increment the count by 1
  //     await fetchCount(); // Fetch the new count
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Fetch the count on page load
  // useEffect(() => {
  //   fetchCount();
  // }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div>{user !== null ? <Homepage user={user} /> : <LandingPage />}</div>
      <Toaster />
    </div>
  );
}

export default App;
