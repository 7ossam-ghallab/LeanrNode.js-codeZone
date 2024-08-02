// add your connection string into your application code
/*

const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://7ossamghallab:nodejs_123@learn-mongo-db.grvc2t0.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db' // from mongoDB atlas
const client = new MongoClient(url)
const DB_NAME = "helloWorld"

const main = async () => {
  await client.connect();
  console.log('connected successfully ot server');
}
main();

*/

const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://7ossamghallab:nodejs_123@learn-mongo-db.grvc2t0.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db' // from mongoDB atlas
const client = new MongoClient(url)
const DB_NAME = "helloWorld"

const main = async () => {
  // connect to database
  // connect to database
  await client.connect();
  console.log('connected successfully ot server');

  // choose database to interact with
  const db = client.db(DB_NAME)

  // choose collection to interact with
  const collection = db.collection('courses');

  await collection.insertOne({
    title : "new course",
    price : 5000
  })

  // Get All Query
  const data = await collection.find().toArray();
  console.log("data", data)
}
main();