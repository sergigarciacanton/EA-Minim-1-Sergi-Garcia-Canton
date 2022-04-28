import { Schema, model } from "mongoose";

const DenunciaSchema = new Schema({
  name: { type: String, required: true, unique: true },
  delito: { type: String },
  userDenunciat: { type: Schema.Types.ObjectId, ref: "User", required: true },
  creationDate: { type: Date, default: Date.now, required: true },
});
export default model("Denuncia", DenunciaSchema);
