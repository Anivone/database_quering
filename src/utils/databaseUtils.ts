import { clearSqlDatabase, initializeSqlDatabase } from "../sql/utils";
import { clearNeo4jDatabase, initializeNeo4jDatabase } from "../neo4j/utils";
import { Session } from "neo4j-driver";

export const clearDatabases = async (session: Session) => {
  await clearSqlDatabase();
  await clearNeo4jDatabase(session);
};

export const initializeDatabases = async (session: Session) => {
  await initializeSqlDatabase();
  await initializeNeo4jDatabase(session);
};
