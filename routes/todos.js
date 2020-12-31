const express = require('express');
const { Task, validateTask } = require('../model/todo');

const router = express.Router();

router.get('/', async (req, res) => {
    let task = await Task.find().sort({ name: +1 });
    res.send(task);
});

router.get('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id);
    if (!task) res.status(404).send('task ID not found');
    res.send(task);
});

router.post('/', async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let task = new Task({
        name: req.body.name,
        taskEnd: req.body.taskEnd
    });

    task = await task.save();
    res.send(task);
});

router.put('/:id', async (req, res) => {
    // const { error } = validateTask(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let task = await Task.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );
    if (!task) res.status(404).send('task ID not found');

    res.send(task);
});

router.delete('/:id', async (req, res) => {
    let task = await Task.findByIdAndRemove(req.params.id);
    if (!task) res.status(404).send('task ID not found');
    res.send(task);
});

module.exports = router;
