//----------con metodo get----------------
//colaboradores : hernandez salvador mirka susana y Bermudez rebolledo leticia janet
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = "mongodb+srv://dbUser:leviackerman@cluster0.neiku.mongodb.net/SDDBDemo?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

app.get("/ruta4", async function(req, res) {
    let varname = req.query.varname;

    try {
        // Connect to the MongoDB cluster
        MongoClient.connect(uri, function(err, client) {
            if (err) throw err;
            var dbo = client.db("SDDBDemo");
            dbo.collection("datamain").find({}).toArray(function(err, varname) {
                if (err) throw err;
                console.log(varname);
                res.json(varname);
                client.close();
            });
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

});

app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});