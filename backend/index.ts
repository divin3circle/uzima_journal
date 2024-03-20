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
  Result,
} from 'azle';

import {v4 as uuidv4 } from "uuid";

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

const users = new StableBTreeMap<text, User>(0, 44, 1024);


// Helper function that trims the input string and then checks the length
// The string is empty if true is returned, otherwise, string is a valid value
function isInvalidString(str: string): boolean {
  return str.trim().length == 0
}

$update;
export function createUser(username: text): Result<User, text> {
  if(isInvalidString(username)){
    return Result.Err("Username can't be empty.")
  }
  const user = {
    id: uuidv4(),
    username,
    totalJournals: BigInt(0),
    journals: [],
  };
  users.insert(user.id, user);
  return Result.Ok(user);
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
): Result<Journal, text> {

  const userOpt = users.get(userId);
  if ('None' in userOpt) {
    return Result.Err("User not found.");
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

  return Result.Ok(journal);
}

$update;
export function deleteJournal(userId: text, journalId: nat): Result<Journal, text> {
  const userOpt = users.get(userId);
  if ('None' in userOpt) {
    return Result.Err("User not found.");
  }

  const user = userOpt.Some;
  const journalIndex = user.journals.findIndex(
    (journal) => journal.id === journalId,
  );
  if (journalIndex === -1) {
    return Result.Err("Journal not found.");;
  }

  const journal = user.journals[journalIndex];
  const updatedUser: User = {
    ...user,
    totalJournals: user.totalJournals - BigInt(1),
    journals: user.journals.filter((journal) => journal.id !== journalId),
  };

  users.insert(userId, updatedUser);

  return Result.Ok(journal);
}


// a workaround to make uuid package work with Azle
globalThis.crypto = {
  getRandomValues: () => {
      let array = new Uint8Array(32)

      for (let i = 0; i < array.length; i++) {
          array[i] = Math.floor(Math.random() * 256)
      }

      return array
  }
}