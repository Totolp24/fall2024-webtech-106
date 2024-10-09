const express = require('express');
const router = express.Router();

// Route pour /hello
router.get('/hello', (req, res) => {
    const name = req.query.name || 'anonymous';  // Utilise une valeur par défaut si 'name' n'est pas fourni
    res.send(`Hello ${name}`);
});

module.exports = router;
