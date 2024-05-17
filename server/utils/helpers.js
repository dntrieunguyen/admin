import { HTTP_CODES } from './messages.js';

// handle Error - START

const notFound = (req, res, next) => {
   const error = new Error(`Route ${req.originalUrl} not found!`);
   return res.status(HTTP_CODES.NOT_FOUND).json({
      success: false,
      message: error.message,
   });
};

const createError = (status, message) => {
   const err = new Error();
   err.status = status;
   err.message = message;
   return err;
};

const errHandler = (err, req, res, next) => {
   const statusCode = err.status || HTTP_CODES.INTERNAL_SERVER_ERROR;
   const message = err.message;
   return res.status(statusCode).json({
      success: false,
      message,
   });
};

// handle Error - END

// handle validation - START
const handleValidationErrors = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      let message = [];
      errors.array().forEach(e => message.push(e.msg));
      return res.status(HTTP_CODES.BAD_REQUEST).json({
         success: false,
         message: message.join('\n'),
      });
   }
   return;
};
// handle validation - END

export { createError, errHandler, notFound, handleValidationErrors };
