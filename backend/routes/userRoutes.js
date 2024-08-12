import express from "express"
import { getAllusers, createUser, getUser, updateUser, deleteUser} from "../controllers/userController.js" 

const router = express.Router()

router.route('/').get(getAllusers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router