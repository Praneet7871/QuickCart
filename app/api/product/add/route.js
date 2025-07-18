import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Product from "@/models/Product";
import cloudinary from "@/config/cloudinary";
import dbConnect from "@/config/dbConnect";

// helper to upload a file to cloudinary
async function uploadToCloudinary(file, resource_type = "auto") {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

export async function POST(req) {
  try {
    await dbConnect();
    const { userId } = getAuth(req);
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const offerprice = formData.get("offerprice");
    const category = formData.get("category");

    // get files
    const imageFiles = formData.getAll("images");
    const modelFiles = formData.getAll("models"); // 3D model files

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json({ success: false, message: "Image files missing" });
    }

    // upload images
    const imageUrls = await Promise.all(
      imageFiles.map((file) => uploadToCloudinary(file, "auto"))
    );

    // upload models (if any)
    const modelUrls = modelFiles.length > 0
      ? await Promise.all(
          modelFiles.map((file) => uploadToCloudinary(file, "raw"))
        )
      : [];

    // save product
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerprice),
      image: imageUrls,
      models: modelUrls,
      date: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: "Product uploaded successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
