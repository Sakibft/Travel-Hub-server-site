const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// config
const port = process.env.PORT || 5000;
const app = express()
require('dotenv').config()
// middleware
app.use(cors());
app.use(express.json());
 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rriax4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
 
  const spotsCollection = client.db("B9A10").collection("spots");
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
  //  users
 
//  Spots
app.post('/spots',async(req,res)=> {
  const user = req.body;
  const result = await spotsCollection.insertOne(user)
  res.send(result)
  console.log(user);
})

app.get('/spots', async(req,res)=> {
  const users = spotsCollection.find();
  const result = await users.toArray()
  res.send(result)
})

app.get('/spots/:id',async(req,res)=> {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await spotsCollection.findOne(query)
  res.send(result)
  console.log(result);
  console.log(id);
})

// listed page delete operation 
app.delete('/spots/:id', async(req,res)=> {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await spotsCollection.deleteOne(query)
  res.send(result)
  console.log(id);
})
// update operation
app.put('/spots/:id', async(req,res)=> {
  const id = req.params.id;
  const user = req.body;
  const query = {_id : new ObjectId(id)}
  const options = { upsert: true };
  const upUser = {
    $set:{
      country:user.country,
      spot:user.spot,
      location:user.location,
      cost:user.cost,
      season:user.season,
      time:user.time,
      visitor:user.visitor,
      description:user.description,
      photo:user.photo
    }
   };
   const result = await spotsCollection.updateOne(query,upUser,options)
   res.send(result)
   
  
})
 
 


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World from b0a10!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 