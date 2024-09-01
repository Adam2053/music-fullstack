import express from 'express';
import cors from 'cors';
import playRoutes from './routes/player.routes.js'

const app = express();
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send("Api is running")
})

// routes
app.use('/api/v1', playRoutes);

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000")
})