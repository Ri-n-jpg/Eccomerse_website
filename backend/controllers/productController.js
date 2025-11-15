import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// 💚 ADD PRODUCT CONTROLLER
const addProduct = async (req, res) => {
  try {
    let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    // ----------------------------------------------------
    // ✅ FIXED SIZES PARSER (NO MORE ERRORS)
    // ----------------------------------------------------
    if (typeof sizes === "string") {
      // Case 1: JSON array string → ["S","M","L"]
      if (sizes.startsWith("[") && sizes.endsWith("]")) {
        sizes = JSON.parse(sizes);
      }
      // Case 2: CSV string → "S,M,L"
      else {
        sizes = sizes.split(",").map((s) => s.trim());
      }
    }

    // ----------------------------------------------------
    // Convert bestseller to boolean
    // ----------------------------------------------------
    bestseller = bestseller === "true" || bestseller === true;

    // ----------------------------------------------------
    // Extract uploaded images from multer
    // ----------------------------------------------------
    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // ----------------------------------------------------
    // UPLOAD TO CLOUDINARY (IMPORTANT)
    // ----------------------------------------------------
    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const upload = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return upload.secure_url; // 💚 We only save URL
      })
    );

    // ----------------------------------------------------
    // SAVE PRODUCT IN MONGODB
    // ----------------------------------------------------
    const newProduct = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes,
      bestseller,
      image: imagesUrl, // ⭐ Save Cloudinary URL (FIXED)
      date: Date.now(),
    });

    const saved = await newProduct.save();

    res.json({
      success: true,
      message: "Product added successfully",
      data: saved,
    });
  } catch (error) {
    console.error("❌ Error in addProduct:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------------------------------
// LIST ALL PRODUCTS
// ----------------------------------------------------
const listProducts = async (req, res) => {
  try{
  const products = await productModel.find();
  res.json({ success: true, products });
}
catch(error){
  console.log(error);
  res.json({success:false,message:error.message})
}}

// ----------------------------------------------------
// REMOVE PRODUCT (dummy)
// ----------------------------------------------------
const removeProduct = async (req, res) => {
  try {
    console.log("ID RECEIVED:", req.body.id);

    const deleted = await productModel.findByIdAndDelete(req.body.id);

    console.log("DELETE RESULT:", deleted);

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// ----------------------------------------------------
// SINGLE PRODUCT (dummy)
// ----------------------------------------------------
const singleProduct = async (req, res) => {
try {

  const {productId} = req.body
  const product=await productModel.findById(productId)
  res.json({ success: true, product });
}
catch (error){
  console.log(error)
  res.json({success:false,message:error.message})
}}

export { addProduct, listProducts, removeProduct, singleProduct };
