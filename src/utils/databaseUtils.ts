import { clearSqlDatabase, initializeSqlDatabase } from "../sql/utils";
import { clearNeo4jDatabase, initializeNeo4jDatabase } from "../neo4j/utils";
import { Session } from "neo4j-driver";
import { clearMongoDatabase, initializeMongoDatabase } from "../mongo/utils";
import { Db } from "mongodb";

export const clearDatabases = async (session: Session, myDb: Db) => {
  await clearSqlDatabase();
  await clearNeo4jDatabase(session);
  await clearMongoDatabase(myDb);
};

export const initializeDatabases = async (session: Session, myDb: Db) => {
  await initializeSqlDatabase();
  await initializeNeo4jDatabase(session);
  await initializeMongoDatabase(myDb);
};
