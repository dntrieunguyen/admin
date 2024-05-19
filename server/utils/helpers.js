import { validationResult } from 'express-validator';
import { HTTP_CODES } from './messages.js';

// handle Error - START

// NOT FOUND ERROR
const notFound = (req, res, next) => {
   const error = new Error(`Route ${req.originalUrl} not found!`);
   return res.status(HTTP_CODES.NOT_FOUND).json({
      success: false,
      message: error.message,
   });
};

// CREATE ERROR
const createError = (status, message) => {
   const err = new Error();
   err.status = status;
   err.message = message;
   return err;
};

// AUTOMATIC ERROR GENERATION
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

const getDateTime = date => {
   let newDate = `${date.getDate()}/${
      date.getMonth() + 1
   }/${date.getFullYear()}`;
   return newDate;
};
export {
   createError,
   errHandler,
   notFound,
   handleValidationErrors,
   getDateTime,
};
