const mysql = require('mysql');
const queryHandler = require('./queryHandler');

const result = {};
let db;

exports.runQuery = async (params) => {
  try {
    db = mysql.createPool({
      host: params.host,
      user: params.user,
      password: params.password,
      database: params.database,
    });

    const queryString = params.query;
    const queryParams = params.params;
    const data = await queryHandler.query(db, queryString, queryParams);
    result.data = data;
    result.status = 200;
    return result;
  } catch (err) {
    result.error = err.message;
    result.status = 500;
    return result;
  } finally {
    db.end();
  }
};
