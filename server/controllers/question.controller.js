import { Question } from '../models/Question.js';
import { createError } from '../utils/helpers.js';
import { HTTP_CODES, HTTP_MESSAGES } from '../utils/messages.js';

const getAllQuestion = async (req, res, next) => {
   try {
      const question = await Question.find();
      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: HTTP_MESSAGES[HTTP_CODES.OK],
         result: question,
      });
   } catch (error) {
      next(error);
   }
};

const updateQuestion = async (req, res, next) => {
   try {
      const { id } = req?.query;
      const data = req?.body;

      await Question.findByIdAndUpdate(id, data, { new: true });
      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: HTTP_MESSAGES[HTTP_CODES.OK],
         result: data,
      });
   } catch (error) {
      next(error);
   }
};

const deleteQuestion = async (req, res, next) => {
   try {
      const { id } = req?.query;
      await Question.deleteOne({ _id: id });
      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: HTTP_MESSAGES[HTTP_CODES.OK],
      });
   } catch (error) {
      next(error);
   }
};

const createQuestion = async (req, res, next) => {
   try {
      if (!req?.body)
         return next(createError(HTTP_CODES.BAD_REQUEST, MESSAGE.EMPTY_FIELDS));

      const newQuestion = new Question(req?.body);

      await newQuestion.save();

      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: HTTP_MESSAGES[HTTP_CODES.OK],
         newQuestion,
      });
   } catch (error) {
      next(error);
   }
};

export { createQuestion, getAllQuestion, updateQuestion, deleteQuestion };
