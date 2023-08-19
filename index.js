const express = require('express');
const app = express();
const uuid = require('uuid');
const port = 3000;

app.use(express.json());

const pedidos = [];

app.get('/pedidos', (request, response) => {
    return response.json(pedidos);
});

app.listen(port, () => {
    console.log(`Porta inicializada: ${port}`);
})