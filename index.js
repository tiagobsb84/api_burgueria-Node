const express = require('express');
const app = express();
const uuid = require('uuid');
const port = 3000;

app.use(express.json());

const pedidos = [];

//Listando todos pedido
app.get('/pedidos', (request, response) => {
    return response.json(pedidos);
});

//Criando pedido
app.post('/pedidos', (request, response) => {
    const {order, clientName, price} = request.body;

    const pedido = {id: uuid.v4(), order, clientName, price, status: 'Em preparação'};

    pedidos.push(pedido);

    return response.status(201).json(pedido);
})

app.listen(port, () => {
    console.log(`Porta inicializada: ${port}`);
})