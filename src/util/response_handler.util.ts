const clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something wrong..!!!.Please try after some time.' })
    } else {
        next(err);
    }
}

const errorHandler = (err, req, res, next) => {
    res.status(500)
    res.render('error', { error: err });
}

const responseHandler = (res, status, message, data = {}) => {
  res.json({
    responseCode: status,
    responseMessage: message,
    data: data
  });
};



export {
    clientErrorHandler,
    errorHandler,
    responseHandler
}