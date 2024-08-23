import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import asyncHandler from "../middleware/asyncHandler.js"

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  })
}

const createSendResToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const isDev = process.env.NODE_ENV === "development" ? false : true
  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: !isDev, // Ganti `security` dengan `secure` jika Anda menggunakan HTTPS
  }

  res.cookie("jwt", token, cookieOption)
  user.password = undefined
  res.status(statusCode).json({
    data: user,
  })
}

// Controller register
export const registerUser = asyncHandler(async (req, res) => {
  const isOwner = (await User.countDocuments()) === 0
  const role = isOwner ? "owner" : "user"
  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: role,
  })
  createSendResToken(createUser, 201, res)
})

// Controller login
export const loginUser = asyncHandler(async (req, res) => {
  // tahap 1 kita buat validasi
  if (!req.body.email || !req.body.password) {
    res.status(400)
    throw new Error("Inputan email/password tidak boleh kosong yah 😉")
  }
  // tahap 2 check apakah email yang dimasukan ada didb atau tidak
  const userData = await User.findOne({
    email: req.body.email,
  })
  // tahap 3 check apakah password sesuai yang ada didb atau tidak
  if (userData && (await userData.comparePassword(req.body.password))) {
    createSendResToken(userData, 200, res)
  } else {
    res.status(400)
    throw new Error(
      "Yah password/email yang kamu masukan salah 🥲, silahkan coba lagi ya 😉"
    )
  }
})

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password")
  if (user) {
    return res.status(200).json({
      user,
    })
  } else {
    res.status(404)
    throw new Error("yah pengguna tidak ditemukan 🥲🥲")
  }
})

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(200).json({
    message: "Kamu berhasil lagout terimakasih telah berkunjung semoaga harimu menyenangkan 🙏😊😊"
  })
}
