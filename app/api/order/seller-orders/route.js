import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order"; // Make sure this import is correct

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({}).populate("items.product"); // check spelling here too: was `iterms`
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error in GET /api/order/seller-orders:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
