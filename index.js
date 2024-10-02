const express = require('express');
const handles = require('./handles'); // Vérifie le chemin
const app = express();
const port = 8080;

// Route pour la page d'accueil
app.get('/', (req, res) => {
    const content = '<!DOCTYPE html>' +
        '<html>' +
        '    <head>' +
        '        <meta charset="utf-8" />' +
        '        <title>ECE AST</title>' +
        '    </head>' +
        '    <body>' +
        '       <p>Hellooo World!</p>' +
        '    </body>' +
        '</html>';
    res.send(content);
});

// Utiliser le routeur handles pour /handles
app.use('/handles', handles); // Ajoute ce code pour intégrer le routeur

// Lancer le serveur sur le port 8080
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
