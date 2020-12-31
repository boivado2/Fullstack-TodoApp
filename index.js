const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose
    .connect('mongodb://localhost/todo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Mongodb connected todo'))
    .catch((err) => console.log(err.message));

app.use(express.json());
app.use('/api/tasks', require('./routes/todos'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`connected todo ${PORT}`));
