import { Session } from "neo4j-driver";
import { hobbies, resumes, users } from "../data/data";
import to from "await-to-js";
import { Resume } from "../data/types";

export const clearNeo4jDatabase = async (session: Session) => {
  await session.run("MATCH (n) DETACH DELETE n");
};

export const initializeNeo4jDatabase = async (session: Session) => {
  await createUsersNodes(session);
  await createResumesNodes(session);
  await createHobbiesNodes(session);

  await createUsersResumesRelationships(session);
  await createResumesHobbiesRelationships(session);
};

export const createUsersNodes = async (session: Session) => {
  const [err] = await to(
    session.run(
      `
    UNWIND $users AS user 
    CREATE (u: User {id: user.id, login: user.login, password: user.password})
  `,
      { users }
    )
  );
  if (err) throw err;
};

export const createResumesNodes = async (session: Session) => {
  const [err] = await to(
    session.run(
      `
    UNWIND $resumes AS resume
    CREATE (r: Resume {id: resume.id, description: resume.description, previousJob: resume.previousJob, experience: resume.experience, city: resume.city})
  `,
      { resumes }
    )
  );
  if (err) throw err;
};

export const createHobbiesNodes = async (session: Session) => {
  const [err] = await to(
    session.run(
      `
     UNWIND $hobbies AS hobby
     CREATE (h: Hobby {id: hobby.id, name: hobby.name})
    `,
      { hobbies }
    )
  );
  if (err) throw err;
};

export const createUsersResumesRelationships = async (
  session: Session
) => {
  const [err] = await to(session.run(`
    UNWIND $resumes AS resume
    MATCH (u:User), (r:Resume)
    WHERE u.id = resume.userId AND r.id = resume.id
    CREATE (u)-[:HAS]->(r)
  `, { resumes }));
  if (err) throw err;
};

export const createResumesHobbiesRelationships = async (
  session: Session
) => {
  const [err] = await to(session.run(`
    UNWIND $resumes AS resume
    MATCH (r:Resume), (h:Hobby)
    WHERE r.id = resume.id AND h.id IN resume.hobbies
    CREATE (r)-[:CONTAINS]->(h)
  `, { resumes }));
  if (err) throw err;
}
