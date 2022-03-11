import mongoose from 'mongoose';

const connection = {};

console.log(process.env.MONGODB_URI);
// CONNECTION function
async function connect() {
  // Check if connected
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  //Check connections object at postion 0
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  // Establish first connection to database
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    // Removes deprication warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // ** depricated after mongoose 6**
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

//DISCONNECT function
async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      // if in DEVELOPMENT, connection stays open
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
