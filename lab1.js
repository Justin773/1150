const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log("--- Bank Algorithm Simulation ---");

    let RATE_USD = 0.0;
    let RATE_MARK = 0.0;
    let CURRENT_HOUR = 0;
    let BANK_IS_OPEN = true;

    RATE_USD = parseFloat(await askQuestion("Enter today's exchange rate for US Dollars (USD per Pound): "));
    RATE_MARK = parseFloat(await askQuestion("Enter today's exchange rate for German Marks (Marks per Pound): "));

    CURRENT_HOUR = parseInt(await askQuestion("Enter the current hour (0-23): "));

    if (CURRENT_HOUR < 10 || CURRENT_HOUR >= 15) {
        console.log("We are open from 10 to 3.");
        BANK_IS_OPEN = false;
    }

    while (BANK_IS_OPEN) {
        console.log("\n--- New Customer ---");

        let choiceInput = await askQuestion("What currency would you like? (1 for USD, 2 for Marks, 0 to Close Bank): ");
        let choice = parseInt(choiceInput);

        if (choice === 0) {
            break;
        }

        let pounds = parseInt(await askQuestion("Enter Pounds: "));
        let shillings = parseInt(await askQuestion("Enter Shillings: "));
        let pence = parseInt(await askQuestion("Enter Pence: "));

        let totalPence = (pounds * 240) + (shillings * 12) + pence;
        let decimalPounds = totalPence / 240.0;
        let resultAmount = 0.0;
        let currencyName = "";

        if (choice === 1) {
            resultAmount = decimalPounds * RATE_USD;
            currencyName = "USD";
        } else if (choice === 2) {
            resultAmount = decimalPounds * RATE_MARK;
            currencyName = "German Marks";
        } else {
            console.log("Invalid currency choice.");
            continue;
        }

        console.log(`You will receive: ${resultAmount.toFixed(2)} ${currencyName}`);
    }

    console.log("Bank is now closed.");
    rl.close();
}

main();