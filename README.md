# TaskFlow API

Node.js ve Express.js ile yazılmış görev yönetim REST API'si. Görevler `data/veriler.json` dosyasında tutulur.

## Kurulum

Node.js 18 veya üzeri gerekir.

```bash
git clone https://github.com/bugradaryal/taskflowapi.git
cd taskflowapi
npm install
```

## Çalıştırma

```bash
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır. Server.js de port tanımlıdır.

## Endpoint'ler

| Metod  | URL        | Açıklama              |
|--------|------------|-----------------------|
| GET    | /tasks     | Tüm görevleri listele |
| GET    | /tasks/:id | Tek görevi getir      |
| POST   | /tasks     | Yeni görev oluştur    |
| PUT    | /tasks/:id | Görevi güncelle       |
| DELETE | /tasks/:id | Görevi sil            |

Ek olarak:

- `GET /tasks?status=completed` ve `GET /tasks?priority=high` ile filtreleme
- `GET /tasks/search?keyword=backend` ile arama
- `GET /tasks/assignee/musa` ile kullanıcıya atanan görevler
- `GET /tasks?page=1&limit=10` ile sayfalama, `GET /tasks?sort=createdAt` ile sıralama
- `GET /reports/completed`, `/reports/pending`, `/reports/summary` ile raporlar


## Notlar

- Sunucuya gelen istekler terminalde görünür ve `logs/erisim.log` dosyasına kaydedilir.
- Veri kaydedilmeden önce `veriler.json.bak` adıyla yedek alınır.

## Teknolojiler

- Node.js
- Express.js
- fs modülü (veri depolama)
