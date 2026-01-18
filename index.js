const express = require('express');
const cors = require('cors');
const products = require('./products.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Gadget Galaxy Backend is running...");
});

app.get('/api/products', (req, res) => {
    try {
        res.json(products);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id.toString() === id.toString());

    if (product) {
        res.json(product);
    } else {
        res.status(404).send("Product not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;