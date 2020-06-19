const postgre = require('pg');
const queryHandler = require('./queryHandler');

const result = {};
let db;

exports.runQuery = async (params) => {
  try {
    db = new postgre.Pool({
      host: params.host,
      user: params.user,
      password: params.password,
      database: params.database,
      port: params.port,
      client_encoding: params.encoding,
    });

    const queryString = params.query;
    const queryParams = params.params;

    const data = await queryHandler.query(db, queryString, queryParams);
    if (data.rowCount) {
      result.body = data.rows;
      result.status = 200;
    } else {
      result.error = `Database Error: rows not affected ${params}`;
      result.status = 202;
    }

    return result;
  } catch (error) {
    result.error = error.message;
    result.status = 500;
    return result;
  } finally {
    db.end();
  }
};
