export const evaluateRisk = (amount: number, email: string) => {
    // Initialize the fraud risk score
    let riskNumber = 0;

    // Add risk for large transaction amounts
    if (amount > 100000) {
        riskNumber += 0.5;  // Very high amount
    } else if (amount > 50000) {
        riskNumber += 0.3;  // High amount
    }

    // Add risk for suspicious email domains
    const domain = email.split('@')[1];
    if (domain.endsWith('.ru') || domain.includes('test.com')) {
        riskNumber += 0.3;  // Suspicious domain
    }

    return Math.min(riskNumber, 1);
}

export const generateExplanation = (amount: number, email: string, riskScore: number) => {
    // Determine whether to call the LLM based on the risk score and generate a dynamic explanation message
    const amountComment =
        amount > 100000
            ? 'a very large transaction amount'
            : amount > 50000
                ? 'a large transaction amount'
                : 'a moderate transaction amount';

    // Evaluate the email domain; flag as suspicious if it contains known risky patterns (e.g., 'test', '.ru')
    const emailComment = email.includes('test') || email.endsWith('.ru')
        ? 'a suspicious email domain'
        : 'a valid email address';

    return `This payment was routed based on a risk score of ${riskScore.toFixed(2)}, primarily due to ${amountComment} and ${emailComment}.`;
};

// In-memory store to temporarily hold processed transactions (for simulation/demo purposes only)
export const transactionStore: any = [];