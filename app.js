const express = require('express');
const app = express();
const taskSchema = require('./models/task');

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

app.get("/todos", async (req, res) => {
    const Todos = await taskSchema.find({});
    res.json({ Todos });
  });
// Get a task by id
app.get('/todos/:_id', async (req, res) => {
    try {
        const task = await taskSchema.findById(req.params._id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).send('Error fetching task: ' + err.message);
    }
});

// Add a new task
app.post('/add', async (req, res) => {
    const { id, title, description } = req.body;
    const newTask = new taskSchema({ id, title, description });
    try {
        await newTask.save();
        res.status(201).send('Task created successfully');
    } catch (err) {
        res.status(400).send('Error creating task: ' + err.message);
    }
});

// Delete a task by id
app.delete('/delete/:id', async (req, res) => {
    try {
        const task = await taskSchema.deleteOne({ id: parseInt(req.params.id) });
        if (task.deletedCount === 0) {
            return res.status(404).send('No task found');
        }
        res.status(204).send(); // No content after deletion
    } catch (err) {
        res.status(400).send('Error deleting task: ' + err.message);
    }
});

// Update a task by id
app.post('/update/:id', async (req, res) => {
    try {
        const task = await taskSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).send('No task found');
        }
        res.status(200).send('Task updated successfully');
    } catch (err) {
        res.status(400).send('Error updating task: ' + err.message);
    }
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});
