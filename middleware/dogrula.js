// id doğrulama (GET/DELETE)
const idDogrula = (req, res, next) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      basarili: false,
      hata: 'ID pozitif bir tam sayı olmalıdır'
    });
  }

  next();
};

// görev doğrulama (POST/PUT)
const gorevDogrula = (req, res, next) => {
  const { title, description, status, priority, assignee } = req.body || {};
  const hatalar = [];

  if (!title) hatalar.push('title zorunludur');
  else if (typeof title !== 'string') hatalar.push('title metin olmalıdır');
  else if (title.trim().length < 3) hatalar.push('title en az 3 karakter olmalıdır');
  else if (title.trim().length > 100) hatalar.push('title en fazla 100 karakter olmalıdır');

  if (description !== undefined && typeof description !== 'string')
    hatalar.push('description metin olmalıdır');

  if (status !== undefined && status !== 'pending' && status !== 'in-progress' && status !== 'completed')
    hatalar.push('status pending, in-progress veya completed olmalıdır');

  if (priority !== undefined && priority !== 'low' && priority !== 'medium' && priority !== 'high')
    hatalar.push('priority low, medium veya high olmalıdır');

  if (assignee !== undefined && assignee !== null && typeof assignee !== 'string')
    hatalar.push('assignee metin olmalıdır');

  if (hatalar.length > 0) {
    return res.status(400).json({ basarili: false, hatalar });
  }

  next();
};

// sorgu kontrolü (GET)
const sorguDogrula = (req, res, next) => {
  const { status, priority, sort, page, limit } = req.query;
  const hatalar = [];

  if (status !== undefined && status !== 'pending' && status !== 'in-progress' && status !== 'completed')
    hatalar.push('status pending, in-progress veya completed olmalıdır');

  if (priority !== undefined && priority !== 'low' && priority !== 'medium' && priority !== 'high')
    hatalar.push('priority low, medium veya high olmalıdır');

  if (sort !== undefined && sort !== 'createdAt' && sort !== 'title' && sort !== 'priority')
    hatalar.push('sort createdAt, title veya priority olmalıdır');

  if (page !== undefined && (isNaN(Number(page)) || Number(page) < 1))
    hatalar.push('page 1 veya daha büyük bir sayı olmalıdır');

  if (limit !== undefined && (isNaN(Number(limit)) || Number(limit) < 1))
    hatalar.push('limit 1 veya daha büyük bir sayı olmalıdır');

  if (hatalar.length > 0) {
    return res.status(400).json({ basarili: false, hatalar });
  }

  next();
};

module.exports = { idDogrula, gorevDogrula, sorguDogrula };