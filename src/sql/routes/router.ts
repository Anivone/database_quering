import express from 'express'
import {
  getAllCityFromResume,
  getAllHobbyByCity,
  getAllResumesHobby,
  getResumes,
  getSamePreviousJob
} from "./controller";

const mysqlRouter = express.Router()

mysqlRouter.get('/getResumes', getResumes)
mysqlRouter.get('/getAllResumesHobby', getAllResumesHobby)
mysqlRouter.get('/getAllCityFromResume', getAllCityFromResume)
mysqlRouter.get('/getAllHobbyByCity/:city', getAllHobbyByCity)
mysqlRouter.get('/getSamePreviousJob', getSamePreviousJob)


export default mysqlRouter