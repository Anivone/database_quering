import { DataSource, EntitySchema } from "typeorm";
import  UserSchema from "../domain/User/User.js";
import ResumeSchema from "../domain/resume/Resume.js";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "password",
  database: "db",
  synchronize: true,
  entities: [UserSchema, ResumeSchema]
})

export default AppDataSource