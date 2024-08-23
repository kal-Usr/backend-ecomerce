import mongoose from "mongoose"
const { Schema } = mongoose

const singleProduct = Schema({
    name: {type:String, required: true},
    quantity: {type:Number, required: true},
    price: {type:Number, required: true},
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
})

const orderSchema = new Schema({
  total: {
    type: Number,
    required: [true, "Total harga harus diisi yah 🙏😊"],
    },
    itemsDetail: [singleProduct],
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "failed", "success"],
        default: "pending"
    },
  firstName: {
    type: String,
    required: [true, "Nama depan harus diisi yahh 🙏😊"],
  },
  lastName: {
    type: String,
    required: [true, "Nama belakang harus diisi yahh 🙏😊"],
  },
  phone: {
    type: String,
    required: [true, "Nomer telepon harus diisi yahh 🙏😊"],
  },
  email: {
    type: String,
    required: [true, "Email harus diisi yahh 🙏😊"],
  },
})

const Order = mongoose.model("Order", orderSchema)

export default Order
