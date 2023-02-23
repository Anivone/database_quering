export interface User {
  id: number;
  login: string;
  password: string;
}

export interface Resume {
  id: number,
  userId: number,
  description: string,
  previousJob: string,
  experience: number,
  city: string,
  hobbies: number[]
}

export interface Hobby {
  id: number;
  name: string;
}

export interface ResumeHobby {
  id: number;
  resumeId: number;
  hobbyId: number;
}