import { Db } from "mongodb";
import { hobbies, resumes, users } from "../data/data";

export const clearMongoDatabase = async (myDb: Db) => {
  try {
    await myDb.dropCollection("users");
    await myDb.dropCollection("resumes");
  } catch (e) {
    console.error(e);
  }
};

export const initializeMongoDatabase = async (myDb: Db) => {
  await createUsersCollection(myDb);
  await createResumesCollection(myDb);
};

const createUsersCollection = async (myDb: Db) => {
  const collection = await myDb.createCollection("users");
  await collection.insertMany(users);
};

const createResumesCollection = async (myDb: Db) => {
  const collection = await myDb.createCollection("resumes");
  await collection.insertMany(
    resumes.map((resume) => {
      const resumeHobbies = hobbies.filter(({ id }) =>
        resume.hobbies.includes(id)
      );

      return {
        ...resume,
        hobbies: resumeHobbies,
      };
    })
  );
};
