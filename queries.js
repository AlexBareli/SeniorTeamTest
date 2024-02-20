const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'todo_api',
    password: 'bareli',
    port: 5432,
})

// Post
const makeTodoList = (request, response) => {
    const id = parseInt(request.params.id)
    const {title} = request.body
    pool.query('INSERT INTO todo_list (title, user_id) VALUES ($1, $2)', [title, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Get
const getTodoLists = (request, response) => {
    pool.query('SELECT * FROM todo_list ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Post
const createTodoItem = (request, response) => {
    const {todo_list_id, content, due_date, completed} = request.body
    pool.query('INSERT INTO todo_items (todo_list_id, content, due_date, completed) VALUES ($1, $2, $3, $4)',
         [todo_list_id, content, due_date, completed], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Get
const getTodoItems = (request, response) => {
    const {todo_list_id} = request.body
    pool.query('SELECT * FROM todo_items WHERE todo_list_id = $1', [todo_list_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Put
const updateTodoItem = (request, response) => {
    const {todo_item_id} = request.body
    pool.query('UPDATE todo_items SET completed = TRUE WHERE id = $1', [todo_item_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({'Todo Item Modified with ID:': todo_item_id})
    })
}

// Delete
const deleteTodoItem = (request, response) => {
    const {todo_item_id} = request.body
    pool.query('DELETE FROM todo_items WHERE id = $1', [todo_item_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({'Todo Item Deleted with ID:': todo_item_id})
    })
}

// Delete
const deleteTodoList = (request, response) => {
    const {todo_list_id} = request.body
    pool.query('DELETE FROM todo_list WHERE id = $1', [todo_list_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({'Todo List Deleted with ID:': todo_list_id})
    })
}

module.exports = {
    getTodoLists,
    makeTodoList,
    createTodoItem,
    getTodoItems,
    updateTodoItem,
    deleteTodoItem,
    deleteTodoList
}