import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactoSchema = new Schema({
  image: String,
  name: String,
  apellido: String,
  email: String,
  telefono: String,
  user: {
    type: Schema.Types.ObjectId,  // Esto indica que el campo es de tipo ObjectId
    ref: 'Usuario'  // Referencia al modelo de Usuario (asegúrate de tener un modelo de Usuario)
  }
});

const Contactos = mongoose.model('contacto', contactoSchema);

export default Contactos