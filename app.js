//const db = require('./DB/db');
const express = require('Express');
const app = express();
const user = require('./routes/User.js');
const product = require('./routes/Product');
const order = require('./routes/orderRoutes');
const category = require('./routes/categoryRoutes');
const logger = require('./logs/logger');
const db = require('./DB/mongoose');
const env = require('./evnModel');
const path = require('path');
const { validatorErrorSymbol } = require('mongoose/lib/helpers/symbols');
const port = env.port;

app.use(express.static('Static'));

db.connect();

app.use(express.json());

app.use('/api/user', user);

app.use('/api/product', product);

app.use('/api/order', order);

app.use('/api/category', category);

app.use((err, req, res, next) => {
    if (err.errors)
        res.status(400).send("its not valid !");
    logger.error(err);
    res.status(500).send('there is an error ! 🤐');
});
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './Static/404.html'))
})


app.listen(port, () => { logger.info(`this is a server running on port ${port}`) });
