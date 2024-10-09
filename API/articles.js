const express = require('express');
const router = express.Router();
const db = require('./database'); // Charger la base de données fictive
const { v4: uuidv4 } = require('uuid');

// Récupérer tous les articles
router.get('/', (req, res) => {
    res.json(db.articles);
});

// Ajouter un nouvel article
router.post('/', (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        return res.status(400).json({ message: 'Title, content, and author are required.' });
    }

    const newArticle = {
        id: uuidv4(),
        title,
        content,
        date: new Date().toLocaleDateString(),
        author
    };

    db.articles.push(newArticle);
    res.status(201).json(newArticle);
});

// Récupérer un article par ID
router.get('/:articleId', (req, res) => {
    const { articleId } = req.params;
    const article = db.articles.find(a => a.id === articleId);

    if (!article) {
        return res.status(404).json({ message: 'Article not found.' });
    }

    res.json(article);
});

module.exports = router;
