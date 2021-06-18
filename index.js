const MongoClient = require('mongodb').MongoClient;
const express = require ('express');
require('dotenv').config()
const bodyParser = require('body-parser');


const url = process.env.NODE_EVN;
const app = express();
const port = 3000;
const dbName = "movie-app";
const collectionName = "movies";
let client ="";
let client;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/list',async(req,res)=>{
    const collection = client.db(dbName).collection(collectionName);
    const response =await collection.find().toArray();
    res.send(response);
});

app.post('/create',async(req,res)=>{
    const {name,year,length}=req.body;
    const collection = client.db(dbName).collection(collectionName);
    const response = await collection.insertOne({name:name,year:year,length:length});
    res.send(JSON.stringify(response.result));
});

// app.put('/updateMovie/:movieName',async(req,res)=>{
//     const { movieName } = req.params;
//     const collection = client.db(dbname).collection(collectionName);

//     const response = await collection.updateOne(
//         { name: movieName }
//     );
//     res.send(response.result);
// });

// app.delete('/deleteMovie/:movieName', async(req,res)=>{
//     const { movieName } = req.params;
//     const collection = client.db(dbName).collection(collectionName);

//     const response=await collection.deleteOne({
//         name:movieName
//     })
//     res.send(response.result);
// })


app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})

const connectToDatabase=async()=>{

    console.log("connected to databse");
    client=await MongoClient.connect(url);
}
connectToDatabase();