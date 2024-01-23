const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const todos = []; // In-memory storage for todo items


app.get(['/', '/todos'], (req, res) => { // get all todos (The ['/', '/todos'] just means either endpoint will hit here.)
  const currentTodos = todos.length > 0 ? todos : { message: "Nothing to do!" };
  
  res.header("Access-Control-Allow-Origin", "*"); // only needed if serving from same origin as client
  res.json(currentTodos);
});


app.post('/todo', (req, res) => { // Create a new todo item
  try { req.body = JSON.parse(Object.keys(req.body)[0]); } catch {} // only needed if serving from same origin as client
  const { title } = req.body;

  if (!title) { return res.status(400).json({ error: 'Title is required' }); }

  const todo = {
    id: todos.length + 1,
    title, 
    completed: false,
  };

  todos.push(todo);

  res.header("Access-Control-Allow-Origin", "*") // only needed if serving from same origin as client
  res.status(201).json(todo);
});


app.put('/todo/:id', (req, res) => { // Update a todo item by ID
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title) {
    todo.title = title;
  }
  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.header("Access-Control-Allow-Origin", "*"); // only needed if serving from same origin as client
  res.json(todo);
});


app.delete('/todo/:id', (req, res) => { // Delete a todo item by ID
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);

  res.header("Access-Control-Allow-Origin", "*"); // only needed if serving from same origin as client
  res.status(204).end();
});


// ⭐️ BONUS GET Individual by ID
app.get('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  const todo = todos[index];

  res.header("Access-Control-Allow-Origin", "*"); // only needed if serving from same origin as client
  res.json(todo);
});

// ⭐️ BONUS Handle 404
app.use(function(req, res, next) {
  var err = new Error('Sorry, that page is not found.');
  err.status = 404;
  next(err);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});