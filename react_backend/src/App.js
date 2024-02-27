import {useState, useEffect} from 'react';

function App() {

    const [todoLists, setTodoLists] = useState(false);

    function getTodoLists() {
        fetch('http://localhost:3001/todolists')
            .then(response => {
             return response.text();
            })
            .then(data => {
                setTodoLists(data);
            })
    }

    function getTodoItems() {
        let todo_list_id = prompt('Enter a List name');
        fetch('http://localhost:3001/todolists/1/items/' + todo_list_id)
            .then(response => {
                return response.text();
            })
            .then(data => {
                setTodoLists(data);
            })
    }

    function getItems(todo_list_id) {
        fetch('http://localhost:3001/todolists/1/items/' + todo_list_id)
            .then(response => {
                return response.text();
            })
            .then(data => {
                setTodoLists(data);
            })
    }


    function createTodoList() {
        let title = prompt('Enter a Todo List Title');
        fetch('http://localhost:3001/todolists/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getTodoLists();
            });
    }

    function createTodoItem() {
        let todo_list_id = prompt("Enter the ID number of the Todo List you'd like to add to:");
        let content = prompt('Enter content for this Todo Item:');
        let due_date = prompt('Enter due date for this Todo Item:');
        let completed = false;
        fetch('http://localhost:3001/todolists/1/items/' + todo_list_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content, due_date, completed}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getItems(todo_list_id)
            });
    }

    function updateTodoItem() {
        let todo_list_id = prompt("Please enter ID of Todo List");
        let todo_item_id = prompt("Please enter ID of Todo Item you'd like to mark completed");
        fetch('http://localhost:3001/todolists/1/items/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({todo_item_id}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getItems(todo_list_id)
            });
    }

    function deleteTodoList() {
        let todo_list_id = prompt("Please enter ID of Todo List you'd like to delete");
        fetch('http://localhost:3001/todolists/1/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({todo_list_id}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getTodoLists();
            });
    }

    function deleteTodoItem() {
        let todo_list_id = prompt("Please enter ID of Todo List");
        let todo_item_id = prompt("Please enter ID of Todo Item you'd like to delete");
        fetch('http://localhost:3001/todolists/1/items/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({todo_item_id}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getItems(todo_list_id)
            });
    }


    useEffect(() => {
        getTodoLists();
    }, []);
    return (
        <div>
            {todoLists ? todoLists : 'There are no Todo Lists'}
            <br />
            <button onClick={getTodoLists}>Get all Todo Lists</button>
            <br />
            <button onClick={createTodoList}>Add Todo List</button>
            <br />
            <button onClick={deleteTodoList}>Delete Todo List</button>
            <br/>
            <button onClick={getTodoItems}>Get Todo List Items</button>
            <br />
            <button onClick={createTodoItem}>Add item to Todo List</button>
            <br />
            <button onClick={updateTodoItem}>Mark completed</button>
            <br />
            <button onClick={deleteTodoItem}>Delete Todo Item</button>
        </div>
    );
}
export default App;