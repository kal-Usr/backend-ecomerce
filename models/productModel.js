import mongoose from "mongoose"
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [
      true,
      "nama produk wajib di isi silahkan masukan nama produknya  dulu yah 🙏😊😊",
    ],
    unique: [
      true,
      "Yah nama produk ini sudah pernah digunakan silahkan gunakan yang lain yaa 🥲🥲 ",
    ],
  },

  price: {
    type: Number,
    required: [
      true,
      "Harga produk juga wajib di isi silahkan masukan harga produknya dulu yah 🙏😊😊",
    ],
  },
  description: {
    type: String,
    required: [
      true,
      "Deskripsi wajib diisi yah buat keterangan produk kamu 😊😊",
    ],
  },
  image: {
    type: String,
    default: "null",
  },
  category: {
    type: String,
    required: [
      true,
      "kategori wajib di isi yah supaya nanti produk bisa dikategorikan dengan baik silahkan masukan nama kategorinya dulu yah 🙏😊😊",
    ],
    enum: ["sepatu", "kemeja", "baju", "celana"],
  },
  stock: {
    type: Number,
    default: 0,
  },
})

const Product = mongoose.model("Product", productSchema)

export default Product
