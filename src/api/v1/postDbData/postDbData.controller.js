const mysqlQuery = require('../../../dbConnections/mysql/connection');
const db2Query = require('../../../dbConnections/db2/DB2');
const postgreQuery = require('../../../dbConnections/postgre/connection');

exports.runQuery = async (req, res) => {
    let response;
    console.log(req.body);
    if (req.body) {
        switch (req.body.db_type) {
            case "mysql":
                response = await mysqlQuery.runQuery(req.body);
                break;
            case "postgre":
                response = await postgreQuery.runQuery(req.body);
                break;
            case "db2":
                response = await db2Query.runQuery(req.body);
                break;
            default:
                response = "The db type is not available";
                break;
        }

        console.log(response);
        if (response.error) {
            res.status(500).send(response);
        } else {
            res.status(200).send(response);
        }
    } else {
        res.status(200).send("no body");
    }
}