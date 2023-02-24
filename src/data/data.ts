import { Hobby, Resume, ResumeHobby, User } from "./types";

export const users: User[] = [
  { id: 1, login: "user1", password: "password1" },
  { id: 2, login: "user2", password: "password2" },
  { id: 3, login: "user3", password: "password3" },
  { id: 4, login: "user4", password: "password4" },
  { id: 5, login: "user5", password: "password5" },
  { id: 6, login: "user6", password: "password6" },
  { id: 7, login: "user7", password: "password7" },
  { id: 8, login: "user8", password: "password8" },
];

export const resumes: Resume[] = [
  {
    id: 1,
    userId: 1,
    description: "Lorem open",
    previousJob: "Google",
    experience: 1,
    city: "Kyiv",
    hobbies: [1, 3]
  },
  {
    id: 2,
    userId: 2,
    description: "Lorem open",
    previousJob: "Amazon",
    experience: 4,
    city: "Dnipro",
    hobbies: [2]
  },
  {
    id: 3,
    userId: 3,
    description: "Lorem open",
    previousJob: "Netflix",
    experience: 10,
    city: "Lviv",
    hobbies: [6]
  },
  {
    id: 4,
    userId: 4,
    description: "Lorem open",
    previousJob: "Meta",
    experience: 3,
    city: "Kharkiv",
    hobbies: [9, 10]
  },
  {
    id: 5,
    userId: 5,
    description: "Lorem open",
    previousJob: "Meta",
    experience: 6,
    city: "Chernihiv",
    hobbies: [4, 7, 9]
  },
  {
    id: 6,
    userId: 6,
    description: "Lorem open",
    previousJob: "Google",
    experience: 1,
    city: "Kyiv",
    hobbies: [3, 8]
  },
  {
    id: 7,
    userId: 7,
    description: "Lorem open",
    previousJob: "Google",
    experience: 8,
    city: "Ivano-Frankivsk",
    hobbies: []
  },
  {
    id: 8,
    userId: 8,
    description: "Lorem open",
    previousJob: "Apple",
    experience: 15,
    city: "Odessa",
    hobbies: [7]
  },
];

export const hobbies: Hobby[] = [
  { id: 1, name: 'Reading' },
  { id: 2, name: 'Playing sports' },
  { id: 3, name: 'Gardening' },
  { id: 4, name: 'Cooking' },
  { id: 5, name: 'Hiking' },
  { id: 6, name: 'Drawing' },
  { id: 7, name: 'Playing music' },
  { id: 8, name: 'Watching movies' },
  { id: 9, name: 'Traveling' },
  { id: 10, name: 'Photography' },
  { id: 11, name: 'unique' },
];

export const resumesHobbies: ResumeHobby[] = [
  { id: 1, resumeId: 1, hobbyId: 1 },
  { id: 2, resumeId: 1, hobbyId: 3 },
  { id: 3, resumeId: 2, hobbyId: 2 },
  { id: 4, resumeId: 3, hobbyId: 6 },
  { id: 5, resumeId: 4, hobbyId: 9 },
  { id: 6, resumeId: 4, hobbyId: 10 },
  { id: 7, resumeId: 5, hobbyId: 4 },
  { id: 8, resumeId: 5, hobbyId: 7 },
  { id: 9, resumeId: 5, hobbyId: 9 },
  { id: 10, resumeId: 6, hobbyId: 3 },
  { id: 11, resumeId: 6, hobbyId: 8 },
  { id: 12, resumeId: 8, hobbyId: 7 },
];
