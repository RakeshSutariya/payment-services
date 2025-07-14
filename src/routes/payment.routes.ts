import express from 'express';
import { PaymentController } from '../controllers';
import { ValidationMiddleware } from '../middlewares';
import { chargeValidation } from '../util';

const paymentRoutes = express.Router();
paymentRoutes.post('/charge', ValidationMiddleware(chargeValidation), PaymentController.charge);
paymentRoutes.get('/transactions', PaymentController.getTransactions);

export {
    paymentRoutes
}