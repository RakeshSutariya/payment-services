import rateLimit from 'express-rate-limit';

import { config } from "../config";
import { response_messages, responseHandler, status_codes } from '../util';

export const expressRatelimiter =  rateLimit({
                                        windowMs: config.expressRateLimit.windowMs,
                                        max: config.expressRateLimit.limit,
                                        handler: (req, res) => {
                                            responseHandler(
                                            res,
                                            status_codes.TO_MANY_REQUEST,
                                            response_messages.TOO_MANY_REQUESTS
                                            );
                                        },
                                        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
                                        legacyHeaders: false // Disable `X-RateLimit-*` headers
                                    });