const logYaz = require('../utils/logYaz');

const logger = (req, res, next) => {
  const baslangic = Date.now();

  res.on('finish', () => {
    const sure = Date.now() - baslangic;
    const satir = `${req.method} ${req.originalUrl} ${res.statusCode} ${sure}ms`;
    console.log(`[${new Date().toLocaleTimeString('tr-TR')}] ${satir}`);
    logYaz(satir);
  });

  next();
};

module.exports = logger;
