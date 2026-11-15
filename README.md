# TaskFlow API

Node.js ve Express.js ile yazılmış görev yönetim REST API'si. Görevler `data/veriler.json` dosyasında tutulur.

## Kurulum ve Çalıştırma

Node.js v26.7.0 ile yazılmıştır. Yakın veya uyumlu bir versiyon kullanılması gerekir.

1. Projeyi indir:
   ```bash
   git clone https://github.com/bugradaryal/taskflowapi.git
   ```
   Git kullanılmıyorsa GitHub sayfasında **Code > Download ZIP** ile indirip klasöre çıkarılır.

2. Proje klasörüne gir:
   ```bash
   cd taskflowapi
   ```

3. Bağımlılıkları kur:
   ```bash
   npm install
   ```

4. Sunucuyu başlat:
   ```bash
   npm run dev
   ```
   Terminalde `Sunucu 3000 portunda çalışıyor` yazısı görülecek.

5. Çalıştığını kontrol et: tarayıcıda `http://localhost:3000/tasks` adresini aç, görev listesi JSON olarak gelmelidir.

Sunucu `http://localhost:3000` adresinde açılır. Sunucu adresi `server.js` içerisinde tanımlıdır.

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
