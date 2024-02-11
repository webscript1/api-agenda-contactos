import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
  
  },
  apellido: {
    type: String,
    required: true,
  
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    default:'user'
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
