const express = require('express');
const logger = require('./middleware/logger');
const gorevlerRouter = require('./routes/gorevler');
const raporlarRouter = require('./routes/raporlar');

const app = express();

// middleware
app.use(express.json());
app.use(logger);

// route
app.get('/', (req, res) => {
  res.json({ mesaj: 'TaskFlow API çalışıyor', endpoint: '/tasks' });
});
app.use('/tasks', gorevlerRouter);
app.use('/reports', raporlarRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ basarili: false, hata: 'Bulunamadı', url: req.url });
});

// hata yönetimi
app.use((err, req, res, next) => {
  console.error('Hata:', err.message);
  res.status(err.status || 500).json({ basarili: false, hata: err.message });
});

module.exports = app;
