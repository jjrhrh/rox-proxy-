const express = require('express');
const axios = require('axios');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/fetch', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('no url');
    const r = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      responseType: 'arraybuffer'
    });
    res.set('Content-Type', r.headers['content-type']);
    res.send(r.data);
  } catch(e) {
    res.status(500).send('error');
  }
});

app.listen(process.env.PORT || 3000);
