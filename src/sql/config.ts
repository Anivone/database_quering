import mysql from "mysql2";

const mySqlConnection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "user",
  password: "password",
  database: "db"
});

// "sql://user:password@localhost:3306/db"

export default mySqlConnection;
