// test_mongo_driver.js
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Para carregar do .env

const uri = process.env.MONGODB_URI; // Pega a URI do .env

async function connectToMongo() {
  if (!uri) {
    console.error("MONGODB_URI is not defined in .env");
    return;
  }

  console.log("Attempting to connect using MongoDB driver with URI:", uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas using MongoDB driver!");
  } catch (error) {
    console.error("Connection failed using MongoDB driver:", error);
  } finally {
    await client.close();
  }
}

connectToMongo();