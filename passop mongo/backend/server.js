const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

dotenv.config();

const url = 'mongodb+srv://aayushvats37:I4KK7IwJgRKPCMjV@cluster0.r63xx.mongodb.net/'; // Using IPv4 for reliability
const client = new MongoClient(url);
const dbName = 'passop';

const app = express();
const port = 8888;

app.use(express.json()); // No need for body-parser
app.use(cors());

(async () => {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('passwords'); // Fixed collection name

    // Fetch all documents
    app.get('/', async (req, res) => {
      try {
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
      } catch (error) {
        console.error('❌ Error fetching passwords:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Insert a document
    app.post('/', async (req, res) => {
      try {
        const password = req.body;
        if (!password) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        const insertResult = await collection.insertOne(password);
        res.json({ success: true, insertedId: insertResult.insertedId });
      } catch (error) {
        console.error('❌ Error inserting document:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Delete a document by ID
    app.delete('/:id', async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid ID format' });
        }
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ error: 'Document not found' });
        }
        res.json({ success: true, deletedId: id });
      } catch (error) {
        console.error('❌ Error deleting document:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('🛑 Closing MongoDB connection...');
      await client.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
})();
