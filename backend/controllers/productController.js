import Product from "../models/productModel.js"


export const getNewReleasesProducts = async(req ,res , next)=>{
    try{
        const recentlyReleasedProducts = new Date();
        const recentReleasedDuration = 2;
        recentlyReleasedProducts.setDate(recentlyReleasedProducts.getDate() - recentReleasedDuration);
        
        const recentProducts = await Product.find({ createdAt: { $gte: recentlyReleasedProducts } }).sort({ createdAt: -1 });

        res.status(200).json({
            status: "success",
            productNum: recentProducts.length,
            data:{
                recentProducts
            }
        })
    }
    catch(err){
        res.status(404).json({
        status:'fail',
        message: err
    })
    }
}

class APIFeature{
    constructor(query , queryString){
        this.query = query
        this.queryString = queryString
    }
    
    filter(){
        const queryObj = {...this.queryString};
        const excludeFields = ['page' , 'sort' , 'limit' , 'fields']
        excludeFields.forEach(query => delete queryObj[query])
        
        // 2)advanced object
        let  queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(lte|gte|lt|gt)\b/g , match => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }

    sort(){
        if (this.queryString.sort){
            const sortedBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortedBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    limitFields(){
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
          } else {
            this.query = this.query.select('-__v');
          }
          return this
    }

    paginate(){
        const page = this.queryString.page *1 || 1
        const limit = this.queryString.limit*1 ||50
        const skip = (page - 1 ) * limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}

export const getAllProducts = async (req , res)=>{
    try{

        const features = new APIFeature(Product.find() , req.query).filter().sort().limitFields().paginate()
        const product = await features.query;
        // Send Response 
        res.status(200).json({
            status: "success",
            productNum: product.length,
            data:{
                product
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err
        })
    }
}

export const createProduct = async(req , res)=>{
    try{
        const newProduct = await Product.create(req.body)
        res.status(200).json({
            status: "success",
            data:{
                product:newProduct
            }
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message: err
        })
    }
    
}
export const getProduct = async(req , res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data:{
                product
            }
        })
    }
    catch(err){
        res.status(404).json({
            status:'fail',
            message: err
        })
    }
}
export const updateProduct = async (req , res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true})
        res.status(200).json({
            status: "success",
            data:{
                product
            }
        })
    }
    catch(err){
        res.status(404).json({
            status:'fail',
            message: err
        })
    }
}
export const deleteProduct = async(req , res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            data:null
        })
    }
    catch(err){
        res.status(404).json({
            status:'fail',
            message: err
        })
    }
}
