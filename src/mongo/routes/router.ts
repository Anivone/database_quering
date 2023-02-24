import express from "express";
import {
  getAllCityFromResume, getAllHobbyByCity,
  getResumes,
  getResumesHobbies,
  getSamePreviousJob
} from "./controller";

const mongoRouter = express.Router();

mongoRouter.get("/getResumes", getResumes);
mongoRouter.get("/getAllResumesHobby", getResumesHobbies);
mongoRouter.get("/getAllCityFromResume", getAllCityFromResume);
mongoRouter.get("/getAllHobbyByCity/:city", getAllHobbyByCity);
mongoRouter.get("/getSamePreviousJob", getSamePreviousJob);

export default mongoRouter;
