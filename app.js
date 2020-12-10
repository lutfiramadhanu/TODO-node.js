const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser =  require('body-parser');

const app = express();
const port = 1900;

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'lutfi',
    password: '0000',
    database: 'data_penduduk'
});
koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambung");
});

app.get('/', (req, res) => {
    koneksi.query('SELECT * FROM data_penduduk', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs', {
            judulhalaman: 'DATA_PENDUDUK',
            data: hasil
        });
    });
});

app.post('/penduduk', (req, res) =>{
    var nama = req.body.inputnama;
    var alamat = req.body.inputalamat;
    var TTL = req.body.inputTTL;
    var golongan_darah = req.body.inputgolongan_darah;
    var telepon = parseInt(req.body.inputtelepon);
    koneksi.query('INSERT INTO data_penduduk(nama, alamat, TTL, golongan_darah, telepon) values(?,?,?,?,?)',
    [nama, alamat, TTL, golongan_darah, telepon],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});    

app.get('/hapus-nama/:nama', (req, res) => {
        var nama = req.params.nama; 
        koneksi.query('DELETE FROM data_penduduk WHERE nama=?', 
        [nama], (err, hasil) => {
            if(err) throw err;
            res.redirect('/');
        }
    )
});
 

app.listen(port ,() => {
    console.log(`app berjalan pada port ${port}`);
}); 