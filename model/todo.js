const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 225
    },
    taskCreated: { type: Date, default: Date.now },
    taskEnd: { type: Date }
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    const schema = {
        name: Joi.string().min(3).max(225).required(),
        taskCreated: Joi.date()
    };

    return Joi.validate(task, schema);
}

exports.validateTask = validateTask;
exports.Task = Task;
