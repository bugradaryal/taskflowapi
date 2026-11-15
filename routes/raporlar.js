const express = require('express');
const router = express.Router();
const { gorevleriOku } = require('../utils/dosya');

// ─── GET /reports/completed ─────────────────────────
router.get('/completed', (req, res) => {
  const adet = gorevleriOku().filter(g => g.status === 'completed').length;
  res.json({ basarili: true, rapor: 'completed', adet });
});

// ─── GET /reports/pending ───────────────────────────
router.get('/pending', (req, res) => {
  const adet = gorevleriOku().filter(g => g.status === 'pending').length;
  res.json({ basarili: true, rapor: 'pending', adet });
});

// ─── GET /reports/summary ───────────────────────────
router.get('/summary', (req, res) => {
  const gorevler = gorevleriOku();

  const bekleyen = gorevler.filter(g => g.status === 'pending').length;
  const devamEden = gorevler.filter(g => g.status === 'in-progress').length;
  const tamamlanan = gorevler.filter(g => g.status === 'completed').length;

  const dusuk = gorevler.filter(g => g.priority === 'low').length;
  const orta = gorevler.filter(g => g.priority === 'medium').length;
  const yuksek = gorevler.filter(g => g.priority === 'high').length;

  const atanmamis = gorevler.filter(g => !g.assignee).length;

  res.json({
    basarili: true,
    toplam: gorevler.length,
    durum: { pending: bekleyen, 'in-progress': devamEden, completed: tamamlanan },
    oncelik: { low: dusuk, medium: orta, high: yuksek },
    atanmamis
  });
});

module.exports = router;