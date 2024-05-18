#! /usr/bin/env node
import inquirer from "inquirer"

//Interface
interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(account: number): void
    deposit(account: number): void
    checkBalance(): void
}

//Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber
        this.balance = balance
    }
//Debit Money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount
        console.log(`Withdrawwal of $${amount} successful. Remaining balance: $${this.balance}`);
    }else{
        console.log("Insufficient balance.");
        
    }
}
//Credit Money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charged if more than $100 is deposit   
    } this.balance += amount;
      console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`); 
}

// Check balance 
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);   
}
}

//Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

//Create bank account

const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)
];

//Create customers
const customers: Customer[] = [
    new Customer ("Hamzah", "Khan", "Male", 35, 3162223334, accounts[0]),
    new Customer ("Foqia", "Siddiqui", "Female", 24, 3362223334, accounts[1]),
    new Customer ("Arsalan", "Khan", "Male", 35, 3462223334, accounts[2])
]

//Function to interact with bank account

async function service(){
    do {
    const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        }) 
        
       const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
         if(customer){
        console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n `);

     const ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            message: "Select an operation",
             choices: ["Depposit", "Withdraw", "Check Balance", "Exit"]
        }]);

        switch (ans.select){
            case "Depposit":
      const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to deposit:"
        })
                    
        customer.account.deposit(depositAmount.amount)
            break;

            case "Withdraw":
       const WithdrawAmount = await inquirer.prompt({
             name: "amount",
             type: "number",
             message: "Enter the amount to Withdraw:"
        })
        customer.account.withdraw(WithdrawAmount.amount)
            break;
            case "Check Balance":
        customer.account.checkBalance();
            break;
            case "Exit":
         console.log("Exiting...");
         console.log("\n Thank you for visiting our branch!");
          return;
        }
        } else{
         console.log("Invalid account number. Please enter a valid account number.");
        }

        } while(true)
        }

        service()
    