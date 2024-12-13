import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './drizzle',
    dialect: "mysql",
    schema: "./utils/schema.js",
    dbCredentials: {
        host: "srv1670.hstgr.io",
        user: "u378189163_attendancetrak",
        database: "u378189163_attendancetrak",
        password:'Muhurt@123',
        port: 3306,
    }
});