const express = require("express");
const neo4j = require("neo4j-driver");

const app = express();
const PORT = 3000;

const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "password")
);

app.get("/", async (req, res) => {
    const session = driver.session();

    const result = await session.run("MATCH (n) RETURN count(n)");
    const count = result.records[0].get("count(n)").toString();

    await session.close();

    return res.json({
        count
    });
});

app.delete("/neo4j/clear", async (req, res) => {
    const session = driver.session();
    session.run("MATCH (n) DETACH DELETE n");

    await session.close();

    return {
      status: "success"
    }
});

app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
});