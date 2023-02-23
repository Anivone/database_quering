import express from "express";
import  neo4j  from "neo4j-driver";
import { hobbies, resumes, users } from "./data/common.js";
import AppDataSource from "./data/mysql/config.js";
import { UserService } from "./data/domain/User/UserService.js";
import { ResumeService } from "./data/domain/resume/ResumeService.js";

const app = express();
const PORT = 3000;

const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

app.get("/", async (req, res) => {
    const result = await session.run("MATCH (n) RETURN count(n)");
    const count = result.records[0].get("count(n)").toString();

    await session.close();

    return res.json({
        count
    });
});

app.get('/neo4j/createUser', async (req, res) => {
  let userService  = new UserService()
  for (const user of users) {
    const session = driver.session();

    await session.run(`CREATE (n:User {${Object.keys(user).map(key => `${key}: '${user[key]}'`).join(',')}})`)
      .catch((err) => {
        console.log(err);
      })

    await userService.createUser(user)
      .catch((err) => {
        console.log(err)
      });

    await session.close();
  }

  res.send("Users created")
})

app.get('/neo4j/createResumes', async (req, res) => {
  const resumeService = new ResumeService()
  for (const resume of resumes) {
    const session = driver.session();

    await session.run(`CREATE (n:Resume {${Object.keys(resume).map(key => `${key}: '${resume[key]}'`).join(',')}})`)
      .catch((err) => {
        console.log(err);
      })

    await resumeService.createResume(resume)
      .catch((err) => {
        console.log(err)
      });

    await session.close();
  }

  for (const resume of resumes) {
    const session = driver.session();

    await session.run(`MATCH (user:User {id: '${resume.userId}'}) MATCH (resume:Resume {userId: '${resume.userId}'}) CREATE (user)-[r:HAS]->(resume)`)
      .catch((err) => {
        console.log(err);
      })
    await session.close();
  }

  //res.send("Resumes created")
  res.json({users: resumeService.findAll()})

})

app.get('/neo4j/createHobbies', async (req, res) => {
  for (const hobby of hobbies) {
    const session = driver.session();

    await session.run(`CREATE (n:Hobby {${Object.keys(hobby).map(key => `${key}: '${hobby[key]}'`).join(',')}})`)
      .catch((err) => {
        console.log(err);
      })
    await session.close();
  }
  res.send("Hobbies created")
})

app.get('/neo4j/createHobbies/relations', async (req, res) => {
  for (const hobby of hobbies) {
    const session = driver.session();

    await session.run(`MATCH (resume:Resume) MATCH (hobby:Hobby) WHERE ${hobby.id} IN [resume.hobbies] MERGE (resume)-[:CONTAINS]->(hobby)`)
      .catch((err) => {
        console.log(err);
      })
    await session.close();
  }
  res.send("Relations created")
})


app.delete("/neo4j/clear", async (req, res) => {
    session.run("MATCH (n:User) DETACH DELETE n");

    await session.close();

    return {
      status: "success"
    }
    // MATCH (n:User)-[r:HAS]->() DELETE r DELETE relation
});

app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
});