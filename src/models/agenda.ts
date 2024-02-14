import mongoose, { Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface contactoData {
  image: string;
  name: string;
  apellido: string;
  email: string;
  telefono: string;
  user: mongoose.Types.ObjectId;
}

interface InstitutionDocument extends Document, contactoData {}

const Schema = mongoose.Schema;

const contactoSchema = new Schema<InstitutionDocument>({
  image: String,
  name: String,
  apellido: String,
  email: String,
  telefono: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

contactoSchema.plugin(paginate);

const model = mongoose.model<InstitutionDocument, mongoose.PaginateModel<InstitutionDocument>>(
  'Contactos',
  contactoSchema,
  'contactos'
);

export default model;

//const Contactos = mongoose.model('contacto', contactoSchema);



