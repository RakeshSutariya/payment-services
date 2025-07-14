import express from 'express';
import { paymentRoutes } from './payment.routes';

const routes = express.Router();
routes.use('/payment', paymentRoutes);

export {
    routes
}