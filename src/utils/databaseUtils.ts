import { clearSqlDatabase, initializeSqlDatabase } from "../sql/utils";

export const clearDatabases = async () => {
  await clearSqlDatabase();
};

export const initializeDatabases = async () => {
  await initializeSqlDatabase();
};
