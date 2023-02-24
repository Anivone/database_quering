import express from 'express'
import {
  getAllCityFromResume,
  getAllHobbyByCity,
  getAllResumesHobby,
  getResumes,
  getSamePreviousJob
} from "./controller";

const mySqlRouter = express.Router()

mySqlRouter.get('/getResumes', getResumes)
mySqlRouter.get('/getAllResumesHobby', getAllResumesHobby)
mySqlRouter.get('/getAllCityFromResume', getAllCityFromResume)
mySqlRouter.get('/getAllHobbyByCity/:city', getAllHobbyByCity)
mySqlRouter.get('/getSamePreviousJob', getSamePreviousJob)


export default mySqlRouter