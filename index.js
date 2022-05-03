#! /usr/bin/env node

// Benötigte Dateien importieren
const { Command } = require('commander');
const program = new Command();

//Befehlsdateien importieren
const init = require('./commands/init')

//Befehle definieren
program
    .command('init')
    .description('Initialize a new Frady project and creates all nescessary folders and files.')
    .action(init)
    .requiredOption('-g, --gitlink <string>', 'Link of the related git repo')
    .option('-b, --withbeta <integer>', 'Setup beta configuration')

//Programm parsen
program.parse()