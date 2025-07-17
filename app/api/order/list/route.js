import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server"; // ✅ Fixes getAuth error
import { NextResponse } from "next/server"; // ✅ Fixes NextResponse error

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const orders = await Order.find({ userId })
      .populate("items.product"); // << this is the key

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
