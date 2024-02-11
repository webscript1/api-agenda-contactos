import mongoose from 'mongoose';

const databasePassword = process.env.DATABASEPASSWORD;
const databaseUser = process.env.DATABASEUSER;
const databaseUrl = process.env.URLDATABASE;
const databaseConnectionString = `mongodb+srv://${databaseUser}:${databasePassword}@${databaseUrl}`;

const connectDatabase = async () => {
  try {
    const connectedDatabase = await mongoose.connect(databaseConnectionString);

    console.log('Connected to the database successfully');

    return connectedDatabase; // Devolverá el valor de connectedDatabase
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Lanza una excepción para que se maneje adecuadamente en otros lugares
  }
};

export default connectDatabase;
