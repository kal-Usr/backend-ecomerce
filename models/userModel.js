import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import validator from "validator"
const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "nama wajib di isi silahkan masukan nama dulu yah 🙏😊😊"],
    unique: [true, "Yah username ini sudah pernah digunakan silahkan gunakan yang lain yaa 🥲🥲 "]
  },

  email: {
    type: String,
    required: [true, "Email juga wajib di isi silahkan masukan email dulu yah 🙏😊😊"],
    unique: [true, "Maaf email sudah pernah didaftarkan silahkan gunakan email lain yah 🙏😊😊",],
    validate: {
      validator: validator.isEmail,
      message:
        "Untuk inputan harus berformat email yah misalnya foo@gmail.com 🙏😊😊",
    },
  },
  password: {
    type: String,
    required: [true, "Password wajib diisi yah buat keamanan akun mu😊😊"],
    minLength: [6, "Maaf Password minimal harus 6 karakter yah silahkan masukan password lagi 🙏😊😊"],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
