import { PaymentServices } from "../services";
import { response_messages, responseHandler, status_codes } from "../util";

export const PaymentController = {

    // Handles charging a payment and evaluating fraud risk
    async charge(req, res) {
        try {
            // Extract required fields from request body
            const { amount, currency, source, email } = req.body;

            // Evaluate fraud risk score based on amount and email
            const riskScore = PaymentServices.evaluateRisk(amount, email);

            // Generate a natural-language explanation based on risk
            const explanation = await PaymentServices.generateExplanation(amount, email, riskScore);

            // Construct a transaction object with metadata
            const transaction = {
                transactionId: `txn_${Date.now()}`,
                provider: riskScore < 0.5 ? 'stripe' : 'blocked',
                status: riskScore < 0.5 ? 'success' : 'blocked',
                riskScore,
                explanation,
                timestamp: new Date(),
            };

            // Store the transaction in the in-memory store
            PaymentServices.transactionStore.push(transaction);

            // Send appropriate response based on risk level
            if (riskScore < 0.5) {
                responseHandler(res, status_codes.SUCCESS, response_messages.SUCCESS, transaction);
            } else {
                responseHandler(res, status_codes.FORBIDDEN, response_messages.FAILED, transaction);
            }
        } catch (err) {

            // Handle unexpected errors gracefully
            responseHandler(res, status_codes.ERROR, err.message, err);
        }
    },

    // Retrieves the list of all stored transactions
    async getTransactions(req, res) {
        try {
            // Return all transactions from the in-memory store
            responseHandler(res, status_codes.SUCCESS, response_messages.SUCCESS, PaymentServices.transactionStore);
        } catch (err) {
            // Handle unexpected errors
            responseHandler(res, status_codes.ERROR, err.message, err);
        }
    },
}