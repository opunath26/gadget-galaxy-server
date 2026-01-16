const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
    fs.readFile('./products.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Data not found");
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    
    fs.readFile('./products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        
        const products = JSON.parse(data);
        
        const product = products.find(p => p.id.toString() === id.toString());

        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Product not found");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});