import { Connection } from "mysql2";

import { Hobby, Resume, ResumeHobby, User } from "../data/types";
import mySqlConnection from "./config";
import { hobbies, resumes, resumesHobbies, users } from "../data/data";

export const clearSqlDatabase = async (
  connection: Connection = mySqlConnection
) => {
  await connection.execute(
    `DROP TABLE users, resumes, hobbies, resumes_hobbies`,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
};

export const initializeSqlDatabase = async (
  connection: Connection = mySqlConnection
) => {
  await connection.execute(createUsersTableQuery, async (err) => {
    if (err) {
      console.error(err.message);
    } else {
      await connection.execute(getFillUsersTableQuery(users));
    }
  });

  await connection.execute(createResumesTableQuery, async (err) => {
    if (err) {
      console.error(err.message);
    } else {
      await connection.execute(getFillResumesTableQuery(resumes));
    }
  });

  await connection.execute(createHobbiesTableQuery, async (err) => {
    if (err) {
      console.error(err.message);
    } else {
      await connection.execute(getFillHobbiesTableQuery(hobbies));
    }
  });

  await connection.execute(createResumesHobbiesTableQuery, async (err) => {
    if (err) {
      console.error(err.message);
    } else {
      await connection.execute(getFillResumesHobbiesTableQuery(resumesHobbies));
    }
  });
};

export const createUsersTableQuery = `
    CREATE TABLE users (
        id INT NOT NULL,
        login VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );
`;

export const createResumesTableQuery = `
    CREATE TABLE resumes (
        id INT NOT NULL,
        user_id INT NOT NULL,
        description VARCHAR(255) NOT NULL,
        previous_job VARCHAR(255),
        experience INT NOT NULL,
        city VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

export const createHobbiesTableQuery = `
    CREATE TABLE hobbies (
        id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );
`;

export const createResumesHobbiesTableQuery = `
  CREATE TABLE resumes_hobbies (
        id INT NOT NULL,
        resume_id INT NOT NULL,
        hobby_id INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_resume FOREIGN KEY (resume_id) REFERENCES resumes(id),
        CONSTRAINT fk_hobby FOREIGN KEY (hobby_id) REFERENCES hobbies(id)
  );
`;

export const getFillUsersTableQuery = (users: User[]) =>
  `
    INSERT INTO users(id, login, password)
    VALUES ${users.map(userToValues).join(",")}
`;

export const getFillResumesTableQuery = (resumes: Resume[]) => `
  INSERT INTO resumes(id, user_id, description, previous_job, experience, city)
  VALUES ${resumes.map(resumeToValues).join(",")}
`;

export const getFillHobbiesTableQuery = (hobbies: Hobby[]) => `
  INSERT INTO hobbies(id, name)
  VALUES ${hobbies.map(hobbyToValues).join(",")}
`;

export const getFillResumesHobbiesTableQuery = (
  resumesHobbies: ResumeHobby[]
) => `
  INSERT INTO resumes_hobbies(id, resume_id, hobby_id)
  VALUES ${resumesHobbies.map(resumeHobbyToValues).join(",")}
`;

export const userToValues = (user: User) => {
  const { id, login, password } = user;
  return `(${id}, '${login}', '${password}')`;
};
export const resumeToValues = (resume: Resume) => {
  const { id, userId, description, previousJob, experience, city } = resume;
  return `(${id}, ${userId}, '${description}', '${previousJob}', ${experience}, '${city}')`;
};

export const hobbyToValues = (hobby: Hobby) => {
  const { id, name } = hobby;
  return `(${id}, '${name}')`;
};

export const resumeHobbyToValues = (resumeHobby: ResumeHobby) => {
  const { id, resumeId, hobbyId } = resumeHobby;
  return `(${id}, ${resumeId}, ${hobbyId})`;
};
