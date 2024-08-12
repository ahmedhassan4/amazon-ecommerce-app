import express, { Router } from "express"
import {getAllProducts,createProduct,getProduct,updateProduct,deleteProduct , getNewReleasesProducts} from "../controllers/productController.js"

const router = express.Router()

router.route('/newReleases').get( getNewReleasesProducts)

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default router