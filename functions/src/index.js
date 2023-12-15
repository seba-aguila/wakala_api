import { https } from 'firebase-functions/v2'
import express from 'express'
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => res.status(200).send('Hey there!'));

export default https.onRequest(app);