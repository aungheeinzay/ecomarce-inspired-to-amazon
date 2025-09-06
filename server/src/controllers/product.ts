import { Request,Response } from "express"
import { Product } from "../models/product"
import { readdirSync } from "fs"


//@route post | api/product
//desc create a product
//@admin only | privite
const createProduct =async (req:Request,res:Response)=>{
try {
      const { description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images,
      is_newArrival,
      rating,
      is_feature,
      name
} = req.body

    await Product.create({
    name,description,price,instock_count,category,
    sizes,colors,images,is_newArrival,rating,is_feature,
    userId:req.user?._id
})
return res.status(200).json({message:`${name} is created successfully`})
} catch (error) {
   console.log(error);
   return res.status(500).json({message:"server errors"})
}
}

//@route post | api/product/:id
//desc update a product
//@admin only | privite
const updateProduct =async (req:Request,res:Response)=>{
    const {id} =req.params
try {
      const { description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images,
      is_newArrival,
      rating,
      is_feature,
      name
} = req.body

const product = await Product.findById(id)
if(product){
   
    product.name = name || product.name;
    product.category=category || product.category;
    product.description=description || product.description;
    product.rating=rating || product.rating;
    product.price=price || product.price;
    product.sizes=sizes || product.sizes;
    product.instock_count= instock_count || product.instock_count;
    product.colors = colors || product.colors;
    product.images = images || product.images;
    product.is_newArrival=is_newArrival || product.is_newArrival;
    product.is_feature = is_feature || product.is_feature
    await product.save()
    return res.status(200).json({message:"update the product"})
}
} catch (error) {
   console.log(error);
   return res.status(500).json({message:"product does not exit"})
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

const getnewArrival =async (req:Request,res:Response)=>{
    try {
        const products = await Product.find({is_newArrival:true})
        if(products)return res.status(200).json(products)
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


export {
    createProduct,
    updateProduct,
    getProductByFilter,
    getnewArrival,
    getFeature,
    getProductById,
    getProudctsMeta
}