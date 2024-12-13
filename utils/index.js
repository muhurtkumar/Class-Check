import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "srv1670.hstgr.io",
  user: "u378189163_attendancetrak",
  database: "u378189163_attendancetrak",
  password:'Muhurt@123',
  port:'3306',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(pool);
