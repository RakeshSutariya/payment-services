import { response_messages, responseHandler, status_codes } from "../util"

export const ValidationMiddleware = (schema) => (req, res, next) => {
    try {
        const { body } = req;
        const { error, value } = schema.validate(body);
        if (!error) {
            req.body = value;
            next();
        } else {
            responseHandler(res, status_codes.BAD_REQUEST, error?.message.replace(/\\|"/g, "") || response_messages.VALIDATION_ERROR);
        }

    } catch (err: any) {
        responseHandler(res, status_codes.ERROR, err.message, err)
    }
}