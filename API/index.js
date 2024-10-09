const express = require('express');
const handles = require('./handles'); 
const articlesRoutes = require('./articles'); 
const commentsRoutes = require('./comments'); 
const app = express();
const port = 8080;

app.use(express.json()); 

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

app.use('/handles', handles); 
app.use('/articles', articlesRoutes); 
app.use('/articles', commentsRoutes); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
