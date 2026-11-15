const fs = require('fs');
const path = require('path');

const DOSYA_YOLU = path.join(__dirname, '../data/veriler.json');

function gorevleriOku() {
  try {
    const icerik = fs.readFileSync(DOSYA_YOLU, 'utf8');
    return JSON.parse(icerik);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []; 
    }
    if (err instanceof SyntaxError) {
      console.error('JSON bozuk');
      return [];
    }
    throw err; 
  }
}

function yedekAl() {
  if (!fs.existsSync(DOSYA_YOLU)) return;
  fs.copyFileSync(DOSYA_YOLU, DOSYA_YOLU + '.bak');
}

function gorevleriKaydet(gorevler) {
  try {
    fs.mkdirSync(path.dirname(DOSYA_YOLU), { recursive: true });
    const gecici = DOSYA_YOLU + '.tmp';

    yedekAl();
    fs.writeFileSync(gecici, JSON.stringify(gorevler, null, 2), 'utf8');
    fs.renameSync(gecici, DOSYA_YOLU); // ya tam olur ya hiç
    return true;
  } catch (err) {
    console.error('Yazma hatası:', err.message);
    return false;
  }
}

module.exports = { gorevleriOku, gorevleriKaydet };
