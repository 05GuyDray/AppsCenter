const { dbQuery } = require("./database.js");

async function getAll() {
  const sqlText = "SELECT  * FROM applications";
  let resolt = await dbQuery(sqlText);
  return resolt.rows;
}

async function addApp(appData) {
  const propertyNames = Object.keys(appData);
  const values = Object.values(appData);
  const paramArry = [...values];
  let queryText = "INSERT INTO applications VALUES ($1, $2, $3,$4,$5,$6,$7);";
  await dbQuery(queryText, paramArry);
}

async function deleteApp(id) {
  let paramArry = [id];
  let queryText = "DELETE FROM applications WHERE id =$1";
  dbQuery(queryText, paramArry);
}

module.exports = { getAll, addApp, deleteApp };