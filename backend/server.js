
// 필요한 모듈들을 가져오기
const { json } = require('express');
const express = require('express');

const db = require('./db');

const app = express();

app.get('/api/values', (req, res) => {
    db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.json(results); 
        }
    });
});

// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fileds) => {
//     console.log('resulsts', results);
// })


app.post('/api/value', (req, res, next) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value})`, (err, results, fileds) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.json({ success: true, value: req.body.value});
        }
    })
});

app.use(express.json());

app.listen(5000, () => {
    console.log('에플리케이션이 5000번 포트에서 시작되었습니다.');
});