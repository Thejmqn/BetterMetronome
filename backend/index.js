import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SQLpass",
    database: "metronome_testing"
});

app.use(express.json());
app.use(cors());

const songTable = "songs";

app.get("/data", (req, res) => {
    const q = "SELECT * from data";
    db.query(q, (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });
});

app.post("/table", (req, res) => {
    const q = "INSERT INTO data (`info`, `info2`) VALUES (?)";
    const tableData = [
        req.body[0].type,
        4
    ];

    db.query(q, [tableData], (err, data) => {
        console.log(err);
        if (err)
            return res.json(err);
        return res.json("Successfully added tableData to SQL.")
    })
});

app.post("/uploadsong", (req, res) => {
    console.log(req);
    const song = req.body.data;
    const q = "INSERT INTO " + songTable + 
    " (`title`,  `description`, `user_id`, `num_measures`, `initial_tempo`, `initial_time_signature`, `initial_key`)" +
    "VALUES (?, ?, ?, ?, ?, ?, ?)";
    const tableData = [
        req.body.title, 
        req.body.description, 
        1, 
        song[0].measure, 
        req.body.tempo,
        req.body.timeSignature,
        0,
    ]
    db.query(q, tableData, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ success: false, message: 'query error', error: err });
            return;
        }
        return res.json("Inserted song into SQL table.")
    })
    return req.json;
});

app.listen(8080, () => {
    console.log("Backend loaded.");
})