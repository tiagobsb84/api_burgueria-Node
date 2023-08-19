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
});

//Atualizar pedido
app.put('/pedidos/:id', (request, response) => {
    const {id} = request.params;
    const {order, clientName, price} = request.body;
    const updateBody = {id, order, clientName, price};

    const checkId = pedidos.findIndex(use => use.id === id);
    if(checkId < 0) {
        return response.status(404).json({error: "Object not found"});
    }

    pedidos[checkId] = updateBody;

    return response.json(updateBody);
})

//Deletando pedido
app.delete('/pedidos/:id', (request, response) => {
    const {id} = request.params;

    const checkId = pedidos.findIndex(use => use.id === id);
    if(checkId < 0) {
        return response.status(404).json({error: 'Object not found!'});
    }

    pedidos.splice(checkId, 1);

    return response.status(204).json();
});

app.listen(port, () => {
    console.log(`Porta inicializada: ${port}`);
});