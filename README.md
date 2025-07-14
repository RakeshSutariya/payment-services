# Payment Services

## Overview

```bash
A simple Node.js + TypeScript API that simulates fraud detection and routes payments to Stripe or blocks them, using an LLM-generated explanation.
```

## Features

```bash
- POST /charge — process a simulated charge with fraud detection
- GET /transactions — view all processed charges
- LLM integration stub for risk explanations
- Swagger UI at `/api-docs`
```

## Node Version

```bash
22.11.0
```

## NPM Version

```bash
10.9.0
```

## .env File Setup

```bash
    - Create a new file named .env in the root directory of your project.
    - Open the existing simple_env file.
    - Copy all the contents from simple_env.
    - Paste the copied content into the newly created .env file.
    - Save the .env file.
```

## Setup Instructions

Commands :
```bash
npm install
```

## Run Project

Commands :
```bash
npm start
```

## Run Test Cases

Commands :
```bash
npm run test
```

## Description of fraud logic and LLM usage

```bash
    * Risk Scoring Heuristics
        - Each transaction is evaluated based on the following criteria:

        1. Transaction Amount
            - Low amounts (e.g., < $1000) are considered low risk.
            - High amounts (e.g., > $50,000) increase the risk score.
            - Very large amounts (e.g., > $1,00,000) are flagged as very high risk.

        2. Email Domain
            - Free or suspicious domains like @mailinator.com, @example.com, @fraud.com, etc., are flagged.
            - Reputable domains like @gmail.com, @yahoo.com, @outlook.com are considered neutral.

        3. Combined Risk Score
            - The final risk score is a float between 0 (low risk) and 1 (high risk).
            - Transactions with a score:
                < 0.5 are accepted.
                >= 0.5 are blocked.

    * LLM Integration: Natural Language Explanation
        - Example Output:
            1. Low-Risk Transaction
                - "The transaction is considered low risk due to a small amount and a reputable email domain."

            2. High-Risk Transaction
                - "The transaction was blocked due to a very high transaction amount and a suspicious email domain."
```

## Explanation of any assumptions or tradeoffs

```bash
    1. Assumption: 
        - Fraud can be inferred from just the amount and email domain.

    2. Tradeoff: 
        - In reality, fraud detection requires complex behavioral and contextual data (IP, device fingerprint, past behavior, etc.). This simplification reduces accuracy but keeps the logic transparent and testable for demo purposes.
```