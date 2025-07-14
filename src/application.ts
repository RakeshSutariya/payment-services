import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { config } from "./config";
import { API_LOG_ENABLE, clientErrorHandler, errorHandler, SERVER_ENVIRONMENTS } from "./util";
import { expressMiddleware, expressRatelimiter } from "./middlewares";
import { routes } from "./routes";

const app = express();

app.use(
    bodyParser.json({
        limit: '50mb',
        type: 'application/json'
    })
);

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 100
    })
);

app.use(cors());

if (config.API_log_enable === API_LOG_ENABLE.ON) {
    if (config.server.environment === SERVER_ENVIRONMENTS.PRODUCTION) {
        app.use(morgan('combined'));
    } else {
        app.use(morgan('dev'));
    }
}

app.use(expressMiddleware);
app.use(expressRatelimiter);
app.use(clientErrorHandler);
app.use(errorHandler);

app.use('/v_1', routes);

export { app };




