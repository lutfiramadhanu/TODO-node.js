const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const app = express();
const port = 7500;

// view engine hbs
app.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'lutfi',
    password: '0000',
    database: 'My_TODO'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

app.get('/', (req, res) => {
    koneksi.query('SELECT*FROM aktivitas', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'ACTIVITAS',
            data: hasil
        });
    });
});


app.post('/tambahkegiatan', (req, res) =>{
    var detailkegiatan = req.body.inputdetailkegiatan;
    var tanggal = req.body.inputtanggal;
    koneksi.query('INSERT INTO aktivitas(detail_kegiatan, tanggal)values(?,?)',
    [detailkegiatan, tanggal],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});
app.listen(port, () => {
    console.log(`app MY_TODO berjalan pada port ${port}`);
});