// npm install chalk@4.1.2
// npm install inquirer@8.1.2

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

operation();

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ],
        }
    ]).then((answer) => {
        const action = answer['action'];

        if (action === 'Criar conta') {
            createAccount();
            buildAccount();
        }
        else if (action === 'Consultar saldo') {
            getAccountBalance();
        }
        else if (action === 'Depositar') {
            deposit();
        }
        else if (action === 'Sacar') {
            withdraw();
        }
        else if (action === 'Sair') {
            console.log(chalk.blue('Obrigado por utilizar o BL Banking!'));
        }
    }).catch(err => console.log(err));
}

function createAccount() {
    console.log(chalk.bgGreen.black.bold('Parabéns por escolher o BL Banking!'));
    console.log(chalk.green.bold('Defina as opções da sua conta a seguir!'));
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'AccountName',
            message: 'Digite um nome para sua conta: ',
        },
    ]).then((answer) => {
        const AccountName = answer['AccountName'];

        console.info(`Conta escolhida: ${AccountName}`);

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts');
        }

        if (fs.existsSync(`accounts/${AccountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, insira outro nome.'));
            buildAccount();
            return; 
        }

        fs.writeFileSync(
            `accounts/${AccountName}.json`, '{"Balance": 0}', 
            function(err) {
                if (err) {
                    console.log(err);
                }
            }
        );

        console.log(chalk.green.bold('Conta criada com sucesso! Mais uma conta com o saldo ZERO!'));
        operation();

    }).catch((error) => {
        console.error(chalk.bgRed.black.bold('Ocorreu um erro:'), error);
    });
}

function deposit() {
    inquirer.prompt([
        {
            name: 'AccountName',
            message: 'Qual o nome da sua conta? '
        }
    ]).then((answer) => {
        const AccountName = answer['AccountName'];
        if (!checkAccount(AccountName)) {
            return deposit();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Digite o valor do depósito: ',
            }
        ]).then((answer) => {
            const amount = parseFloat(answer['amount']);
            if (isNaN(amount) || amount <= 0) {
                console.log(chalk.bgRed.black('Valor inválido! Tente novamente.'));
                return deposit();
            }
            addAmount(AccountName, amount);
            operation();
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
}

function checkAccount(AccountName) {
    if (!fs.existsSync(`accounts/${AccountName}.json`)) {
        console.log(chalk.bgRed.black('Conta inexistente, tente novamente!'));
        return false;
    }
    return true;
}

function addAmount(AccountName, amount) {
    const accountData = getAccount(AccountName);

    if (accountData === null) {
        console.log(chalk.bgRed.black('Erro ao acessar os dados da conta.'));
        return;
    }

    const newBalance = accountData.Balance + amount;
    const updatedData = { "Balance": newBalance };

    fs.writeFileSync(`accounts/${AccountName}.json`, JSON.stringify(updatedData));

    console.log(chalk.green.bold(`Depósito de ${amount} realizado com sucesso! Novo saldo: ${newBalance}`));
}

function getAccount(AccountName) {
    try {
        const data = fs.readFileSync(`accounts/${AccountName}.json`, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log(chalk.bgRed.black('Erro ao ler a conta.'));
        return null;
    }
}

function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'AccountName',
            message: 'Qual o nome da sua conta para consultar o saldo? '
        }
    ]).then((answer) => {
        const AccountName = answer['AccountName'];
        if (!checkAccount(AccountName)) {
            return getAccountBalance();
        }

        const accountData = getAccount(AccountName);
        if (accountData) {
            console.log(chalk.green.bold(`Saldo atual: R$ ${accountData.Balance}`));
        }
        operation();
    }).catch((err) => console.log(err));
}

function withdraw() {
    // Função de saque (a ser implementada)
}
