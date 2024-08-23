import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"

// Function Crud

// Function Create Product
export const CreateProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body)
    return res.status(201).json({
        message: "Yeayy kamu berhasil menambahkan produk kamu 😊😊",
        data: newProduct
  })
})

// Function Read All Product
export const AllProduct = asyncHandler(async (req, res) => {
    // Req Query
    const queryObj = { ...req.query }

    // fungsi untuk megabaikan jika ada request page dan limitation
    const excludeField = ["page", "limit", "name"]
    excludeField.forEach((element) => delete queryObj[element])

    // fungsi search produk berdasarkan keyword/karakter yang diinputkan use regex
    let query
    if (req.query.name) {
        query = Product.find({
            name: { $regex: req.query.name, $options: 'i' }
        })
    } else {
            query = Product.find(queryObj)
    }

    // fungsi pagination
    const page = req.query.page * 1 || 1
    const limitData = req.query.limit * 1 || 30
    const skipData = (page - 1) * limitData
    query = query.skip(skipData).limit(limitData)

    let countProduct = await Product.countDocuments()
    if (req.query.page) {
        if (skipData >= countProduct) {
            res.status(404)
            throw new Error("Yah halaman ini tidak tersedia 🥲🥲")
        }
    }
    const data = await query

    return res.status(200).json({
        message: "Semua produk kamu ada disini nihh 😊😊",
        data: data,
        count: countProduct
    })
})

// Function Read Detail Base On Id Product
export const DetailProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id
    const productData = await Product.findById(paramsId)

    // kondisi jika produk data tidak ditemukan
    if (!productData) {
        res.status(404)
        throw new Error("Yahh Id produk kamu tidak ditemukan 🙏🥲")
    }
    // Selesai

    return res.status(200).json({
        message: "Ini isi dari detail produk kamu 🙏😊",
        data: productData
    })
})

// Function Update Product
export const UpdateProduct = asyncHandler(async(req, res) => {
    const paramId = req.params.id
    const updateProduct = await Product.findByIdAndUpdate(paramId,
      req.body, {
      runValidators: false,
      new: true,
    })
    return res.status(201).json({
        message: "Kamu baru saja mengedit produk 😉",
        data: updateProduct
    })
})

// Function Delete
export const DeleteProduct = asyncHandler(async (req, res) => {
    const paramId = req.params.id
    await Product.findByIdAndDelete(paramId)
    return res.status(200).json({
        message: "Kamu baru saja menghapus produk 😉",
    })
})

// Function Create
export const FileUpload = asyncHandler(async (req, res) => {
    const file = req.file
    // pengecekan validasi
    if (!file) {
        res.status(400)
        throw new Error("Yahh Tidak ada file yang di upload 🥲🥲")
    }
    // end

    const imageFileName = file.filename
    const pathImageFile = `/uploads/${imageFileName}`

    res.status(200).json({
        message: "Yeayy selamat upload produk kamu berhasil 🎉🎉",
        image: pathImageFile,
    })
})
