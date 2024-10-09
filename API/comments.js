const express = require('express');
const router = express.Router();
const db = require('./database'); // Charger la base de données fictive
const { v4: uuidv4 } = require('uuid');

// Récupérer tous les commentaires pour un article donné
router.get('/:articleId/comments', (req, res) => {
    const { articleId } = req.params;
    const comments = db.comments.filter(c => c.articleId === articleId);

    if (comments.length === 0) {
        return res.status(404).json({ message: 'No comments found for this article.' });
    }

    res.json(comments);
});

// Ajouter un commentaire à un article
router.post('/:articleId/comments', (req, res) => {
    const { articleId } = req.params;
    const { content, author } = req.body;

    if (!content || !author) {
        return res.status(400).json({ message: 'Content and author are required.' });
    }

    const newComment = {
        id: uuidv4(),
        timestamp: Date.now(),
        content,
        articleId,
        author
    };

    db.comments.push(newComment);
    res.status(201).json(newComment);
});

// Récupérer un commentaire par ID
router.get('/:articleId/comments/:commentId', (req, res) => {
    const { articleId, commentId } = req.params;
    const comment = db.comments.find(c => c.articleId === articleId && c.id === commentId);

    if (!comment) {
        return res.status(404).json({ message: 'Comment not found.' });
    }

    res.json(comment);
});

module.exports = router;
