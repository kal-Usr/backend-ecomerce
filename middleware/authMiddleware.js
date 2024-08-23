import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

// Fungsi pengecekan untuk user sudah ter Authorisasi belum berdasarkan token jwt yg diterima
export const protectedMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error(
              "Yah kamu belum memiliki token jwt atau token yang kamu masukan salah atau kamu belum terAuthorisasi🥲🥲"
            )
        }
    } else {
        res.status(401)
        throw new Error("Yah token jwt kamu tidak ditemukan 🥲🥲")
    }
})

// Function middleware untuk owner
export const ownerMiddleware = (req, res, next) => {
    if (req.user && req.user.role == 'owner') {
        next()
    } else {
        res.status(401)
        throw new Error('Yahh token tidak ditemukan kamu belum terAuthorisasi sebagai owner 🙏🥲')
    }
}