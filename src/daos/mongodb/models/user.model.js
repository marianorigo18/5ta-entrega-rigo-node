import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs"

//creando schema
const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {
    timestamps: true
});

//encriptar contrasena
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);     
    return await bcrypt.hash(password, salt);
}

//esto nos devolvera un true o un false si conside o no la contrasena en la base de datos
UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}
//creando y exportando modelo
module.exports = model("User", UserSchema);

