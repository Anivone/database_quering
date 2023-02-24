import express from 'express'
import { getResumes, getAllResumesHobby, getAllCityFromResume, getAllHobbyByCity, getSamePreviousJob } from "./controller";

const neo4jRouter = express.Router()

neo4jRouter.get('/getResumes', getResumes)
neo4jRouter.get('/getAllResumesHobby', getAllResumesHobby)
neo4jRouter.get('/getAllCityFromResume', getAllCityFromResume)
neo4jRouter.get('/getAllHobbyByCity/:city', getAllHobbyByCity)
neo4jRouter.get('/getSamePreviousJob', getSamePreviousJob)

export default neo4jRouter