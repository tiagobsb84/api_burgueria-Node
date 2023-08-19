const express = require('express');
const app = express();
const uuid = require('uuid');
const port = 3000;

app.use(express.json());

const pedidos = [];

//Adicionando middleware para auxiliar em códigos repetidos.
const middlewareFindIndex = (request, response, next) => {
    const {id} = request.params;
    const checkId = pedidos.findIndex(use => use.id === id);
    if(checkId < 0) {
        return response.status(404).json({error: "Object not found"});
    }

    request.userId = id;
    request.toCheckId = checkId;

    next();
}

const middlewareFind = (request, response, next) => {
    const {id} = request.params;

    const checkId = pedidos.find(use => use.id === id);
    if(!checkId) {
        return response.status(404).json({error: 'Object not found!'});
    }

    request.userId = id;
    request.toCheckId = checkId;
    
    next();
}

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
app.put('/pedidos/:id', middlewareFindIndex,(request, response) => {
    const id = request.userId;
    const checkId = request.toCheckId;
    const {order, clientName, price} = request.body;
    const updateBody = {id, order, clientName, price};

    pedidos[checkId] = updateBody;

    return response.json(updateBody);
});

//Deletando pedido
app.delete('/pedidos/:id', middlewareFindIndex, (request, response) => {
    const checkId = request.toCheckId;

    pedidos.splice(checkId, 1);

    return response.status(204).json();
});

//Buscando apenas um pedido
app.get('/pedidos/:id', middlewareFind, (request, response) => {
    const id = request.userId;
    const checkId = request.toCheckId;

    return response.json(checkId);
});

//Alterando um atributo pelo id
app.patch('/pedidos/:id', middlewareFind, (request, response) => {
    const id = request.userId;
    const checkId = request.toCheckId;

    checkId.status = 'pronto';

    return response.json(checkId);
});


app.listen(port, () => {
    console.log(`Porta inicializada: ${port}`);
});