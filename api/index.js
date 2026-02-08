import express from 'express';
import cors from 'cors';
import { generateAnalyticsData } from './data.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Update route to match the proxy/rewrite path
app.get('/api/analytics', (req, res) => {
    const data = generateAnalyticsData();
    res.json(data);
});

// Export app for Vercel Serverless
export default app;

// Only listen if not running in Vercel (local dev)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Analytics server running on http://localhost:${PORT}`);
    });
}
