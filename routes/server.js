const router = require('express').Router(); // Import the Express Router
const TodoList = require('../models/todo_model'); // Import the TodoList model

// creating tasks using router
router.post('/create-tasks', async (req, res) => {
    try {       
        const { description, category, date } = req.body;

        // Create a new task using the TodoList model
        const task = new TodoList({
            description,
            category,
            dueDate: date
        });

        // Save the task to the database
        await task.save();

        // Redirect to the home page
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// fetching and rendering tasks on the home page using router
router.get('/', async (req, res) => {
    try {
        // Retrieve tasks from the database, excluding some fields, and sort by ID
        let tasks = await TodoList.find().select('-updatedAt -createdAt -__v').sort({ _id: -1 });

        // Render the 'index' view and pass the tasks as data
        res.render('index', { tasks: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch tasks.');
    }
});

// post route for deleting tasks
router.post('/delete-task', async function (req, res) {
    try {
        // Extract task IDs from the request body
        const taskIds = Object.keys(req.body);

        // Iterate through the task IDs and delete the corresponding tasks
        for (const taskId of taskIds) {
            await TodoList.findByIdAndDelete(taskId);
        }

        // Redirect back to the previous page
        return res.redirect('back');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Export the router
module.exports = router; 