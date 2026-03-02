/*const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.static('public'));

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/todo')
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

// Schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
});

const Todo = mongoose.model('Todo', todoSchema);

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server started on port 3000"));   */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// ------------------ DATABASE CONNECTION ------------------

// Use Railway environment variable
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log("DB Error:", err));

// ------------------ SCHEMA ------------------

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
});

const Todo = mongoose.model('Todo', todoSchema);

// ------------------ ROUTES ------------------

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ------------------ PORT ------------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));