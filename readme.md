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
- Tambahkan variabel lingkungan berikut ke file .env dan ganti nilainya dengan milik Anda sendiri atau anda bisa lihat di file .env.example:
```bash
NODE_ENV=dev
APP_PORT=3000
DATABASE_NEWS=postgres://<db_user>:<db_password>@<db_host>:<db_port>/news_content_db
```
- Selanjutnya jalankan perintah ``npm run migrate`` untuk melakukan migration ke database

- Screenshot

![Image 1](https://lh3.googleusercontent.com/h3JcPP0W98OqQcoVPIyOdM9xiUu2xstt-3XjxoKl28kYMUwxAI-HVIOPu_TARkuRMu8=w2400)
![Image 2](https://lh6.googleusercontent.com/MSWVXaiINeXpchpeZpGy436NzxcXaryVrW6uzTAqpagRyAn3GZnlUW_iYJBh4SmkGMw=w2400)
![Image 3](https://lh6.googleusercontent.com/IrZ6BcJaj6juB7421uCb2HSQiPMZ58o_C9nFW_ZXnKamlIXNjT3SrSgyc_2KVXh7JUg=w2400)

### Menjalankan server
- Untuk memulai server, jalankan perintah berikut:
```bash 
npm run dev
```

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

- Screenshot

![Image 4](https://lh6.googleusercontent.com/UEqjAWg3tpm240OXnEQCyUt38_h-_wmFoITQOJTCGz38lifwvosHtQy-2h29NPAwdLQ=w2400)


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
- Screenshot

![Image 5](https://lh5.googleusercontent.com/eNynSD7lW85Dmq9AxqTTlSw41RkXhf5ASYMw5rh7CZ6CHuYsM9LUXkm8rXQZeNe8GMI=w2400)


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
- Screenshot

![Image 5](https://lh5.googleusercontent.com/LK0mfoBOjpz5VqRK8Q42ocXsRkRpvfHDss_qJTbxKLatySFtrLH2FAHittuVkpbr8Gk=w2400)


- ### Mendapatkan semua artikel berita
```bash
GET http://localhost:3000/api/v1/news/?start_index=0&limit=10&topic=Seleb
```
- Parameter query:
-- status (opsional): Menyaring artikel berita berdasarkan status (DRAFT, PUBLISHED, atau DELETED)
-- topic (opsional): Menyaring artikel berita berdasarkan topik
-- start_index: Parameter ini menentukan indeks awal data yang ingin ditampilkan. Jadi, jika kita ingin menampilkan data mulai dari indeks ke-0, maka nilainya harus diatur menjadi 0.
-- limit: Parameter ini menentukan jumlah data maksimum yang ingin ditampilkan. Jadi, jika kita ingin menampilkan maksimal 10 data, maka nilainya harus diatur menjadi 10.

- Screenshot

![Image 6](https://lh5.googleusercontent.com/YgEOGDRGA0ynet5h_XSlEOzwCOjhwkoUEAzrTMgf8-2tLXxoYBu4BATHZ-UIaa1asYA=w2400)
![Image 7](https://lh5.googleusercontent.com/7TnJ7ykkTiDZ8ru9KteRBJKA2o7JiB-AtZg-iB9Zads0Y9einitDywM3qpzNRUcQwLw=w2400)

- ###  Mendapatkan artikel berita berdasarkan ID
```bash
GET http://localhost:3000/api/v1/news/:id
```

- Screenshot

![Image 8](https://lh4.googleusercontent.com/zneNdurGIz9Jrx_v7bo_KSyiYA_hqk7U1h2Z34cEg-obMhMZHHDXlUP2LTqjttLRjtc=w2400)


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
- Screenshot

![Image 9](https://lh4.googleusercontent.com/j_Eu-3X1KJFwb7_oz1Mtp11W98-BRvVW9594adsPILFKh7cBgxWCIF1ezDzUHm1-JbI=w2400)


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

- Screenshot

![Image 10](https://lh5.googleusercontent.com/VZS4SINeBAuGy_OVWHpgXoulzyFcGIoF3jSbuTtS-FLWlrLakCiR_J46WtmL_ORf75Y=w2400)

- ### Menghapus topic berita
```bash
DELETE http://localhost:3000/api/v1/topic/:id
```

- Screenshot

![Image 11](https://lh6.googleusercontent.com/27GWD6XOVb_TbB5gNebjZ0QO2zCJ0BjrxtBi_PwSnH_LqZCSMhFVMPv7K2YWqIGNohs=w2400)

- ###  Mendapatkan topic berdasarkan ID
```bash
GET http://localhost:3000/api/v1/topic/:id
```

- Screenshot

![Image 12](https://lh6.googleusercontent.com/gQX7Rj0t3OqheSn6oYbwmkpQwPymR19u-ynvzm3AKqRKsF67Pzmmq_3vkhRTkcIigLM=w2400)

- ### Mendapatkan semua topic berita
```bash
GET http://localhost:3000/api/v1/topic/?start_index=0&limit=10
```
- Parameter query:
-- start_index: Parameter ini menentukan indeks awal data yang ingin ditampilkan. Jadi, jika kita ingin menampilkan data mulai dari indeks ke-0, maka nilainya harus diatur menjadi 0.
-- limit: Parameter ini menentukan jumlah data maksimum yang ingin ditampilkan. Jadi, jika kita ingin menampilkan maksimal 10 data, maka nilainya harus diatur menjadi 10.

- Screenshot

![Image 13](https://lh3.googleusercontent.com/IIYm9HDwquUzM4ROMtoSDnWvRAr28M_9FaCaJooFKEvCf7-3MFOkLH0QRhQh-xcP3fE=w2400)


## Menjalankan tes
- Untuk menjalankan tes, jalankan perintah berikut:
```bash
npm run test-deploy
```
- Screenshot

![Image 14](https://lh6.googleusercontent.com/_AO4riSqaQO9Y4nRW8IM8Ws1aHi9U7EvnKQGMK4NMAGrSvwYdy5AEqSrqRBTrd10PMY=w2400)


## Pipline CI
Proyek ini dilengkapi dengan pipa CI dasar yang menjalankan tes setiap kali ada pull request. Anda dapat mengonfigurasi pipa Anda sendiri di penyedia CI/CD Anda.

- Screenshot

![Image 15](https://lh4.googleusercontent.com/a0Fdl0YKflZ0TNt8Dt1VDuXxl-OoUYOW-LJmCkH2B1daHmZPsk9lYVDn1yzXTFQb0p4=w2400)


​
