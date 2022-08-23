const Pool = require('pg').Pool

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    database: "applications",
    password: "pgsql10",
})// mabe pass is Aa123456

const dbQuery = async (queryText,paramArry = []) => { 
    return pool.query(queryText,paramArry);
}
module.exports = {dbQuery }