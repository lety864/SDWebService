var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function findOneListingByName(client, propertyName) {
    const result = await client.db("SDDBDemo").collection("datamain").findOne({name: propertyName});
    if (result) {
        console.log(`Found a listing in the collection with the name '${propertyName}':`);
        console.log(result);
        var y=result;
        return y;
    } else {
        console.log(`No listings found with the name '${propertyName}'`);
    }
}

app.get("/ruta4", async function (req, res){
    let varname = req.query.varname;

    const uri = "mongodb+srv://susana:12345@cluster0.qj7o6.mongodb.net/SDDBDemo?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var x = await findOneListingByName(client,varname);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

    res.json(x);
});

app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});

