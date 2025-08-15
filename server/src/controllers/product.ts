import { Request,Response } from "express"
import { Product } from "../models/product"


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

export {createProduct,updateProduct}