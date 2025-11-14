import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    // 🟢 Extract data safely
    let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    // 🟢 Parse sizes if sent as JSON string
    if (typeof sizes === "string") {
      try {
        sizes = JSON.parse(sizes);
      } catch {
        sizes = [sizes];
      }
    }

    // 🟢 Convert bestseller to boolean
    bestseller = bestseller === "true" || bestseller === true;

    // 🟢 Extract uploaded image data
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    // 🟢 Collect all uploaded images with full metadata
    const images = [image1, image2, image3, image4]
      .filter(Boolean)
      .map((file) => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      }));

    // 🛑 Validate images
    if (images.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    // 🟢 Create product document
    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      subCategory, // ✅ matches schema
      sizes,
      bestseller,
      image: images, // ✅ matches schema field name
      date: Date.now(),
    });

    // 🟢 Save to DB
    const savedProduct = await newProduct.save();

    res.json({
      success: true,
      message: "✅ Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("❌ Error in addProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placeholder exports
const listProducts = async (req, res) => {
  const products = await productModel.find();
  res.json({ success: true, products });
};

const removeProduct = async (req, res) => {
  res.json({ success: true, message: "Remove product placeholder" });
};

const singleProduct = async (req, res) => {
  res.json({ success: true, message: "Single product placeholder" });
};

export { addProduct, listProducts, removeProduct, singleProduct };
