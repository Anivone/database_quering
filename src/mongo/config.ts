import { Db, MongoClient } from "mongodb";

const url = "mongodb://root:password@localhost:27018";
const dbName = "database_quering";

export const client = new MongoClient(url);
export const getDb= () => client.db(dbName);
