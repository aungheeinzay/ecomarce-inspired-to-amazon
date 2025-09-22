import { Request,Response } from "express"
import { Product } from "../models/product"

import { deleteImg, uploadSingleImage } from "../utils/cloudinary"



//@route post | api/product
//desc create a product
//@admin only | privite
const createProduct =async (req:Request,res:Response)=>{

try {
      const { description,
      instock_count,
      category,
      sizes,
      colors,
      name
} = req.body
const sizess = Array.isArray(sizes) ? sizes :[sizes]
const colorss=Array.isArray(colors) ? colors : [colors]
const price=Number(req.body.price)
const rating = Number(req.body.ratingCount)
const is_newArrival= req.body.is_new_arrival==="true"
const is_feature = req.body.is_feature==="true"
const images = req.files as Express.Multer.File[]

const uploadedImages = await Promise.all(
    images.map(async(image)=>{
      const uploadImg =  await uploadSingleImage(`data:${image.mimetype};base64,${image.buffer.toString("base64")}`,"fash.com/products")
      return{
        url:uploadImg.url,
        alt:uploadImg.alt
      }
    })
)
    await Product.create({
    name,description,price,instock_count,category,
    sizes:sizess,colors:colorss,images:uploadedImages,is_newArrival,rating,is_feature,
    userId:req.user?._id
})
return res.status(200).json({message:`${name} is created successfully`})
} catch (error) {
   console.log(error);
   return res.status(500).json(error)
}
}

//@route post | api/product/:id
//desc update a product
//@admin only | privite
const updateProduct =async (req:Request,res:Response)=>{
    const {id} =req.params
    const { description,
      instock_count,
      category,
      name,
      ratingCount,
     price,
     is_new_arrival,
    exitingImage,
    is_feature
       
} = req.body
try {
const sizes = Array.isArray(req.body.sizes) ? req.body.sizes : [req.body.sizes]
const colors=Array.isArray(req.body.colors) ? req.body.colors : [req.body.colors]
const files = req.files as Express.Multer.File[]

const parseExitingImage=exitingImage ? JSON.parse(exitingImage) : []

const product = await Product.findById(id)

if(!product)return res.status(404).json({message:"not product exit"})
const deleteimg = product.images.filter((image)=>{
   return !parseExitingImage.some((img:{url:string,alt:string})=>image.alt===img.alt)
})
if(deleteimg.length>0){
    await Promise.all(deleteimg.map(async(img)=>{
        await deleteImg(img.alt)
    }))
}
let uploadToCloud:{url:string,alt:string}[]=[];
if(files){
uploadToCloud = await Promise.all(files.map(async(file)=>{
 const uploadImg = await uploadSingleImage(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`,"fash.com/products")
 return {
    url:uploadImg.url,
    alt:uploadImg.alt
 }
})) 
}
const finalImages= [...parseExitingImage,...uploadToCloud]
    product.name = name || product.name;
    product.category=category || product.category;
    product.description=description || product.description;
    product.rating=ratingCount || product.rating;
    product.price=price || product.price;
    product.sizes=sizes || product.sizes;
    product.instock_count= instock_count || product.instock_count;
    product.colors = colors || product.colors;
    product.images=finalImages
    product.is_newArrival=is_new_arrival || product.is_newArrival;
    product.is_feature = is_feature || product.is_feature
    await product.save()
    return res.status(200).json({message:"update the product"})

} catch (error) {
   console.log(error);
   return res.status(500).json({message:"internal server error"})
}
}
//@ get | api/porduct
//@desc get poruduct by filter
//@public

 const getProductByFilter=async(req:Request,res:Response)=>{
  const {size,color,minPrice,maxPrice,keyword,category,sortBy} = req.query
  try {
    let query:any ={}
    if(keyword)query.name={$regex:keyword,$options:'i'}
    if(category)query.category=category
    if(maxPrice)query.price={$gte:Number(maxPrice)}
    if(minPrice)query.price={$lte:Number(minPrice)}
    if(size)query.sizes={$in:[size]}
    if(color)query.colors={$in:[color]}
    
    let sortQuery:any = {}

    if(sortBy==='price-asc')sortQuery.price=1
    if(sortBy==='price-dsc')sortQuery.price=-1
    if(sortBy==='latest')sortQuery.createdAt=-1
    if(sortBy==='rating-asc')sortQuery.rating=1
    if(sortBy==='rating-dsc')sortQuery.rating=-1

    const products = await Product.find(query).sort(sortQuery)
    if(products)return res.status(200).json(products)
        return res.status(400).json({message:'no product found'})

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'internal server error'})

  }
}
//@route get | api/product/newArrival
//@desc get new products
//@public

const getnewArrival =async(req:Request,res:Response)=>{
    console.log("touch new arrival");
    
    try {
        const products = await Product.find({is_newArrival:true})
        if(products.length>0)return res.status(200).json(products)
        return res.status(404).json({message:'no new arrivals'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'internal server error'})
    }
}
//@route get | api/product/feature
//@desc get feature product
//@public


const getFeature=async (req:Request,res:Response)=>{
    try {
        const products = await Product.find({is_feature:true})
        if(products.length===0){
             return res.status(404).json({message:'no new feature products'})
        }
          return res.status(200).json(products)  
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'internal server error'})
    }
}

//@route get | api/product/one/id
//@desc get product by id
//@public

const getProductById=async(req:Request,res:Response)=>{
    const {productId} = req.params
    try {
        const product = await Product.findById(productId)
        if(product)return res.status(200).json(product)
            return res.status(404).json({message:"no product foun"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"})
    }
}

//@route get | api/product/filters/meta
//@desc get all meta
//@public
const getProudctsMeta=async(req:Request,res:Response)=>{
    const colors =await Product.distinct('colors')
    const sizes = await Product.distinct('sizes')
    const priceRange = await Product.aggregate([
        {
        $group:{
            _id:null,
            minPrice:{$min:'$price'},
            maxPrice:{$max:'$price'}
        }
    }
    ])
    return res.status(200).json(
        {
        
        colors,
        sizes,
        minPrice:priceRange[0]?.minPrice || 0,
        maxPrice:priceRange[0]?.maxPrice || 0
    }
    )
}
//@route Delete | api/productDelete/:id
//@desc delete the product
//@acess admin only
const deleteProduct =async (req:Request,res:Response)=>{
const {productId} = req.params;

    try {
    const aproduct =await Product.findById(productId)
if(!aproduct)return res.status(404).json({message:'product not exit'})
   
    Promise.all(aproduct.images.map(async(obj)=>{
        await deleteImg(obj.alt)
    }))
    await aproduct.deleteOne()
    return res.status(200).json({message:"delete the product"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"})
    }
}

export {
    createProduct,
    updateProduct,
    getProductByFilter,
    getnewArrival,
    getFeature,
    getProductById,
    getProudctsMeta,
    deleteProduct
}