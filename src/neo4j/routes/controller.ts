import { Request, Response } from "express";
import driver from "../config";

export const getResumes = async (req: Request, res: Response) => {
  const session = driver.session();

  const result = await session.run("MATCH (n:Resume) RETURN n").catch((err) => {
    console.log(err);
  });

  return res.json({
    success: true,
    //result: result?.records.map((record) => record.get('n'))
    result: result?.records.map((record) => record.get('n')?.properties)
  });
};

export const getAllResumesHobby = async (req: Request, res: Response) => {
  const session = driver.session();

  const result = await session.run("MATCH(n:Resume)-[r:CONTAINS]->(m:Hobby) RETURN DISTINCT m ORDER BY m.id").catch((err) => {
    console.log(err);
  });

  return res.json({
    success: true,
    //result: result?.records.map((record) => record.get('m'))
    result: result?.records.map((record) => record.get('m')?.properties)
  });
};

export const getAllCityFromResume = async (req: Request, res: Response) => {
  const session = driver.session();

  const result = await session.run("MATCH(n:Resume) RETURN DISTINCT n.city").catch((err) => {
    console.log(err);
  });

  return res.json({
    success: true,
    //result: result?.records.map((record) => record.get('m'))
    result: result?.records.map((record) => record.get('n.city'))

  });
};

export const getAllHobbyByCity = async (req: Request, res: Response) => {
  const session = driver.session();

  const result = await session.run(`MATCH(n:Resume)-[r:CONTAINS]->(m:Hobby) WHERE n.city='${req.params.city}' RETURN DISTINCT m.name, n.city, m.id`).catch((err) => {
    console.log(err);
  });

  return res.json({
    success: true,
    //result: result?.records.map((record) => record.get('m'))
    //result: result?.records.map((record) => record.get('[m.name,n.city,m.id]'))
    result: result?.records.map((record) => record)
    //result
  });
};

export const getSamePreviousJob = async (req: Request, res: Response) => {
  const session = driver.session();

  const result = await session.run("MATCH(u:User)-[:HAS]->(r:Resume) WHERE r.previousJob IS NOT NULL WITH r.previousJob AS pj, COLLECT(u) AS users WHERE SIZE(users) > 1 RETURN pj, users").catch((err) => {
    console.log(err);
  });

  let answer: { previous_job: any; users: any; }[] = [];
  result?.records.map((record) => {
    const pj = record.get('pj')
    const users = record.get('users')

    answer.push({
      previous_job: pj,
      users: users.map((user: { properties: any; }) => user?.properties)
    })
  })

  return res.json({
    success: true,
    //result: result?.records.map((record) => record.get('m'))
    //result: result?.records.map((record) => record.get('[m.name,n.city,m.id]'))
    //result: result?.records.map((record) => record)
    result: answer
  });
};

