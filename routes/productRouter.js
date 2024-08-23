import express from "express"
import { protectedMiddleware, ownerMiddleware} from "../middleware/authMiddleware.js"
import {CreateProduct, AllProduct, DetailProduct, UpdateProduct, DeleteProduct, FileUpload} from "../controllers/ProductController.js"
import {upload} from '../utils/uploadFileHandler.js'

const router = express.Router()

// CRUD Product

// Create Data Product
// post/api/v1/product
// middleware owner
router.post('/', protectedMiddleware, ownerMiddleware, CreateProduct)

// Read Data Product
// get/api/v1/product
// middleware owner
router.get('/', AllProduct)

// Detail Data Product
// get/api/v1/product/:id
// middleware owner
router.get('/:id', DetailProduct)

// Update Data Product
// put/api/v1/product/:id
// middleware owner
router.put('/:id', protectedMiddleware, ownerMiddleware, UpdateProduct)

// Delete Data Product
// delete/api/v1/product/:id
// middleware owner
router.delete('/:id', protectedMiddleware, ownerMiddleware, DeleteProduct)

// File Upload Data Product
// post/api/v1/product/file-upload
// middleware owner
router.post('/file-upload', protectedMiddleware, ownerMiddleware, upload.single('image'), FileUpload)


export default router
