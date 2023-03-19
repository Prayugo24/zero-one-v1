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
- ### Mendapatkan semua artikel berita
```bash

GET http://localhost:3000/api/v1/news/?start_index=0&limit=10&topic=Seleb
```bah`ash
```bah`ash
```bah`ash
```bah`ash
```bah`ash
``bash`ash
``bash`ash`ash

- Parameter query:

status (opsional): Menyaring artikel berita berdasarkan status (draft, published, atau deleted)
topic (opsional): Menyaring artikel berita berdasarkan topik

- ###  Mendapatkan artikel berita berdasarkan ID
```bash
GET http://localhost:3000/api/v1/news/:id
```


​
37
![Image 1](https://lh4.googleusercontent.com/27cLxMVyV1Xm0v77Rguvb8FKnJfh4cbdG0qXGeEw52pPdsLigBsFmyqeYNg1FltX-Z4=w2400)
38
