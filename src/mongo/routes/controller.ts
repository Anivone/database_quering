import { Request, Response } from "express";
import { getDb } from "../config";

export const getResumes = async (req: Request, res: Response) => {
  const db = getDb();
  const resumesCollection = db.collection("resumes");
  const cursor = resumesCollection.find({});
  const resumes = await cursor.toArray();

  return res.json({
    resumes,
  });
};

export const getResumesHobbies = async (req: Request, res: Response) => {
  const db = getDb();
  const resumesCollection = db.collection("resumes");
  const resumesHobbies = await resumesCollection.distinct("hobbies");

  return res.json({
    resumesHobbies,
  });
};

export const getAllCityFromResume = async (req: Request, res: Response) => {
  const db = getDb();
  const resumesCollection = db.collection("resumes");
  const resumesCities = await resumesCollection.distinct("city");

  return res.json({
    resumesCities,
  });
};

export const getAllHobbyByCity = async (req: Request, res: Response) => {
  const db = getDb();
  const city = req.params.city;
  const resumesCollection = db.collection("resumes");
  // const cursor = await resumesCollection.aggregate([
  //   {
  //     $match: {
  //       city: {
  //         $eq: city
  //       }
  //     }
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "userId",
  //       foreignField: "id",
  //       as: "user",
  //     },
  //   },
  //   {
  //     $project: {
  //       "hobbies": true,
  //     }
  //   }
  // ]);

  // const results = await cursor.toArray();

  const results = await resumesCollection.distinct("hobbies", { city });
  return res.json({
    results
  });
}

export const getSamePreviousJob = async (req: Request, res: Response) => {
  const db = getDb();
  const resumesCollection = db.collection("resumes");
  const cursor = await resumesCollection.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "id",
        as: "user",
      },
    },
    {
      $group: {
        _id: "$previousJob",
        results: {
          $push: "$user",
        },
      },
    },
    {
      $match: {
        "results.1": {
          $exists: true,
        },
      },
    },
  ]);

  const result = await cursor.toArray();
  return res.json({
    result: result.map((item) => ({
      previousJob: item._id,
      users: item.results,
    })),
  });
};
