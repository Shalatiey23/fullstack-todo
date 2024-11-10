require("dotenv").config()
const {Pool} = require("pg")
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  
});

console.log("database url ", process.env.DATABASE_URL);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connected successfully at:", res.rows[0].now);
  }
});

module.exports = {pool}