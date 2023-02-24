import express from "express";
import neo4j  from "neo4j-driver";
import mySqlConnection from "./sql/config";
import { clearDatabases, initializeDatabases } from "./utils/databaseUtils";
import { MongoClient } from "mongodb";
import mySqlRouter from "./sql/routes/router";
import driver from "./neo4j/config"
import neo4jRouter from "./neo4j/routes/router";
import { client, getDb } from "./mongo/config";
import mongoRouter from "./mongo/routes/router";

const app = express();
const PORT = 3000;

mySqlConnection.connect((err) => {
    if (err) {
        throw err;
    }
});

client.connect().catch((err) => console.error(err));
const myDb = getDb();

app.use('/mysql', mySqlRouter);
app.use('/neo4j', neo4jRouter);
app.use('/mongo', mongoRouter);

app.get("/", async (req, res) => {
    const session = driver.session();
    const result = await session.run("MATCH (n) RETURN count(n)");
    const count = result.records[0].get("count(n)").toString();

    await session.close();

    return res.json({
        count
    });
});

app.listen(PORT, async () => {
    const session = driver.session();

    await clearDatabases(session, myDb);
    await initializeDatabases(session, myDb);

    await session.close();
    console.log("Server is listening on port ", PORT);
});