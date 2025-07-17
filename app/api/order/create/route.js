import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/inngest";
import User from "@/models/users";
import Order from "@/models/Order"; // ✅ Add this

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { items } = await request.json();

    if (items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    // ✅ Proper way to compute amount
    const productPrices = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        return product.offerPrice * item.quantity;
      })
    );
    const amount = productPrices.reduce((acc, val) => acc + val, 0);

    // ✅ Save to DB
    await Order.create({
      userId,
      items,
      amount: amount + Math.floor(amount * 0.02),
      date: Date.now()
    });

    // ✅ Trigger event (optional)
    await inngest.send({
      name: "order/created",
      data: {
        userId,
        items,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now()
      }
    });

    // ✅ Clear user cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully"
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
