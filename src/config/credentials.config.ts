import dotenv from 'dotenv';
dotenv.config();
import { API_LOG_ENABLE, SERVER_ENVIRONMENTS } from "../util";

export const config = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        environment: process.env.NODE_ENV || SERVER_ENVIRONMENTS.LOCAL,
    },
    API_log_enable: process.env.API_MORGAN_LOGS || API_LOG_ENABLE.OFF,
    expressRateLimit: {
        windowMs: ((parseInt(process.env.AIP_RATE_LIMIT_TIME) || 10) * 60) * 1000,
        limit: parseInt(process.env.AIP_HIT_RATE_LIMIT) || 100,
    }
};