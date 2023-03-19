# Pengenalan
Ini adalah API CRUD (Create, Read, Update, Delete) yang memungkinkan pengguna untuk mengelola artikel berita dan topik yang terkait. API ini dibangun menggunakan express dan menggunakan Postgres sebagai database.

## Persyaratan
- Disini saya menggunakan Node.js (v14) untuk menjalankanya
- Basis data PostgresSQL

## Memulai

### instalasi
- Salin repositori ini menggunakan ``git clone <repo_url>``
- Buka direktori proyek dan jalankan ``npm install`` untuk menginstal dependensi.
- Buat database baru dengan nama ``news_content_db``

### Konfigurasi
- Buat file .env di direktori utama proyek.
- Tambahkan variabel lingkungan berikut ke file .env dan ganti nilainya dengan milik Anda sendiri:
- ``
NODE_ENV=dev
APP_PORT=3000
DATABASE_NEWS=postgres://<db_user>:<db_password>@<db_host>:<db_port>/news_content_db
``
- Selanjutnya jalankan perintah ``npm run migrate`` untuk melakukan migration ke database

### Menjalankan server
- Untuk memulai server, jalankan perintah berikut:
``npm run dev``

## Endpoint API

### Post Collection
```bash
https://api.postman.com/collections/9386153-89a3e106-3363-4ce3-b866-7a9b168a26a2?access_key=PMAT-01GVXK2AY4E8CG82WEN1QSG4N7
```

- ### Membuat artikel berita
```bash
POST http://localhost:3000/api/v1/news/
```
- Body request:
```bash
{
    "title":"Text1",
    "content":"tetsing",
    "topics_ids": [1],
    "status":"PUBLISHED"
}
```
- Keterangan untuk status terdapat 3 value
```bash
    [DRAFT, PUBLISHED, DELETED]
```

- ### Memperbarui artikel berita
```bash
PUT http://localhost:3000/api/v1/news/:id
```
- Body request:
```bash
{
    "title":"text2",
    "content":"tetsing",
    "topics_ids": [1,2],
    "status":"PUBLISHED"
}
```
- Keterangan untuk status terdapat 3 value
```bash
    [DRAFT, PUBLISHED, DELETED]
```

- ### Memperbarui status artikel berita
```bash
PUT http://localhost:3000/api/v1/news/status/:id
```
- Body request:
```bash
{
    "status":"DELETED"
}
```
- Keterangan untuk status terdapat 3 value
```bash
    [DRAFT, PUBLISHED, DELETED]
```

- ### Mendapatkan semua artikel berita
```bash
GET http://localhost:3000/api/v1/news/?start_index=0&limit=10&topic=Seleb
```
- Parameter query:
-- status (opsional): Menyaring artikel berita berdasarkan status (DRAFT, PUBLISHED, atau DELETED)
-- topic (opsional): Menyaring artikel berita berdasarkan topik
-- start_index: Parameter ini menentukan indeks awal data yang ingin ditampilkan. Jadi, jika kita ingin menampilkan data mulai dari indeks ke-0, maka nilainya harus diatur menjadi 0.
-- limit: Parameter ini menentukan jumlah data maksimum yang ingin ditampilkan. Jadi, jika kita ingin menampilkan maksimal 10 data, maka nilainya harus diatur menjadi 10.

- ###  Mendapatkan artikel berita berdasarkan ID
```bash
GET http://localhost:3000/api/v1/news/:id
```


- ### Membuat topic berita
```bash
POST http://localhost:3000/api/v1/topic/
```
- Body request:
```bash
{
	"name":"Seleb"
}
```

- ### Memperbarui topic berita
```bash
PUT http://localhost:3000/api/v1/topic/:id
```
- Body request:
```bash
{
	"name":"Dangdut"
}
```

- ### Menghapus topic berita
```bash
DELETE http://localhost:3000/api/v1/topic/:id
```

- ###  Mendapatkan topic berdasarkan ID
```bash
GET http://localhost:3000/api/v1/topic/:id
```

- ### Mendapatkan semua topic berita
```bash
GET http://localhost:3000/api/v1/topic/?start_index=0&limit=10
```
- Parameter query:
-- start_index: Parameter ini menentukan indeks awal data yang ingin ditampilkan. Jadi, jika kita ingin menampilkan data mulai dari indeks ke-0, maka nilainya harus diatur menjadi 0.
-- limit: Parameter ini menentukan jumlah data maksimum yang ingin ditampilkan. Jadi, jika kita ingin menampilkan maksimal 10 data, maka nilainya harus diatur menjadi 10.


## Menjalankan tes
- Untuk menjalankan tes, jalankan perintah berikut:
```bash
npm run test-deploy
```

## Pipline CI
Proyek ini dilengkapi dengan pipa CI dasar yang menjalankan tes setiap kali ada pull request. Anda dapat mengonfigurasi pipa Anda sendiri di penyedia CI/CD Anda.


​
37
![Image 1](https://lh4.googleusercontent.com/27cLxMVyV1Xm0v77Rguvb8FKnJfh4cbdG0qXGeEw52pPdsLigBsFmyqeYNg1FltX-Z4=w2400)
38
