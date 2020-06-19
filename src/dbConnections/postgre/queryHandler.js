exports.query = async (db, query, params) => {
  try {
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};
