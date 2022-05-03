// Benötigte Dateien importieren
const { exec } = require("child_process");
const clone = require('git-clone');
const makeDir = require('make-dir');
const prompt = require("prompt-sync")({ sigint: true });
const fs = require('fs');

//Funktion ausführen
function init () {

    //Benötigte Daten abfragen
    const organisation = prompt("Organisation: ", "SGFS");
    const projectname = prompt("Package name: ", "Test");
    const description = prompt("Description: ", "Das ist eine Beschreibung");
    const authorname = prompt("Author name: ", "Adrian Koelliker");
    const authoremail = prompt("Author email: ", "adriankoelliker@hotmail.ch");

    //Funktionsvariabeln definieren
    var gitlink = this.opts().gitlink;
    var withbeta = (this.opts().withbeta == 1);

    //Repository in aktuelles Verzeichnis klonen
    console.log("Cloning git repo...");
    clone(gitlink, "./");

    //Ordnerstruktur erstellen
    console.log("Creating folder structure...");
    makeDir('content');
    makeDir('content/components');
    makeDir('content/config');
    makeDir('content/controllers');
    makeDir('content/css');
    makeDir('content/entities');
    makeDir('content/files');
    makeDir('content/files/fonts');
    makeDir('content/files/img');
    makeDir('content/files/files');
    makeDir('content/js');
    makeDir('content/routers');

    //Composer einrichten
    let composersetting = { 
      "name": organisation + "/" + projectname,
      "description": description, 
      "authors": {
        "name": authorname,
        "email": authoremail
      },
      "autoload": {
        "psr-4": {
          projectname + "\\\\Controllers\\": "controllers/",

        }
      }
  };

  let data1 = JSON.stringify(composersetting);
  fs.writeFileSync('./content/composer.json', data);

    //Installiere Composer
    console.log("Installing composer...");
    exec('composer init -n --name "' + organisation.toLowerCase() + "/" + projectname.toLowerCase() + '" --description "' + description + '" --author "' + authorname + ' <' + authoremail + '>"', {cwd: "./content"});
    exec("composer require nikic/fast-route", {cwd: "./content"})
    exec("composer install", {cwd: "./content"});

    
    
    let data = JSON.stringify(student);
    fs.writeFileSync('student-2.json', data);

    //Installiere npm
    console.log("Installing npm...");
    exec("npm init -y", {cwd: "./content"});
    exec("npm install", {cwd: "./content"});

    //.gitignore Datei erstellen
    console.log("Creating .gitignore file...");
    fs.copyFile(__dirname + '/../files/.gitignore', '.gitignore', (err) => {
      //console.log('source.txt was copied to destination.txt');
    });

    //.htaccess Datei erstellen
    console.log("Creating .htaccess file...");
    fs.copyFile(__dirname + '/../files/.htaccess', './content/.htaccess', (err) => {
      //console.log('source.txt was copied to destination.txt');
    });

    //Index Datei erstellen

   

}

module.exports = init

/*
exec('composer init -n --name "' + organisation.toLowerCase() + "/" + projectname.toLowerCase() + '" --description "' + description + '" --author "' + authorname + ' <' + authoremail + '>"', {cwd: "./content"}, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
*/