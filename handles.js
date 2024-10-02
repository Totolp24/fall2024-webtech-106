const express = require('express');
const router = express.Router();

// Route pour /hello
router.get('/hello', (req, res) => {
    const name = req.query.name; // Récupérer le paramètre de requête 'name'
  
    // Vérifier si le paramètre 'name' est présent
    if (name) {
        res.send(`Hello ${name}`);
    } else {
        res.send('Hello anonymous');
    }
});

module.exports = router;
