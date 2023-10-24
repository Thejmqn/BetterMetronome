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

app.get("/data", (req, res) => {
    const q = "SELECT * from data";
    db.query(q, (err, data) => {
        if (err) 
            return res.json(err);
        return res.json(data);
    });
});

app.post("/table", (req, res) => {
    console.log(req);
    const q = "INSERT INTO data (`info`, `info2`) VALUES (?)";
    const tableData = [
        req.body[0].type,
        4
    ];

    db.query(q, [tableData], (err, data) => {
        if (err)
            return res.json(err);
        return res.json("Successfully added tableData to SQL.")
    })
});

app.listen(8080, () => {
    console.log("Backend loaded.");
})