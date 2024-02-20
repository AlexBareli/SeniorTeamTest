const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries')
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

app.get('/', (request, response) => {
	response.json({ info: 'Test Project with Node.js, Postgres and Express'})
})

app.get('/todolists', db.getTodoLists)
app.post('/todolists/:id', db.makeTodoList)
app.get('/todolists/:id/items', db.getTodoItems)
app.post('/todolists/:id/items', db.createTodoItem)
app.put('/todolists/:id/items', db.updateTodoItem)
app.delete('/todolists/:id/items', db.deleteTodoItem)
app.delete('/todolists/:id', db.deleteTodoList)

//app.get('/users/:id', db.getUserById)
//app.post('/users', db.createUser)
//app.put('/users/:id', db.updateUser)
//app.delete('/users/:id', db.deleteUser)

app.listen(PORT, () => {
	console.log('App running on PORT:', PORT)
})
