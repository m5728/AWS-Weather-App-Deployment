const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
const bodyParser = require('body-parser');

const API_KEY = process.env.API_KEY;  

app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/my-app/build')));

// Endpoint for handling the weather request
app.post('/getWeather', async (req, res) => {
  const { lat, long } = req.body;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${long}&appid=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
