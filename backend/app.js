import express from 'express'

import userRouter  from "./routes/userRoutes.js"
import productRouter  from "./routes/productRoutes.js"

const app = express();
app.use(express.json())



// Routes
app.use('/api/v1/users' , userRouter)
app.use('/api/v1/products' , productRouter)




export default app