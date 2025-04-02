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
        }
    }).catch(err => console.log(err));
}

function createAccount() {
    console.log(chalk.bgGreen.black.bold('Parabéns por escolher o BL Banking!'));
    console.log(chalk.green.bold('Defina as opções da sua conta a seguir!'));

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Nome:',
            validate: function (input) {
                if (input.length < 3) {
                    return 'O nome precisa ter pelo menos 3 caracteres.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'age',
            message: 'Idade:',
            validate: function (input) {
                if (isNaN(input) || input <= 0) {
                    return 'Por favor, insira uma idade válida.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'E-mail:',
            validate: function (input) {
                const emailPattern = /\S+@\S+\.\S+/;
                if (!emailPattern.test(input)) {
                    return 'Por favor, insira um e-mail válido.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'cpf',
            message: 'CPF:',
            validate: function (input) {
                const cpfPattern = /^\d{11}$/;
                if (!cpfPattern.test(input)) {
                    return 'CPF inválido! Digite apenas números (11 dígitos).';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'birthdate',
            message: 'Data de Nascimento (DD/MM/AAAA):',
            validate: function (input) {
                const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                if (!datePattern.test(input)) {
                    return 'Data inválida! Use o formato DD/MM/AAAA.';
                }
                return true;
            }
        }
    ]).then((answers) => {
        console.log(chalk.blue.bold('\nConta criada com sucesso!'));
        console.log(answers);
    }).catch(err => console.log(err));
}
