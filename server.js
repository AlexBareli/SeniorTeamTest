const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const db = require('./queries')
const PORT = process.env.PORT || 3001;

server.use(express.json());

server.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Access-Control-Allow-Headers"
	);
	next();
});

server.get('/', (request, response) => {
	response.json({ info: 'Test Project with Node.js, Postgres and Express'})
})

server.get('/todolists', db.getTodoLists)
server.post('/todolists/:id', db.makeTodoList)
server.get('/todolists/:id/items/:listid', db.getTodoItems)
server.post('/todolists/:id/items/:listid', db.createTodoItem)
server.put('/todolists/:id/items/', db.updateTodoItem)
server.delete('/todolists/:id/items', db.deleteTodoItem)
server.delete('/todolists/:id', db.deleteTodoList)

server.listen(PORT, () => {
	console.log('App running on PORT:', PORT)
})
