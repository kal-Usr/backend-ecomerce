import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"
import Order from "../models/orderModel.js"


// Fungsi Order

// Function Create Order
export const CreateOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body
  if (!cartItem || cartItem.length < 1) {
    res.status(400)
    throw new Error("Pastikan keranjang tidak boleh kosong yah 😉")
  }
  let orderItem = []
  let total = 0

  for (const cart of cartItem) {
    const productData = await Product.findOne({ _id: cart.product })
    if (!productData) {
      response.status(404)
      throw new Error("Yahh id produk tidak temukan 🥲🥲")
    }
      const { name, price, _id } = productData
      const singleProduct = {
          quantity: cart.quantity,
          name,
          price,
          product: _id
      }
      
      orderItem = [...orderItem, singleProduct]
      
      total  += cart.quantity * price
    }

    const order = await Order.create({
        itemsDetail: orderItem,
        total,
        firstName,
        lastName,
        email,
        phone,
        user: req.user.id
    })
    
    return res.status(201).json({
    total,
    order,
    message: "Yeayy kamu berhasil menambahkan order produk kamu 😊😊",
  })
})

// Function Read All Order (Tampil semua order)
export const AllOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find()
  return res.status(201).json({
    data: orders,
    message: "Semua order produk kamu ada disini nihh 😊😊",
  })
})

// Function Read Detail Order Base On Id
export const DetailOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    return res.status(201).json({
      data: order,
    message: "Ini isi dari detail order produk kamu 🙏😊",
  })
})

// Functions Current User order (menampilkan order berdasarkan user yang order)
export const CurrentUserOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({
        'user': req.user.id
    })
    return res.status(201).json({
      data: order,
    message:
      "Yeayy berhasil menampilkan order produk berdasarkan user yang order🙏😊",
  })
})
