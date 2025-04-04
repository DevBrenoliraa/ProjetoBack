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
            buildAccount()
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

            buildAccount()
            return; 
        }

        console.log(chalk.green.bold('Conta criada com sucesso!'));

    }).catch((error) => {
        console.error(chalk.bgRed.black('Ocorreu um erro:'), error);
    });
}