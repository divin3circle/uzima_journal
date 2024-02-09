import {
  $query,
  $update,
  nat,
  Record,
  text,
  Vec,
  StableBTreeMap,
  Opt,
  Variant,
} from 'azle';

type Journal = Record<{
  id: nat;
  title: text;
  body: text;
  time: text;
}>;

type User = Record<{
  id: text;
  username: text;
  totalJournals: nat;
  journals: Vec<Journal>;
}>;

type Error = Variant<{
  UserDoesNotExist: text;
}>;

const users = new StableBTreeMap<text, User>(0, 44, 1024);

$update;
export function createUser(id: text, username: text): User {
  const user = {
    id,
    username,
    totalJournals: BigInt(0),
    journals: [],
  };
  users.insert(id, user);
  return user;
}

$query;
export function getUsers(): Vec<User> {
  return users.values();
}

$query;
export function getUser(id: text): Opt<User> {
  return users.get(id);
}

$update;
export function createJournal(
  userId: text,
  journalId: nat,
  title: text,
  body: text,
  time: text,
): Opt<Journal> {
  const errJournal = {
    id: BigInt(0),
    title: '',
    body: '',
    time: '',
  };

  const userOpt = users.get(userId);
  if ('None' in userOpt) {
    return { Some: errJournal };
  }

  const user = userOpt.Some;
  const journal: Journal = {
    id: journalId,
    title,
    body,
    time,
  };
  const updatedUser: User = {
    ...user,
    totalJournals: user.totalJournals + BigInt(1),
    journals: [...user.journals, journal],
  };

  users.insert(userId, updatedUser);

  return { Some: journal };
}

$update;
export function deleteJournal(userId: text, journalId: nat): Opt<Journal> {
  const errJournal = {
    id: BigInt(0),
    title: '',
    body: '',
    time: '',
  };

  const userOpt = users.get(userId);
  if ('None' in userOpt) {
    return { Some: errJournal };
  }

  const user = userOpt.Some;
  const journalIndex = user.journals.findIndex(
    (journal) => journal.id === journalId,
  );
  if (journalIndex === -1) {
    return { Some: errJournal };
  }

  const journal = user.journals[journalIndex];
  const updatedUser: User = {
    ...user,
    totalJournals: user.totalJournals - BigInt(1),
    journals: user.journals.filter((journal) => journal.id !== journalId),
  };

  users.insert(userId, updatedUser);

  return { Some: journal };
}
