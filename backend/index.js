const sql = require('mssql');
const express = require('express');
const cors = require('cors');
const config = require('config');
const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = config.get('Config.dbConfig');
const httpConfig = config.get('Config.httpConfig');
const sqlConfig = {
    user: dbConfig.user,
    password: dbConfig.password,
    server: dbConfig.server,
    port: dbConfig.port,
    database: dbConfig.database,
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
};

app.post(httpConfig.uploadSong, (req, res) => {
    console.log(req.body);
    const q = "INSERT INTO " + dbConfig.songTable + 
    " (title,  description, user_id, num_measures, initial_tempo, initial_time_signature, initial_key)" +
    "VALUES ('" + req.body.title + "', '" + req.body.description + "', 1, 1, 1, 1, 0)";
    sql.connect(sqlConfig, err => {
        if (err) console.log("Connection error: " + err);
        
        const request = new sql.Request();
        request.query(q, (err, result) => {
            if (err) console.log("SQL Error: " + err);

            res.send(result);
        });
    });
    return req.json;
});

app.get(httpConfig.testing, (req, res) => {
    res.send("Loaded.");
});

app.listen(httpConfig.port, ()=>{
    console.log(`Application started successfully on port: ${httpConfig.port}`);
});