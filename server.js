const express = require('express');
const app = express();
app.use(express.json());

// Mock scores endpoint
app.get('/api/scores', (req, res) => {
  res.json([
    { street: 'Main St', score: 80, lat: 40.7, lon: -74 },
    { street: '2nd Ave', score: 65, lat: 40.8, lon: -73.9 }
  ]);
});

// Keep this LAST
app.listen(3000, () => console.log('Server running on port 3000'));
