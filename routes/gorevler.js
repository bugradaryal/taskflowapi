const express = require('express');
const router = express.Router();
const { gorevleriOku, gorevleriKaydet } = require('../utils/dosya');
const { idDogrula, gorevDogrula, sorguDogrula } = require('../middleware/dogrula');

// GET /tasks 
router.get('/', sorguDogrula, (req, res) => {
  const { status, priority, sort, page, limit } = req.query;

  let sonuc = gorevleriOku();


  if (status) sonuc = sonuc.filter(g => g.status === status);
  if (priority) sonuc = sonuc.filter(g => g.priority === priority);

  if (sort === 'createdAt') {
    sonuc.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === 'title') {
    sonuc.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
  } else if (sort === 'priority') {
    const sira = { high: 1, medium: 2, low: 3 };
    sonuc.sort((a, b) => (sira[a.priority] || 4) - (sira[b.priority] || 4));
  }

  if (page || limit) {
    const sayfaNo = Math.max(1, Number(page) || 1);
    const limitNo = Math.min(50, Math.max(1, Number(limit) || 10));
    const toplam = sonuc.length;
    const bas = (sayfaNo - 1) * limitNo;

    return res.json({
      basarili: true,
      sayfa: sayfaNo,
      limit: limitNo,
      toplam,
      toplamSayfa: Math.ceil(toplam / limitNo),
      data: sonuc.slice(bas, bas + limitNo)
    });
  }
  res.json({ basarili: true, adet: sonuc.length, data: sonuc });
});

// GET /tasks/search?keyword=backend 
router.get('/search', (req, res) => {
  const { keyword } = req.query;

  if (!keyword)
    return res.status(400).json({ basarili: false, hata: 'keyword parametresi zorunludur' });

  const aranan = keyword.trim().toLowerCase();
  const sonuc = gorevleriOku().filter(g =>
    g.title.toLowerCase().includes(aranan) ||
    (g.description || '').toLowerCase().includes(aranan)
  );
  res.json({ basarili: true, keyword, adet: sonuc.length, data: sonuc });
});

// GET /tasks/assignee/:isim 
router.get('/assignee/:isim', (req, res) => {
  const isim = req.params.isim.toLowerCase();
  const sonuc = gorevleriOku().filter(
    g => g.assignee && g.assignee.toLowerCase() === isim
  );

  res.json({ basarili: true, assignee: req.params.isim, adet: sonuc.length, data: sonuc });
});

// GET /tasks/:id 
router.get('/:id', idDogrula, (req, res) => {
  const id = Number(req.params.id);
  const gorevler = gorevleriOku();
  const gorev = gorevler.find(g => g.id === id);

  if (!gorev)
    return res.status(404).json({ basarili: false, hata: `${id} ID'li görev bulunamadı` });

  res.json({ basarili: true, data: gorev });
});

// POST /tasks 
router.post('/', gorevDogrula, (req, res) => {
  const { title, description, status, priority, assignee } = req.body;

  const gorevler = gorevleriOku();

  const yeniGorev = {
    id: Date.now(),
    title: title.trim(),
    description: description || '',
    status: status || 'pending',
    priority: priority || 'medium',
    assignee: assignee || null,
    createdAt: new Date().toISOString()
  };

  gorevler.push(yeniGorev);
  gorevleriKaydet(gorevler);

  res.status(201).json({ basarili: true, mesaj: 'Görev oluşturuldu', data: yeniGorev });
});

// PUT /tasks/:id
router.put('/:id', idDogrula, gorevDogrula, (req, res) => {
  const id = Number(req.params.id);
  const gorevler = gorevleriOku();
  const index = gorevler.findIndex(g => g.id === id);

  if (index === -1)
    return res.status(404).json({ basarili: false, hata: `${id} ID'li görev bulunamadı` });


  const eskiKayit = gorevler[index];

  // Sadece izin verilen alanları al
  const { title, description, status, priority, assignee } = req.body;
  const guncelleme = { title: title.trim() };
  if (description !== undefined) guncelleme.description = description;
  if (status !== undefined) guncelleme.status = status;
  if (priority !== undefined) guncelleme.priority = priority;
  if (assignee !== undefined) guncelleme.assignee = assignee;

  gorevler[index] = {
    ...eskiKayit,
    ...guncelleme,
    id: eskiKayit.id,
    createdAt: eskiKayit.createdAt,
    updatedAt: new Date().toISOString()
  };

  gorevleriKaydet(gorevler);

  res.json({ basarili: true, mesaj: 'Görev güncellendi', data: gorevler[index] });
});

// DELETE /tasks/:id

router.delete('/:id', idDogrula, (req, res) => {
  const id = Number(req.params.id);
  const gorevler = gorevleriOku();
  const index = gorevler.findIndex(g => g.id === id);

  if (index === -1)
    return res.status(404).json({ basarili: false, hata: `${id} ID'li görev bulunamadı` });

  const silinen = gorevler.splice(index, 1)[0];
  gorevleriKaydet(gorevler);
  res.json({ basarili: true, mesaj: 'Görev silindi', silinen });
});

module.exports = router;
