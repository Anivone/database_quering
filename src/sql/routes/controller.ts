import mySqlConnection from "../config";
import { Request, Response } from 'express'

export const getResumes = async (req : Request, res: Response,) => {
  await mySqlConnection.execute(
    `SELECT * FROM resumes`,
    (err, result) => {
      if (err) {
        console.error(err.message);
      } else {
        return res.json({
          success: true,
          result
        })
      }
    }
  );
};

export const getAllResumesHobby = async (req : Request, res: Response,) => {
  await mySqlConnection.execute(
    `SELECT hobbies.id, hobbies.name FROM resumes_hobbies AS rh JOIN hobbies ON rh.hobby_id = hobbies.id`,
    (err, result) => {
      if (err) {
        console.error(err.message);
      } else {
        return res.json({
          success: true,
          result
        })
      }
    }
  );
};

export const getAllCityFromResume = async (req : Request, res: Response,) => {
  await mySqlConnection.execute(
    `SELECT DISTINCT city FROM resumes;`,
    (err, result) => {
      if (err) {
        console.error(err.message);
      } else {
        return res.json({
          success: true,
          result
        })
      }
    }
  );
};

export const getAllHobbyByCity = async (req : Request, res: Response) => {
  await mySqlConnection.execute(
    `SELECT DISTINCT hobbies.name, hobbies.id, resumes.city FROM resumes JOIN resumes_hobbies AS rh ON resumes.id = rh.resume_id JOIN hobbies ON hobbies.id = hobby_id WHERE city="${req.params.city}"`,
    (err, result) => {
      if (err) {
        console.error(err.message);
      } else {
        return res.json({
          success: true,
          result
        })
      }
    }
  );
};

export const getSamePreviousJob = async (req : Request, res: Response) => {
  await mySqlConnection.execute(
    `SELECT u.*, r.previous_job
         FROM resumes r 
         JOIN users u ON r.user_id = u.id
         WHERE r.previous_job IN (
            SELECT r.previous_job
            FROM resumes r
            GROUP BY r.previous_job
            HAVING COUNT(r.user_id) > 1
        )
        ORDER BY r.previous_job`,
    (err, result) => {
      if (err) {
        console.error(err.message);
      } else {
        return res.json({
          success: true,
          result
        })
      }
    }
  );
};




