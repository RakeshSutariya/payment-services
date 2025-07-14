import request from 'supertest';
import express from 'express';
import { paymentRoutes } from '../src/routes/payment.routes';
import { faker } from '@faker-js/faker';
import { PaymentServices } from '../src/services';

jest.mock('../src/services');

const mockedEvaluateRisk = jest.fn();
const mockedGenerateExplanation = jest.fn();

(PaymentServices as any).evaluateRisk = mockedEvaluateRisk;
(PaymentServices as any).generateExplanation = mockedGenerateExplanation;

const app = express();
app.use(express.json());
app.use('/api/payment', paymentRoutes);

describe('POST /api/payment/charge', () => {
    afterEach(() => {
        jest.clearAllMocks();
        PaymentServices.transactionStore.length = 0;
    });

    it('should return success for low risk transaction', async () => {
        const fakeEmail = faker.internet.email();
        const fakeAmount = faker.number.int({ min: 10, max: 49 });

        mockedEvaluateRisk.mockReturnValue(0.2);
        mockedGenerateExplanation.mockResolvedValue('Low risk');

        const res = await request(app)
            .post('/api/payment/charge')
            .send({
                amount: fakeAmount,
                currency: 'USD',
                source: 'tok_visa',
                email: fakeEmail,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.status).toBe('success');
        expect(res.body.data.provider).toBe('stripe');
        expect(PaymentServices.transactionStore.length).toBe(1);
    });

    it('should block high risk transaction', async () => {
        const fakeEmail = faker.internet.email();
        const fakeAmount = faker.number.int({ min: 1000, max: 9999 });

        mockedEvaluateRisk.mockReturnValue(0.9);
        mockedGenerateExplanation.mockResolvedValue('High risk');

        const res = await request(app)
            .post('/api/payment/charge')
            .send({
                amount: fakeAmount,
                currency: 'USD',
                source: 'tok_visa',
                email: fakeEmail,
            });

        expect(res.statusCode).toBe(403);
        expect(res.body.data.status).toBe('blocked');
        expect(res.body.data.provider).toBe('blocked');
        expect(PaymentServices.transactionStore.length).toBe(1);
    });

    it('should return validation error for missing fields', async () => {
        const res = await request(app)
            .post('/api/payment/charge')
            .send({});

        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBeDefined();
    });
});

describe('GET /api/payment/transactions', () => {
    it('should return all stored transactions', async () => {
        const newVal = {
            transactionId: 'txn_test',
            provider: 'stripe',
            status: 'success',
            riskScore: 0.1,
            explanation: 'Test entry',
            timestamp: new Date(),
        };

        PaymentServices.transactionStore.push(newVal);

        const res = await request(app).get('/api/payment/transactions');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});
