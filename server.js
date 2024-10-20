// Importa le librerie necessarie
const express = require('express');
const path = require('path');
const fs = require('fs');

// Crea un'app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Abilita il parsing del JSON
app.use(express.json());

// Serve i file statici dalla cartella "public"
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint per ottenere i link
app.get('/links', (req, res) => {
    fs.readFile('links.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Errore nel caricamento dei link');
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint per aggiungere un link
app.post('/add-link', (req, res) => {
    const newLink = req.body.link;

    fs.readFile('links.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Errore nel caricamento dei link');
        }

        const links = JSON.parse(data);
        links.push(newLink); // Aggiungi il nuovo link all'array esistente

        // Scrivi di nuovo il file JSON
        fs.writeFile('links.json', JSON.stringify(links, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Errore nel salvataggio del link');
            }
            res.status(201).send('Link aggiunto con successo');
        });
    });
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});