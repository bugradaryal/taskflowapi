const fs = require('fs');
const path = require('path');

const LOG = path.join(__dirname, '../logs/erisim.log');

fs.mkdirSync(path.dirname(LOG), { recursive: true });

function logYaz(satir) {
  const zaman = new Date().toISOString();
  fs.appendFile(LOG, `${zaman} ${satir}\n`, (err) => {
    if (err) console.error('Log yazılamadı');
  });
}

module.exports = logYaz;
