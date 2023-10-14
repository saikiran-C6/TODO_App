// require Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new schema for tasks
const taskSchema = new Schema(
    {
        description: String,
        category: String,
        dueDate: Date,
    });

// export modules to other files
module.exports = mongoose.model('Todo', taskSchema);