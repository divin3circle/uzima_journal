import {
  $update,
  $query,
  nat,
  Record,
  text,
  Vec,
  StableBTreeMap,
  Result,
  Variant,
} from 'azle';

// Define types
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

// Initialize storage
const users = new StableBTreeMap<text, User>(0, 44, 1024);

// Function to create a new user
$update
export function createUser(id: text, username: text): User {
  const user: User = {
    id,
    username,
    totalJournals: BigInt(0),
    journals: [],
  };
  users.insert(id, user);
  return user;
}

// Function to get all users
$query
export function getUsers(): Vec<User> {
  return users.values();
}

// Function to get a user by ID
$query
export function getUser(id: text): Result<User, Error> {
  const userOpt = users.get(id);
  return userOpt ? Result.Ok(userOpt) : Result.Err(Error.UserDoesNotExist(id));
}

// Function to create a new journal for a user
$update
export function createJournal(
  userId: text,
  journalId: nat,
  title: text,
  body: text,
  time: text,
): Result<Journal, Error> {
  const userResult = getUser(userId);
  if (userResult.isErr()) {
    return Result.Err(userResult.err);
  }

  const user = userResult.ok;
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

// Function to delete a journal for a user
$update
export function deleteJournal(userId: text, journalId: nat): Result<Journal, Error> {
  const userResult = getUser(userId);
  if (userResult.isErr()) {
    return Result.Err(userResult.err);
  }

  const user = userResult.ok;
  const journalIndex = user.journals.findIndex(journal => journal.id === journalId);
  if (journalIndex === -1) {
    return Result.Err(Error.UserDoesNotExist(userId));
  }

  const deletedJournal = user.journals[journalIndex];
  const updatedJournals = user.journals.filter(journal => journal.id !== journalId);
  const updatedUser: User = {
    ...user,
    totalJournals: user.totalJournals - BigInt(1),
    journals: updatedJournals,
  };

  users.insert(userId, updatedUser);
  return Result.Ok(deletedJournal);
}
