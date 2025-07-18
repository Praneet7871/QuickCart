import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ success: false, message: "Not found" });
    return NextResponse.json({ success: true, product });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
