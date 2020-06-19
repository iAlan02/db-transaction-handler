require('dotenv').config();

const express = require('express');
const cors = require('cors');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const copyLicense = require('../src/dbConnections/db2/index');
copyLicense();

const routeIndex = require('./api/v1/routerIndex');
const routes = routeIndex.initialize();
const app = express();
/*const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://${yourOktaDomain}/oauth2/default',
    clientId: '{clientId}',
    assertClaims: {
        aud: 'api://default',
    },
});*/



app.use(express.json());

app.use(cors({ origin: '*' }));
app.use('/api/v1', routes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        return res.status(401).end();
    }

    const accessToken = match[1];
    const expectedAudience = 'api://default';

    return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
        .then((jwt) => {
            req.jwt = jwt;
            next();
        })
        .catch((err) => {
            res.status(401).send(err.message);
        });
}