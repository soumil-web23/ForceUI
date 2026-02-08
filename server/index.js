import express from 'express';
import cors from 'cors';
import { generateAnalyticsData } from './data.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/analytics', (req, res) => {
    const data = generateAnalyticsData();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Analytics server running on http://localhost:${PORT}`);
});
