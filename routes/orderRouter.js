import express from "express"
import { protectedMiddleware, ownerMiddleware } from "../middleware/authMiddleware.js"
import {CreateOrder, AllOrder, DetailOrder, CurrentUserOrder} from '../controllers/OrderControler.js' 

const router = express.Router()

// Routing Order

// Create Order
// post/api/v1/order
// cuma bisa diakses user authenticated
router.post('/', protectedMiddleware, CreateOrder)


// Read Order (tampil semua orderannya)
// get/api/v1/order
// cuma bisa diakses user role owner(middleware owner)
router.get('/', protectedMiddleware, ownerMiddleware, AllOrder)

// Detail Order
// get/api/v1/order/:id
// cuma bisa diakses user role owner(middleware owner)
router.get('/:id', protectedMiddleware, ownerMiddleware, DetailOrder)


// Current Order(menampilkan order berdasarkan user yang order)
// get/api/v1/order/current/user
// cuma bisa diakses user authenticated
router.get('/current/user', protectedMiddleware, CurrentUserOrder)



export default router
