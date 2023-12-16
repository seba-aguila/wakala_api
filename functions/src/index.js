const userRoutes = require('./routes/userRoutes');
const wakalaRoutes = require('./routes/wakalaRoutes');
const { https } = require('firebase-functions/v2');
const express = require('express');

const app = express();

app.use(express.json());
app.use('/api/usuarios', userRoutes);
app.use('/api/wakalas', wakalaRoutes);

app.get('/', (req, res) => res.status(200).send('Hey there!'));

exports.app = https.onRequest(app);