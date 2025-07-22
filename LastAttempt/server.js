
const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express.json());

// Redis connection
const client = redis.createClient({
  url: 'redis://default:tGuIMAkOdKgsTuoocRRYFefPwgdSDNPq@ballast.proxy.rlwy.net:43153'
});

client.on('error', (err) => console.error('Redis Error:', err));
client.on('connect', () => console.log('✅ Connected to Redis'));

// Initialize Redis connection
(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

// GET /api/data - Get all data
app.get('/api/data', async (req, res) => {
  try {
    //get all keys
    const keys = await client.keys('*');
    if (keys.length === 0) return res.json([]);
    //get each data 
    const data = [];
    //push into your data object. 
    for (const key of keys) {
      const value = await client.get(key);
      if (value) {
        data.push({ id: key, data: JSON.parse(value) });
      }
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// GET /api/data/:id - Get specific data
app.get('/api/data/:id', async (req, res) => {
  try {
    const value = await client.get(req.params.id); //searching redis for that ID
    //if value doesnt exist then say data not found and if found then parse like line 60
    if (!value) return res.status(404).json({ error: 'Data not found' });
    
    res.json({ id: req.params.id, data: JSON.parse(value) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// POST /api/data - Create new data
app.post('/api/data', async (req, res) => {
  try {
    const { id, data } = req.body;
    if (!id || !data) return res.status(400).json({ error: 'ID and data are required' });

    const exists = await client.exists(id);
    if (exists) return res.status(409).json({ error: 'ID already exists' });
//actually putting into the database. 
    await client.set(id, JSON.stringify(data));
    res.status(201).json({ id, data, message: 'Data created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create data' });
  }
});

// PUT /api/data/:id - Update data
app.put('/api/data/:id', async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Data is required' });

    const exists = await client.exists(req.params.id);
    if (!exists) return res.status(404).json({ error: 'Data not found' });

    await client.set(req.params.id, JSON.stringify(data));
    res.json({ id: req.params.id, data, message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// DELETE /api/data/:id - Delete data
app.delete('/api/data/:id', async (req, res) => {
  try {
    const exists = await client.exists(req.params.id);
    if (!exists) return res.status(404).json({ error: 'Data not found' });

    await client.del(req.params.id);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

app.listen(PORT, () => {
  console.log(`&#x1f680; Server running on port ${PORT}`);
});