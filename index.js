const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
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
  const userCollection = client.db("B9A10").collection("users");
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
   
    app.post('/users',async(req,res)=> {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result)
      console.log(user);
    })
    app.get('/users', async(req,res)=> {
      const users = userCollection.find();
      const result = await users.toArray()
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
 