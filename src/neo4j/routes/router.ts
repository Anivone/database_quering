import express from 'express'
import { getResumes } from "./controller";

const neo4jRouter = express.Router()

neo4jRouter.get('/getResumes', getResumes)

export default neo4jRouter