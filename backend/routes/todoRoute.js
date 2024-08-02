import express from 'express';
import { Todo } from '../models/todoModel.js';
const router = express.Router();

// route for adding a todo

router.post('/', async (req, res) => {
    try {
        const { todo, donetodo } = req.body;

        if (!todo) {
            return res.status(400).send({ message: 'Enter a todo' });
        }

        const newTodo = new Todo({
            todo, donetodo
        });

        const savedTodo = await newTodo.save();
        return res.status(201).send(savedTodo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});


// route for getting all todo

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({})
        return res.status(200).json({
            count: todos.length,
            data: todos
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
})

// route for getting a todo by id

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)
        return res.status(200).json(todo)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
})

// route for updating a todo

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await Todo.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(400).json({ message: "Todo not Found" })
        }
        return res.status(200).send({ message: "Todo Updated successfully" })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
})

// route for deleting a todo

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Todo.findByIdAndDelete(id, req.body)

        if (!result) {
            return res.status(400).json({ message: "Todo not Found" })
        }
        return res.status(200).send({ message: "Todo Deleted successfully" })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
})

// route for deleting all routes at once

router.delete('/', async (req, res) => {
    try {

        const result = await Todo.deleteMany({})
        if (!result) {
            return res.status(400).json({ message: "Todo not Found" })
        }
        return res.status(200).send({ message: "All Todo Deleted successfully" })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
})

export default router;

