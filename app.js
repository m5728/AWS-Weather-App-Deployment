const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const API_KEY = process.env.API_KEY;  
const mongoURI = process.env.MONGO_URI

app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/my-app/build')));

app.post('/getWeather', async (req, res) => {
  const { lat, long } = req.body;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${long}&appid=${API_KEY}`);
    
    // Connect to MongoDB
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    
    const db = client.db('notetakingapp');
    const collection = db.collection('notes');

    await collection.insertOne({
      latitude: lat,
      longitude: long,
      weather_data: response.data
    });

    client.close();
    
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching weather data or writing to database' });
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/my-app/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
