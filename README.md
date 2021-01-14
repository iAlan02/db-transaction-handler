# generic_db_api

API to execute queries in MySQL and Postgre

Use example
/api/v1/postDb/runQuery
Body:
 {
    "db_type": "",
    "host": "",
    "port": "",
    "database": "",
    "schema": "",
    "user": "",
    "password": "",
    "query": "",
    "params": []
}

db_type: Can be mysql or postgre.
host: Database host url.
port: Connection port.
database: Database name.
schema: Optional, default schema.
user: Database user name.
password: Database password.
*query: Database query
params: Array params for the query

*Preferentially use parameters to avoid SQL injection.
**For Postgre use the notation needed to replace the parameter. Example:
    SELECT "documentStatusTransition"."toDocumentStatusId"
	FROM "documentStatusTransition"
    WHERE "documentStatusTransition"."fromDocumentStatusId" = $1;
