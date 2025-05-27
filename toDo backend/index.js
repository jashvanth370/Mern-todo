const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

mongoose.connect('mongodb://localhost:27017/mern-app')
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => {
        console.log(err)
    })

const todoSchema = new mongoose.Schema({
    title: String,
    description: String
});

const model = mongoose.model('todo', todoSchema)

app.use(express.json());
app.use(cors())

const PORT = 4000;

app.get('/', (req, res) => {
    res.send("haiii da welcome to my first express app ");
})

// const todo =[];

//register
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = new model({ title, description })
        await newTodo.save();
        res.status(201).json(newTodo);

    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

//getAll
app.get('/todos/getAll', async (req, res) => {
    try {
        const todos = await model.find();
        res.status(200).json(todos);
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

// //getById
// app.get('/todos/:id', async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: "Invalid ID format" });
//     }
//     try {
//         const todo = await model.findById(id);
//         if (!todo) {
//             return res.status(404).json({ message: "Todo not found" });
//         }
//         res.status(200).json(todo);
//     } catch (err) {
//         console.log(err)
//         res.status(500)
//     }
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

